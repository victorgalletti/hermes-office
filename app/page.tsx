"use client";

import { useState } from "react";
import { HermesOffice } from "../src/HermesOffice";
import type { HermesAgent } from "../src/types";

const demoAgents: HermesAgent[] = [
  { id: "discord:research", name: "Pesquisa de produtos", activity: "reading", source: "discord", model: "z-ai/glm-5.2" },
  { id: "api:analysis", name: "Analise de margem", activity: "thinking", source: "api_server", model: "claude-sonnet-4-6" },
  { id: "api:catalog", name: "Catalogo Amazon", activity: "writing", source: "api_server", model: "claude-sonnet-4-6" },
  { id: "discord:ops", name: "Operacoes", activity: "waiting", source: "discord", model: "z-ai/glm-5.2" },
];

export default function Home() {
  const [selected, setSelected] = useState<HermesAgent | null>(demoAgents[0]);
  return (
    <main>
      <header>
        <div>
          <p className="eyebrow">HERMES OFFICE / NEXT DEMO</p>
          <h1>Visualizacao de agentes</h1>
          <p className="subtitle">Dados demonstrativos. O Hermes Workspace continua sendo a console operacional.</p>
        </div>
        <span className="badge">4 agentes</span>
      </header>
      <section className="office-card"><HermesOffice agents={demoAgents} onAgentClick={setSelected} /></section>
      <section className="details" aria-live="polite">
        <div><p className="eyebrow">AGENTE SELECIONADO</p><h2>{selected?.name ?? "Selecione um agente"}</h2></div>
        {selected && <dl>
          <div><dt>Atividade</dt><dd>{selected.activity}</dd></div>
          <div><dt>Origem</dt><dd>{selected.source}</dd></div>
          <div><dt>Modelo</dt><dd>{selected.model}</dd></div>
        </dl>}
      </section>
    </main>
  );
}
