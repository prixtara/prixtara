# Prixtara — Contributing Guide

## Prerequisites

- Node.js >= 20 (v24 recommended)
- pnpm >= 10 (v12 recommended)
- Git

```bash
node --version   # >= 20.0.0
pnpm --version   # >= 10.0.0
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/prixtara/prixtara.git
cd prixtara

# 2. Copy environment variables
cp .env.example .env.local

# 3. Fill in your .env.local values
# See .env.example for documentation on each variable

# 4. Install dependencies
pnpm install

# 5. Start development servers
pnpm dev
```

---

## Development Commands

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `pnpm dev`          | Start all apps in development mode (parallel) |
| `pnpm build`        | Build all apps and packages                   |
| `pnpm lint`         | Run ESLint across the entire monorepo         |
| `pnpm typecheck`    | Run TypeScript type checking                  |
| `pnpm test`         | Run unit tests (Vitest)                       |
| `pnpm format`       | Format all files with Prettier                |
| `pnpm format:check` | Check formatting without writing              |
| `pnpm clean`        | Remove all build outputs and turbo cache      |

### Running specific apps

```bash
# Only the Next.js web app
pnpm --filter web dev

# Only Sanity Studio
pnpm --filter studio dev

# Build only a specific package
pnpm --filter @prixtara/cms typecheck
```

---

## Code Conventions

### TypeScript

- **Strict mode is non-negotiable.** `"strict": true` in all tsconfigs.
- **Never use `any`.** If you need to escape the type system, use `unknown` and narrow.
- **Prefer explicit return types** on exported functions for documentation clarity.
- Use `type` imports for type-only imports: `import type { Foo } from './foo'`

```typescript
// ✅ Good
export function getProduct(slug: ProductSlug): Promise<CmsProduct | null> {
  return getProductBySlug(slug);
}

// ❌ Bad
export async function getProduct(slug: any) {
  return getProductBySlug(slug);
}
```

### React / Next.js

- **Server Components by default.** Add `'use client'` only when you need:
  - Browser APIs (`window`, `document`, `localStorage`)
  - React hooks (`useState`, `useEffect`, `useRef`)
  - Event handlers that modify state
- **No business logic in page JSX.** Call functions from `lib/` and pass results as props.
- **No data fetching in components.** Fetch in Server Components or route handlers, pass as props.

```typescript
// ✅ Good — Server Component, data fetched outside JSX
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug as ProductSlug);
  if (!product) notFound();
  return <ProductView product={product} />;
}

// ❌ Bad — fetching inside JSX
export default function ProductPage({ slug }: { slug: string }) {
  const [product, setProduct] = useState(null);
  useEffect(() => { fetchProduct(slug).then(setProduct); }, [slug]);
  return <div>{product?.name}</div>;
}
```

### Package Boundaries

| ❌ Never                                                    | ✅ Instead                                             |
| ----------------------------------------------------------- | ------------------------------------------------------ |
| Import `@sanity/client` directly in a page                  | Import from `@prixtara/cms`                            |
| Import from `@prixtara/config/server` in a Client Component | Use `@prixtara/config/client`                          |
| Write GROQ queries in `apps/web`                            | Add queries to `packages/cms/src/queries/`             |
| Access `process.env` directly in application code           | Use `serverEnv` or `clientEnv` from `@prixtara/config` |

### Naming

- **Files**: `kebab-case.ts` for non-components, `PascalCase.tsx` for React components
- **Components**: PascalCase (`ProductCard`, `HeroSection`)
- **Functions**: camelCase (`getProductBySlug`, `buildMetadata`)
- **Types/Interfaces**: PascalCase (`CmsProduct`, `JobOpening`)
- **Constants**: SCREAMING_SNAKE_CASE (`PRODUCT_SLUGS`, `MAX_RETRY_COUNT`)
- **CSS classes**: Follow Tailwind conventions; use `cn()` from `@prixtara/utils`

### Git Conventions

Follow Conventional Commits:

```
feat: add product detail page
fix: resolve CMS client singleton issue
docs: update contributing guide
chore: upgrade Next.js to 15.x
refactor: extract product data fetching to lib/
test: add unit tests for cn utility
```

Commit prefixes: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `ci`

---

## Adding a New Package

1. Create `packages/your-package/` with `package.json`, `tsconfig.json`, and `src/index.ts`
2. Name it `@prixtara/your-package`
3. Add `typecheck` and `lint` scripts
4. Add `@prixtara/tsconfig` as devDependency
5. Add to `transpilePackages` in `apps/web/next.config.ts` if consumed by Next.js
6. Document the package boundary in `docs/architecture.md`

---

## Adding a New Route

1. Create `app/(site)/your-route/page.tsx` in `apps/web`
2. Create a corresponding `lib/your-data.ts` for data fetching
3. Add GROQ query to `packages/cms/src/queries/your-query.ts`
4. Add the route to `app/sitemap.ts`
5. Add metadata via `export const metadata: Metadata = { ... }`

---

## Environment Variables

1. Add new variable to `.env.example` with a descriptive comment
2. Add to the appropriate Zod schema in `packages/validation/src/env.ts`
3. Access via `serverEnv` or `clientEnv` from `@prixtara/config`
4. **Never** read `process.env` directly in application code

---

## Linting and Formatting

The project uses ESLint 9 (flat config) and Prettier. Both run in CI.

```bash
pnpm lint          # Check for lint errors
pnpm format        # Auto-fix formatting
pnpm format:check  # Check formatting in CI
```

Pre-commit hook (optional, install with Husky):

```bash
pnpm add -D husky lint-staged -w
```

---

## Testing Strategy

| Level     | Tool                            | Location                   | When             |
| --------- | ------------------------------- | -------------------------- | ---------------- |
| Unit      | Vitest                          | `apps/web/tests/*.test.ts` | Always           |
| Component | Vitest + @testing-library/react | `apps/web/tests/`          | TODO             |
| E2E       | Playwright                      | `apps/web/tests/e2e/`      | On merge to main |

```bash
pnpm test           # Unit tests (all packages)
pnpm test:e2e       # E2E tests (requires running dev server)
```

---

## CI Pipeline

All pull requests must pass:

1. **Install** — `pnpm install --frozen-lockfile`
2. **Lint** — `pnpm lint`
3. **Typecheck** — `pnpm typecheck`
4. **Test** — `pnpm test`
5. **Build** — `pnpm build --filter=!studio` (studio excluded — requires credentials)

See `.github/workflows/ci.yml` for the full pipeline definition.
