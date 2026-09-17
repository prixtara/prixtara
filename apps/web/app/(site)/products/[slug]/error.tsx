'use client';

import { useEffect } from 'react';

/**
 * Product detail route error boundary.
 *
 * Catches runtime errors during product detail page execution without breaking the site shell.
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
interface ProductDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductDetailError({ error, reset }: ProductDetailErrorProps) {
  useEffect(() => {
    console.error('[ProductDetailError]', error);
  }, [error]);

  return (
    <main role="alert">
      <h1>Unable to load product</h1>
      <p>An error occurred while loading this product specification.</p>
      {process.env['NODE_ENV'] === 'development' && <pre>{error.message}</pre>}
      <button onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
