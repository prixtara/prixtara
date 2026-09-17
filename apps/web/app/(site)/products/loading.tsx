/**
 * Products listing loading placeholder shell.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function ProductsLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <h1>Our Products</h1>
      <p>Loading products catalog...</p>
    </main>
  );
}
