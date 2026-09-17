# Prixtara — CMS Content Model Specification

## 1. Executive Summary & Goals

The Prixtara CMS architecture is engineered around a core mandate: **a non-developer must be able to manage the entire website without touching source code or redeploying the application**.

Key architectural tenets:

1. **100% Data-Driven Products**: The website can support arbitrarily many products (`Product A`, `Product B`, `Product C`, `Product D`, `Product E`, etc.) via the CMS without creating new React page files or altering TypeScript static unions.
2. **Modular Block Architecture**: Marketing pages, notably the Homepage, are modeled as polymorphic section blocks that can be added, reordered, or modified without writing JSX.
3. **Strict Layer Decoupling**:
   - **CMS Schemas** (`packages/cms/src/schemas`) — Single-source-of-truth Sanity schemas consumed by Sanity Studio.
   - **GROQ Queries** (`packages/cms/src/queries`) — Centralized queries retrieving precise document projections.
   - **Type Generation** (`packages/cms/src/type-generation`) — Automated Sanity typegen outputting TypeScript definitions.
   - **Adapters & Boundary Validation** (`packages/cms/src/adapters`) — Zod-validated transforms creating UI-facing normalized models.
   - **Presentation Layer** (`apps/web`) — Consumes only normalized domain models through server repositories.
4. **Draft & Live Preview**: Real-time drafting and preview support integrated with Next.js App Router Draft Mode.

---

## 2. Monorepo Package Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        apps/studio                          │
│               Sanity Studio v3 Desk Tool                    │
└──────────────────────────────┬──────────────────────────────┘
                               │ Imports Schemas
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      @prixtara/cms                          │
│  ├── /schemas          Sanity document and object schemas   │
│  ├── /queries          Centralized GROQ query suite         │
│  ├── /client           Sanity client, draft, & image URL    │
│  ├── /adapters         Data normalizers & Zod validation    │
│  └── /type-generation  Generated sanity.types.ts            │
└──────────────────────────────┬──────────────────────────────┘
                               │ Normalizes to Domain Models
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 apps/web (lib/server)                       │
│    CmsProductRepository, CmsPageRepository, etc.            │
└──────────────────────────────┬──────────────────────────────┘
                               │ Server Components
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
│      /products/[slug], /vision, /career, /about, /          │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. The 10 Document & Object Types

### 3.1. Site Settings (`siteSettings`) — Singleton Document

Manages global branding, contact details, social profiles, global fallback SEO, and legal footer information.

| Field            | Type                  | Description                                                                           |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------- |
| `companyName`    | `string`              | Legal corporate name (e.g. _Prixtara Technologies Pvt. Ltd._)                         |
| `logo`           | `captionedImage`      | Primary brand mark for header navigation and brand displays                           |
| `logoDark`       | `captionedImage`      | High-contrast variant for dark mode                                                   |
| `favicon`        | `image`               | Square browser icon (PNG/ICO)                                                         |
| `primaryContact` | `object`              | General email, technical support email, phone, physical address, office hours         |
| `socialLinks`    | `array of socialLink` | Platform (`linkedin`, `x`, `github`, `youtube`, `instagram`), label, profile URL      |
| `defaultSeo`     | `seo`                 | Global fallback metadata applied when individual pages omit overrides                 |
| `defaultOgImage` | `captionedImage`      | Global 1200x630 fallback social sharing image                                         |
| `footer`         | `object`              | Dynamic copyright notice (`{year}` macro supported), tagline, disclaimer, legal links |

---

### 3.2. Navigation (`navigation`) — Singleton Document

Controls header navigation, primary conversion action, multi-column footer directories, and external links.

| Field               | Type                    | Description                                                                |
| ------------------- | ----------------------- | -------------------------------------------------------------------------- |
| `primaryNavigation` | `array of navItem`      | Ordered top-level header links with optional mega-menu sub-links           |
| `cta`               | `cta`                   | Prominent header conversion button (_Request Demo_, _Contact Us_)          |
| `footerNavigation`  | `array of footerColumn` | Multi-column links grouped by section (_Technologies_, _Company_, _Legal_) |
| `externalLinks`     | `array of object`       | External ecosystem links, documentation portals, and partner directories   |

---

### 3.3. Homepage (`homepage`) — Singleton Document

Models the homepage as a canvas of modular, reorderable section blocks:

| Section Block Type    | Core Fields                                                                                                        | Purpose                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `heroSection`         | `headline`, `subheadline`, `tagline`, `primaryCta`, `secondaryCta`, `backgroundVideo`, `backgroundImage`, `badges` | High-impact above-the-fold brand and positioning statement   |
| `productsSection`     | `sectionTitle`, `sectionSubtitle`, `displayMode` (`all` vs `manual`), `curatedProducts`, `viewAllCta`              | Dynamic or curated showcase of Prixtara's deep-tech products |
| `visionSection`       | `eyebrow`, `headline`, `description`, `principles`, `featuredMedia`, `cta`                                         | Architectural north star and foundational principles summary |
| `metricsSection`      | `sectionTitle`, `sectionSubtitle`, `metrics` (`value`, `unit`, `label`, `context`, `highlight`)                    | Quantifiable engineering and scientific benchmarks           |
| `techThemesSection`   | `sectionTitle`, `sectionDescription`, `themes` (`title`, `description`, `badge`, `iconName`)                       | Scientific vectors (Edge CV, On-Device AI, ISL Synthesis)    |
| `processSection`      | `sectionTitle`, `sectionDescription`, `steps` (`stepNumber`, `title`, `description`, `duration`)                   | End-to-end operational workflow breakdown                    |
| `ctaSection`          | `headline`, `description`, `primaryCta`, `secondaryCta`                                                            | Full-width conversion banner                                 |
| `testimonialsSection` | `sectionTitle`, `quotes` (`quote`, `author`, `role`, `organization`, `avatar`)                                     | Institutional endorsements and pilot partner quotes          |
| `seo`                 | `seo`                                                                                                              | Dedicated homepage search engine and social graph metadata   |

---

### 3.4. Product (`product`) — Collection Document

**Data-Driven Scalability Engine**: Represents each deep-tech technology. Any new document published in Studio is immediately accessible under `/products/[slug]`.

| Field Group      | Field              | Type                          | Specification                                                                                                          |
| ---------------- | ------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **General**      | `title`            | `string`                      | Canonical product name (e.g. _AI-Vision Defect Detection_)                                                             |
|                  | `slug`             | `slug`                        | URL slug auto-generated from title (`[a-z0-9-]+`)                                                                      |
|                  | `productCategory`  | `string`                      | `computer-vision`, `artificial-intelligence`, `language-technology`, `edge-computing`, `autonomous-systems`, or custom |
|                  | `shortDescription` | `string`                      | Card teaser and meta description snippet (max 300 chars)                                                               |
|                  | `longDescription`  | `portableText`                | Comprehensive rich-text narrative with formatted sections                                                              |
| **Media**        | `thumbnail`        | `captionedImage`              | Image used on product index cards and navigation previews                                                              |
|                  | `heroMedia`        | `object`                      | Featured image or video asset for product page top fold                                                                |
|                  | `gallery`          | `array of captionedImage`     | Hardware schematics, interface screenshots, and installation photos                                                    |
|                  | `video`            | `videoMedia`                  | Dedicated product demo or technical walkthrough video                                                                  |
| **Details**      | `problemStatement` | `portableText`                | The industrial or societal bottleneck being resolved                                                                   |
|                  | `solution`         | `portableText`                | Prixtara's engineering and algorithm architecture                                                                      |
| **Architecture** | `capabilities`     | `array of capabilityItem`     | Modular capabilities (`title`, `description`, `badge`, `metricsSummary`)                                               |
|                  | `technicalDetails` | `array of technicalSpecGroup` | Key-value specifications grouped by domain (_Hardware_, _Optical_, _Inference_)                                        |
|                  | `metrics`          | `array of metricItem`         | Verified benchmark statistics (_300 parts/min_, _0.1 mm_, _98%+_, _< 30 min_)                                          |
|                  | `features`         | `array of object`             | Highlighting specific product capabilities and edge advantages                                                         |
| **Applications** | `useCases`         | `array of object`             | Target audience, operational scenario, and verified outcome                                                            |
|                  | `applications`     | `array of object`             | Industry deployments (_Automotive_, _Banking_, _Defense_, _Pharma_)                                                    |
|                  | `process`          | `array of object`             | Step-by-step installation and operation workflow                                                                       |
| **Conversion**   | `cta`              | `cta`                         | Action button (_Request Demonstration_, _Inquire About Deployment_)                                                    |
|                  | `relatedProducts`  | `array of reference`          | Cross-links to other Prixtara products                                                                                 |
| **SEO**          | `seo`              | `seo`                         | Product-specific title, description, and canonical overrides                                                           |

---

### 3.5. Vision (`visionPage`) — Singleton Document

Documents Prixtara's long-horizon technology philosophy and foundational tenets.

| Field              | Type                     | Description                                                                                                                             |
| ------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `title`            | `string`                 | Page heading                                                                                                                            |
| `introduction`     | `text`                   | Core thesis statement on edge computing, privacy, and inclusion                                                                         |
| `contentSections`  | `array of object`        | Thematic sections (`heading`, `subheading`, `body`, `media`)                                                                            |
| `principles`       | `array of principleItem` | Guiding tenets (_01: Privacy by Physical Architecture_, _02: Deterministic Real-Time Execution_, _03: Radical Accessibility & Dignity_) |
| `technologyThemes` | `array of object`        | Research vectors with scientific categories and research tags                                                                           |
| `media`            | `captionedImage`         | Laboratory and architectural diagrams                                                                                                   |
| `seo`              | `seo`                    | Vision page search and social graph configuration                                                                                       |

---

### 3.6. Career (`careerPage`) — Singleton Document

Overview of Prixtara's team, engineering culture, and compensation/benefit philosophy.

| Field            | Type                   | Description                                                                    |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------ |
| `title`          | `string`               | Page title                                                                     |
| `introHeadline`  | `string`               | Header callout (_Engineer Systems at the Edge of Physical & Cognitive Limits_) |
| `pageContent`    | `portableText`         | Overview of research autonomy, lab facilities, and team life                   |
| `cultureContent` | `object`               | Culture headline, narrative, and core values                                   |
| `benefits`       | `array of benefitItem` | Comprehensive perks grouped by category (_Compute_, _Equity_, _Health_)        |
| `cta`            | `object`               | Open application guidance and direct resume submission email                   |
| `seo`            | `seo`                  | Careers page SEO metadata                                                      |

---

### 3.7. Job Posting (`jobPosting`) — Collection Document

Individual roles dynamically listed on `/career` and rendered under `/career/[slug]`.

| Field                  | Type              | Description                                                          |
| ---------------------- | ----------------- | -------------------------------------------------------------------- |
| `title`                | `string`          | Role title (e.g. _Senior Computer Vision Engineer_)                  |
| `slug`                 | `slug`            | Unique URL path                                                      |
| `department`           | `string`          | Engineering, Research, Product, Hardware, Operations                 |
| `location`             | `string`          | Physical location or remote designation                              |
| `isRemote`             | `boolean`         | Remote eligibility flag                                              |
| `employmentType`       | `string`          | `full-time`, `part-time`, `contract`, `internship`                   |
| `summary`              | `text`            | Card snippet for the job listings directory                          |
| `description`          | `portableText`    | Detailed project scope and day-to-day context                        |
| `responsibilities`     | `array of string` | Bullet points outlining primary responsibilities                     |
| `requirements`         | `array of string` | Must-have engineering and academic qualifications                    |
| `optionalRequirements` | `array of string` | Preferred/nice-to-have skills                                        |
| `published`            | `boolean`         | Instant toggle to open or pause applications                         |
| `publishedAt`          | `datetime`        | Publication timestamp                                                |
| `applicationCta`       | `object`          | Application method (`email` or `url`), destination, and instructions |
| `seo`                  | `seo`             | JobPosting structured data configuration                             |

---

### 3.8. About (`aboutPage`) — Singleton Document

Presents Prixtara's corporate story, mission, vision, leadership, and landmark milestones.

| Field          | Type                     | Description                                                             |
| -------------- | ------------------------ | ----------------------------------------------------------------------- |
| `title`        | `string`                 | Page title                                                              |
| `tagline`      | `string`                 | Brand ethos statement                                                   |
| `companyStory` | `portableText`           | Historical origin, deep-tech convictions, and company growth            |
| `mission`      | `text`                   | Concrete daily purpose                                                  |
| `vision`       | `text`                   | Long-term destination                                                   |
| `leadership`   | `array of teamMember`    | Leadership team members (`name`, `role`, `bio`, `image`, `socialLinks`) |
| `media`        | `captionedImage`         | Facility or leadership photography                                      |
| `milestones`   | `array of milestoneItem` | Timeline entries (`yearOrDate`, `title`, `description`, `highlight`)    |
| `seo`          | `seo`                    | About page SEO settings                                                 |

---

### 3.9. SEO Object (`seo`) — Reusable Object

Reusable across all documents and pages to ensure uniform search engine optimization:

| Field             | Type      | Rules & Validation                                           |
| ----------------- | --------- | ------------------------------------------------------------ |
| `metaTitle`       | `string`  | Recommended 50-60 chars; warnings generated at > 70 chars    |
| `metaDescription` | `text`    | Recommended 120-160 chars; warnings generated at > 160 chars |
| `canonicalUrl`    | `url`     | Explicit canonical URL override                              |
| `ogImage`         | `image`   | Open Graph image with hotspot and required alt text          |
| `noindex`         | `boolean` | Disallow search engine crawlers                              |
| `structuredData`  | `object`  | Schema.org type and raw JSON-LD overrides                    |

---

### 3.10. Media Metadata (`captionedImage` & `videoMedia`) — Reusable Objects

Guarantees accessibility and visual presentation integrity across all media assets:

| Schema           | Fields                                                                 | Description                                                                            |
| ---------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `captionedImage` | `asset`, `hotspot`, `crop`, `altText`, `caption`, `credit`             | Enforces mandatory `altText` for accessibility and SEO. Supports focal-point cropping. |
| `videoMedia`     | `title`, `videoFile`, `externalUrl`, `posterImage`, `autoPlay`, `loop` | Supports uploaded MP4/WebM files or external streaming links with poster images.       |

---

## 4. Grounded Seed Data Provenance

All initial seed products and content models are strictly grounded in Prixtara source materials (`source-of-info/source-of-info.pptx`, `source-of-info2.jpeg`, `source-of-info2.1.jpeg`):

1. **AI-Vision Defect Detection**:
   - **Throughput**: 300 parts/minute with no line slowdown.
   - **Precision**: 0.1 mm defect detection threshold.
   - **Accuracy**: 98%+ benchmarked across complex part geometries.
   - **Setup Time**: < 30 minutes no-code training by shop-floor operators.
   - **Hardware**: Controlled conveyor, programmable LED lighting, high-speed optical cameras, 3-way pneumatic sorting (OK, Reject, Rework).

2. **Existential AI**:
   - **Operating Mode**: 100% On-Device / Offline. Zero cloud dependency.
   - **Form Factor**: 25 cm self-contained desktop node with battery module.
   - **Acoustic Hardware**: 6 far-field microphone array with hardware mute.
   - **Privacy Verification**: Physical hardware privacy indicator LED.
   - **Safety Architecture**: Conversational memory, emotional context awareness, deterministic crisis detection.

3. **Sambhashi**:
   - **Linguistic Breadth**: Indian Sign Language (ISL) ↔ 12 constitutional Indian languages (Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, Urdu).
   - **Speech Engines**: Bhashini STT / TTS integration.
   - **Latency**: < 200 ms real-time turn-taking.
   - **Deployment**: Teller counter terminal designed for banking inclusion (e.g. State Bank of India counter workflows).
