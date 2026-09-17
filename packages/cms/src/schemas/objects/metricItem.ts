import { defineType, defineField } from 'sanity';

/**
 * Reusable Metric / KPI Highlight schema.
 */
export const metricItemType = defineType({
  name: 'metricItem',
  title: 'Metric / Key Performance Indicator',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value / Number',
      type: 'string',
      description: 'e.g. 300, 0.1, 98%+, 12, 30',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit / Suffix',
      type: 'string',
      description: 'e.g. parts/min, mm, languages, min',
    }),
    defineField({
      name: 'label',
      title: 'Metric Label',
      type: 'string',
      description: 'e.g. Inspection Speed, Defect Precision, Detection Accuracy, Setup Time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'Context / Supporting Explanation',
      type: 'string',
      description: 'e.g. with no slowdown to production line, across complex part geometries',
    }),
    defineField({
      name: 'highlight',
      title: 'Featured / Highlight Metric',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      value: 'value',
      unit: 'unit',
      label: 'label',
    },
    prepare({ value, unit, label }) {
      return {
        title: `${value}${unit ? ` ${unit}` : ''}`,
        subtitle: label,
      };
    },
  },
});
