# Prixtara Technologies — Website

Production-grade monorepo for the Prixtara Technologies website.

## Products

| Product                        | Description                                          |
| ------------------------------ | ---------------------------------------------------- |
| **AI-Vision Defect Detection** | Computer vision for industrial quality control       |
| **Existential AI**             | Autonomous reasoning engine                          |
| **Sambhashi**                  | Multilingual / Indian Sign Language (ISL) technology |

---

## Architecture

```
prixtara/
├── apps/
│   ├── web/        Next.js 15 App Router — public website
│   └── studio/     Sanity Studio v3 — content management
│
└── packages/
    ├── types/      Shared TypeScript definitions
    ├── validation/ Zod schemas for external boundaries
    ├── config/     Validated runtime configuration
    ├── cms/        Sanity CMS access layer (server-only)
    ├── seo/        Next.js Metadata API helpers
    ├── analytics/  Analytics abstraction layer
    ├── ui/         Shared React component library
    ├── utils/      Pure utility functions
    ├── media/      Media pipeline utilities
    ├── eslint-config/ Shared ESLint configs
    └── tsconfig/   Shared TypeScript configs
```

**See [docs/architecture.md](docs/architecture.md) for full architecture documentation.**

---

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Package manager**: pnpm 12
- **Monorepo**: Turborepo 2
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS 4
- **Validation**: Zod
- **Animation**: GSAP, Lenis, Motion _(installed — not yet implemented)_
- **Testing**: Vitest + Playwright
- **Hosting**: Vercel
- **Observability**: Sentry _(configured — not yet implemented)_

---

## Getting Started

### Prerequisites

- Node.js >= 20 (Node 24 recommended)
- pnpm >= 10 (pnpm 12 recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/prixtara/prixtara.git
cd prixtara

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your values

# Install all dependencies
pnpm install

# Start development (both apps in parallel)
pnpm dev
```

| App           | URL                   |
| ------------- | --------------------- |
| Website       | http://localhost:3000 |
| Sanity Studio | http://localhost:3333 |

---

## Development Commands

```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all packages and apps
pnpm lint         # Lint the entire monorepo
pnpm typecheck    # Type-check all packages and apps
pnpm test         # Run unit tests
pnpm format       # Format all files with Prettier
pnpm clean        # Remove all build outputs
```

**Filter to a specific app:**

```bash
pnpm --filter web dev           # Only the Next.js app
pnpm --filter studio dev        # Only Sanity Studio
pnpm --filter @prixtara/cms typecheck  # Only the CMS package
```

---

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

Key variables:

| Variable                        | Required   | Description              |
| ------------------------------- | ---------- | ------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes        | Sanity project ID        |
| `NEXT_PUBLIC_SANITY_DATASET`    | Yes        | Sanity dataset name      |
| `SANITY_API_TOKEN`              | For writes | Server-only API token    |
| `SANITY_WEBHOOK_SECRET`         | For ISR    | Webhook signature secret |
| `NEXT_PUBLIC_SITE_URL`          | Yes        | Canonical site URL       |

> ⚠️ **NEVER** commit `.env.local` or any file with real secrets to version control.

See `.env.example` for full documentation.

---

## Package Responsibilities

| Package                | Responsibility                                                     |
| ---------------------- | ------------------------------------------------------------------ |
| `@prixtara/types`      | Type-only definitions. No runtime code.                            |
| `@prixtara/validation` | Zod schemas. Validates ALL external data.                          |
| `@prixtara/config`     | Validated env vars. `config/server` is protected by `server-only`. |
| `@prixtara/cms`        | ALL Sanity GROQ queries. Server-only boundary.                     |
| `@prixtara/seo`        | Metadata and JSON-LD helpers using Next.js Metadata API.           |
| `@prixtara/analytics`  | Provider-agnostic event tracking interface.                        |
| `@prixtara/ui`         | React component library. Presentational only.                      |
| `@prixtara/utils`      | Pure utility functions (cn, formatDate, slugify).                  |
| `@prixtara/media`      | Media pipeline (Sanity images, video, OG images).                  |

---

## CMS Architecture

The Sanity Studio (`apps/studio`) is deployed separately. Content editors use the Studio to author and publish content.

All CMS queries are centralised in `packages/cms`. No application code imports from `@sanity/client` directly.

```
Sanity Studio (editors)
        │ publish
        ▼
Sanity CMS API + CDN
        │
        ▼
packages/cms (GROQ queries) ← server-only
        │
        ▼
apps/web/lib/ (data access layer)
        │
        ▼
Next.js Server Components (pages)
```

**TODO(cms)**: Implement on-demand ISR via Sanity webhooks.

---

## Deployment

### Vercel (recommended)

The `apps/web` directory deploys automatically to Vercel. Configure via:

1. Connect the GitHub repo to Vercel
2. Set **Root Directory** to `apps/web`
3. Set **Install Command** to `cd ../.. && pnpm install`
4. Set **Build Command** to `pnpm build`
5. Configure all env vars from `.env.example` in the Vercel Dashboard

### Environments

| Environment | Branch           | Purpose            |
| ----------- | ---------------- | ------------------ |
| Development | `.env.local`     | Developer machines |
| Preview     | Feature branches | PR review + QA     |
| Production  | `main`           | Live site          |

---

## CI/CD

GitHub Actions runs on every push and PR:

1. ✅ Install dependencies
2. ✅ Lint (`pnpm lint`)
3. ✅ Type check (`pnpm typecheck`)
4. ✅ Unit tests (`pnpm test`)
5. ✅ Build (`pnpm build --filter=!studio`)

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for the full pipeline.

---

## Documentation

| Document                                       | Description                            |
| ---------------------------------------------- | -------------------------------------- |
| [docs/architecture.md](docs/architecture.md)   | Architecture overview and principles   |
| [docs/system-design.md](docs/system-design.md) | Request flows and system boundaries    |
| [docs/contributing.md](docs/contributing.md)   | Developer guide and coding conventions |

---

## License

Private — Prixtara Technologies. All rights reserved.
