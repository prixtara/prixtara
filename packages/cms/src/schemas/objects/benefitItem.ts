import { defineType, defineField } from 'sanity';

/**
 * Reusable Benefit Item schema (for Careers and Culture).
 */
export const benefitItemType = defineType({
  name: 'benefitItem',
  title: 'Benefit / Perk Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Benefit Title',
      type: 'string',
      description: 'e.g. Deep R&D Autonomy, Cutting-edge Compute, Equity Participation',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Culture, Compensation, Health, Growth',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Identifier',
      type: 'string',
      description: 'e.g. cpu, shield, heart, trending-up, globe',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});
