'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/routes';

interface CareerErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Career section error boundary.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function CareerError({ error, reset }: CareerErrorProps) {
  useEffect(() => {
    console.error('[CareerErrorBoundary]', error);
  }, [error]);

  return (
    <main role="alert">
      <h1>Unable to load career opportunities</h1>
      <p>A problem occurred while retrieving job listings.</p>
      <button onClick={reset} type="button">
        Try again
      </button>
      <div>
        <Link href={routes.home()}>Return to home</Link>
      </div>
    </main>
  );
}
