/**
 * @prixtara/config
 *
 * Runtime configuration with strict server/client isolation.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  Import path            │ Safe context                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │  @prixtara/config       │ Anywhere (client-safe vars only)      │
 * │  @prixtara/config/client│ Anywhere (same as above, explicit)    │
 * │  @prixtara/config/server│ Server only (protected by server-only)│
 * └─────────────────────────────────────────────────────────────────┘
 *
 * The default export exposes ONLY client-safe (NEXT_PUBLIC_*) variables
 * and design system tokens.
 * Server-side secrets are NEVER re-exported from this barrel.
 */
export { clientEnv } from './env.client';
export * from './tokens';
