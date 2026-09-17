import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Job Posting document schema (Collection).
 * Manages individual role listings with structured responsibilities, requirements, and application CTA.
 */
export const jobPostingType = defineType({
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description:
        'The URL route identifier for this role (e.g. /career/computer-vision-engineer).',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department / Discipline',
      type: 'string',
      options: {
        list: [
          { title: 'Computer Vision & Robotics', value: 'computer-vision' },
          { title: 'Artificial Intelligence & Reasoning', value: 'artificial-intelligence' },
          { title: 'Language & Speech Technology', value: 'language-technology' },
          { title: 'Embedded Systems & Hardware', value: 'embedded-hardware' },
          { title: 'Software & Platform Engineering', value: 'software-engineering' },
          { title: 'Product & Industrial Design', value: 'product-design' },
          { title: 'Operations & Research', value: 'operations' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Work Location',
      type: 'string',
      description: 'e.g. "Bengaluru, Karnataka", "Remote", "Hybrid (Bengaluru)"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isRemote',
      title: 'Remote Eligible',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Research Internship', value: 'internship' },
        ],
      },
      initialValue: 'full-time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary / Elevator Pitch',
      type: 'text',
      rows: 2,
      description: 'Teaser snippet displayed on the careers index page.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Role Description',
      type: 'portableText',
      description: 'Comprehensive role narrative, context, and project scope.',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Bullet points outlining core daily and long-term responsibilities.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'requirements',
      title: 'Required Qualifications & Experience',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Must-have skills and background.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'optionalRequirements',
      title: 'Nice to Have / Preferred Qualifications',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Optional skills that give candidates an edge.',
    }),
    defineField({
      name: 'published',
      title: 'Published (Visible on Careers Page)',
      type: 'boolean',
      initialValue: true,
      description:
        'Toggle off to unpublish or pause accepting applications without deleting the record.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'applicationCta',
      title: 'Application Submission CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Application Method',
          type: 'string',
          options: {
            list: [
              { title: 'Email Submission', value: 'email' },
              { title: 'External Application Portal / Form', value: 'url' },
            ],
            layout: 'radio',
          },
          initialValue: 'email',
        }),
        defineField({
          name: 'destination',
          title: 'Destination (Email Address or URL)',
          type: 'string',
          initialValue: 'careers@prixtara.com',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Apply for this Role',
        }),
        defineField({
          name: 'instructions',
          title: 'Application Instructions / Note',
          type: 'string',
          initialValue:
            'Please attach your CV, GitHub/portfolio link, and a brief note on your relevant work.',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Job Posting SEO & Structured Data',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
      published: 'published',
    },
    prepare({ title, subtitle, published }) {
      return {
        title,
        subtitle: `${published ? '🟢 Live' : '⚪ Paused'} • ${subtitle || 'General'}`,
      };
    },
  },
});
