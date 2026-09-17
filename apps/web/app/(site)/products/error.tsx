'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/routes';

interface ProductsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Products section error boundary.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function ProductsError({ error, reset }: ProductsErrorProps) {
  useEffect(() => {
    console.error('[ProductsErrorBoundary]', error);
  }, [error]);

  return (
    <main role="alert">
      <h1>Unable to load products</h1>
      <p>A problem occurred while retrieving our product catalog.</p>
      <button onClick={reset} type="button">
        Try again
      </button>
      <div>
        <Link href={routes.home()}>Return to home</Link>
      </div>
    </main>
  );
}
