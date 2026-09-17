import type { NextConfig } from 'next';

/**
 * Next.js configuration for the Prixtara web application.
 *
 * Architecture notes:
 *   - transpilePackages: All @prixtara/* packages use TypeScript source
 *     directly. Next.js (webpack/turbopack) handles compilation.
 *   - images.remotePatterns: Restricts external image sources to Sanity CDN.
 *
 * TODO(monitoring): Wrap config with withSentryConfig from @sentry/nextjs.
 * TODO(cms): Narrow Sanity CDN remotePattern to specific project pathname.
 */
const nextConfig: NextConfig = {
  // All internal @prixtara/* packages export TypeScript source — Next.js
  // must transpile them. Add new packages here as they are created.
  transpilePackages: [
    '@prixtara/analytics',
    '@prixtara/cms',
    '@prixtara/config',
    '@prixtara/media',
    '@prixtara/seo',
    '@prixtara/types',
    '@prixtara/ui',
    '@prixtara/utils',
    '@prixtara/validation',
  ],

  images: {
    remotePatterns: [
      {
        // Sanity CDN — all project image assets
        // TODO(cms): Narrow pathname to /images/{projectId}/** once project ID is set
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Enforce strict mode for React (highlights potential issues early)
  reactStrictMode: true,

  // Output for Vercel deployment (default, no change needed)
  // output: 'standalone', // Uncomment only if deploying in Docker

  // Disable X-Powered-By header for information disclosure protection
  poweredByHeader: false,

  // HTTP Security Headers (OWASP recommendations)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ];
  },

  // Experimental features
  experimental: {
    // TODO(monitoring): typedRoutes: true, — enable after all routes are defined
    // TODO(cms): ppr: true, — enable Partial Prerendering when ready
  },
};

export default nextConfig;
