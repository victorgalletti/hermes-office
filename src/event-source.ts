import type { AgentEventSource, OfficeEvent } from "./types.js";

const eventTypes = ["snapshot", "agent.updated", "agent.removed"] as const;

export function createSseEventSource(url: string): AgentEventSource {
  return {
    subscribe(onEvent) {
      const source = new EventSource(url);
      const listeners = eventTypes.map((type) => {
        const listener = (message: MessageEvent<string>) => {
          try {
            const payload = JSON.parse(message.data) as Omit<OfficeEvent, "type">;
            onEvent({ type, ...payload } as OfficeEvent);
          } catch {
            // Ignore malformed events. The next server snapshot restores state.
          }
        };
        source.addEventListener(type, listener as EventListener);
        return { type, listener };
      });

      source.onerror = () => {
        // EventSource reconnects by itself. Consumers should render the last
        // valid snapshot while the connection is recovering.
      };

      return () => {
        for (const { type, listener } of listeners) {
          source.removeEventListener(type, listener as EventListener);
        }
        source.close();
      };
    },
  };
}
