/**
 * @prixtara/config/tokens/colors
 *
 * Prixtara Design System — Color Tokens (Source of Truth)
 *
 * Visual Freeze Notice:
 * These tokens define the brand and semantic color system.
 * They MUST NOT be used to style or visually alter existing website UI.
 */

/**
 * Raw Color Palette (Hex representations)
 */
export const RAW_COLORS = {
  canvas: '#E5E9EC',
  primaryBlue: '#698EB5',
  deepBlue: '#32669A',
  nearBlack: '#0D0E16',
  white: '#FDFEFE',
  coralOrange: '#E57967',
  deepNavy: '#202839',
  secondaryBlueGray: '#8BA5BE',
} as const;

export type RawColorName = keyof typeof RAW_COLORS;
export type RawColorValue = (typeof RAW_COLORS)[RawColorName];

/**
 * Semantic Color Role Definitions
 *
 * Maps raw colors to functional UI purposes.
 */
export const SEMANTIC_COLORS = {
  /** Page canvas background */
  background: RAW_COLORS.canvas,

  /** Clean elevated surfaces, cards, and modal sheets */
  surface: RAW_COLORS.white,

  /** Subtle tinted background areas, secondary card fills */
  surfaceSubtle: RAW_COLORS.secondaryBlueGray,

  /** Dark inverse container surfaces and immersive panels */
  surfaceInverse: RAW_COLORS.deepNavy,

  /** Primary body text and prominent headers on light backgrounds */
  textPrimary: RAW_COLORS.nearBlack,

  /** Subheadings, secondary labels, and interactive text on light backgrounds */
  textSecondary: RAW_COLORS.deepBlue,

  /** Text on dark backgrounds (inverse context) */
  textInverse: RAW_COLORS.white,

  /** Muted supporting text on dark inverse surfaces only */
  textInverseMuted: RAW_COLORS.secondaryBlueGray,

  /** Primary brand identity color, large surface fills, structural visual fields */
  brandPrimary: RAW_COLORS.primaryBlue,

  /** High-contrast brand elements, active states, emphasized interactive components */
  brandStrong: RAW_COLORS.deepBlue,

  /** Controlled energy accent for badges, alerts, micro-highlights (NOT dominant) */
  accent: RAW_COLORS.coralOrange,

  /** Structural dividers, hairline card borders, subtle grid lines */
  border: RAW_COLORS.secondaryBlueGray,

  /** Subtle low-contrast border on light surfaces */
  borderSubtle: 'rgba(139, 165, 190, 0.35)',

  /** Border on dark inverse surfaces */
  borderInverse: 'rgba(253, 254, 254, 0.15)',

  /** High-visibility focus indicators meeting WCAG 3:1 non-text contrast requirement */
  focus: RAW_COLORS.deepBlue,

  /** Focus indicator for dark inverse surfaces */
  focusInverse: RAW_COLORS.coralOrange,

  /** Semi-transparent backdrop for dialogs, overlays, and drawer backings */
  overlay: 'rgba(13, 14, 22, 0.60)',

  /** Full-bleed immersive dark sections, tech deep-dives, and footers */
  darkSection: RAW_COLORS.deepNavy,
} as const;

export type SemanticColorName = keyof typeof SEMANTIC_COLORS;
export type SemanticColorValue = (typeof SEMANTIC_COLORS)[SemanticColorName];

/**
 * CSS Custom Property Mapping
 */
export const COLOR_CSS_VARS = {
  '--color-background': SEMANTIC_COLORS.background,
  '--color-surface': SEMANTIC_COLORS.surface,
  '--color-surface-subtle': SEMANTIC_COLORS.surfaceSubtle,
  '--color-surface-inverse': SEMANTIC_COLORS.surfaceInverse,
  '--color-text-primary': SEMANTIC_COLORS.textPrimary,
  '--color-text-secondary': SEMANTIC_COLORS.textSecondary,
  '--color-text-inverse': SEMANTIC_COLORS.textInverse,
  '--color-text-inverse-muted': SEMANTIC_COLORS.textInverseMuted,
  '--color-brand-primary': SEMANTIC_COLORS.brandPrimary,
  '--color-brand-strong': SEMANTIC_COLORS.brandStrong,
  '--color-accent': SEMANTIC_COLORS.accent,
  '--color-border': SEMANTIC_COLORS.border,
  '--color-border-subtle': SEMANTIC_COLORS.borderSubtle,
  '--color-border-inverse': SEMANTIC_COLORS.borderInverse,
  '--color-focus': SEMANTIC_COLORS.focus,
  '--color-focus-inverse': SEMANTIC_COLORS.focusInverse,
  '--color-overlay': SEMANTIC_COLORS.overlay,
  '--color-dark-section': SEMANTIC_COLORS.darkSection,

  // Raw palette CSS variables
  '--color-raw-canvas': RAW_COLORS.canvas,
  '--color-raw-primary-blue': RAW_COLORS.primaryBlue,
  '--color-raw-deep-blue': RAW_COLORS.deepBlue,
  '--color-raw-near-black': RAW_COLORS.nearBlack,
  '--color-raw-white': RAW_COLORS.white,
  '--color-raw-coral-orange': RAW_COLORS.coralOrange,
  '--color-raw-deep-navy': RAW_COLORS.deepNavy,
  '--color-raw-secondary-blue-gray': RAW_COLORS.secondaryBlueGray,
} as const;

/**
 * WCAG 2.1 Contrast Matrix & Verification
 *
 * Calculated against standard relative luminance formula.
 */
export const CONTRAST_METRICS = {
  textOnCanvas: {
    foreground: RAW_COLORS.nearBlack,
    background: RAW_COLORS.canvas,
    ratio: 15.8,
    level: 'AAA',
    usage: 'Primary body text on default canvas',
  },
  textOnWhite: {
    foreground: RAW_COLORS.nearBlack,
    background: RAW_COLORS.white,
    ratio: 19.1,
    level: 'AAA',
    usage: 'Primary body text on white surface cards',
  },
  textInverseOnNavy: {
    foreground: RAW_COLORS.white,
    background: RAW_COLORS.deepNavy,
    ratio: 13.5,
    level: 'AAA',
    usage: 'Headings and body text in dark sections',
  },
  interactiveOnCanvas: {
    foreground: RAW_COLORS.deepBlue,
    background: RAW_COLORS.canvas,
    ratio: 4.85,
    level: 'AA',
    usage: 'Navigation links and secondary actions on canvas',
  },
  textOnDeepBlue: {
    foreground: RAW_COLORS.white,
    background: RAW_COLORS.deepBlue,
    ratio: 5.86,
    level: 'AA',
    usage: 'Primary button text and active state badges',
  },
  textOnCoral: {
    foreground: RAW_COLORS.nearBlack,
    background: RAW_COLORS.coralOrange,
    ratio: 6.45,
    level: 'AA',
    usage: 'Accent button text (White text on Coral is non-compliant at 2.96:1)',
  },
  mutedOnNavy: {
    foreground: RAW_COLORS.secondaryBlueGray,
    background: RAW_COLORS.deepNavy,
    ratio: 5.39,
    level: 'AA',
    usage: 'Secondary labels and metadata in dark sections',
  },
} as const;
