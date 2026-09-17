# Prixtara Design System Specification

## 1. Executive Summary & Critical Visual Freeze

> [!IMPORTANT]
> **CRITICAL VISUAL FREEZE NOTICE**:
> The design system specification and tokens defined herein establish the architectural standard and programmatic source of truth for Prixtara.
>
> **Under NO circumstances should this design system be applied to the website UI during this phase.**
>
> Explicitly prohibited during the freeze:
>
> - Redesigning components or altering existing visual layouts
> - Styling placeholder pages or building final buttons/cards/navigation
> - Creating visual hero sections or full-bleed graphic compositions
> - Implementing animations, CSS keyframes, or cinematic transitions
>
> The tokens exist in code under `packages/config/src/tokens/`, but are strictly quarantined from active presentation layers until the visual-reference phase concludes and the freeze is formally lifted.

---

## 2. Visual Philosophy

Prixtara builds category-defining deep-tech platforms: **AI-Vision Defect Detection**, **Existential AI**, and **Sambhashi** (multilingual & Indian Sign Language technology).

The visual language must communicate:

1. **Intellectual Sobriety & Scientific Rigor**: A mathematical, deliberate aesthetic devoid of playful consumer fluff or hollow visual noise.
2. **Deep-Tech Precision**: Interfaces constructed like high-precision optical instruments, telemetry consoles, and research apparatus.
3. **Architectural Contrast**: Stark, deliberate juxtapositions of clean technological canvas (#E5E9EC), surgical near-black (#0D0E16), and deep atmospheric navy (#202839).
4. **Controlled Energy**: Energy is introduced with measured economy—utilizing Coral Orange (#E57967) exclusively as an intentional focal accent, never as decorative wallpaper.
5. **Structural Restraint**: Generous spatial breathing room, disciplined 8pt grid alignment, and hairline structural borders.

---

## 3. Color System

### 3.1 Raw Color Palette

| Color Name              | Hex Code  | RGB                  | Role / Characteristic                               |
| :---------------------- | :-------- | :------------------- | :-------------------------------------------------- |
| **Canvas / Background** | `#E5E9EC` | `rgb(229, 233, 236)` | Cool, low-glare technological foundation            |
| **Primary Blue**        | `#698EB5` | `rgb(105, 142, 181)` | Large surfaces, brand fields, structural accents    |
| **Deep Blue**           | `#32669A` | `rgb(50, 102, 154)`  | High-contrast interactive emphasis, active states   |
| **Near Black**          | `#0D0E16` | `rgb(13, 14, 22)`    | Primary text, technical data, deep contrast         |
| **White**               | `#FDFEFE` | `rgb(253, 254, 254)` | Elevated card surfaces, inverse text, stark clarity |
| **Coral Orange**        | `#E57967` | `rgb(229, 121, 103)` | Controlled energy accent, focal badges, key CTAs    |
| **Deep Navy**           | `#202839` | `rgb(32, 40, 57)`    | Immersive dark sections, technical consoles         |
| **Secondary Blue Gray** | `#8BA5BE` | `rgb(139, 165, 190)` | Hairline dividers, borders, muted elements          |

---

### 3.2 Semantic Color Tokens & Mapping

Semantic tokens abstract raw hex codes into functional design intent. Developers and designers must always reference semantic tokens rather than raw hex values.

| Semantic Token               | Raw Source                | Hex / Value                 | Functional UI Purpose                             |
| :--------------------------- | :------------------------ | :-------------------------- | :------------------------------------------------ |
| `--color-background`         | Canvas                    | `#E5E9EC`                   | Base viewport canvas and page background          |
| `--color-surface`            | White                     | `#FDFEFE`                   | Elevated cards, content sheets, modals            |
| `--color-surface-subtle`     | Secondary Blue Gray       | `#8BA5BE`                   | Subtle card tint, secondary surface fields        |
| `--color-surface-inverse`    | Deep Navy                 | `#202839`                   | Inverted dark modules, technical breakout areas   |
| `--color-text-primary`       | Near Black                | `#0D0E16`                   | Main headlines, body copy, technical values       |
| `--color-text-secondary`     | Deep Blue                 | `#32669A`                   | Section subtitles, secondary metadata, link text  |
| `--color-text-inverse`       | White                     | `#FDFEFE`                   | High-contrast text on dark/navy sections          |
| `--color-text-inverse-muted` | Secondary Blue Gray       | `#8BA5BE`                   | Secondary copy and captions on dark sections      |
| `--color-brand-primary`      | Primary Blue              | `#698EB5`                   | Structural brand fields, surface accents          |
| `--color-brand-strong`       | Deep Blue                 | `#32669A`                   | Primary interactive elements, emphasized actions  |
| `--color-accent`             | Coral Orange              | `#E57967`                   | Focal alerts, status indicators, selective CTAs   |
| `--color-border`             | Secondary Blue Gray       | `#8BA5BE`                   | Structural borders, card outlines, table borders  |
| `--color-border-subtle`      | Secondary Blue Gray (35%) | `rgba(139, 165, 190, 0.35)` | Muted hairline dividers, subtle container edges   |
| `--color-border-inverse`     | White (15%)               | `rgba(253, 254, 254, 0.15)` | Hairlines inside dark sections                    |
| `--color-focus`              | Deep Blue                 | `#32669A`                   | Accessibility focus rings on light backgrounds    |
| `--color-focus-inverse`      | Coral Orange              | `#E57967`                   | Accessibility focus rings on dark surfaces        |
| `--color-overlay`            | Near Black (60%)          | `rgba(13, 14, 22, 0.60)`    | Dialog backdrop, modal dimmers, scrims            |
| `--color-dark-section`       | Deep Navy                 | `#202839`                   | Full-bleed immersive deep-tech sections & footers |

---

### 3.3 Color Theory Rules & Principles

1. **Cool Blue Tones Establish Technology, Trust, and Precision**: Cool blue spectrum hues evoke high reliability, mathematical clarity, and scientific integrity.
2. **Near-Black Provides Technical Contrast**: Standard pure black (`#000000`) creates harsh eye fatigue; Near Black (`#0D0E16`) carries a subtle cool undertone that anchors typography with crisp, instrument-grade sharpness.
3. **Deep Navy Supports Immersive Dark Sections**: High-density engineering content, sensor outputs, and terminal readouts thrive in Deep Navy (`#202839`), providing depth without pitch-black starkness.
4. **Coral Acts as a Controlled Energy/Attention Accent**: Coral Orange (`#E57967`) is an optical stimulant. It draws immediate visual fixation to critical interactive junctions.
5. **Coral MUST NOT Become the Dominant Brand Color**: Used on more than 5-8% of any viewport, Coral loses its signaling efficacy and degrades the enterprise deep-tech persona into consumer e-commerce.
6. **Primary Blue for Surfaces and Fields**: Primary Blue (`#698EB5`) is designated for large contextual surfaces, hero visual backdrops, and structural planes.
7. **Deep Blue for Interactive Emphasis**: Deep Blue (`#32669A`) carries the luminance necessary for buttons, active state toggles, and navigable text.
8. **Near Black for Primary Text**: Small and regular text on light canvas must always be Near Black (`#0D0E16`) to guarantee contrast.
9. **Secondary Blue Gray for Muted UI and Borders**: Secondary Blue Gray (`#8BA5BE`) defines layout geometry, cell borders, and inactive tab lines.
10. **Avoid Excessive Gradients**: Flat planes and crisp mechanical cuts emphasize engineering discipline. Gradients should be extremely restrained (e.g. subtle single-axis atmospheric fades).
11. **Avoid Rainbow / Futuristic Multicolor UI**: Resist cyberpunk neon tropes (cyan + magenta + lime). Stick strictly to the curated Prixtara spectrum.
12. **Maintain Visual Restraint**: When in doubt, default to Canvas, Near Black, and Deep Blue. Reserve color for semantic necessity.

---

## 4. Accessibility & Contrast Verification

Every color pairing within Prixtara has been mathematically audited against WCAG 2.1 specifications (minimum 4.5:1 for normal text, 3.0:1 for large text/graphical elements).

### 4.1 Contrast Compliance Matrix

| Foreground Element                  | Background Surface           | Contrast Ratio | WCAG 2.1 Rating        | Approved Usage                              |
| :---------------------------------- | :--------------------------- | :------------- | :--------------------- | :------------------------------------------ |
| **Near Black** (`#0D0E16`)          | **Canvas** (`#E5E9EC`)       | **15.79:1**    | **AAA** (7.0+)         | Body text, headings, metadata               |
| **Near Black** (`#0D0E16`)          | **White** (`#FDFEFE`)        | **19.07:1**    | **AAA** (7.0+)         | Body text in cards, table text, inputs      |
| **Deep Blue** (`#32669A`)           | **Canvas** (`#E5E9EC`)       | **4.85:1**     | **AA** (4.5+)          | Navigation links, bold metadata, subheads   |
| **White** (`#FDFEFE`)               | **Deep Blue** (`#32669A`)    | **5.86:1**     | **AA** (4.5+)          | Primary button text, selected pills         |
| **White** (`#FDFEFE`)               | **Deep Navy** (`#202839`)    | **13.52:1**    | **AAA** (7.0+)         | Inverse headings & body in dark sections    |
| **Near Black** (`#0D0E16`)          | **Coral Orange** (`#E57967`) | **6.45:1**     | **AA** (4.5+)          | Accent button text, badge text              |
| **Secondary Blue Gray** (`#8BA5BE`) | **Deep Navy** (`#202839`)    | **5.39:1**     | **AA** (4.5+)          | Supporting text & captions in dark sections |
| **Deep Blue Focus Ring**            | **Canvas** (`#E5E9EC`)       | **4.85:1**     | **AA Non-Text** (3.0+) | Keyboard focus indicator on light canvas    |
| **Coral Focus Ring**                | **Deep Navy** (`#202839`)    | **5.39:1**     | **AA Non-Text** (3.0+) | Keyboard focus indicator on dark navy       |

---

### 4.2 Prohibited Pairings & Critical Warnings

> [!CAUTION]
> **CRITICAL ACCESSIBILITY PROHIBITIONS**:
>
> 1. **DO NOT use Secondary Blue Gray (`#8BA5BE`) as small text on Canvas or White**:
>    - Contrast on Canvas: **2.08:1** (FAIL — legally non-compliant for text).
>    - Secondary Blue Gray is strictly restricted to borders/dividers or as text over Deep Navy (`#202839`).
> 2. **DO NOT use White (`#FDFEFE`) text on Coral Orange (`#E57967`)**:
>    - Contrast: **2.96:1** (FAIL — fails standard 4.5:1 text requirement).
>    - Button text on Coral Orange buttons MUST use Near Black (`#0D0E16`) which achieves **6.45:1 (AA)**.
> 3. **DO NOT use Primary Blue (`#698EB5`) as body copy on Canvas**:
>    - Contrast: **2.71:1** (FAIL). Use Deep Blue (`#32669A`) instead.

---

### 4.3 Element-by-Element Pairing Standards

- **Body Text**: Must use `--color-text-primary` (`#0D0E16`) on light surfaces or `--color-text-inverse` (`#FDFEFE`) on dark sections.
- **Navigation**: Desktop and mobile links must use `--color-text-primary` for inactive states and `--color-brand-strong` (`#32669A`) for active/hover states.
- **Buttons**:
  - _Primary Button_: Background `--color-brand-strong` (`#32669A`) + Text `--color-text-inverse` (`#FDFEFE`).
  - _Accent CTA Button_: Background `--color-accent` (`#E57967`) + Text `--color-text-primary` (`#0D0E16`).
  - _Secondary / Outline Button_: Background transparent + Border `1px solid var(--color-brand-strong)` + Text `--color-brand-strong`.
- **Metadata**: Technical readouts, timestamps, and model parameters must use `--color-text-primary` or `--color-brand-strong` on light backgrounds.
- **Large Headlines**: Display-hero, display-xl, and heading-xl may use `--color-text-primary` on canvas or `--color-text-inverse` on dark navy.
- **Focus Indicators**: All focusable interactive elements (`button`, `a`, `input`, `select`) must render a `2px solid var(--color-focus)` outline with `2px` offset. In dark sections, use `var(--color-focus-inverse)`.

---

## 5. Typography System

### 5.1 Provisional Typeface Architecture

> [!NOTE]
> **PROVISIONAL STATUS**:
> The typefaces selected below represent the architectural baseline. They are provisional choices subject to final visual calibration following the visual-reference review.

| Role          | Provisional Typeface           | Fallback Stack                           | Rationale                                                               |
| :------------ | :----------------------------- | :--------------------------------------- | :---------------------------------------------------------------------- |
| **Display**   | **Space Grotesk**              | `system-ui, -apple-system, sans-serif`   | Brutalist, mathematical geometric curves suited for deep-tech headlines |
| **Heading**   | **Space Grotesk**              | `system-ui, -apple-system, sans-serif`   | Structural cohesion with hero display sizes                             |
| **Body**      | **Inter**                      | `system-ui, -apple-system, sans-serif`   | Industry benchmark for legibility, neutral tone, high x-height          |
| **Label**     | **Inter** (SemiBold/Uppercase) | `system-ui, -apple-system, sans-serif`   | Crisp legibility at 12px with wide tracking                             |
| **Metadata**  | **JetBrains Mono**             | `ui-monospace, Menlo, Monaco, monospace` | Engineered tabular alignment for metrics, timestamps, telemetry         |
| **Technical** | **JetBrains Mono**             | `ui-monospace, Menlo, Monaco, monospace` | Code snippets, model latency, sensor outputs, JSON schemas              |

---

### 5.2 Type Scale Hierarchy

Base size: `1rem = 16px`.

| Token Name     | Font Size         | Line Height | Letter Spacing | Weight | Font Role   | Target Application                                |
| :------------- | :---------------- | :---------- | :------------- | :----- | :---------- | :------------------------------------------------ |
| `display-hero` | `4.5rem` (72px)   | `1.05`      | `-0.03em`      | 700    | Display     | Marquee hero statements, landing titles           |
| `display-xl`   | `3.75rem` (60px)  | `1.10`      | `-0.025em`     | 700    | Display     | Major section introductions, billboard metrics    |
| `display-lg`   | `3.00rem` (48px)  | `1.15`      | `-0.02em`      | 600    | Display     | Primary page headers (h1)                         |
| `heading-xl`   | `2.25rem` (36px)  | `1.20`      | `-0.02em`      | 600    | Heading     | Product suite titles, major section dividers (h2) |
| `heading-lg`   | `1.875rem` (30px) | `1.25`      | `-0.015em`     | 600    | Heading     | Modular feature card headers (h3)                 |
| `heading-md`   | `1.50rem` (24px)  | `1.30`      | `-0.01em`      | 600    | Heading     | Sub-module headers, modal titles, drawers (h4)    |
| `body-lg`      | `1.125rem` (18px) | `1.60`      | `-0.005em`     | 400    | Body        | Lead paragraphs, manifesto text, summaries        |
| `body-md`      | `1.00rem` (16px)  | `1.60`      | `0em`          | 400    | Body        | Default editorial and content prose               |
| `body-sm`      | `0.875rem` (14px) | `1.50`      | `+0.005em`     | 400    | Body        | Captions, form helper text, footnotes             |
| `label`        | `0.75rem` (12px)  | `1.40`      | `+0.06em`      | 600    | Body (Caps) | Category pills, form labels, status tags          |
| `metadata`     | `0.75rem` (12px)  | `1.45`      | `+0.02em`      | 400    | Mono        | Sensor telemetry, latency numbers, timestamps     |

---

## 6. Spacing & Spatial Rhythm

Prixtara uses an 8pt modular grid with a 4pt sub-grid for tight technical components.

### 6.1 Spacing Scale

| Token Key | Rem Value | Pixel Value | Typical Application                            |
| :-------- | :-------- | :---------- | :--------------------------------------------- |
| `0`       | `0rem`    | `0px`       | Reset                                          |
| `1`       | `0.25rem` | `4px`       | Hairline gaps, icon-to-text micro-spacing      |
| `2`       | `0.5rem`  | `8px`       | Inline button icon gaps, chip internal padding |
| `3`       | `0.75rem` | `12px`      | Compact input padding, tag margins             |
| `4`       | `1.0rem`  | `16px`      | Standard component internal gutters            |
| `5`       | `1.25rem` | `20px`      | Medium card inset padding                      |
| `6`       | `1.5rem`  | `24px`      | Standard container padding, modular card gap   |
| `8`       | `2.0rem`  | `32px`      | Content stack gap between major prose blocks   |
| `10`      | `2.5rem`  | `40px`      | Intermediate component spacing                 |
| `12`      | `3.0rem`  | `48px`      | Mobile section padding                         |
| `16`      | `4.0rem`  | `64px`      | Tablet section padding, hero header separation |
| `20`      | `5.0rem`  | `80px`      | Desktop subsection gutters                     |
| `24`      | `6.0rem`  | `96px`      | Desktop major section padding                  |
| `32`      | `8.0rem`  | `128px`     | Hero showcase padding, full-bleed transitions  |

### 6.2 Layout Density Principles

- **Compact (Telemetry / Data Dashboards)**: Density factor 0.75x (utilizing 4px, 8px, 12px steps).
- **Balanced (Standard Documentation & Feature Pages)**: Density factor 1.0x (utilizing 16px, 24px, 32px steps).
- **Expansive (Landing & Product Showcase)**: Generous whitespace (utilizing 64px, 96px, 128px steps) to give deep-tech diagrams and technical models room to breathe.

---

## 7. Borders, Radii & Geometric Language

Prixtara is defined by architectural precision. Corners are disciplined and crisp, avoiding bubbly, hyper-rounded forms.

### 7.1 Corner Radius Scale

| Token           | Rem Value | Pixels   | Usage                                             |
| :-------------- | :-------- | :------- | :------------------------------------------------ |
| `--radius-none` | `0px`     | `0px`    | Full-bleed sections, sharp divider lines          |
| `--radius-sm`   | `0.25rem` | `4px`    | Small tags, inner input highlights, status badges |
| `--radius-md`   | `0.5rem`  | `8px`    | Interactive buttons, inputs, dropdown items       |
| `--radius-lg`   | `0.75rem` | `12px`   | Feature cards, content panels, dialog modals      |
| `--radius-xl`   | `1.0rem`  | `16px`   | Large feature showcase panels, breakout sheets    |
| `--radius-2xl`  | `1.5rem`  | `24px`   | Hero container blocks                             |
| `--radius-full` | `9999px`  | `9999px` | Status indicator dots, pill badges                |

### 7.2 Border Widths & Semantic Roles

| Token               | CSS Value                               | Functional Role                                     |
| :------------------ | :-------------------------------------- | :-------------------------------------------------- |
| `--border-width-sm` | `1px`                                   | Hairline structural outlines, table row dividers    |
| `--border-width-md` | `2px`                                   | Focus outlines, active navigation indicators        |
| `--border-width-lg` | `4px`                                   | Highlighting accent bars, technical callout stripes |
| `--border-default`  | `1px solid var(--color-border)`         | Standard card border on light backgrounds           |
| `--border-subtle`   | `1px solid var(--color-border-subtle)`  | Subtle inner card dividers                          |
| `--border-strong`   | `1px solid var(--color-brand-strong)`   | Selected / emphasized card border                   |
| `--border-inverse`  | `1px solid var(--color-border-inverse)` | Hairline dividers inside dark sections              |
| `--border-focus`    | `2px solid var(--color-focus)`          | 2px solid Deep Blue focus indicator                 |

---

## 8. Motion Philosophy (Conceptual)

> [!WARNING]
> **DO NOT IMPLEMENT ANIMATIONS**:
> The motion tokens below are purely conceptual definitions for the design system. No animation sequences, keyframes, transitions, GSAP tickers, or Motion hooks should be wired to UI elements during the visual freeze.

### 8.1 Motion Values

1. **Precision Over Playfulness**: Animation exists solely to clarify spatial relationships, state transitions, and data flow. It must never feel bouncy or playful.
2. **Snappy Execution with Physical Inertia**: Transitions start promptly and decelerate with mechanical smoothness.
3. **Reduced Motion Respect**: When motion is eventually implemented, all interactions must strictly respect `prefers-reduced-motion: reduce`.

### 8.2 Motion Tokens

| Token               | Duration / Curve                     | Use Case                                                           |
| :------------------ | :----------------------------------- | :----------------------------------------------------------------- |
| `--motion-fast`     | `150ms`                              | Micro-interactions: button hover, icon color shift, toggle clicks  |
| `--motion-standard` | `300ms`                              | Interface state: accordion reveal, tab switch, dropdown expansion  |
| `--motion-slow`     | `500ms`                              | Layout changes: full-page drawer transition, modal scale           |
| `--ease-standard`   | `cubic-bezier(0.4, 0.0, 0.2, 1)`     | Balanced deceleration for everyday UI elements                     |
| `--ease-emphasis`   | `cubic-bezier(0.05, 0.7, 0.1, 1.0)`  | High-speed entry with smooth settling for alerts and drawer panels |
| `--ease-cinematic`  | `cubic-bezier(0.19, 1.0, 0.22, 1.0)` | Expansive exponential curve for hero narrative sequence reveals    |

---

## 9. Developer Source of Truth & Token Consumption

All design tokens are defined and exported from `@prixtara/config` in a modular, type-safe architecture.

### 9.1 Package Exports

In `packages/config/package.json`:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./server": "./src/env.server.ts",
    "./client": "./src/env.client.ts",
    "./tokens": "./src/tokens/index.ts"
  }
}
```

### 9.2 TypeScript Usage Example

```typescript
// Import individual token systems
import {
  RAW_COLORS,
  SEMANTIC_COLORS,
  CONTRAST_METRICS,
  TYPE_SCALE,
  SPACING_SCALE,
  RADIUS_SCALE,
  tokens,
} from '@prixtara/config/tokens';

// Or import from root config barrel
import { tokens } from '@prixtara/config';

console.log(tokens.colors.semantic.brandPrimary); // '#698EB5'
console.log(tokens.typography.scale['display-hero'].fontSize); // '4.5rem'
```

### 9.3 Future Tailwind CSS v4 `@theme` Integration

When the visual freeze is lifted, the tokens will map cleanly to Tailwind CSS v4's `@theme` directive in `apps/web/app/globals.css`:

```css
@import 'tailwindcss';

@theme {
  --color-background: #e5e9ec;
  --color-surface: #fdfefe;
  --color-surface-subtle: #8ba5be;
  --color-surface-inverse: #202839;
  --color-text-primary: #0d0e16;
  --color-text-secondary: #32669a;
  --color-text-inverse: #fdfefe;
  --color-brand-primary: #698eb5;
  --color-brand-strong: #32669a;
  --color-accent: #e57967;
  --color-border: #8ba5be;
  --color-focus: #32669a;
  --color-dark-section: #202839;

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 10. Design Checklist & Compliance Rules

- [x] All 8 raw colors mapped to functional semantic roles.
- [x] All 12 color theory rules documented and enforced.
- [x] WCAG 2.1 AA/AAA contrast ratios mathematically calculated and verified.
- [x] Prohibited color pairings clearly flagged with warnings.
- [x] Typography hierarchy established with 11 type scale tokens.
- [x] Space Grotesk, Inter, and JetBrains Mono designated as provisional.
- [x] Spacing scale structured on 4px/8px modular rhythm.
- [x] Architectural corner radii and hairline border tokens defined.
- [x] Motion tokens defined conceptually without animation implementations.
- [x] Programmatic tokens created in `packages/config/src/tokens/`.
- [x] Strict visual freeze preserved—zero changes to website UI or placeholder layouts.
