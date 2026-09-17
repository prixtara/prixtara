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

| Tag              | Target                                    | Trigger                                        |
| ---------------- | ----------------------------------------- | ---------------------------------------------- |
| `site-settings`  | Site settings, global SEO, contacts, logo | Any change to siteSettings document            |
| `navigation`     | Header and footer navigation menus        | Navigation structure or siteSettings edits     |
| `homepage`       | Modular homepage & product showcase       | Homepage edits or changes to featured products |
| `products`       | All product catalog listing pages         | Any product added, updated, or deleted         |
| `product:[slug]` | Single product detail page                | Updates to that specific product doc           |
| `vision`         | Vision marketing page                     | Updates to visionPage document                 |
| `about`          | About marketing page                      | Updates to aboutPage document                  |
| `careers`        | All career listing and overview pages     | Career page updates or job status changes      |
| `jobs`           | Active job postings list                  | Any jobPosting published, modified, or deleted |
| `job:[slug]`     | Single job opening page                   | Updates to that specific jobPosting doc        |

---

## Sanity CMS Architecture & Integration

### Client Architecture

The CMS connection layer is strictly bifurcated to ensure zero secret leakage:

1. **Server-Only Client (`@prixtara/cms/client`)**:
   - Guarded by `import 'server-only'`.
   - Used in Server Components, API routes, and Server Actions.
   - Configured with `perspective: 'published'` and CDN enabled in production.
   - Can transition to `perspective: 'previewDrafts'` using `SANITY_API_TOKEN` when Draft Mode is active.
   - Attaches Next.js fetch cache options (`next: { tags, revalidate }`).

2. **Browser-Safe Client (`@prixtara/cms/client/browser`)**:
   - Zero `server-only` imports.
   - Consumes strictly public configuration (`NEXT_PUBLIC_SANITY_*`).
   - Read-only, `perspective: 'published'`, CDN enabled.
   - Used only where client-side interactivity is strictly required (e.g. image URL generation).

### GROQ Query Layer & Draft Isolation

All GROQ queries enforce strict draft isolation to guarantee that unpublished CMS drafts never appear on production pages:

- Every query includes the filter: `!(_id in path("drafts.**"))`.
- Job queries additionally enforce: `published == true`.
- Combined with client `perspective: 'published'`, this establishes triple-layer defense against draft data leakage.

Supported document queries:

- `siteSettings`: `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]` (tag: `site-settings`)
- `navigation`: `*[_type == "navigation" && !(_id in path("drafts.**"))][0]` (tag: `navigation`)
- `homepage`: `*[_type == "homepage" && !(_id in path("drafts.**"))][0]` (tag: `homepage`)
- `products`: `*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt asc)` (tag: `products`)
- `productBySlug`: `*[_type == "product" && !(_id in path("drafts.**")) && slug.current == $slug][0]` (tags: `products`, `product:{slug}`)
- `vision`: `*[_type == "visionPage" && !(_id in path("drafts.**"))][0]` (tag: `vision`)
- `about`: `*[_type == "aboutPage" && !(_id in path("drafts.**"))][0]` (tag: `about`)
- `careers`: `*[_type == "careerPage" && !(_id in path("drafts.**"))][0]` (tag: `careers`)
- `jobs`: `*[_type == "jobPosting" && !(_id in path("drafts.**")) && published == true]` (tags: `jobs`, `careers`)
- `jobBySlug`: `*[_type == "jobPosting" && !(_id in path("drafts.**")) && published == true && slug.current == $slug][0]` (tags: `jobs`, `job:{slug}`)

### Repository Architecture & Presentation Decoupling

The presentation layer never interacts with raw GROQ responses or Sanity SDK instances:

```
┌──────────────────────────────────────┐
│  page.tsx (Server Component)         │
└──────────────────┬───────────────────┘
                   │ Calls cached data fetcher
┌──────────────────▼───────────────────┐
│  lib/server/data (React cache())     │
└──────────────────┬───────────────────┘
                   │ Invokes repository interface
┌──────────────────▼───────────────────┐
│  lib/server/repositories             │
│  - SanityProductRepository           │
│  - SanityPageRepository              │
│  - SanityCareerRepository            │
│  - SanityNavigationRepository        │
└──────────────────┬───────────────────┘
                   │ Executes GROQ via @prixtara/cms
┌──────────────────▼───────────────────┐
│  @prixtara/cms (Query & Normalizer)  │
│  - Boundary validation (Zod)         │
│  - Domain transformation             │
└──────────────────┬───────────────────┘
                   │ Returns NormalizedDomainModel
┌──────────────────▼───────────────────┐
│  page.tsx (Renders Semantic HTML)    │
└──────────────────────────────────────┘
```

Implementations:

- `SanityProductRepository`: Implements `ProductRepository`. Fetches, validates, and normalizes products. Falls back to verified seed products if CMS is unreachable or unseeded.
- `SanityPageRepository`: Implements `PageRepository`. Manages marketing pages (`about`, `vision`).
- `SanityCareerRepository`: Implements `CareerRepository`. Manages job postings and careers overview.
- `SanityNavigationRepository`: Implements `NavigationRepository`. Normalizes primary and footer navigation menus from CMS with fallback to static configurations.

### CMS Webhook & On-Demand Revalidation Architecture

Content updates in Sanity trigger instant on-demand cache invalidation via secure webhooks:

```
Sanity Content Lake Mutation
     │
     ▼
Webhook POST /api/webhook/sanity & /api/revalidate
     │ (Header: `sanity-webhook-signature: t=<timestamp>,v1=<signature>`)
     ▼
Security Verification
     ├─ Parse timestamp `t` and signature `v1`
     ├─ Reject if timestamp > 5 minutes old (replay protection)
     ├─ Compute HMAC-SHA256 of `${timestamp}.${rawBody}` using SANITY_WEBHOOK_SECRET
     └─ Constant-time comparison via crypto.timingSafeEqual (anti-timing attacks)
     │
     ▼
Document Type & Slug Mapping
     ├─ 'product'    → revalidateTag('products', 'homepage', 'product:' + slug)
     │                 revalidatePath('/products', '/products/' + slug, '/')
     ├─ 'jobPosting' → revalidateTag('jobs', 'careers', 'job:' + slug)
     │                 revalidatePath('/career', '/career/' + slug)
     ├─ 'homepage'   → revalidateTag('homepage'), revalidatePath('/')
     ├─ 'visionPage' → revalidateTag('vision'), revalidatePath('/vision')
     ├─ 'aboutPage'  → revalidateTag('about'), revalidatePath('/about')
     └─ 'navigation' → revalidateTag('navigation'), revalidatePath('/')
     │
     ▼
Fresh Content Served on Next Request (sub-50ms TTFB)
```

### Static Optimization & 404 Behavior

1. **Static Pre-generation (`generateStaticParams`)**:
   - Pre-builds known paths at build time for `/products/[slug]` and `/career/[slug]`.
   - Employs lightweight slug queries (`allProductSlugsQuery`, `allJobOpeningSlugsQuery`) to avoid pulling full document payloads during build.
2. **On-Demand ISR (`dynamicParams = true`)**:
   - Allows newly published products or jobs to render on-demand upon first visit and cache immediately.
   - Combined with fallback `revalidate = 3600` TTL for background freshness insurance.
3. **Deleted / Unpublished Document Handling**:
   - When a product is deleted or unpublished in Sanity, repository queries return `null`.
   - The page component detects `!product` and immediately triggers `notFound()`.
   - Renders `not-found.tsx` with HTTP 404 status and `robots: { index: false, follow: false }` metadata.

### Typed Loading and Error States

Under the strict **Visual Freeze**, all loading and error states are implemented as semantic, accessible HTML shells:

- `loading.tsx`: `<main aria-busy="true" aria-live="polite"><article role="status">` placeholder shell.
- `error.tsx`: `'use client'` error boundary catching rendering exceptions, logging digest IDs, and presenting an accessible retry `<button onClick={reset}>`.
- Granular coverage: Present at site group level, catalog level, and individual detail route level (`/products/[slug]` and `/career/[slug]`).

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
