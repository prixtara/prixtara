import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Navigation Item schema with sub-item support.
 */
export const navItemType = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description (for mega-menus)',
      type: 'string',
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Route', value: 'internal' },
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
      description: 'e.g. /products, /vision, /career, /about',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Tag (e.g. "New", "Beta")',
      type: 'string',
    }),
    defineField({
      name: 'children',
      title: 'Child Sub-links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'subNavItem',
          title: 'Sub Navigation Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'path',
              title: 'Route Path or URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isExternal',
              title: 'Is External',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'internalPath',
      external: 'externalUrl',
    },
    prepare({ title, subtitle, external }) {
      return {
        title,
        subtitle: subtitle || external || 'No link set',
      };
    },
  },
});
