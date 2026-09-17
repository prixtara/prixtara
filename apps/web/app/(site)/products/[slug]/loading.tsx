/**
 * Product detail page loading placeholder shell.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function ProductDetailLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <article role="status">
        <p>Loading product details...</p>
      </article>
    </main>
  );
}
