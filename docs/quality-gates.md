# Prixtara — CI/CD Quality Gates & Architectural Verification

## 1. Executive Summary

Prixtara enforces a 5-tier Quality Gate architecture to guarantee code correctness, type safety, test integrity, digital accessibility (WCAG 2.1 AA), and zero-defect production build outputs. Every pull request and release branch must pass all 5 gates before merging or deployment.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Monorepo Quality Gates                           │
│                                                                         │
│  [Gate 1] ──► [Gate 2] ──► [Gate 3] ──► [Gate 4] ──► [Gate 5]          │
│   Lint &       Strict       Unit &       E2E &        Production        │
│   Style       Types        Integration  Accessibility  Build            │
│  (0 warnings) (0 errors)   (100% pass)  (axe-core 0)  (SSG + Studio)    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 5 Quality Gates

### Gate 1: Static Analysis & Code Hygiene (`pnpm lint`)

- **Execution Command**: `pnpm lint` (delegated via Turbo to all 13 packages)
- **Underlying Engines**: ESLint 9 (Flat Config), Prettier
- **Pass Criteria**:
  - Exactly zero ESLint warnings (`--max-warnings 0`).
  - Strict adherence to monorepo rules: no unused variables, proper React hooks dependencies, standard import hygiene, and no bypassed lint rules (`eslint-disable` without documented justification is prohibited).
- **Target Packages**:
  - `@prixtara/analytics`
  - `@prixtara/cms`
  - `@prixtara/config`
  - `@prixtara/eslint-config`
  - `@prixtara/media`
  - `@prixtara/seo`
  - `@prixtara/tsconfig`
  - `@prixtara/types`
  - `@prixtara/ui`
  - `@prixtara/utils`
  - `@prixtara/validation`
  - `apps/studio`
  - `apps/web`

### Gate 2: Strict Type Safety (`pnpm typecheck`)

- **Execution Command**: `pnpm typecheck`
- **Underlying Engine**: TypeScript 5.8+ (`tsc --noEmit`)
- **Pass Criteria**:
  - Zero type errors across the entire dependency graph.
  - `strict: true`, `noImplicitAny: true`, and strict null checks enforced across all workspaces.
  - No unchecked type assertions (`as unknown as any`) bypassing domain boundaries.

### Gate 3: Unit & Integration Test Suites (`pnpm test`)

- **Execution Command**: `pnpm test`
- **Underlying Engine**: Vitest 2.1+
- **Pass Criteria**:
  - 100% pass rate across all unit and integration test suites.
  - Comprehensive test coverage across:
    - **CMS & Fallback Repositories**: `ProductRepository`, `CareerRepository`, `PageRepository`, `NavigationRepository` ensuring graceful degradation when Sanity CMS is offline.
    - **Validation Boundaries**: Zod schema verification for environment variables, career applications, product models, and Sanity webhook payloads.
    - **Media Architecture**: Image/Video normalization contracts, responsive srcSet calculations, provider resolution, and headless delivery configurations.
    - **Security Isolation**: Webhook HMAC signature verification (`verifySanityWebhookSignature`), constant-time string comparisons, replay attack window protection, and server secret isolation.
    - **SEO Infrastructure**: Open Graph, Twitter/X cards, canonical URLs, and Schema.org structured data generators (`Organization`, `WebSite`, `Product`, `JobPosting`).
    - **Design Tokens & Utilities**: Design token resolution, typography/color tokens, and date/slug helpers.

### Gate 4: End-to-End & WCAG Accessibility Audit (`pnpm test:e2e`)

- **Execution Command**: `pnpm test:e2e`
- **Underlying Engine**: Playwright + `@axe-core/playwright`
- **Pass Criteria**:
  - Next.js production build (`next start`) runs smoke navigation tests across all primary routes:
    - `/` (Homepage)
    - `/products` (Catalog listing)
    - `/products/[slug]` (Product detail)
    - `/career` (Careers listing)
    - `/career/[slug]` (Job opening detail)
    - `/about` (Corporate background)
    - Non-existent paths (Custom 404 recovery page)
  - **Automated Accessibility Compliance**:
    - `@axe-core/playwright` audits every primary route against WCAG 2.1 AA rules.
    - Strict assertion: 0 critical and 0 serious accessibility violations.
  - **Keyboard Navigation & Skip Link**:
    - Skip link (`#main-content`) is present at root DOM, visually hidden until focused, and transfers focus correctly to `<main>` on Enter.
    - Header navigation links are keyboard-traversable and sequentially focusable.

### Gate 5: Production Build Integrity (`pnpm build`)

- **Execution Command**: `pnpm build`
- **Underlying Engines**: Next.js 15+ (App Router), Sanity CLI
- **Pass Criteria**:
  - Successful SSG (Static Site Generation) compilation of all routes:
    - Dynamic parameter generation via `generateStaticParams` for products and careers.
    - Ingestion and embedding of JSON-LD structured data scripts in generated HTML.
    - Production bundle optimization with shared vendor chunking under budget thresholds.
  - Successful Sanity Studio bundle compilation without module resolution failures.

---

## 3. Local Developer Workflow

Before submitting a Pull Request, developers must run the full quality gate pipeline locally:

```bash
# 1. Lint & Code Style
pnpm lint

# 2. Type Checking
pnpm typecheck

# 3. Unit & Integration Tests
pnpm test

# 4. End-to-End & Accessibility Tests
pnpm test:e2e

# 5. Production Build
pnpm build
```

Alternatively, to run the entire verification suite in a single command:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build
```

---

## 4. Continuous Integration (CI) Workflow

The automated GitHub Actions workflow (`.github/workflows/ci.yml`) executes these gates in optimized stages with Turborepo caching:

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Gate 1 - Linting
        run: pnpm lint

      - name: Gate 2 - Type Checking
        run: pnpm typecheck

      - name: Gate 3 - Unit & Integration Tests
        run: pnpm test

      - name: Gate 4 - E2E & Accessibility Tests
        run: pnpm test:e2e

      - name: Gate 5 - Production Build
        run: pnpm build
```

---

## 5. Architectural Compliance Checklist

| Area              | Mandate                                                                                                                                    | Verified In                                                                |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| **SEO**           | Next.js Metadata API, dynamic `sitemap.xml`, `robots.txt`, canonical URLs, JSON-LD (`Organization`, `WebSite`, `Product`, `JobPosting`)    | `apps/web/tests/seo.test.ts`, `tests/e2e/navigation.spec.ts`               |
| **Performance**   | Server Components first, minimal client JS, Google Fonts font-display swap, lazy image loading, optimized video preload                    | `next build` route stats, `tests/media-architecture.test.ts`               |
| **Accessibility** | Semantic HTML, skip link `#main-content`, reduced-motion CSS & hooks, heading hierarchy, 0 axe-core critical/serious violations            | `apps/web/tests/e2e/accessibility.spec.ts`                                 |
| **Security**      | Security headers (CSP/HSTS/Frame-Options), secret isolation with `server-only`, HMAC webhook validation with timing safety & replay window | `apps/web/tests/security.test.ts`                                          |
| **Resilience**    | CMS repositories implement robust fallback/offline mock providers and Zod boundary validation                                              | `apps/web/tests/repositories.test.ts`, `apps/web/tests/validation.test.ts` |
