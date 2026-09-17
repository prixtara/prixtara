/**
 * Job posting detail page loading placeholder shell.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function CareerDetailLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <article role="status">
        <p>Loading role details...</p>
      </article>
    </main>
  );
}
