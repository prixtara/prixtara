import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Site Navigation document (Singleton).
 * Manages header menu, primary CTA button, footer columns, and external links.
 */
export const navigationType = defineType({
  name: 'navigation',
  title: 'Site Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Name',
      type: 'string',
      initialValue: 'Main Navigation Configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryNavigation',
      title: 'Primary Navigation (Header Menu)',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
      description: 'Ordered menu items appearing in the website header.',
    }),
    defineField({
      name: 'cta',
      title: 'Header Call to Action',
      type: 'cta',
      description: 'Prominent header action button (e.g. "Request Demo" or "Contact Us").',
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer Navigation Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            defineField({
              name: 'columnTitle',
              title: 'Column Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      type: 'string',
                      title: 'Route Path or URL',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'isExternal',
                      type: 'boolean',
                      title: 'Is External',
                      initialValue: false,
                    }),
                    defineField({ name: 'badge', type: 'string', title: 'Badge' }),
                  ],
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      description: 'Multi-column navigation links grouped in the footer.',
    }),
    defineField({
      name: 'externalLinks',
      title: 'Featured External Links / Portals',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'description', type: 'string', title: 'Description' }),
            defineField({
              name: 'openInNewTab',
              type: 'boolean',
              title: 'Open in new tab',
              initialValue: true,
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
