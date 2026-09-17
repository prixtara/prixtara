import type { Metadata } from 'next';
import Link from 'next/link';
import { routes } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

/**
 * Site route-group not-found page.
 *
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function SiteNotFound() {
  return (
    <main>
      <h1>Page Not Found</h1>
      <p>The requested page does not exist or has been moved.</p>
      <Link href={routes.home()}>Return to homepage</Link>
    </main>
  );
}
