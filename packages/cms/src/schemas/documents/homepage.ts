import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Homepage document (Singleton).
 * Fully structured and modular content model composed of reusable section blocks.
 * Zero hardcoded content in React.
 */
export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Page Title',
      type: 'string',
      initialValue: 'Prixtara — Deep-Tech Innovation Homepage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Homepage Sections (Modular Blocks)',
      description: 'Add, reorder, or toggle homepage content sections dynamically.',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'productsSection' }),
        defineArrayMember({ type: 'visionSection' }),
        defineArrayMember({ type: 'metricsSection' }),
        defineArrayMember({ type: 'techThemesSection' }),
        defineArrayMember({ type: 'processSection' }),
        defineArrayMember({ type: 'ctaSection' }),
        defineArrayMember({ type: 'testimonialsSection' }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'Homepage SEO & Meta',
      type: 'seo',
      description: 'Dedicated SEO metadata and Open Graph settings for the homepage.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Homepage',
        subtitle: 'Modular Section Canvas',
      };
    },
  },
});
