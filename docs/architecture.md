# Prixtara — Architecture

## Overview

Prixtara is a deep-tech startup with three products:

- **AI-Vision Defect Detection** — Computer vision for industrial quality control
- **Existential AI** — Autonomous reasoning engine
- **Sambhashi** — Multilingual / Indian Sign Language (ISL) technology

The website is built as a pnpm + Turborepo monorepo with Next.js as the primary frontend and Sanity as the headless CMS.

---

## Repository Structure

```
prixtara/
│
├── apps/
│   ├── web/              Next.js 15 App Router — public website
│   └── studio/           Sanity Studio v3 — content management
│
├── packages/
│   ├── types/            Shared TypeScript type definitions (no runtime code)
│   ├── validation/       Zod validation schemas for all external boundaries
│   ├── config/           Validated runtime config — strict server/client isolation
│   ├── cms/              Sanity CMS access layer — ALL GROQ queries live here
│   ├── seo/              Next.js Metadata API helpers and JSON-LD builders
│   ├── analytics/        Analytics abstraction (provider-agnostic)
│   ├── ui/               Shared React component library
│   ├── utils/            Pure utility functions (cn, formatDate, slugify, etc.)
│   ├── media/            Media pipeline utilities
│   ├── eslint-config/    Shared ESLint flat configurations
│   └── tsconfig/         Shared TypeScript base configurations
│
├── docs/                 Architecture and developer documentation
├── .github/workflows/    CI/CD pipeline definitions
└── source-of-info/       Brand assets and source materials (read-only)
```

---

## Architectural Principles

### 1. Server Components by Default

All Next.js pages and layouts are Server Components unless they explicitly require browser APIs or React hooks. The `'use client'` directive is used **sparingly** and deliberately.

### 2. No Business Logic in Pages

Pages are thin orchestrators. They call data-fetching functions from `apps/web/lib/` and pass results as props to components. No business logic or data transformation inside page JSX.

### 3. Data Fetching Layers

```
┌─────────────┐     ┌──────────────────────┐     ┌──────────────────┐
│  page.tsx   │────▶│  lib/products.ts      │────▶│  @prixtara/cms   │
│  (Server    │     │  (server-only,        │     │  (GROQ queries   │
│  Component) │     │   data access layer)  │     │   + client)      │
└─────────────┘     └──────────────────────┘     └──────────────────┘
```

### 4. Package Boundaries

| Package                      | Purpose          | Who can import it                         |
| ---------------------------- | ---------------- | ----------------------------------------- |
| `@prixtara/types`            | Type definitions | Anyone                                    |
| `@prixtara/validation`       | Zod schemas      | Anyone                                    |
| `@prixtara/config` (default) | Client env vars  | Any component                             |
| `@prixtara/config/server`    | Server env vars  | **Server-only**                           |
| `@prixtara/cms`              | CMS queries      | **Server-only** (`lib/` only in apps/web) |
| `@prixtara/seo`              | Metadata helpers | Any server context                        |
| `@prixtara/analytics`        | Event tracking   | Client Components                         |
| `@prixtara/ui`               | React components | apps/web (Server or Client)               |
| `@prixtara/utils`            | Pure functions   | Anyone                                    |
| `@prixtara/media`            | Media utilities  | Any context                               |

### 5. Secret Isolation

The `packages/config/src/env.server.ts` file imports `server-only` from Next.js, making it a **compile-time error** to import it in a Client Component. This mechanically enforces the rule that secrets (API tokens, webhook secrets) never reach the browser bundle.

```
NEXT_PUBLIC_*  →  client-safe  →  @prixtara/config/client  →  Any context
(no prefix)    →  server-only  →  @prixtara/config/server  →  Server only
                                   ↑ protected by server-only package
```

### 6. Validation at Boundaries

All data from external sources (CMS, APIs, env vars, form submissions) is validated with Zod at the point of entry. Validated types flow through the application; raw unvalidated types never reach the business logic layer.

---

## Technology Stack

| Layer               | Technology           | Version |
| ------------------- | -------------------- | ------- |
| Framework           | Next.js (App Router) | 15.x    |
| Runtime             | React                | 19.x    |
| Language            | TypeScript (strict)  | 5.x     |
| Package manager     | pnpm                 | 12.x    |
| Build orchestration | Turborepo            | 2.x     |
| CMS                 | Sanity               | 3.x     |
| Styling             | Tailwind CSS         | 4.x     |
| Validation          | Zod                  | 3.x     |
| Animation           | GSAP, Lenis, Motion  | latest  |
| Unit testing        | Vitest               | 2.x     |
| E2E testing         | Playwright           | 1.x     |
| CI/CD               | GitHub Actions       | —       |
| Hosting             | Vercel               | —       |
| Observability       | Sentry (TODO)        | 8.x     |

---

## CMS Architecture

### Sanity Studio

The Studio runs as a standalone app at `apps/studio/`. It is deployed separately from the Next.js app (typically on `studio.prixtara.com` or embedded).

### Content Delivery

```
Sanity CDN
    │
    ▼
@prixtara/cms (sanityClient)  ←── server-only
    │
    ▼
apps/web/lib/ (data access layer)
    │
    ▼
Server Components (pages)
```

### On-Demand ISR (Planned)

```
CMS editor publishes content
    │
    ▼
Sanity webhook → /api/revalidate
    │
    ▼
Next.js revalidateTag() clears cache
    │
    ▼
Next request regenerates page
```

---

## Environment Configuration

See `.env.example` for full documentation. Key principle:

- `NEXT_PUBLIC_*` vars → browser-safe, baked into JS bundle at build time
- All other vars → server-only, never sent to browser

---

## Deployment

### Vercel (Recommended)

- `apps/web` deploys to Vercel (Vercel supports pnpm workspaces natively)
- Set all env vars in Vercel Dashboard for each environment (dev, preview, production)
- `apps/studio` deploys to `sanity.io/manage` or a separate Vercel project

### Environments

| Environment | Branch             | Purpose                |
| ----------- | ------------------ | ---------------------- |
| Development | Local `.env.local` | Developer workstations |
| Preview     | Feature branches   | PR review              |
| Production  | `main`             | Live site              |

---

## Future Architecture (TODOs)

- **TODO(cms)**: Implement full Sanity content model and GROQ queries
- **TODO(media)**: Add `@sanity/image-url` pipeline and OG image generation
- **TODO(seo)**: Add per-page OG images via `@vercel/og`
- **TODO(analytics)**: Implement analytics provider (GA4 / Plausible / PostHog)
- **TODO(monitoring)**: Integrate Sentry for error tracking and performance monitoring
- **TODO(forms)**: Add form handling (contact, demo requests)
- **TODO(careers)**: Add application form and storage backend
