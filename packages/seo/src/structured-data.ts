/**
 * JSON-LD structured data helpers.
 *
 * These functions return script tag content for embedding structured
 * data using the <script type="application/ld+json"> pattern.
 *
 * Usage:
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
 *   />
 *
 * TODO(seo): Add ProductSchema for each product page.
 * TODO(seo): Add BreadcrumbSchema for nested routes.
 * TODO(seo): Add FAQSchema when FAQ content is authored in CMS.
 */

interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  description?: string;
}

/**
 * Returns the Organization schema for Prixtara Technologies.
 * Embed this in the root layout for site-wide rich results.
 *
 * TODO(seo): Populate logo URL when brand assets are finalised.
 * TODO(seo): Add sameAs links for social media profiles.
 */
export function getOrganizationSchema(siteUrl?: string): OrganizationSchema {
  const url = siteUrl ?? process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prixtara Technologies',
    url,
    description:
      'Prixtara Technologies builds advanced deep-tech solutions including AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / Indian Sign Language technology.',
    // TODO(seo): logo: `${url}/logo.png`,
    // TODO(seo): sameAs: ['https://linkedin.com/company/prixtara', ...],
  };
}

interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
}

export function getWebsiteSchema(siteUrl?: string): WebsiteSchema {
  const url = siteUrl ?? process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prixtara Technologies',
    url,
  };
}
