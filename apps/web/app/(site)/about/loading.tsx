/**
 * About page loading placeholder shell.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function AboutLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <h1>About Prixtara</h1>
      <p>Loading corporate background and engineering milestones...</p>
    </main>
  );
}
