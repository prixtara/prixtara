import { defineType, defineField } from 'sanity';

/**
 * Reusable Core Principle schema (for Vision and About pages).
 */
export const principleItemType = defineType({
  name: 'principleItem',
  title: 'Principle Item',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Principle Number / Order',
      type: 'string',
      description: 'e.g. "01", "02", "03"',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'impact',
      title: 'Impact / Consequence',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      number: 'number',
      title: 'title',
      subtitle: 'description',
    },
    prepare({ number, title, subtitle }) {
      return {
        title: `${number ? `${number}. ` : ''}${title}`,
        subtitle,
      };
    },
  },
});
