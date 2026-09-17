'use client';

import { useEffect } from 'react';

/**
 * Root error boundary.
 *
 * Catches runtime errors in the application and displays a fallback UI.
 *
 * 'use client' is required — Error boundaries must be Client Components.
 *
 * TODO(monitoring): Report errors to Sentry via Sentry.captureException(error).
 * TODO(design): Implement branded error UI.
 */
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // TODO(monitoring): Sentry.captureException(error);
    console.error('[ErrorBoundary]', error);
  }, [error]);

  return (
    <main>
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred. Please try again.</p>
      {process.env['NODE_ENV'] === 'development' && (
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{error.message}</pre>
      )}
      <button onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
