import { defineType, defineField } from 'sanity';

/**
 * Reusable Technical Specification schema.
 */
export const technicalSpecItemType = defineType({
  name: 'technicalSpecItem',
  title: 'Specification Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Specification Label',
      type: 'string',
      description: 'e.g. Processing Latency, Form Factor, Detection Accuracy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g. < 5ms, 25cm desktop node, 98.4%',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Additional Note / Context',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
  },
});

/**
 * Technical Specification Category Group.
 */
export const technicalSpecGroupType = defineType({
  name: 'technicalSpecGroup',
  title: 'Technical Specification Group',
  type: 'object',
  fields: [
    defineField({
      name: 'category',
      title: 'Category Name',
      type: 'string',
      description: 'e.g. Hardware Specifications, Neural Architecture, Environmental Bounds',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Specification Items',
      type: 'array',
      of: [{ type: 'technicalSpecItem' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'category',
    },
  },
});

/**
 * Product Capability Item.
 */
export const capabilityItemType = defineType({
  name: 'capabilityItem',
  title: 'Capability Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Capability Title',
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
      name: 'badge',
      title: 'Badge / Tag',
      type: 'string',
      description: 'e.g. "Edge Computing", "Real-time"',
    }),
    defineField({
      name: 'metricsSummary',
      title: 'Metrics Summary',
      type: 'string',
      description: 'e.g. "300 parts/min throughput"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'metricsSummary',
    },
  },
});
