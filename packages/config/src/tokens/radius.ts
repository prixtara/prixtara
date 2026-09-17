/**
 * @prixtara/config/tokens/radius
 *
 * Prixtara Design System — Radius Tokens (Source of Truth)
 *
 * Visual Freeze Notice:
 * These tokens define corner curvatures.
 * They MUST NOT be used to style or visually alter existing website UI.
 */

/**
 * Geometric corner radius scale.
 * Prixtara's design language prioritizes architectural precision and
 * subtle rounding over bubbly, hyper-rounded forms.
 */
export const RADIUS_SCALE = {
  none: '0px',
  sm: '0.25rem', // 4px — inner elements, tiny badges, small chips
  md: '0.5rem', // 8px — buttons, inputs, dropdown items
  lg: '0.75rem', // 12px — cards, modular tiles, dialog boxes
  xl: '1rem', // 16px — large feature sheets, showcase containers
  '2xl': '1.5rem', // 24px — hero panels, full-bleed breakout sections
  full: '9999px', // pills, circular status dots, avatar frames
} as const;

export type RadiusTokenKey = keyof typeof RADIUS_SCALE;

/**
 * CSS Custom Property Mapping for Radius
 */
export const RADIUS_CSS_VARS = {
  '--radius-none': RADIUS_SCALE.none,
  '--radius-sm': RADIUS_SCALE.sm,
  '--radius-md': RADIUS_SCALE.md,
  '--radius-lg': RADIUS_SCALE.lg,
  '--radius-xl': RADIUS_SCALE.xl,
  '--radius-2xl': RADIUS_SCALE['2xl'],
  '--radius-full': RADIUS_SCALE.full,
} as const;
