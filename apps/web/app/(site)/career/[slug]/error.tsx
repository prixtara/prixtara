'use client';

import { useEffect } from 'react';

/**
 * Job posting detail route error boundary.
 *
 * Catches runtime errors during role detail page execution.
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
interface CareerDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CareerDetailError({ error, reset }: CareerDetailErrorProps) {
  useEffect(() => {
    console.error('[CareerDetailError]', error);
  }, [error]);

  return (
    <main role="alert">
      <h1>Unable to load position</h1>
      <p>An error occurred while loading this position overview.</p>
      {process.env['NODE_ENV'] === 'development' && <pre>{error.message}</pre>}
      <button onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
