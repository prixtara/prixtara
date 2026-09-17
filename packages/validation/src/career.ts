import { z } from 'zod';

/**
 * Zod schema for job opening data received from external sources (CMS, API).
 *
 * TODO(careers): Expand schema when full content model is finalised.
 * TODO(cms): Align fields with Sanity schema.
 */
export const jobOpeningSchema = z.object({
  id: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe'),
  title: z.string().min(1).max(200),
  department: z.enum([
    'engineering',
    'design',
    'product',
    'research',
    'operations',
    'sales',
    'marketing',
  ]),
  location: z.string().min(1).max(100),
  isRemote: z.boolean(),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  summary: z.string().min(1).max(500),
  isActive: z.boolean(),
  publishedAt: z.string().datetime(),
});

export type ValidatedJobOpening = z.infer<typeof jobOpeningSchema>;
