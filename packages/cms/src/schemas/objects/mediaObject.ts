import { defineType, defineField } from 'sanity';

/**
 * Reusable captioned image with accessibility metadata and focal point support.
 */
export const captionedImageType = defineType({
  name: 'captionedImage',
  title: 'Captioned Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'altText',
      title: 'Alternative Text (Accessibility)',
      type: 'string',
      description: 'Mandatory description of the visual content for screen readers.',
      validation: (Rule) =>
        Rule.required().error('Alt text is required for accessibility and SEO.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional display caption appearing under or alongside the image.',
    }),
    defineField({
      name: 'credit',
      title: 'Attribution / Credit',
      type: 'string',
      description: 'Photographer, designer, or copyright owner credit.',
    }),
  ],
  preview: {
    select: {
      title: 'altText',
      subtitle: 'caption',
      media: 'asset',
    },
  },
});

/**
 * Reusable video media object (supports file upload or external streaming URL).
 */
export const videoMediaType = defineType({
  name: 'videoMedia',
  title: 'Video Media',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Descriptive title of the video.',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/quicktime',
      },
      description: 'Direct video file upload (MP4, WebM, etc.).',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Video URL',
      type: 'url',
      description: 'Direct stream, Vimeo, or YouTube link if hosted externally.',
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster / Thumbnail Image',
      type: 'captionedImage',
      description: 'Thumbnail displayed before the video plays.',
    }),
    defineField({
      name: 'autoPlay',
      title: 'Autoplay (Muted / Background Loop)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'loop',
      title: 'Loop Continuously',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
