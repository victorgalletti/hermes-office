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
  idle: "Idle", thinking: "Thinking", writing: "Writing", reading: "Reading", waiting: "Waiting", error: "Error",
};
const activityColor: Record<HermesAgent["activity"], string> = {
  idle: "#8c97a9", thinking: "#b495ff", writing: "#52d68a", reading: "#63afff", waiting: "#f3c969", error: "#fa7272",
};
const frameForActivity: Record<HermesAgent["activity"], number> = {
  idle: 0, thinking: 1, writing: 3, reading: 5, waiting: 0, error: 2,
};

export function HermesOffice({ agents, className, onAgentClick }: HermesOfficeProps) {
  const officeStyle: CSSProperties = {
    backgroundColor: "#1d2535",
    backgroundImage: "url('/pixel-agents/floors/floor_0.png')",
    imageRendering: "pixelated",
  };

  return (
    <section className={className} aria-label="Visualizacao do escritorio Hermes" style={{ ...officeStyle, minHeight: 520, overflow: "hidden", padding: "68px 30px 30px", position: "relative" }}>
      <div style={{ background: "#344158", borderBottom: "4px solid #1a2231", color: "#f3c969", font: "700 12px ui-monospace, monospace", left: 0, letterSpacing: "0.08em", padding: "12px 20px", position: "absolute", right: 0, top: 0 }}>HERMES OFFICE</div>
      <div style={{ display: "grid", gap: 26, gridTemplateColumns: `repeat(${Math.min(Math.max(agents.length, 1), 4)}, minmax(0, 1fr))` }}>
        {agents.map((agent, index) => {
          const frame = frameForActivity[agent.activity];
          const characterStyle: CSSProperties = {
            backgroundImage: `url('/pixel-agents/characters/char_${index % 6}.png')`,
            backgroundPosition: `${-frame * 32}px 0px`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "224px 192px",
            height: 64,
            imageRendering: "pixelated",
            left: "50%",
            position: "absolute",
            top: 4,
            transform: "translateX(-50%)",
            width: 32,
          };
          return <button key={agent.id} type="button" onClick={() => onAgentClick?.(agent)} style={{ background: "rgba(17,24,39,.38)", border: "2px solid #3b4b68", color: "#f3f5fb", cursor: onAgentClick ? "pointer" : "default", font: "inherit", height: 172, padding: 0, position: "relative", textAlign: "center" }}>
            <span style={characterStyle} />
            <img src="/pixel-agents/furniture/DESK/DESK_FRONT.png" alt="" draggable={false} style={{ height: 56, imageRendering: "pixelated", left: "50%", objectFit: "contain", position: "absolute", top: 62, transform: "translateX(-50%)", width: 106 }} />
            <span style={{ background: activityColor[agent.activity], border: "2px solid #152033", borderRadius: 999, height: 13, position: "absolute", right: 10, top: 10, width: 13 }} />
            <span style={{ bottom: 28, display: "block", fontSize: 13, fontWeight: 700, left: 8, overflow: "hidden", position: "absolute", right: 8, textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{agent.name}</span>
            <span style={{ bottom: 10, color: activityColor[agent.activity], display: "block", font: "700 11px ui-monospace, monospace", left: 0, position: "absolute", right: 0 }}>{activityLabel[agent.activity]}</span>
          </button>;
        })}
      </div>
      {agents.length === 0 && <p style={{ color: "#e8eaf0" }}>Nenhum agente ativo no ultimo snapshot.</p>}
    </section>
  );
}
