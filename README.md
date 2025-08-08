## Neon World Clocks – Project Overview

## Getting Started

Install and run dev server:

npm run dev
Open http://localhost:3000.

## Scripts

- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Tests (unit/component/hooks): `npm run test`
- Cypress (headed): `npm run cy:open`
- Cypress (CI/headless): `npm run cy:run`
- Build: `npm run build`
- Start (prod): `npm start`

### Architecture & Approach

- **Tech stack**: Next.js App Router, React 19, Ant Design 5 wrappers, Tailwind v4, TypeScript (app code), Testing (Vitest + Testing Library + Cypress), CI (GitHub Actions), Hosting (Vercel).
- **Feature-first**: UI and logic live under `src/features/*`. Shared UI components under `src/components/ui/*` as light wrappers over AntD to centralize API and styling.
- **State/persistence**: Minimal local state, with a small localStorage layer (`src/utils/local-storage/*`) and a `useSelectedClocks` hook to persist the dashboard clocks.
- **Theming/design**: Centralized design tokens and a provider layer (see `src/components/providers/*`).

### Key Decisions & Trade‑offs

- **AntD wrappers**: We wrap AntD components to keep a stable API and swap styling/behavior globally without touching features. Trade‑off: thin pass-through code.
- **Testing mix**: Unit (utils), hooks, and components in Vitest; E2E in Cypress. Trade‑off: E2E is slower but critical for end-to-end flows. Vitest keeps unit/component tests fast.
- **ESLint during build**: Lint is enforced in CI, but disabled during Next build to avoid build-time failures on Vercel. Speeds up deploys and avoids devDependency issues.
- **CI/CD model**: Feature branches → PR to `staging`, then `staging` → `main`. Hotfixes can PR directly to `main` from `hotfix/*` branches. Deploys handled by Vercel Git Integration (or optional CLI workflows).

## Repo Conventions

- Branching:
  - feature/\* → PR to `staging`
  - `staging` → PR to `main`
  - hotfix/\* → PR to `main`
- Imports:
  - Use `@/*` alias for `src/*` and import UI via `@/components/ui`
- Code style:
  - Strict TypeScript in app code; tests are JS/JSX to reduce friction
  - Lint errors are blockers in CI; Prettier enforced via rules

## CI/CD

- GitHub Actions CI (`.github/workflows/ci.yml`):
  - Install → lint → typecheck → unit tests → build → start app → Cypress E2E → stop app
  - Triggers on PRs to `staging` and `main`, and pushes to `main` (configurable)
- Branch rules:
  - PRs to `main` allowed from `staging` and `hotfix/*` only (see `protect-main.yml`)
- Deploy:
  - Recommended: Vercel Git Integration handles deploys on push.
  - Optional: CLI deploy workflows exist but can be disabled if Git Integration is used.

## Testing Strategy

- Unit tests (Vitest): validate pure logic deterministically and fast.
- Hook tests (Vitest + Testing Library): assert React integration with side-effects is correct.
- Component tests (Vitest + Testing Library): verify user-visible rendering and event wiring.
- End‑to‑End tests (Cypress): validate critical user flows in a real browser context.

Run tests:

```bash
npm run test
# or only a single file
npx vitest run src/features/clock/utils/timezoneOptions.test.js
```

E2E locally:

```bash
npm run dev
npm run cy:open
```

## Troubleshooting

- Vercel build fails with missing eslint packages
  - Ensure lint doesn’t run during Vercel build (we removed prebuild lint) and keep `eslint: { ignoreDuringBuilds: true }` in `next.config.ts`.
- CI hangs on “Wait for app”
  - We now build first and start with `npx next start -p 3002 -H 127.0.0.1` and wait with a timeout. If you use env vars, inject them in the workflow.
- Tests fail locally
  - Ensure dev deps installed: `npm i`
  - For component tests, ensure jsdom setup `vitest.setup.ts` is in place.
- Cypress cannot reach the app
  - Verify the URL and port; by default `CYPRESS_BASE_URL` is `http://127.0.0.1:3002` in CI. Locally use `npm run dev` then `npm run cy:open`.
