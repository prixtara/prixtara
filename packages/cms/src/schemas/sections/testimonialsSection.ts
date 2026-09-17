import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Reusable Quotes / Endorsements / Testimonials Section schema.
 */
export const testimonialsSectionType = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials / Endorsements Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Industry Recognition',
    }),
    defineField({
      name: 'quotes',
      title: 'Quotes / Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quoteItem',
          title: 'Quote Item',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote Text',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / Designation',
              type: 'string',
            }),
            defineField({
              name: 'organization',
              title: 'Organization / Institution',
              type: 'string',
            }),
            defineField({
              name: 'avatar',
              title: 'Author Avatar / Photo',
              type: 'captionedImage',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
    },
  },
});
