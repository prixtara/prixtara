/**
 * Careers listing loading placeholder shell.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function CareerLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <h1>Careers at Prixtara</h1>
      <p>Loading open positions...</p>
    </main>
  );
}
