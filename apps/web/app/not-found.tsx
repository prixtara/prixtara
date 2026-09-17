import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

/**
 * 404 Not Found page.
 *
 * TODO(design): Implement branded 404 page with navigation back to home.
 */
export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1}>
      <h1>404 — Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Return to homepage</Link>
    </main>
  );
}
