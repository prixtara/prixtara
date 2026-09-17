/**
 * @prixtara/config/tokens/motion
 *
 * Prixtara Design System — Conceptual Motion Tokens (Source of Truth)
 *
 * Visual Freeze Notice:
 * These tokens define conceptual durations and easing curves for Prixtara's
 * future motion language.
 *
 * CRITICAL RULE: DO NOT IMPLEMENT ANIMATIONS.
 * These are token definitions only. No CSS keyframes, transitions, GSAP
 * sequences, or Motion animations should be attached to UI elements.
 */

/**
 * Conceptual Duration Scale
 */
export const MOTION_DURATIONS = {
  /** 150ms — Micro-interactions, hover states, toggles, icon color shifts */
  fast: '150ms',

  /** 300ms — Standard UI transitions, modal entry, dropdown disclosure, tab switching */
  standard: '300ms',

  /** 500ms — Complex layout expansions, full-page transitions, drawer slides */
  slow: '500ms',
} as const;

export type MotionDurationKey = keyof typeof MOTION_DURATIONS;

/**
 * Conceptual Easing Curves (Cubic Beziers)
 *
 * Designed to evoke high-tech precision, physical weight, and refined restraint.
 */
export const MOTION_EASINGS = {
  /** Standard smooth deceleration for natural UI movements */
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

  /** Weighted punch for attention-commanding notifications and active card reveals */
  emphasis: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',

  /** Ultra-smooth exponential deceleration for expansive camera moves and section reveals */
  cinematic: 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
} as const;

export type MotionEasingKey = keyof typeof MOTION_EASINGS;

/**
 * CSS Custom Property Mapping for Motion
 */
export const MOTION_CSS_VARS = {
  '--motion-fast': MOTION_DURATIONS.fast,
  '--motion-standard': MOTION_DURATIONS.standard,
  '--motion-slow': MOTION_DURATIONS.slow,

  '--ease-standard': MOTION_EASINGS.standard,
  '--ease-emphasis': MOTION_EASINGS.emphasis,
  '--ease-cinematic': MOTION_EASINGS.cinematic,
} as const;
