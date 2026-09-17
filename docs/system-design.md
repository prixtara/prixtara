# Prixtara — System Design

## Request Lifecycle

The application enforces a unidirectional data flow and strict architectural separation across the entire request lifecycle:

```
Visitor (Browser)
     │
     │ 1. HTTP GET /products/[slug]
     ▼
Vercel Edge Network (CDN)
     │
     │ 2. Edge cache evaluation (HIT -> instant response, MISS -> proceed to origin)
     ▼
Next.js Route Dispatcher (App Router)
     │
     │ 3. Match route group `(site)` and dynamic segment `[slug]`
     ▼
Server Component (`page.tsx`)
     │
     │ 4. Invokes server data access facade (apps/web/lib/server)
     ▼
Application Query Layer & Repository (`lib/server/repositories`)
     │
     │ 5. Evaluates React cache() memoization & calls ProductRepository
     ▼
CMS Data Access Layer (`@prixtara/cms`)
     │
     │ 6. GROQ query dispatched to Sanity CDN / Content Lake
     ▼
Normalized Domain Content (`lib/server/models`)
     │
     │ 7. Raw CMS response validated and transformed into CMS-agnostic NormalizedProduct
     ▼
Page Composition & Rendering
     │
     │ 8. Server Component renders semantic HTML shell with normalized props
     ▼
SEO Metadata Generation (`lib/server/seo` + `@prixtara/seo`)
     │
     │ 9. generateMetadata() builds canonical tags, OpenGraph, and title templates
     ▼
Edge Response & Client Hydration
     │
     │ 10. Next.js streams HTML response to CDN; CDN caches output; browser hydrates
     ▼
Visitor (Browser Receives Fast, Complete HTML)
```

### Detailed Lifecycle Stages

1. **Visitor Request**: A user or web crawler issues an HTTP GET request for a URL path.
2. **CDN / Edge Network**: Vercel Edge examines cache headers. If a cached static or ISR version is present and fresh, it is served immediately (<50ms TTFB). If stale, it serves stale while triggering background revalidation. If absent, the request forwards to origin.
3. **Next.js Route**: The App Router resolves the request through route groups `(site)` to the matching `page.tsx` within the server runtime.
4. **Server Component**: The page component executes as a React Server Component. It receives route `params` as a Promise and passes the requested slug to the application query layer.
5. **Application Query Layer**: `apps/web/lib/server` provides request-memoized query functions (`getAllProducts`, `getProductBySlug`) using React `cache()`. Duplicate calls within the same render pass (e.g. from `generateMetadata` and `ProductPage`) are automatically deduplicated.
6. **CMS Query Layer**: The repository implementation (`CmsProductRepository`) invokes `@prixtara/cms`, keeping all GROQ queries and `@sanity/client` details encapsulated within the CMS package.
7. **Content Normalization**: Raw CMS documents are validated against schemas and normalized into clean, CMS-agnostic domain models (`NormalizedProduct`, `NormalizedJobOpening`, `NormalizedPage`).
8. **Page Composition**: The React Server Component receives normalized props and renders the JSX tree. No business logic or database queries exist inside this presentation layer.
9. **Metadata Generation**: In parallel or sequentially, `generateMetadata()` executes, utilizing `@prixtara/seo` helpers to build canonical links, OpenGraph cards, and schema tags.
10. **Response & Edge Caching**: Next.js streams the combined HTML payload with appropriate `Cache-Control` and `x-nextjs-cache` tags to the CDN, which caches the response for subsequent visitors.

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

The system utilizes a 4-tier caching architecture designed for sub-millisecond edge delivery, maximum cache hit ratios, and near-zero database/CMS read costs:

```
┌────────────────────────────────────────────────────────┐
│ 1. CDN Edge Cache (Vercel Edge Network)                │
│    - Serves cached static HTML & assets from edge PoPs │
│    - Stale-While-Revalidate header support             │
└──────────────────────────┬─────────────────────────────┘
                           │ Edge Miss / Revalidation
┌──────────────────────────▼─────────────────────────────┐
│ 2. Next.js Data Cache (Server File System / KV)        │
│    - Tagged fetch cache (revalidateTag)                │
│    - Granular invalidation by entity tag               │
└──────────────────────────┬─────────────────────────────┘
                           │ Render Pass
┌──────────────────────────▼─────────────────────────────┐
│ 3. React Request Memoization (cache())                 │
│    - In-memory per-request deduplication               │
│    - Shares queries between page, layout, and metadata │
└──────────────────────────┬─────────────────────────────┘
                           │ Query Cache Miss
┌──────────────────────────▼─────────────────────────────┐
│ 4. CMS CDN Cache (Sanity API CDN)                      │
│    - Globally distributed edge cache for GROQ queries  │
│    - Only mutated documents hit origin Sanity store    │
└────────────────────────────────────────────────────────┘
```

### Cache Tags Registry

| Tag              | Target                            | Trigger                                |
| ---------------- | --------------------------------- | -------------------------------------- |
| `products`       | All product catalog listing pages | Any product added, updated, or deleted |
| `product:[slug]` | Single product detail page        | Updates to that specific product doc   |
| `careers`        | All career listing pages          | Any job posting added or status change |
| `career:[slug]`  | Single job opening page           | Updates to that specific job doc       |
| `pages`          | Marketing pages (about, vision)   | Marketing page content edits in CMS    |
| `navigation`     | Navigation menus (header/footer)  | Site menu structure updates            |

---

## Route Classification Matrix

To maximize reliability and CDN cache-hit rates, **unnecessary dynamic rendering is strictly prohibited**. Dynamic rendering is reserved exclusively for uncacheable operational endpoints (such as real-time health checks).

| Route              | Rendering Strategy           | Revalidation Model           | Pre-rendered at Build? | Justification                                                   |
| ------------------ | ---------------------------- | ---------------------------- | ---------------------- | --------------------------------------------------------------- |
| `/`                | **Static (SSG)**             | On-demand via CMS webhook    | Yes                    | High-traffic landing page; zero dynamic user state.             |
| `/about`           | **Static (SSG)**             | On-demand via CMS webhook    | Yes                    | Corporate mission copy changes infrequently.                    |
| `/vision`          | **Static (SSG)**             | On-demand via CMS webhook    | Yes                    | Strategic vision copy; purely static.                           |
| `/products`        | **ISR** (`revalidate: 3600`) | Hourly TTL + CMS Webhook Tag | Yes                    | Catalog changes as new products are introduced.                 |
| `/products/[slug]` | **ISR** (`revalidate: 3600`) | Hourly TTL + CMS Webhook Tag | Yes (known slugs)      | Scalable [slug] architecture; unknown slugs generate on-demand. |
| `/career`          | **ISR** (`revalidate: 3600`) | Hourly TTL + CMS Webhook Tag | Yes                    | Position listings updated by talent team in CMS.                |
| `/career/[slug]`   | **ISR** (`revalidate: 3600`) | Hourly TTL + CMS Webhook Tag | Yes (active openings)  | Individual job postings scale dynamically.                      |
| `/sitemap.xml`     | **ISR** (`revalidate: 3600`) | Hourly TTL                   | Yes                    | XML sitemap reflecting all published routes.                    |
| `/robots.txt`      | **Static (SSG)**             | Manual redeploy              | Yes                    | Static crawler instructions.                                    |
| `/api/health`      | **Dynamic (SSR)**            | `no-store` (0s cache)        | No                     | Real-time infrastructure uptime verification; must never cache. |

---

## Architectural Separation of Concerns

The codebase enforces strict isolation between presentation, business rules, data access, and infrastructure:

1. **Page Composition (`apps/web/app/(site)/**/page.tsx`)**:
   - Pure React Server Components.
   - Responsible solely for layout assembly and passing normalized domain data to UI components.
   - Never contains GROQ queries, `@sanity/client` calls, or raw API logic.

2. **Content Retrieval & Repositories (`apps/web/lib/server/repositories/`)**:
   - Encapsulated behind domain interfaces (`ProductRepository`, `PageRepository`, `CareerRepository`, `NavigationRepository`).
   - Insulates the application from CMS vendor lock-in. Switching CMS backends requires modifying only the repository adapter without touching page components.

3. **Domain Normalization (`apps/web/lib/server/models/`)**:
   - Defines clean, CMS-agnostic interfaces (`NormalizedProduct`, `NormalizedJobOpening`, etc.).
   - Prevents Sanity-specific fields (like `_rev`, `_type`, `sanity.imageAsset`) from leaking into frontend components.

4. **Business Logic & Query Layer (`apps/web/lib/server/data/`)**:
   - Houses slug parsing, active job opening filters, sorting algorithms, and React `cache()` memoization wrappers.

5. **SEO Metadata (`apps/web/lib/server/seo/` + `@prixtara/seo`)**:
   - Dedicated metadata builders that map normalized entities to OpenGraph, Twitter card, canonical tags, and structured JSON-LD schemas.

6. **Media Handling (`@prixtara/media`)**:
   - Centralizes image URL builders, responsive srcSet calculations, hotspot cropping, and video poster resolution. Components never construct asset URLs manually.

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
