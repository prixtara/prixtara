'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/routes';

interface AboutErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * About section error boundary.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function AboutError({ error, reset }: AboutErrorProps) {
  useEffect(() => {
    console.error('[AboutErrorBoundary]', error);
  }, [error]);

  return (
    <main role="alert">
      <h1>Unable to load about content</h1>
      <p>A problem occurred while retrieving company information.</p>
      <button onClick={reset} type="button">
        Try again
      </button>
      <div>
        <Link href={routes.home()}>Return to home</Link>
      </div>
    </main>
  );
}
