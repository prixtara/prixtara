import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * About Page document (Singleton).
 * Manages company story, mission & vision statements, leadership team, and milestones timeline.
 */
export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Prixtara — Pioneering Industrial & Cognitive AI',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Statement',
      type: 'string',
      initialValue: 'Bridging Physical Scale and Cognitive Depth.',
    }),
    defineField({
      name: 'companyStory',
      title: 'The Prixtara Story',
      type: 'portableText',
      description:
        'Foundational history, engineering philosophy, and origins of our deep-tech vectors.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
      description: 'What Prixtara strives to achieve daily for industries and society.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
      description: 'Long-term destination and systemic ambition.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leadership',
      title: 'Leadership & Key Researchers',
      type: 'array',
      of: [defineArrayMember({ type: 'teamMember' })],
    }),
    defineField({
      name: 'media',
      title: 'Featured Laboratory / Facility Media',
      type: 'captionedImage',
    }),
    defineField({
      name: 'milestones',
      title: 'Milestones & Key Breakthroughs Timeline',
      type: 'array',
      of: [defineArrayMember({ type: 'milestoneItem' })],
      description: 'Chronological timeline of landmark achievements.',
    }),
    defineField({
      name: 'seo',
      title: 'About Page SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
