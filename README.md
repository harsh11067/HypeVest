# HypeVest Project
# HypeVest

Investor x Creator monetization platform with prediction markets, tokenized revenue, and on-chain settlement via Linera. Frontend is Next.js + MUI + Framer Motion; smart contracts target Linera SDK v0.15.3; a Node relayer/oracle fetches YouTube analytics.

## Features
- Creator onboarding with YouTube API key + Channel ID (creator analytics)
- Investor and Creator dashboards with animated, responsive cards
- Trading page with Prediction Markets tab and bond trading UI
- Notification bell with tap animation and persistent color state
- Profile and Billing pages based on Vision-UI/Figma
- Linera smart contracts: bond_factory and prediction_market (SDK 0.15.3)
- Relayer service (Node) for YouTube analytics ingestion/oracle

## Monorepo Structure
```
contracts/           Rust smart contracts (Linera)
  bond_factory/
  prediction_market/
docs/                Product pitch and technical design
frontend/            Next.js app (MUI + Framer Motion)
relayer/             Node/Express oracle + integrations
```

## Tech Stack
- Frontend: Next.js, React, TypeScript, MUI, Framer Motion
- Smart Contracts: Rust, Linera SDK (=0.15.3), linera-views, thiserror, log
- Oracle/Relayer: Node.js/Express
- APIs: YouTube Data API v3

## Prerequisites
- Node 18+
- Rust toolchain (stable) and Cargo
- Git Bash (Windows) or a POSIX shell
- YouTube Data API v3 key and a valid Channel ID

## Environment
Create `frontend/.env.local` (example in `frontend/env.local.example`):
```
NEXT_PUBLIC_APP_NAME=HypeVest
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
```

Relayer (if required): create `relayer/.env` based on `relayer/env.example`.

## Install & Run
From the repo root:

```bash
# 1) Frontend
cd frontend
npm install
npm run dev
# App: http://localhost:3000
```

Optional relayer/oracle:
```bash
cd relayer
npm install
npm run dev
# API: http://localhost:3001
```

## Contracts (Linera SDK = 0.15.3)
The contracts are written against Linera SDK v0.15.3. Ensure your toolchain matches.

```bash
cd contracts/bond_factory
cargo build

cd ../prediction_market
cargo build
```

Key notes:
- We implement `WithContractAbi`/`WithServiceAbi` and define ABI structs.
- Imports use `linera_sdk::base` and correct trait signatures for 0.15.3.

Linera docs: https://linera.dev/

## Creator Sign-in (YouTube)
On the Sign In page, when selecting "Creator", fields for `YouTube Channel ID` and `YouTube API Key` are shown and stored in the user context to power analytics.

Channel ID format: starts with `UC` and is 24 chars.
API Key format: starts with `AIza`.

## Troubleshooting
- 404 on `/signin` after file changes:
  ```bash
  cd frontend
  rm -rf .next
  npm run dev
  ```

- Global 500 or `useAuth` errors: ensure `AuthProvider` wraps the app in `frontend/pages/_app.tsx`.

- Framer Motion not animating: confirm `motion.div` wrappers are present and not SSR-blocked.

- Rust compile errors: verify `Cargo.toml` uses `linera-sdk = "=0.15.3"` and imports align with that version.

## Scripts
Frontend:
```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # start production server
```

Relayer:
```bash
npm run dev
```

## License
Proprietary – internal use for HypeVest development unless stated otherwise.
