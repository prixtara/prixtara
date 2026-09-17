/**
 * @prixtara/config/tokens/typography
 *
 * Prixtara Design System — Typography Tokens (Source of Truth)
 *
 * Visual Freeze Notice:
 * These tokens define the typography scale and font family mappings.
 * They MUST NOT be used to style or visually alter existing website UI.
 *
 * Provisional Notice:
 * The font families below (Space Grotesk, Inter, JetBrains Mono) are
 * provisional design-system choices. Final visual choices will be settled
 * after the visual-reference phase.
 */

/**
 * Provisional Font Family Definitions
 */
export const FONT_FAMILIES = {
  display:
    "'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  heading:
    "'Space Grotesk', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;

export type FontFamilyRole = keyof typeof FONT_FAMILIES;

/**
 * Type Scale Token Definition
 */
export interface TypeScaleToken {
  readonly fontSize: string;
  readonly lineHeight: string;
  readonly letterSpacing: string;
  readonly fontWeight: string;
  readonly fontFamilyRole: FontFamilyRole;
  readonly textTransform?: string;
  readonly description: string;
}

/**
 * Typography Scale Tokens
 */
export const TYPE_SCALE = {
  'display-hero': {
    fontSize: '4.5rem', // 72px
    lineHeight: '1.05',
    letterSpacing: '-0.03em',
    fontWeight: '700',
    fontFamilyRole: 'display',
    description: 'High-impact landing hero statements and marquee text',
  },
  'display-xl': {
    fontSize: '3.75rem', // 60px
    lineHeight: '1.1',
    letterSpacing: '-0.025em',
    fontWeight: '700',
    fontFamilyRole: 'display',
    description: 'Major section hero headlines and billboard stats',
  },
  'display-lg': {
    fontSize: '3rem', // 48px
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    fontWeight: '600',
    fontFamilyRole: 'display',
    description: 'Primary page titles and marquee sub-headlines',
  },
  'heading-xl': {
    fontSize: '2.25rem', // 36px
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    fontWeight: '600',
    fontFamilyRole: 'heading',
    description: 'Major feature headers and section dividing titles (h2)',
  },
  'heading-lg': {
    fontSize: '1.875rem', // 30px
    lineHeight: '1.25',
    letterSpacing: '-0.015em',
    fontWeight: '600',
    fontFamilyRole: 'heading',
    description: 'Card module titles and product spotlight headers (h3)',
  },
  'heading-md': {
    fontSize: '1.5rem', // 24px
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
    fontWeight: '600',
    fontFamilyRole: 'heading',
    description: 'Sub-module headers, modal titles, and list group titles (h4)',
  },
  'body-lg': {
    fontSize: '1.125rem', // 18px
    lineHeight: '1.6',
    letterSpacing: '-0.005em',
    fontWeight: '400',
    fontFamilyRole: 'body',
    description: 'Introductory lead paragraphs and callout body copy',
  },
  'body-md': {
    fontSize: '1rem', // 16px
    lineHeight: '1.6',
    letterSpacing: '0em',
    fontWeight: '400',
    fontFamilyRole: 'body',
    description: 'Default body text for all prose, articles, and descriptions',
  },
  'body-sm': {
    fontSize: '0.875rem', // 14px
    lineHeight: '1.5',
    letterSpacing: '+0.005em',
    fontWeight: '400',
    fontFamilyRole: 'body',
    description: 'Secondary body text, table cells, captions, and tooltips',
  },
  label: {
    fontSize: '0.75rem', // 12px
    lineHeight: '1.4',
    letterSpacing: '+0.06em',
    fontWeight: '600',
    fontFamilyRole: 'body',
    textTransform: 'uppercase',
    description: 'Form field labels, badge tags, and UI category indicators',
  },
  metadata: {
    fontSize: '0.75rem', // 12px
    lineHeight: '1.45',
    letterSpacing: '+0.02em',
    fontWeight: '400',
    fontFamilyRole: 'mono',
    description: 'Technical readouts, timestamps, version numbers, and sensor metrics',
  },
} as const satisfies Record<string, TypeScaleToken>;

export type TypeScaleName = keyof typeof TYPE_SCALE;

/**
 * CSS Custom Property Mapping for Typography
 */
export const TYPOGRAPHY_CSS_VARS = {
  '--font-display': FONT_FAMILIES.display,
  '--font-heading': FONT_FAMILIES.heading,
  '--font-body': FONT_FAMILIES.body,
  '--font-mono': FONT_FAMILIES.mono,

  // Font size scale
  '--font-size-display-hero': TYPE_SCALE['display-hero'].fontSize,
  '--font-size-display-xl': TYPE_SCALE['display-xl'].fontSize,
  '--font-size-display-lg': TYPE_SCALE['display-lg'].fontSize,
  '--font-size-heading-xl': TYPE_SCALE['heading-xl'].fontSize,
  '--font-size-heading-lg': TYPE_SCALE['heading-lg'].fontSize,
  '--font-size-heading-md': TYPE_SCALE['heading-md'].fontSize,
  '--font-size-body-lg': TYPE_SCALE['body-lg'].fontSize,
  '--font-size-body-md': TYPE_SCALE['body-md'].fontSize,
  '--font-size-body-sm': TYPE_SCALE['body-sm'].fontSize,
  '--font-size-label': TYPE_SCALE.label.fontSize,
  '--font-size-metadata': TYPE_SCALE.metadata.fontSize,

  // Line height scale
  '--line-height-display-hero': TYPE_SCALE['display-hero'].lineHeight,
  '--line-height-display-xl': TYPE_SCALE['display-xl'].lineHeight,
  '--line-height-display-lg': TYPE_SCALE['display-lg'].lineHeight,
  '--line-height-heading-xl': TYPE_SCALE['heading-xl'].lineHeight,
  '--line-height-heading-lg': TYPE_SCALE['heading-lg'].lineHeight,
  '--line-height-heading-md': TYPE_SCALE['heading-md'].lineHeight,
  '--line-height-body-lg': TYPE_SCALE['body-lg'].lineHeight,
  '--line-height-body-md': TYPE_SCALE['body-md'].lineHeight,
  '--line-height-body-sm': TYPE_SCALE['body-sm'].lineHeight,
  '--line-height-label': TYPE_SCALE.label.lineHeight,
  '--line-height-metadata': TYPE_SCALE.metadata.lineHeight,

  // Letter spacing scale
  '--letter-spacing-display-hero': TYPE_SCALE['display-hero'].letterSpacing,
  '--letter-spacing-display-xl': TYPE_SCALE['display-xl'].letterSpacing,
  '--letter-spacing-display-lg': TYPE_SCALE['display-lg'].letterSpacing,
  '--letter-spacing-heading-xl': TYPE_SCALE['heading-xl'].letterSpacing,
  '--letter-spacing-heading-lg': TYPE_SCALE['heading-lg'].letterSpacing,
  '--letter-spacing-heading-md': TYPE_SCALE['heading-md'].letterSpacing,
  '--letter-spacing-body-lg': TYPE_SCALE['body-lg'].letterSpacing,
  '--letter-spacing-body-md': TYPE_SCALE['body-md'].letterSpacing,
  '--letter-spacing-body-sm': TYPE_SCALE['body-sm'].letterSpacing,
  '--letter-spacing-label': TYPE_SCALE.label.letterSpacing,
  '--letter-spacing-metadata': TYPE_SCALE.metadata.letterSpacing,
} as const;
