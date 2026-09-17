'use client';

import { useEffect } from 'react';

/**
 * Site route-group error boundary.
 *
 * Catches runtime rendering errors within the (site) group without breaking the root layout.
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
interface SiteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SiteError({ error, reset }: SiteErrorProps) {
  useEffect(() => {
    console.error('[SiteErrorBoundary]', error);
  }, [error]);

  return (
    <main role="alert">
      <h1>Unable to load page</h1>
      <p>An error occurred while loading this section.</p>
      {process.env['NODE_ENV'] === 'development' && <pre>{error.message}</pre>}
      <button onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
