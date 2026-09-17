/**
 * Root loading placeholder shell.
 *
 * Rendered by React Suspense when route transitions or initial page generation are pending.
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function RootLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <p>Loading application...</p>
    </main>
  );
}
