'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/routes';

interface VisionErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Vision section error boundary.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function VisionError({ error, reset }: VisionErrorProps) {
  useEffect(() => {
    console.error('[VisionErrorBoundary]', error);
  }, [error]);

  return (
    <main role="alert">
      <h1>Unable to load vision statement</h1>
      <p>A problem occurred while retrieving vision content.</p>
      <button onClick={reset} type="button">
        Try again
      </button>
      <div>
        <Link href={routes.home()}>Return to home</Link>
      </div>
    </main>
  );
}
