import type { SchemaTypeDefinition } from 'sanity';

// Documents
import { siteSettingsType } from './documents/siteSettings';
import { navigationType } from './documents/navigation';
import { homepageType } from './documents/homepage';
import { productType } from './documents/product';
import { visionPageType } from './documents/visionPage';
import { careerPageType } from './documents/careerPage';
import { jobPostingType } from './documents/jobPosting';
import { aboutPageType } from './documents/aboutPage';

// Objects
import { seoType } from './objects/seo';
import { captionedImageType, videoMediaType } from './objects/mediaObject';
import { portableTextType } from './objects/portableText';
import { ctaType } from './objects/cta';
import { socialLinkType } from './objects/socialLink';
import { navItemType } from './objects/navItem';
import { metricItemType } from './objects/metricItem';
import { principleItemType } from './objects/principleItem';
import { milestoneItemType } from './objects/milestoneItem';
import { teamMemberType } from './objects/teamMember';
import { benefitItemType } from './objects/benefitItem';
import {
  technicalSpecItemType,
  technicalSpecGroupType,
  capabilityItemType,
} from './objects/technicalSpec';

// Sections
import { heroSectionType } from './sections/heroSection';
import { productsSectionType } from './sections/productsSection';
import { visionSectionType } from './sections/visionSection';
import { metricsSectionType } from './sections/metricsSection';
import { techThemesSectionType } from './sections/techThemesSection';
import { processSectionType } from './sections/processSection';
import { ctaSectionType } from './sections/ctaSection';
import { testimonialsSectionType } from './sections/testimonialsSection';

/**
 * All Sanity document types.
 */
export const documentTypes: SchemaTypeDefinition[] = [
  siteSettingsType,
  navigationType,
  homepageType,
  productType,
  visionPageType,
  careerPageType,
  jobPostingType,
  aboutPageType,
];

/**
 * All reusable schema objects.
 */
export const objectTypes: SchemaTypeDefinition[] = [
  seoType,
  captionedImageType,
  videoMediaType,
  portableTextType,
  ctaType,
  socialLinkType,
  navItemType,
  metricItemType,
  principleItemType,
  milestoneItemType,
  teamMemberType,
  benefitItemType,
  technicalSpecItemType,
  technicalSpecGroupType,
  capabilityItemType,
];

/**
 * All homepage / page modular section blocks.
 */
export const sectionTypes: SchemaTypeDefinition[] = [
  heroSectionType,
  productsSectionType,
  visionSectionType,
  metricsSectionType,
  techThemesSectionType,
  processSectionType,
  ctaSectionType,
  testimonialsSectionType,
];

/**
 * Consolidated Sanity schema registry.
 * Passed to `defineConfig({ schema: { types: schemaTypes } })` in Sanity Studio.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  ...documentTypes,
  ...objectTypes,
  ...sectionTypes,
];

// Re-export individual types
export {
  siteSettingsType,
  navigationType,
  homepageType,
  productType,
  visionPageType,
  careerPageType,
  jobPostingType,
  aboutPageType,
  seoType,
  captionedImageType,
  videoMediaType,
  portableTextType,
  ctaType,
  socialLinkType,
  navItemType,
  metricItemType,
  principleItemType,
  milestoneItemType,
  teamMemberType,
  benefitItemType,
  technicalSpecItemType,
  technicalSpecGroupType,
  capabilityItemType,
  heroSectionType,
  productsSectionType,
  visionSectionType,
  metricsSectionType,
  techThemesSectionType,
  processSectionType,
  ctaSectionType,
  testimonialsSectionType,
};
