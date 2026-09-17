import { defineType, defineField } from 'sanity';

/**
 * Reusable Call To Action schema.
 */
export const ctaType = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button / Link Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page / Route', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalPath',
      title: 'Internal Route Path',
      type: 'string',
      description: 'e.g. /products, /career, /about, /products/ai-vision-defect-detection',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Fully-qualified URL (e.g. https://example.com)',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'variant',
      title: 'Visual Variant / Style Indicator',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost / Text Link', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'internalPath',
      external: 'externalUrl',
      variant: 'variant',
    },
    prepare({ title, subtitle, external, variant }) {
      return {
        title: title || 'Call to Action',
        subtitle: `${variant || 'primary'} • ${subtitle || external || 'No link set'}`,
      };
    },
  },
});
