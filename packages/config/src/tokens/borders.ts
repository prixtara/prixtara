/**
 * @prixtara/config/tokens/borders
 *
 * Prixtara Design System — Border Tokens (Source of Truth)
 *
 * Visual Freeze Notice:
 * These tokens define border widths, styles, and semantic combinations.
 * They MUST NOT be used to style or visually alter existing website UI.
 */

export const BORDER_WIDTHS = {
  none: '0px',
  sm: '1px', // Standard hairline divider and card border
  md: '2px', // Interactive focus rings and highlighted active borders
  lg: '4px', // Heavy technical callout markers
} as const;

export type BorderWidthKey = keyof typeof BORDER_WIDTHS;

/**
 * Semantic Border Tokens (composed CSS values)
 */
export const BORDER_TOKENS = {
  /** Standard structural card border and panel divider */
  default: '1px solid var(--color-border)',

  /** Subtle low-contrast border for inner dividers and subtle cards */
  subtle: '1px solid var(--color-border-subtle)',

  /** Emphasized border for selected states and active cards */
  strong: '1px solid var(--color-brand-strong)',

  /** Keyboard focus ring meeting 3:1 contrast */
  focus: '2px solid var(--color-focus)',

  /** Border for dark inverse surfaces */
  inverse: '1px solid var(--color-border-inverse)',

  /** Focus ring for dark inverse surfaces */
  focusInverse: '2px solid var(--color-focus-inverse)',
} as const;

/**
 * CSS Custom Property Mapping for Borders
 */
export const BORDER_CSS_VARS = {
  '--border-width-none': BORDER_WIDTHS.none,
  '--border-width-sm': BORDER_WIDTHS.sm,
  '--border-width-md': BORDER_WIDTHS.md,
  '--border-width-lg': BORDER_WIDTHS.lg,

  '--border-default': BORDER_TOKENS.default,
  '--border-subtle': BORDER_TOKENS.subtle,
  '--border-strong': BORDER_TOKENS.strong,
  '--border-focus': BORDER_TOKENS.focus,
  '--border-inverse': BORDER_TOKENS.inverse,
  '--border-focus-inverse': BORDER_TOKENS.focusInverse,
} as const;
