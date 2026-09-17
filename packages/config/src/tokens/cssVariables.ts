/**
 * @prixtara/config/tokens/cssVariables
 *
 * Prixtara Design System — CSS Custom Property Aggregation
 *
 * Visual Freeze Notice:
 * These variables provide a centralized map of CSS custom property names to values.
 * They MUST NOT be attached to active UI stylesheets until the freeze is lifted.
 */

import { COLOR_CSS_VARS } from './colors';
import { TYPOGRAPHY_CSS_VARS } from './typography';
import { SPACING_CSS_VARS } from './spacing';
import { RADIUS_CSS_VARS } from './radius';
import { BORDER_CSS_VARS } from './borders';
import { MOTION_CSS_VARS } from './motion';

/**
 * All Prixtara Design System CSS Custom Properties
 */
export const ALL_CSS_VARS = {
  ...COLOR_CSS_VARS,
  ...TYPOGRAPHY_CSS_VARS,
  ...SPACING_CSS_VARS,
  ...RADIUS_CSS_VARS,
  ...BORDER_CSS_VARS,
  ...MOTION_CSS_VARS,
} as const;

export type CssVarName = keyof typeof ALL_CSS_VARS;

/**
 * Generates formatted CSS declarations string
 *
 * @param selector - Target CSS selector (defaults to ':root')
 */
export function generateCssVariablesString(selector = ':root'): string {
  const lines = Object.entries(ALL_CSS_VARS).map(([key, value]) => `  ${key}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
}
