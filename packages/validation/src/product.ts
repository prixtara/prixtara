import { z } from 'zod';

/**
 * Zod schema for product data received from external sources (CMS, API).
 *
 * Validate all incoming data at the boundary — before it enters the
 * application layer.
 *
 * TODO(cms): Expand schema when full content model is finalised.
 */
/**
 * URL slug pattern for data-driven products: lowercase alphanumeric and hyphens.
 */
export const productSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const productSlugSchema = z
  .string()
  .min(1, 'Product slug is required')
  .max(96, 'Product slug cannot exceed 96 characters')
  .regex(productSlugRegex, 'Product slug must be lowercase alphanumeric with hyphens');

export const productMetricSchema = z.object({
  value: z.string().min(1),
  unit: z.string().optional(),
  label: z.string().min(1),
  context: z.string().optional(),
  highlight: z.boolean().optional(),
});

export const productCapabilitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  badge: z.string().optional(),
  metricsSummary: z.string().optional(),
});

export const productTechnicalDetailSchema = z.object({
  category: z.string().min(1),
  items: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
      description: z.string().optional(),
    }),
  ),
});

export const productFeatureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  badge: z.string().optional(),
  iconName: z.string().optional(),
});

export const productUseCaseSchema = z.object({
  title: z.string().min(1),
  targetAudience: z.string().optional(),
  scenario: z.string().min(1),
  impact: z.string().min(1),
});

export const productApplicationSchema = z.object({
  industry: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  deploymentType: z.string().optional(),
});

export const productProcessStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  duration: z.string().optional(),
});

export const productCtaSchema = z.object({
  headline: z.string().min(1),
  description: z.string().optional(),
  buttonLabel: z.string().min(1),
  buttonUrl: z.string().min(1),
});

export const productSeoSchema = z.object({
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(250).optional(),
  canonicalUrl: z.string().url().optional(),
  ogImageUrl: z.string().url().optional(),
  noindex: z.boolean().optional(),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: productSlugSchema,
  title: z.string().min(1).max(200).optional(),
  name: z.string().min(1).max(200),
  tagline: z.string().min(1).max(300),
  shortDescription: z.string().max(500).optional(),
  category: z.string().min(1),
  longDescription: z.string().optional(),
  problemStatement: z.string().optional(),
  solution: z.string().optional(),
  capabilities: z.array(productCapabilitySchema).optional(),
  technicalDetails: z.array(productTechnicalDetailSchema).optional(),
  metrics: z.array(productMetricSchema).optional(),
  features: z.array(productFeatureSchema).optional(),
  useCases: z.array(productUseCaseSchema).optional(),
  applications: z.array(productApplicationSchema).optional(),
  process: z.array(productProcessStepSchema).optional(),
  cta: productCtaSchema.optional(),
  relatedProductSlugs: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
  seo: productSeoSchema.optional(),
});

export type ValidatedProduct = z.infer<typeof productSchema>;
export type ValidatedProductMetric = z.infer<typeof productMetricSchema>;
export type ValidatedProductCapability = z.infer<typeof productCapabilitySchema>;
export type ValidatedProductTechnicalDetail = z.infer<typeof productTechnicalDetailSchema>;
