import { z } from 'zod';
import { PRODUCT_SLUGS } from '@prixtara/types';

/**
 * Zod schema for product data received from external sources (CMS, API).
 *
 * Validate all incoming data at the boundary — before it enters the
 * application layer.
 *
 * TODO(cms): Expand schema when full content model is finalised.
 */
export const productSlugSchema = z.enum(PRODUCT_SLUGS);

export const productSchema = z.object({
  id: z.string().min(1),
  slug: productSlugSchema,
  name: z.string().min(1).max(200),
  tagline: z.string().min(1).max(300),
  category: z.enum(['computer-vision', 'artificial-intelligence', 'language-technology']),
});

export type ValidatedProduct = z.infer<typeof productSchema>;
