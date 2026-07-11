"use client";

import type { HermesAgent, OfficeTheme } from "./types.js";

export type HermesOfficeProps = {
  /** Reserved for the future Hermes event adapter. */
  agents?: HermesAgent[];
  className?: string;
  theme?: Partial<OfficeTheme>;
  engineUrl?: string;
  title?: string;
  height?: string;
};

/** Pixel Agents renderer packaged as the Hermes Office surface. */
export function HermesOffice({
  className,
  engineUrl = "/hermes-office",
  title = "Hermes Office",
  height = "calc(100vh - 9rem)",
}: HermesOfficeProps) {
  const source = `${engineUrl.replace(/\/$/, "")}/index.html`;

  return (
    <section className={className} aria-label={title}>
      <iframe
        src={source}
        title={title}
        className="block w-full border-0 bg-background"
        style={{ height, minHeight: 760 }}
        allow="clipboard-read; clipboard-write"
      />
    </section>
  );
}