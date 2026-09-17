/**
 * @prixtara/config/tokens
 *
 * Prixtara Design System — Design Tokens Barrel
 *
 * Token Source of Truth for:
 * - Color System (Raw palette, semantic roles, WCAG contrast verification)
 * - Typography System (Font families, type scale, letter spacing, line heights)
 * - Spacing System (4px/8px modular scale, layout aliases)
 * - Radius System (Architectural corner scales)
 * - Border System (Widths, semantic borders)
 * - Motion Tokens (Conceptual durations & easing curves)
 * - CSS Custom Properties (Variable mappings & string generator)
 *
 * CRITICAL VISUAL FREEZE:
 * These tokens define the design-system specification in code.
 * They MUST NOT be applied to existing placeholder pages or used to redesign UI
 * until the visual reference phase is complete and the freeze is officially lifted.
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './borders';
export * from './motion';
export * from './cssVariables';

import { RAW_COLORS, SEMANTIC_COLORS, COLOR_CSS_VARS, CONTRAST_METRICS } from './colors';
import { FONT_FAMILIES, TYPE_SCALE, TYPOGRAPHY_CSS_VARS } from './typography';
import { SPACING_SCALE, LAYOUT_SPACING, SPACING_CSS_VARS } from './spacing';
import { RADIUS_SCALE, RADIUS_CSS_VARS } from './radius';
import { BORDER_WIDTHS, BORDER_TOKENS, BORDER_CSS_VARS } from './borders';
import { MOTION_DURATIONS, MOTION_EASINGS, MOTION_CSS_VARS } from './motion';
import { ALL_CSS_VARS, generateCssVariablesString } from './cssVariables';

/**
 * Unified tokens object representing the entire Prixtara design system.
 */
export const tokens = {
  colors: {
    raw: RAW_COLORS,
    semantic: SEMANTIC_COLORS,
    cssVars: COLOR_CSS_VARS,
    contrast: CONTRAST_METRICS,
  },
  typography: {
    fontFamilies: FONT_FAMILIES,
    scale: TYPE_SCALE,
    cssVars: TYPOGRAPHY_CSS_VARS,
  },
  spacing: {
    scale: SPACING_SCALE,
    layout: LAYOUT_SPACING,
    cssVars: SPACING_CSS_VARS,
  },
  radius: {
    scale: RADIUS_SCALE,
    cssVars: RADIUS_CSS_VARS,
  },
  borders: {
    widths: BORDER_WIDTHS,
    semantic: BORDER_TOKENS,
    cssVars: BORDER_CSS_VARS,
  },
  motion: {
    durations: MOTION_DURATIONS,
    easings: MOTION_EASINGS,
    cssVars: MOTION_CSS_VARS,
  },
  css: {
    allVars: ALL_CSS_VARS,
    generateVariablesString: generateCssVariablesString,
  },
} as const;
