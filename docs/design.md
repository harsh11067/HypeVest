## HypeVest — Technical Design (Concise)

### 1. Architecture Overview
- Frontend (Next.js, MUI, Framer Motion): dashboards, trading, profile, billing.
- Relayer/Oracle (Node): fetch YouTube analytics via Data API v3, expose REST, optionally push updates.
- Contracts (Rust, Linera SDK 0.15.3):
  - bond_factory: issuance/minting logic
  - prediction_market: markets and settlement messages

### 2. Data Flow
1. Creator signs in (provides YouTube API key + Channel ID)
2. Relayer pulls analytics (authorized key) and exposes to FE; later pushes to chain
3. Contracts update pools/markets based on oracle messages
4. FE renders balances, markets, and trades

### 3. Frontend Modules
- `pages/` routes: `index`, `signin`, `signup`, `profile`, `billing`, `trading`
- `components/Layout`: Header (bell animation), Sidebar (routing + docs link)
- `components/Dashboard`: Creator/Buyer dashboards with animated cards
- `Context/AuthContext`: localStorage-backed auth state

### 4. Contracts (Linera 0.15.3 specifics)
- Use `linera_sdk::base` imports and define ABI structs
- Implement `WithContractAbi`/`WithServiceAbi`
- Methods follow 0.15.3 trait signatures for load/new/execute

### 5. Relayer/Oracle
- Node/Express service
- Endpoints for analytics; future: signed messages to contracts

### 6. Security/Validation
- Client validation for YouTube key (`AIza...`) and Channel ID (`UC...`, length 24)
- SSR guards around `localStorage` usage

### 7. Deployment Notes
- Clear Next cache on route changes if stale: remove `.next` and restart
- Keep contracts pinned to `=0.15.3` unless full API upgrade


