import Link from 'next/link';
import { routes } from '@/lib/routes';

/**
 * Career detail not-found page shell.
 *
 * Rendered when a job opening slug is not found.
 * Architectural freeze: Semantic placeholder shell only — no visual styling or animations.
 */
export default function CareerNotFound() {
  return (
    <main>
      <h1>Position Not Found</h1>
      <p>This job opening is no longer active or does not exist.</p>
      <Link href={routes.career()}>View all open positions</Link>
    </main>
  );
}
