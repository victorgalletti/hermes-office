import type { HermesAgent, OfficeEvent } from "./types.js";

export class OfficeEventStore {
  private readonly agents = new Map<string, HermesAgent>();

  constructor(initialAgents: HermesAgent[] = []) {
    for (const agent of initialAgents) this.agents.set(agent.id, agent);
  }

  apply(event: OfficeEvent): HermesAgent[] {
    if (event.type === "snapshot") {
      this.agents.clear();
      for (const agent of event.agents) this.agents.set(agent.id, agent);
    }

    if (event.type === "agent.updated") {
      const existing = this.agents.get(event.agent.id);
      this.agents.set(event.agent.id, { ...existing, ...event.agent });
    }

    if (event.type === "agent.removed") this.agents.delete(event.id);
    return this.snapshot();
  }

  snapshot(): HermesAgent[] {
    return [...this.agents.values()];
  }
}

export function sessionToAgent(session: {
  id: string;
  source?: string;
  model?: string;
  title?: string | null;
  last_active?: number;
  end_reason?: string | null;
}): HermesAgent {
  return {
    id: session.id,
    name: session.title || session.source || "Hermes session",
    activity: session.end_reason ? "idle" : "waiting",
    source: session.source,
    model: session.model,
    sessionId: session.id,
    lastActiveAt: session.last_active ? new Date(session.last_active * 1000).toISOString() : undefined,
  };
}
