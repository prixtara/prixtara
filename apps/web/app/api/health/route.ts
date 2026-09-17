import { NextResponse } from 'next/server';

/**
 * Health check endpoint — GET /api/health
 *
 * Used by:
 *   - Vercel deployment health probes
 *   - Monitoring / uptime services
 *   - Load balancer readiness checks
 *
 * TODO(monitoring): Extend with dependency health checks:
 *   - Sanity CMS reachability
 *   - (Future) Database connectivity
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env['npm_package_version'] ?? 'unknown',
      environment: process.env['NODE_ENV'] ?? 'unknown',
      // TODO(monitoring): Add { sanity: 'ok' | 'error' } check
    },
    { status: 200 },
  );
}
