/**
 * PostCSS configuration for Tailwind CSS v4.
 *
 * Tailwind v4 uses @tailwindcss/postcss as a standalone PostCSS plugin.
 * Configuration is done via CSS @theme directive in globals.css,
 * not via tailwind.config.ts.
 *
 * TODO(design): Customise the Tailwind theme via @theme in globals.css
 * during the visual design phase.
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
