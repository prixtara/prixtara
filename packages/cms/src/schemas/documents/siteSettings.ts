import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Site Settings document (Singleton).
 * Manages brand metadata, global contact info, social channels, default SEO, and footer.
 */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Prixtara Technologies Pvt. Ltd.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Primary Logo',
      type: 'captionedImage',
      description: 'Main brand logo used in navigation header and brand displays.',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode / High Contrast)',
      type: 'captionedImage',
      description: 'Alternative logo for dark mode or dark backgrounds.',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Square browser favicon icon (32x32 or 64x64 PNG/ICO).',
    }),
    defineField({
      name: 'primaryContact',
      title: 'Primary Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'General Inquiries Email',
          type: 'string',
          initialValue: 'contact@prixtara.com',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'supportEmail',
          title: 'Support / Technical Email',
          type: 'string',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Physical / Registered Address',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'officeHours',
          title: 'Office / Support Hours',
          type: 'string',
          description: 'e.g. "Mon - Fri, 9:00 AM - 6:00 PM IST"',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Channels',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })],
      description: 'Official social media channels linked in header/footer/contact.',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Global Default SEO',
      type: 'seo',
      description: 'Default SEO values applied when individual pages do not specify overrides.',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph / Social Image',
      type: 'captionedImage',
      description: 'Fallback image for social shares across all pages without custom OG images.',
    }),
    defineField({
      name: 'footer',
      title: 'Footer Information',
      type: 'object',
      fields: [
        defineField({
          name: 'copyrightText',
          title: 'Copyright Notice',
          type: 'string',
          initialValue: '© {year} Prixtara Technologies Pvt. Ltd. All rights reserved.',
          description: 'Use {year} to automatically output current year.',
        }),
        defineField({
          name: 'tagline',
          title: 'Footer Tagline',
          type: 'string',
          initialValue:
            'Deep-Tech Architectures for Autonomous Systems and Inclusive Intelligence.',
        }),
        defineField({
          name: 'disclaimer',
          title: 'Regulatory / Legal Disclaimer',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'legalLinks',
          title: 'Legal / Compliance Links',
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
                  title: 'Path or URL',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'isExternal',
                  type: 'boolean',
                  title: 'Is External',
                  initialValue: false,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'primaryContact.email',
      media: 'logo.asset',
    },
  },
});
