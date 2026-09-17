import type {
  SanityDocument,
  SanitySlug,
  SanityImage,
  ProductCapability,
  ProductTechnicalDetail,
  ProductMetric,
  ProductFeature,
  ProductUseCase,
  ProductApplication,
  ProductProcessStep,
  ProductCta,
} from '@prixtara/types';

/**
 * Common SEO object returned by CMS queries.
 */
export interface CmsSeo {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: SanityImage & { alt?: string };
  noindex?: boolean;
  structuredData?: {
    schemaType?: string;
    jsonLdRaw?: string;
  };
}

/**
 * Reusable Captioned Image shape returned from CMS.
 */
export interface CmsCaptionedImage extends SanityImage {
  altText?: string;
  caption?: string;
  credit?: string;
}

/**
 * Reusable CTA shape returned from CMS.
 */
export interface CmsCta {
  label: string;
  linkType: 'internal' | 'external';
  internalPath?: string;
  externalUrl?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  openInNewTab?: boolean;
}

/**
 * CMS-backed Product document.
 */
export interface CmsProduct extends SanityDocument {
  _type: 'product';
  title?: string;
  name: string;
  slug: SanitySlug | string;
  productCategory?: string;
  category: string;
  shortDescription?: string;
  tagline: string;
  longDescription?: unknown;
  thumbnail?: CmsCaptionedImage;
  heroMedia?: {
    mediaType: 'image' | 'video';
    image?: CmsCaptionedImage;
    video?: {
      title?: string;
      videoFile?: { asset?: { url?: string } };
      externalUrl?: string;
      posterImage?: CmsCaptionedImage;
    };
  };
  gallery?: CmsCaptionedImage[];
  video?: {
    title?: string;
    videoFile?: { asset?: { url?: string } };
    externalUrl?: string;
    posterImage?: CmsCaptionedImage;
  };
  problemStatement?: unknown;
  solution?: unknown;
  capabilities?: ProductCapability[];
  technicalDetails?: ProductTechnicalDetail[];
  metrics?: ProductMetric[];
  features?: ProductFeature[];
  useCases?: ProductUseCase[];
  applications?: ProductApplication[];
  process?: ProductProcessStep[];
  cta?: ProductCta;
  relatedProducts?: Array<{
    _id: string;
    title: string;
    slug: string;
    productCategory: string;
    shortDescription?: string;
    thumbnail?: CmsCaptionedImage;
  }>;
  seo?: CmsSeo;
}

/**
 * CMS-backed Job Opening document.
 */
export interface CmsJobOpening extends SanityDocument {
  _type: 'jobPosting';
  title: string;
  slug: SanitySlug | string;
  department: string;
  location: string;
  isRemote: boolean;
  employmentType: string;
  summary: string;
  description?: unknown;
  responsibilities?: string[];
  requirements?: string[];
  optionalRequirements?: string[];
  published: boolean;
  publishedAt: string;
  applicationCta?: {
    type: 'email' | 'url';
    destination: string;
    buttonText: string;
    instructions?: string;
  };
  seo?: CmsSeo;
}

/**
 * CMS-backed Career Page document.
 */
export interface CmsCareerPage extends SanityDocument {
  _type: 'careerPage';
  title: string;
  introHeadline?: string;
  pageContent?: unknown;
  cultureContent?: {
    headline: string;
    description?: string;
    coreValues?: Array<{ title: string; description: string }>;
  };
  benefits?: Array<{
    title: string;
    description: string;
    category?: string;
    iconName?: string;
  }>;
  cta?: {
    headline: string;
    description?: string;
    buttonLabel: string;
    applicationEmail: string;
  };
  seo?: CmsSeo;
}

/**
 * Modular Homepage Section union.
 */
export interface CmsHomepageSection {
  _key: string;
  _type: string;
  [key: string]: unknown;
}

/**
 * CMS-backed Homepage document.
 */
export interface CmsHomepage extends SanityDocument {
  _type: 'homepage';
  title: string;
  sections: CmsHomepageSection[];
  seo?: CmsSeo;
}

/**
 * CMS-backed Vision Page document.
 */
export interface CmsVisionPage extends SanityDocument {
  _type: 'visionPage';
  title: string;
  introduction: string;
  contentSections?: Array<{
    heading: string;
    subheading?: string;
    body?: unknown;
    media?: CmsCaptionedImage;
  }>;
  principles?: Array<{
    number?: string;
    title: string;
    description: string;
    impact?: string;
  }>;
  technologyThemes?: Array<{
    title: string;
    description: string;
    category?: string;
    tags?: string[];
  }>;
  media?: CmsCaptionedImage;
  seo?: CmsSeo;
}

/**
 * CMS-backed About Page document.
 */
export interface CmsAboutPage extends SanityDocument {
  _type: 'aboutPage';
  title: string;
  tagline?: string;
  companyStory?: unknown;
  mission?: string;
  vision?: string;
  leadership?: Array<{
    name: string;
    role: string;
    bio?: string;
    image?: CmsCaptionedImage;
    socialLinks?: Array<{ platform: string; label: string; url: string }>;
  }>;
  media?: CmsCaptionedImage;
  milestones?: Array<{
    yearOrDate: string;
    title: string;
    description: string;
    highlight?: boolean;
  }>;
  seo?: CmsSeo;
}

/**
 * CMS-backed Site Settings document.
 */
export interface CmsSiteSettings extends SanityDocument {
  _type: 'siteSettings';
  companyName: string;
  logo?: CmsCaptionedImage;
  logoDark?: CmsCaptionedImage;
  favicon?: { asset?: { url?: string } };
  primaryContact?: {
    email?: string;
    supportEmail?: string;
    phone?: string;
    address?: string;
    officeHours?: string;
  };
  socialLinks?: Array<{
    platform: string;
    label: string;
    url: string;
  }>;
  defaultSeo?: CmsSeo;
  defaultOgImage?: CmsCaptionedImage;
  footer?: {
    copyrightText?: string;
    tagline?: string;
    disclaimer?: string;
    legalLinks?: Array<{ label: string; href: string; isExternal?: boolean }>;
  };
}

/**
 * CMS-backed Navigation document.
 */
export interface CmsNavigation extends SanityDocument {
  _type: 'navigation';
  title: string;
  primaryNavigation: Array<{
    label: string;
    description?: string;
    linkType: 'internal' | 'external';
    internalPath?: string;
    externalUrl?: string;
    openInNewTab?: boolean;
    badge?: string;
    children?: Array<{
      label: string;
      description?: string;
      path: string;
      isExternal?: boolean;
    }>;
  }>;
  cta?: CmsCta;
  footerNavigation: Array<{
    columnTitle: string;
    links: Array<{
      label: string;
      href: string;
      isExternal?: boolean;
      badge?: string;
    }>;
  }>;
  externalLinks?: Array<{
    label: string;
    url: string;
    description?: string;
    openInNewTab?: boolean;
  }>;
}

/** Generic CMS Page for backward compatibility */
export interface CmsPage extends SanityDocument {
  _type: 'page';
  title: string;
  slug: SanitySlug;
  heroImage?: SanityImage;
}
