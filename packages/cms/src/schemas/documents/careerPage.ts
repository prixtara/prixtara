import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Career Page document (Singleton).
 * Manages career overview, company engineering culture, benefits, and general application CTA.
 */
export const careerPageType = defineType({
  name: 'careerPage',
  title: 'Career Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Careers at Prixtara — Build Frontier Intelligence',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introHeadline',
      title: 'Introductory Headline',
      type: 'string',
      initialValue: 'Engineer Systems at the Edge of Physical & Cognitive Limits',
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Introduction Content',
      type: 'portableText',
      description: 'Overview of life and mission-driven engineering at Prixtara.',
    }),
    defineField({
      name: 'cultureContent',
      title: 'Engineering Culture & Philosophy',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Culture Headline',
          type: 'string',
          initialValue: 'High Ownership, Scientific Rigor, Zero Bureaucracy',
        }),
        defineField({
          name: 'description',
          title: 'Culture Narrative',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'coreValues',
          title: 'Team Tenets',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Value Title',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  rows: 2,
                  title: 'Description',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Team Benefits & Perks',
      type: 'array',
      of: [defineArrayMember({ type: 'benefitItem' })],
    }),
    defineField({
      name: 'cta',
      title: 'General Application CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'CTA Headline',
          type: 'string',
          initialValue: "Don't see an open role that fits?",
        }),
        defineField({
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
          initialValue:
            'We are always looking for exceptional researchers, vision engineers, and systems architects.',
        }),
        defineField({
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Send Open Application',
        }),
        defineField({
          name: 'applicationEmail',
          title: 'Application Destination Email',
          type: 'string',
          initialValue: 'careers@prixtara.com',
          validation: (Rule) => Rule.email(),
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Career Page SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
