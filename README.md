# Hermes Office

Hermes Office is a Next.js-powered visual workspace for Hermes Agent activity.
It is a companion surface for an admin dashboard: Hermes Workspace remains the
operational console for chat, sessions, configuration, jobs, and costs.

## Goals

- Render Hermes agents as visible characters in a pixel office.
- Consume normalized Hermes snapshots and server-sent events without polling.
- Keep Hermes secrets and dashboard tokens on the server side.
- Ship a reusable React package named `hermes-office`.

## Architecture

```text
Hermes API / Workspace events
        -> Admin backend adapter
        -> authenticated SSE endpoint
        -> Hermes Office React renderer
```

The current public contract accepts `HermesAgent` snapshots and incremental
`OfficeEvent` messages. The adapter is intentionally separate from the visual
renderer so the UI does not depend on Hermes internal files or credentials.

## Pixel Agents attribution

This project vendors the Pixel Agents webview renderer under
`vendor/pixel-agents-webview`. The renderer and included assets are licensed
under MIT by Pablo De Lucca. Their copyright and license are preserved in that
directory and in `THIRD_PARTY_LICENSES_PIXEL_AGENTS.txt`.

The vendored renderer is the source for the full office engine: tiles, layout,
pathfinding, furniture, sprite animation, and character states. Hermes Office
will replace its temporary demo renderer with an adapter over that engine.

## Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173` for the Next.js demo.

Useful checks:

```bash
npm run typecheck
npm run build
npm run demo:build
```

## Publishing

The package name is `hermes-office`.

```bash
pnpm publish
pnpm add hermes-office
```

The equivalent npm command is:

```bash
npm install hermes-office
```

## Event contract

The backend exposes an authenticated SSE stream:

```text
event: snapshot
data: {"agents":[...]}

event: agent.updated
data: {"agent":{...}}

event: agent.removed
data: {"id":"..."}
```

The visual layer does not poll. It renders the last valid snapshot while the
SSE connection reconnects.
