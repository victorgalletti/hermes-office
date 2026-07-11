"use client";

import { useEffect, useRef } from "react";
import type { HermesAgent, OfficeTheme } from "./types.js";

export type HermesOfficeProps = { agents?: HermesAgent[]; className?: string; theme?: Partial<OfficeTheme>; engineUrl?: string; title?: string; height?: string };

export function HermesOffice({ agents = [], className, engineUrl = "/hermes-office", title = "Hermes Office", height = "calc(100vh - 9rem)" }: HermesOfficeProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const source = `${engineUrl.replace(/\/$/, "")}/index.html?external=1`;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame?.contentWindow) return;
    const timer = window.setTimeout(() => {
      const send = (data: unknown) => frame.contentWindow?.postMessage(data, window.location.origin);
      const ids = agents.map((_, index) => index + 1);
      send({ type: "existingAgents", agents: ids });
      agents.forEach((agent, index) => {
        const id = index + 1;
        send({ type: "agentTeamInfo", id, agentName: agent.name });
        if (agent.activity === "waiting") send({ type: "agentStatus", id, status: "waiting", awaitingInput: true });
        else if (agent.activity !== "idle") send({ type: "agentToolStart", id, toolId: `hermes-${agent.id}`, status: `${agent.activity}: ${agent.name}` });
      });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [agents]);

  return <section className={className} aria-label={title}><iframe ref={frameRef} src={source} title={title} className="block w-full border-0 bg-background" style={{ height, minHeight: 760 }} allow="clipboard-read; clipboard-write" /></section>;
}