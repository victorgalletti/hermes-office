"use client";
import { useEffect, useRef } from "react";
import type { HermesAgent, OfficeTheme } from "./types.js";

const defaultTheme: OfficeTheme = {
  floor: "#171923",
  wall: "#30364a",
  desk: "#815b3a",
  text: "#e8eaf0",
  accent: "#f3c969",
};

const activityColor: Record<HermesAgent["activity"], string> = {
  idle: "#7f8ea3",
  thinking: "#a78bfa",
  writing: "#45d483",
  reading: "#58a6ff",
  waiting: "#f3c969",
  error: "#f87171",
};

export type HermesOfficeProps = {
  agents: HermesAgent[];
  className?: string;
  theme?: Partial<OfficeTheme>;
  onAgentClick?: (agent: HermesAgent) => void;
};

export function HermesOffice({
  agents,
  className,
  theme,
  onAgentClick,
}: HermesOfficeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const colors = { ...defaultTheme, ...theme };
    let hitAreas: Array<{ agent: HermesAgent; x: number; y: number; size: number }> = [];

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const width = rect.width;
      const height = rect.height;
      const cell = Math.max(32, Math.min(48, Math.floor(Math.min(width, height) / 9)));
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = colors.floor;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "#202536";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += cell) {
        for (let y = 0; y < height; y += cell) ctx.strokeRect(x, y, cell, cell);
      }

      ctx.fillStyle = colors.wall;
      ctx.fillRect(0, 0, width, 18);
      ctx.fillRect(0, 0, 18, height);
      ctx.fillRect(width - 18, 0, 18, height);
      ctx.fillStyle = colors.accent;
      ctx.font = "600 13px ui-monospace, monospace";
      ctx.fillText("HERMES OFFICE", 30, 12);

      const columns = Math.max(1, Math.floor((width - cell) / (cell * 2.3)));
      hitAreas = agents.map((agent, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = agent.x ?? cell + column * cell * 2.3;
        const y = agent.y ?? cell + 38 + row * cell * 2.6;
        const size = Math.min(cell, 40);

        ctx.fillStyle = colors.desk;
        ctx.fillRect(x - 5, y + size - 4, size + 10, 11);
        ctx.fillStyle = "#232839";
        ctx.fillRect(x + 7, y + size - 17, size - 14, 10);
        ctx.fillStyle = activityColor[agent.activity];
        ctx.fillRect(x + 8, y + 7, size - 16, size - 12);
        ctx.fillStyle = "#f8d0ac";
        ctx.fillRect(x + 11, y + 11, size - 22, size - 24);
        ctx.fillStyle = "#1b1b23";
        ctx.fillRect(x + 8, y + 5, size - 16, 10);

        ctx.fillStyle = colors.text;
        ctx.font = "12px ui-sans-serif, system-ui";
        const label = agent.name.length > 18 ? `${agent.name.slice(0, 17)}...` : agent.name;
        ctx.fillText(label, x - 3, y + size + 23);
        ctx.fillStyle = activityColor[agent.activity];
        ctx.fillText(agent.activity, x - 3, y + size + 39);
        return { agent, x, y, size };
      });

      if (agents.length === 0) {
        ctx.fillStyle = colors.text;
        ctx.font = "14px ui-sans-serif, system-ui";
        ctx.fillText("Nenhum agente ativo no ultimo snapshot.", 32, 56);
      }
    };

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();

    const onClick = (event: MouseEvent) => {
      if (!onAgentClick) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hit = hitAreas.find((area) =>
        x >= area.x && x <= area.x + area.size && y >= area.y && y <= area.y + area.size,
      );
      if (hit) onAgentClick(hit.agent);
    };

    canvas.addEventListener("click", onClick);
    return () => {
      observer.disconnect();
      canvas.removeEventListener("click", onClick);
    };
  }, [agents, onAgentClick, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Visualizacao do escritorio Hermes"
      style={{ display: "block", height: 520, width: "100%" }}
    />
  );
}
