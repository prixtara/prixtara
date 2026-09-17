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

export interface OrganizationSchema {
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
 */
export function getOrganizationSchema(siteUrl?: string): OrganizationSchema {
  const url = siteUrl ?? process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prixtara Technologies',
    url,
    logo: `${url}/logo.png`,
    description:
      'Prixtara Technologies builds advanced deep-tech solutions including AI-Vision Defect Detection, Existential AI, and Sambhashi multilingual / Indian Sign Language technology.',
    sameAs: [
      'https://linkedin.com/company/prixtara',
      'https://github.com/prixtara',
      'https://x.com/prixtara',
    ],
  };
}

export interface WebsiteSchema {
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

export interface ProductSchemaOptions {
  name: string;
  description?: string;
  category?: string;
  slug: string;
  baseUrl?: string;
  imageUrl?: string;
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description?: string;
  category?: string;
  url: string;
  image?: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
}

export function getProductSchema(options: ProductSchemaOptions): ProductSchema {
  const siteUrl = options.baseUrl ?? process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  const url = `${siteUrl}/products/${options.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: options.name,
    description: options.description,
    category: options.category,
    url,
    image: options.imageUrl ?? `${siteUrl}/og?title=${encodeURIComponent(options.name)}`,
    brand: {
      '@type': 'Brand',
      name: 'Prixtara Technologies',
    },
  };
}

export interface JobPostingSchemaOptions {
  title: string;
  description: string;
  department?: string;
  location?: string;
  isRemote?: boolean;
  employmentType?: string;
  publishedAt?: string;
  slug: string;
  baseUrl?: string;
}

export interface JobPostingSchema {
  '@context': 'https://schema.org';
  '@type': 'JobPosting';
  title: string;
  description: string;
  datePosted?: string;
  employmentType?: string;
  hiringOrganization: {
    '@type': 'Organization';
    name: string;
    sameAs?: string;
  };
  jobLocation?: {
    '@type': 'Place';
    address: {
      '@type': 'PostalAddress';
      addressLocality: string;
      addressCountry: string;
    };
  };
  jobLocationType?: string;
  url: string;
  directApply: boolean;
}

export function getJobPostingSchema(options: JobPostingSchemaOptions): JobPostingSchema {
  const siteUrl = options.baseUrl ?? process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://prixtara.com';
  const url = `${siteUrl}/career/${options.slug}`;

  const schema: JobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: options.title,
    description: options.description,
    datePosted: options.publishedAt ?? '2025-01-01',
    employmentType: options.employmentType ? options.employmentType.toUpperCase() : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Prixtara Technologies',
      sameAs: siteUrl,
    },
    url,
    directApply: true,
  };

  if (options.isRemote) {
    schema.jobLocationType = 'TELECOMMUTE';
  }

  if (options.location) {
    schema.jobLocation = {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: options.location,
        addressCountry: 'IN',
      },
    };
  }

  return schema;
}

/**
 * Format any JSON-LD schema into a sanitized JSON string suitable for <script type="application/ld+json">.
 */
export function formatJsonLd(schema: object): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
