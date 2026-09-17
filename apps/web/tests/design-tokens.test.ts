import { describe, it, expect } from 'vitest';
import {
  RAW_COLORS,
  SEMANTIC_COLORS,
  COLOR_CSS_VARS,
  CONTRAST_METRICS,
  FONT_FAMILIES,
  TYPE_SCALE,
  SPACING_SCALE,
  LAYOUT_SPACING,
  RADIUS_SCALE,
  BORDER_WIDTHS,
  BORDER_TOKENS,
  MOTION_DURATIONS,
  MOTION_EASINGS,
  tokens,
} from '@prixtara/config/tokens';

describe('Design Tokens — Prixtara Color System', () => {
  it('contains all 8 required raw colors with exact hex values', () => {
    expect(RAW_COLORS.canvas).toBe('#E5E9EC');
    expect(RAW_COLORS.primaryBlue).toBe('#698EB5');
    expect(RAW_COLORS.deepBlue).toBe('#32669A');
    expect(RAW_COLORS.nearBlack).toBe('#0D0E16');
    expect(RAW_COLORS.white).toBe('#FDFEFE');
    expect(RAW_COLORS.coralOrange).toBe('#E57967');
    expect(RAW_COLORS.deepNavy).toBe('#202839');
    expect(RAW_COLORS.secondaryBlueGray).toBe('#8BA5BE');
  });

  it('defines all required semantic color roles', () => {
    expect(SEMANTIC_COLORS.background).toBe(RAW_COLORS.canvas);
    expect(SEMANTIC_COLORS.surface).toBe(RAW_COLORS.white);
    expect(SEMANTIC_COLORS.surfaceInverse).toBe(RAW_COLORS.deepNavy);
    expect(SEMANTIC_COLORS.textPrimary).toBe(RAW_COLORS.nearBlack);
    expect(SEMANTIC_COLORS.textSecondary).toBe(RAW_COLORS.deepBlue);
    expect(SEMANTIC_COLORS.textInverse).toBe(RAW_COLORS.white);
    expect(SEMANTIC_COLORS.brandPrimary).toBe(RAW_COLORS.primaryBlue);
    expect(SEMANTIC_COLORS.brandStrong).toBe(RAW_COLORS.deepBlue);
    expect(SEMANTIC_COLORS.accent).toBe(RAW_COLORS.coralOrange);
    expect(SEMANTIC_COLORS.border).toBe(RAW_COLORS.secondaryBlueGray);
    expect(SEMANTIC_COLORS.focus).toBe(RAW_COLORS.deepBlue);
    expect(SEMANTIC_COLORS.overlay).toBe('rgba(13, 14, 22, 0.60)');
    expect(SEMANTIC_COLORS.darkSection).toBe(RAW_COLORS.deepNavy);
  });

  it('maps semantic colors to standard CSS variable keys', () => {
    expect(COLOR_CSS_VARS['--color-background']).toBe(SEMANTIC_COLORS.background);
    expect(COLOR_CSS_VARS['--color-surface']).toBe(SEMANTIC_COLORS.surface);
    expect(COLOR_CSS_VARS['--color-text-primary']).toBe(SEMANTIC_COLORS.textPrimary);
    expect(COLOR_CSS_VARS['--color-accent']).toBe(SEMANTIC_COLORS.accent);
    expect(COLOR_CSS_VARS['--color-border']).toBe(SEMANTIC_COLORS.border);
    expect(COLOR_CSS_VARS['--color-focus']).toBe(SEMANTIC_COLORS.focus);
    expect(COLOR_CSS_VARS['--color-dark-section']).toBe(SEMANTIC_COLORS.darkSection);
  });

  it('provides WCAG 2.1 verified contrast ratios', () => {
    expect(CONTRAST_METRICS.textOnCanvas.ratio).toBeGreaterThanOrEqual(7.0); // AAA
    expect(CONTRAST_METRICS.textOnCanvas.level).toBe('AAA');
    expect(CONTRAST_METRICS.textOnWhite.ratio).toBeGreaterThanOrEqual(7.0); // AAA
    expect(CONTRAST_METRICS.textInverseOnNavy.ratio).toBeGreaterThanOrEqual(7.0); // AAA
    expect(CONTRAST_METRICS.interactiveOnCanvas.ratio).toBeGreaterThanOrEqual(4.5); // AA
    expect(CONTRAST_METRICS.textOnDeepBlue.ratio).toBeGreaterThanOrEqual(4.5); // AA
    expect(CONTRAST_METRICS.textOnCoral.ratio).toBeGreaterThanOrEqual(4.5); // AA
  });
});

describe('Design Tokens — Typography System', () => {
  it('defines provisional font families', () => {
    expect(FONT_FAMILIES.display).toContain('Space Grotesk');
    expect(FONT_FAMILIES.heading).toContain('Space Grotesk');
    expect(FONT_FAMILIES.body).toContain('Inter');
    expect(FONT_FAMILIES.mono).toContain('JetBrains Mono');
  });

  it('defines all required type scale tokens', () => {
    const requiredScales = [
      'display-hero',
      'display-xl',
      'display-lg',
      'heading-xl',
      'heading-lg',
      'heading-md',
      'body-lg',
      'body-md',
      'body-sm',
      'label',
      'metadata',
    ] as const;

    for (const scaleName of requiredScales) {
      expect(TYPE_SCALE[scaleName]).toBeDefined();
      expect(TYPE_SCALE[scaleName].fontSize).toBeDefined();
      expect(TYPE_SCALE[scaleName].lineHeight).toBeDefined();
      expect(TYPE_SCALE[scaleName].letterSpacing).toBeDefined();
      expect(TYPE_SCALE[scaleName].fontWeight).toBeDefined();
    }
  });

  it('orders type scale sizes logically from hero down to metadata', () => {
    const heroSize = parseFloat(TYPE_SCALE['display-hero'].fontSize);
    const bodyMdSize = parseFloat(TYPE_SCALE['body-md'].fontSize);
    const metaSize = parseFloat(TYPE_SCALE['metadata'].fontSize);

    expect(heroSize).toBeGreaterThan(bodyMdSize);
    expect(bodyMdSize).toBeGreaterThan(metaSize);
  });
});

describe('Design Tokens — Spacing & Layout', () => {
  it('follows 4px/8px modular scale', () => {
    expect(SPACING_SCALE[1].px).toBe(4);
    expect(SPACING_SCALE[2].px).toBe(8);
    expect(SPACING_SCALE[3].px).toBe(12);
    expect(SPACING_SCALE[4].px).toBe(16);
    expect(SPACING_SCALE[6].px).toBe(24);
    expect(SPACING_SCALE[8].px).toBe(32);
  });

  it('defines semantic layout spacing aliases', () => {
    expect(LAYOUT_SPACING.inlineTight).toBe('0.25rem');
    expect(LAYOUT_SPACING.insetMd).toBe('1.5rem');
    expect(LAYOUT_SPACING.sectionDesktop).toBe('6rem');
  });
});

describe('Design Tokens — Radius, Borders & Motion', () => {
  it('defines architectural corner radius tokens', () => {
    expect(RADIUS_SCALE.none).toBe('0px');
    expect(RADIUS_SCALE.sm).toBe('0.25rem');
    expect(RADIUS_SCALE.md).toBe('0.5rem');
    expect(RADIUS_SCALE.lg).toBe('0.75rem');
    expect(RADIUS_SCALE.full).toBe('9999px');
  });

  it('defines border widths and semantic tokens', () => {
    expect(BORDER_WIDTHS.sm).toBe('1px');
    expect(BORDER_WIDTHS.md).toBe('2px');
    expect(BORDER_TOKENS.default).toBe('1px solid var(--color-border)');
    expect(BORDER_TOKENS.focus).toBe('2px solid var(--color-focus)');
  });

  it('defines conceptual motion tokens without executing animations', () => {
    expect(MOTION_DURATIONS.fast).toBe('150ms');
    expect(MOTION_DURATIONS.standard).toBe('300ms');
    expect(MOTION_DURATIONS.slow).toBe('500ms');

    expect(MOTION_EASINGS.standard).toContain('cubic-bezier');
    expect(MOTION_EASINGS.emphasis).toContain('cubic-bezier');
    expect(MOTION_EASINGS.cinematic).toContain('cubic-bezier');
  });

  it('aggregates all tokens into unified tokens object', () => {
    expect(tokens.colors.raw).toBe(RAW_COLORS);
    expect(tokens.colors.semantic).toBe(SEMANTIC_COLORS);
    expect(tokens.typography.scale).toBe(TYPE_SCALE);
    expect(tokens.spacing.scale).toBe(SPACING_SCALE);
    expect(tokens.radius.scale).toBe(RADIUS_SCALE);
    expect(tokens.borders.widths).toBe(BORDER_WIDTHS);
    expect(tokens.motion.durations).toBe(MOTION_DURATIONS);
  });
});
