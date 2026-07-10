export type AgentActivity =
  | "idle"
  | "thinking"
  | "writing"
  | "reading"
  | "waiting"
  | "error";

export type HermesAgent = {
  id: string;
  name: string;
  activity: AgentActivity;
  source?: string;
  model?: string;
  sessionId?: string;
  lastActiveAt?: string;
  x?: number;
  y?: number;
};

export type OfficeEvent =
  | { type: "snapshot"; agents: HermesAgent[] }
  | { type: "agent.updated"; agent: HermesAgent }
  | { type: "agent.removed"; id: string };

export interface AgentEventSource {
  subscribe(onEvent: (event: OfficeEvent) => void): () => void;
}

export type HermesSessionSummary = {
  id: string;
  source?: string;
  model?: string;
  title?: string | null;
  last_active?: number;
  end_reason?: string | null;
};

export type HermesRunEvent = {
  type?: string;
  event?: string;
  data?: unknown;
};

export type OfficeTheme = {
  floor: string;
  wall: string;
  desk: string;
  text: string;
  accent: string;
};
