"use client";

import type { HermesAgent, OfficeTheme } from "./types.js";

export type HermesOfficeProps = {
  /** Reserved for the future Hermes event adapter. */
  agents?: HermesAgent[];
  className?: string;
  theme?: Partial<OfficeTheme>;
  engineUrl?: string;
  title?: string;
};

/**
 * Pixel Agents renderer packaged as the Hermes Office surface.
 *
 * The embedded engine owns sprites, furniture, animation and layout. Hermes
 * snapshots and SSE events will be bridged into the iframe by the adapter.
 */
export function HermesOffice({
  className,
  engineUrl = "/hermes-office",
  title = "Hermes Office",
}: HermesOfficeProps) {
  const source = `${engineUrl.replace(/\/$/, "")}/index.html`;

  return (
    <section className={className} aria-label={title}>
      <iframe
        src={source}
        title={title}
        className="block h-[720px] w-full border-0 bg-background"
        allow="clipboard-read; clipboard-write"
      />
    </section>
  );
}