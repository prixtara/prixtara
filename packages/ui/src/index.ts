/**
 * @prixtara/ui
 *
 * Shared React component library.
 *
 * Architecture rules:
 *   - Components are purely presentational — no data fetching inside components
 *   - Data fetching happens in lib/ (server) or hooks/ (client)
 *   - Add 'use client' only when browser APIs or React hooks are required
 *   - Server Components by default
 *   - Use composition over large monolithic components
 *
 * TODO(design): This package will be populated with production components
 * during the visual design phase. The current exports are architecture stubs.
 */
export { Placeholder } from './components/placeholder';
export * from './components/composition';
export * from './accessibility';
