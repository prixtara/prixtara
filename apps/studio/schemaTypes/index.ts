import { type SchemaTypeDefinition } from 'sanity';
import { productType } from './product';
import { careerType } from './career';

/**
 * Sanity schema registry.
 *
 * Register all document types here. Order affects Studio sidebar display.
 *
 * TODO(cms): Add page document type for Vision, About, and Homepage.
 * TODO(cms): Add siteSettings singleton document.
 * TODO(cms): Add navigation/menu document.
 * TODO(cms): Add testimonials / case studies document type.
 */
export const schemaTypes: SchemaTypeDefinition[] = [productType, careerType];
