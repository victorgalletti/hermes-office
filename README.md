# Hermes Office

`hermes-office` e uma biblioteca React de visualizacao para agentes
Hermes. Ela desenha um escritorio pixelado em Canvas e recebe apenas estado
normalizado de agentes; nao controla Hermes e nao substitui Hermes Workspace.

## Objetivo

O admin pode exibir uma leitura visual de trabalho em andamento sem duplicar
terminal, sessoes, custos, cron ou configuracoes que ja pertencem ao Hermes
Workspace.

O projeto foi inspirado na arquitetura agnostica de agentes do Pixel Agents,
mas e implementado de forma independente: nenhum codigo ou asset externo foi
copiado para este repositorio.

## Estado atual

- Biblioteca React isolada e pronta para empacotamento.
- Canvas responsivo com personagens, mesas, atividades e clique por agente.
- Contratos para snapshots e eventos incrementais.
- Cliente SSE para um endpoint do backend do admin.
- Adaptador inicial de resumo de sessoes Hermes para personagens.

## O que ela nao faz

- Nao chama a API Hermes pelo navegador.
- Nao armazena ou expoe `API_SERVER_KEY` ou token do Dashboard.
- Nao usa polling.
- Nao tenta reproduzir a interface do Hermes Workspace.

## Uso local

Instale dependencias quando este pacote for publicado ou adicionado ao
workspace npm do monorepo:

```tsx
import { HermesOffice, type HermesAgent } from "hermes-office";

const agents: HermesAgent[] = [
  {
    id: "discord:research",
    name: "Pesquisa de produtos",
    activity: "reading",
    source: "discord",
    model: "z-ai/glm-5.2",
  },
];

export function AgentView() {
  return <HermesOffice agents={agents} />;
}
```

## Contrato de eventos

O backend devera publicar SSE autenticado para o admin. Cada mensagem deve ter
um dos tipos abaixo e conter JSON no `data`:

```text
event: snapshot
data: {"agents":[...]}

event: agent.updated
data: {"agent":{...}}

event: agent.removed
data: {"id":"..."}
```

O cliente usa `EventSource`: ele mantem uma conexao aberta e nao faz requests
periodicos. Em reconexao, o servidor envia um novo `snapshot` antes de eventos
incrementais.

## Integracao Hermes recomendada

1. O backend obtem snapshots autenticados de sessoes Hermes.
2. Sessoes viram personagens com `sessionToAgent`.
3. Runs iniciados pelo admin usam o SSE nativo do Hermes para emitir
   `agent.updated` no endpoint interno do admin.
4. Atividade externa (Discord, CLI e Workspace) permanece snapshot ate Hermes
   oferecer um evento global confiavel. Nao simular realtime com polling.

## Proximas etapas

1. Adicionar `hermes-office` ao workspace npm e importar a biblioteca no
   frontend do admin.
2. Criar um endpoint SSE autenticado no backend Nest.
3. Definir como eventos externos ao Hermes serao emitidos, sem depender de
   banco, logs ou arquivos internos nao suportados.
4. Fazer uma tela visual propria no admin, sem acoplar ao Workspace.

## Build

```bash
npm run typecheck
npm run build
```
