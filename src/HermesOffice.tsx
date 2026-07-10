"use client";

import type { CSSProperties } from "react";
import type { HermesAgent, OfficeTheme } from "./types.js";

export type HermesOfficeProps = {
  agents: HermesAgent[];
  className?: string;
  theme?: Partial<OfficeTheme>;
  onAgentClick?: (agent: HermesAgent) => void;
};

const activityLabel: Record<HermesAgent["activity"], string> = {
  idle: "Idle",
  thinking: "Thinking",
  writing: "Writing",
  reading: "Reading",
  waiting: "Waiting",
  error: "Error",
};

const activityColor: Record<HermesAgent["activity"], string> = {
  idle: "#8c97a9",
  thinking: "#b495ff",
  writing: "#52d68a",
  reading: "#63afff",
  waiting: "#f3c969",
  error: "#fa7272",
};

export function HermesOffice({ agents, className, onAgentClick }: HermesOfficeProps) {
  const officeStyle: CSSProperties = {
    backgroundColor: "#1d2535",
    backgroundImage: "url('/pixel-agents/floors/floor_0.png')",
    imageRendering: "pixelated",
  };

  return (
    <section
      className={className}
      aria-label="Visualizacao do escritorio Hermes"
      style={{ ...officeStyle, minHeight: 520, overflow: "hidden", padding: 34, position: "relative" }}
    >
      <div style={{ background: "#344158", borderBottom: "4px solid #1a2231", color: "#f3c969", font: "700 12px ui-monospace, monospace", left: 0, letterSpacing: "0.08em", padding: "12px 20px", position: "absolute", right: 0, top: 0 }}>
        HERMES OFFICE
      </div>
      <div style={{ display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr)", marginTop: 62 }}>
        {agents.map((agent, index) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => onAgentClick?.(agent)}
            style={{ background: "transparent", border: 0, color: "#f3f5fb", cursor: onAgentClick ? "pointer" : "default", font: "inherit", minHeight: 150, padding: 0, position: "relative", textAlign: "center" }}
          >
            <img src="/pixel-agents/furniture/DESK/DESK_FRONT.png" alt="" draggable={false} style={{ bottom: 45, height: 70, imageRendering: "pixelated", left: "50%", objectFit: "contain", position: "absolute", transform: "translateX(-50%)", width: 118 }} />
            <img src={`/pixel-agents/characters/char_${index % 6}.png`} alt="" draggable={false} style={{ bottom: 70, height: 96, imageRendering: "pixelated", left: "50%", objectFit: "cover", objectPosition: `${agent.activity === "writing" ? "-48px 0" : agent.activity === "reading" ? "-80px 0" : "0 0"} top`, position: "absolute", transform: "translateX(-50%)", width: 32 }} />
            <span style={{ background: activityColor[agent.activity], border: "2px solid #152033", borderRadius: 999, height: 13, position: "absolute", right: 18, top: 18, width: 13 }} />
            <span style={{ bottom: 22, display: "block", fontSize: 13, fontWeight: 700, left: 0, overflow: "hidden", position: "absolute", right: 0, textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{agent.name}</span>
            <span style={{ bottom: 4, color: activityColor[agent.activity], display: "block", font: "700 11px ui-monospace, monospace", left: 0, position: "absolute", right: 0 }}>{activityLabel[agent.activity]}</span>
          </button>
        ))}
      </div>
      {agents.length === 0 && <p style={{ color: "#e8eaf0", marginTop: 62 }}>Nenhum agente ativo no ultimo snapshot.</p>}
    </section>
  );
}
