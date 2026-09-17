# Prixtara — System Design

## Request Flow

### Standard Page Request (SSR / SSG)

```
User Browser
     │
     │  HTTP GET /products/ai-vision-defect-detection
     ▼
Vercel Edge Network (CDN / Edge cache)
     │
     │  Cache miss or dynamic route
     ▼
Next.js Server (Node.js runtime)
     │
     ├─ app/(site)/products/[slug]/page.tsx  ← Server Component
     │        │
     │        ▼
     │  apps/web/lib/products.ts             ← Data access layer
     │        │
     │        ▼
     │  @prixtara/cms/src/queries/products.ts ← GROQ query
     │        │
     │        ▼
     │  @sanity/client → Sanity CDN / API
     │        │
     │        ▼
     │  Raw CMS data (validated by Zod schemas)
     │        │
     │        ▼
     │  Typed product data → props
     │        │
     │        ▼
     │  React Server Component → HTML string
     │
     ▼
Vercel Edge (cache the HTML response)
     │
     ▼
User Browser (receives HTML, hydrates)
```

### Client-Side Interaction

```
User interaction (click, scroll, etc.)
     │
     ▼
React Client Component ('use client')
     │
     ├─ @prixtara/analytics — track event
     ├─ @prixtara/utils — UI helpers
     └─ @prixtara/ui — component state
```

### CMS Content Update (On-Demand ISR — Planned)

```
Content editor publishes in Sanity Studio
     │
     ▼
Sanity webhook HTTP POST to /api/revalidate
     │  (with SANITY_WEBHOOK_SECRET for verification)
     ▼
Next.js API route — verify signature, call revalidateTag()
     │
     ▼
Next.js purges cached pages for the affected tag
     │
     ▼
Next request regenerates the page from fresh CMS data
```

---

## System Boundaries

### External Systems

```
┌───────────────────────────────────────────────────────────┐
│                        BROWSER                            │
│  Next.js hydrated React app                               │
│  NEXT_PUBLIC_* env vars only — no secrets                 │
└───────────────┬───────────────────────────────────────────┘
                │ HTTPS
┌───────────────▼───────────────────────────────────────────┐
│                    VERCEL EDGE / CDN                       │
│  Static assets, edge caching, headers                     │
└───────────────┬───────────────────────────────────────────┘
                │
┌───────────────▼───────────────────────────────────────────┐
│                  NEXT.JS SERVER (NODE)                     │
│  Server Components, API routes, ISR revalidation          │
│  Has access to: server env vars, SANITY_API_TOKEN         │
│                                                           │
│  ┌──────────────────┐  ┌──────────────────────────────┐  │
│  │  @prixtara/cms   │  │  @prixtara/config/server     │  │
│  │  (GROQ queries)  │  │  (validated server env vars) │  │
│  └────────┬─────────┘  └──────────────────────────────┘  │
└───────────┼───────────────────────────────────────────────┘
            │ HTTPS + API token
┌───────────▼───────────────────────────────────────────────┐
│                     SANITY PLATFORM                        │
│  - Sanity API (authenticated reads/writes)                │
│  - Sanity CDN (public reads, cached)                      │
│  - Sanity Studio (editors — separate deploy)              │
└───────────────────────────────────────────────────────────┘
```

### Security Boundaries

| Boundary             | Enforced By               | Rule                                          |
| -------------------- | ------------------------- | --------------------------------------------- |
| Server secrets       | `server-only` npm package | Build error if imported in client             |
| Client vars          | `NEXT_PUBLIC_` prefix     | Explicit allowlist in config package          |
| CMS access           | Package boundary          | Only `@prixtara/cms` imports `@sanity/client` |
| Webhook verification | HMAC-SHA256               | `SANITY_WEBHOOK_SECRET` validates signature   |
| Image sources        | `next.config.ts`          | `remotePatterns` allowlist                    |

---

## Package Dependency Graph

```
@prixtara/tsconfig        (no deps)
@prixtara/eslint-config   (no internal deps)
@prixtara/types           (no internal deps)
     │
     ▼
@prixtara/validation ─────────────────────────────────────────┐
     │                                                        │
     ▼                                                        │
@prixtara/config ─────────────────────────────┐              │
     │                                        │              │
     ▼                                        ▼              │
@prixtara/utils   @prixtara/seo    @prixtara/cms              │
                       │                 │                    │
                       └────────┬────────┘                   │
                                ▼                            │
                           @prixtara/ui                      │
                                │                            │
                                ▼                            │
                           apps/web ◄──────────────────────┘
                                │
                           apps/studio
```

No circular dependencies exist.

---

## Caching Strategy

| Route type                   | Caching mechanism      | Revalidation    |
| ---------------------------- | ---------------------- | --------------- |
| Static pages (about, vision) | Full static generation | Manual redeploy |
| Product pages                | ISR with cache tags    | Sanity webhook  |
| Career pages                 | ISR with cache tags    | Sanity webhook  |
| Health check (`/api/health`) | No-store               | Always fresh    |
| Sitemap                      | Revalidate 3600s       | Time-based      |

---

## Observability (Planned)

```
apps/web
  │
  ├── @sentry/nextjs (TODO)
  │     ├── Client errors → Sentry
  │     ├── Server errors → Sentry
  │     └── Performance traces → Sentry
  │
  └── @prixtara/analytics
        └── User events → GA4 / PostHog (TODO)
```

---

## Scalability Considerations

- **Horizontal scale**: Vercel auto-scales — stateless request handling
- **CMS load**: Sanity CDN absorbs read traffic; API only used for mutations
- **Build time**: Turborepo remote caching (Vercel) keeps CI fast as codebase grows
- **Bundle size**: `transpilePackages` + tree-shaking keeps client bundle minimal
- **ISR**: Incremental Static Regeneration means CMS updates don't require full redeploys
