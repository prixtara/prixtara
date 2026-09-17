/**
 * @prixtara/config/tokens/spacing
 *
 * Prixtara Design System — Spacing Tokens (Source of Truth)
 *
 * Visual Freeze Notice:
 * These tokens define the spatial rhythm and layout spacing scale.
 * They MUST NOT be used to style or visually alter existing website UI.
 */

/**
 * Spacing scale based on a 4px/8px modular grid.
 * Base unit: 1rem = 16px.
 */
export const SPACING_SCALE = {
  0: { rem: '0rem', px: 0 },
  1: { rem: '0.25rem', px: 4 },
  2: { rem: '0.5rem', px: 8 },
  3: { rem: '0.75rem', px: 12 },
  4: { rem: '1rem', px: 16 },
  5: { rem: '1.25rem', px: 20 },
  6: { rem: '1.5rem', px: 24 },
  8: { rem: '2rem', px: 32 },
  10: { rem: '2.5rem', px: 40 },
  12: { rem: '3rem', px: 48 },
  16: { rem: '4rem', px: 64 },
  20: { rem: '5rem', px: 80 },
  24: { rem: '6rem', px: 96 },
  32: { rem: '8rem', px: 128 },
} as const;

export type SpacingTokenKey = keyof typeof SPACING_SCALE;

/**
 * Semantic layout spacing aliases
 */
export const LAYOUT_SPACING = {
  /** Inline padding between close icon and label */
  inlineTight: SPACING_SCALE[1].rem, // 4px

  /** Standard inline padding between inline elements */
  inlineStandard: SPACING_SCALE[2].rem, // 8px

  /** Internal padding for small cards, pills, tags */
  insetSm: SPACING_SCALE[3].rem, // 12px

  /** Default internal card/container padding */
  insetMd: SPACING_SCALE[6].rem, // 24px

  /** Generous internal card padding for desktop feature modules */
  insetLg: SPACING_SCALE[8].rem, // 32px

  /** Vertical rhythm between content paragraphs and components */
  stackMd: SPACING_SCALE[4].rem, // 16px

  /** Vertical rhythm between major module groups */
  stackLg: SPACING_SCALE[8].rem, // 32px

  /** Section vertical padding for mobile */
  sectionMobile: SPACING_SCALE[12].rem, // 48px

  /** Section vertical padding for tablet */
  sectionTablet: SPACING_SCALE[16].rem, // 64px

  /** Section vertical padding for desktop */
  sectionDesktop: SPACING_SCALE[24].rem, // 96px
} as const;

/**
 * CSS Custom Property Mapping for Spacing
 */
export const SPACING_CSS_VARS = {
  '--spacing-0': SPACING_SCALE[0].rem,
  '--spacing-1': SPACING_SCALE[1].rem,
  '--spacing-2': SPACING_SCALE[2].rem,
  '--spacing-3': SPACING_SCALE[3].rem,
  '--spacing-4': SPACING_SCALE[4].rem,
  '--spacing-5': SPACING_SCALE[5].rem,
  '--spacing-6': SPACING_SCALE[6].rem,
  '--spacing-8': SPACING_SCALE[8].rem,
  '--spacing-10': SPACING_SCALE[10].rem,
  '--spacing-12': SPACING_SCALE[12].rem,
  '--spacing-16': SPACING_SCALE[16].rem,
  '--spacing-20': SPACING_SCALE[20].rem,
  '--spacing-24': SPACING_SCALE[24].rem,
  '--spacing-32': SPACING_SCALE[32].rem,
} as const;
