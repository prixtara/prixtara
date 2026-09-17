# Prixtara — Content Editor Manual

Welcome to the Prixtara Content Management System (CMS). This guide is designed for content editors, marketing managers, and recruitment leads.

**You do not need to write code or understand software engineering to manage the website.** All changes made in Sanity Studio are automatically reflected on the live site upon publishing.

---

## Quick Reference: Studio Navigation

When you log in to Prixtara Studio, you will see the sidebar divided into three main sections:

1. **Global Configuration**
   - **Site Settings**: Company name, logos, contact info, social accounts, and footer.
   - **Navigation & Menus**: Header menu links, CTA buttons, and footer columns.
2. **Core Pages**
   - **Homepage (Modular Canvas)**: Manage and reorder the sections on the home page.
   - **Vision Page**: Edit company principles, technology themes, and vision statement.
   - **About Page**: Edit company story, mission, leadership profiles, and milestones.
   - **Careers Page Overview**: Edit career page intro, team benefits, and culture copy.
3. **Catalogs & Directories**
   - **Products**: Create, edit, or unpublish any deep-tech product.
   - **Job Postings**: Create, edit, or pause job openings.

---

## 1. How to Create a New Product (Product A, B, C, D, E...)

The website is **100% data-driven**. You can launch completely new products without asking an engineer to create new pages or deploy code.

### Step-by-Step Instructions:

1. In the Studio sidebar, click on **Products**.
2. Click the **Create (pencil icon)** button at the top of the Products pane.
3. Fill in the **General & Overview** tab:
   - **Product Title / Name**: Enter the product name (e.g. _Quantum Sorter_).
   - **URL Slug**: Click **Generate**. The Studio will automatically create a URL-safe slug (e.g. `quantum-sorter`). Your product will be live at `prixtara.com/products/quantum-sorter`.
   - **Product Category**: Select an existing category from the dropdown (e.g. _Computer Vision_, _Autonomous Systems_) or enter a custom category.
   - **Short Description / Tagline**: Write a 1-2 sentence summary. This appears on product cards, preview teasers, and search engine results.
   - **Long Description**: Write the full product description. You can format text with headings, bold text, bulleted lists, and inline images.
4. Fill in the **Media & Gallery** tab:
   - **Thumbnail Image**: Upload a high-resolution preview image.
   - **Hero Media Asset**: Select whether the hero is an Image or a Video. Upload the asset.
   - **Product Imagery Gallery**: Add screenshots, diagrams, and hardware photos.
5. Fill in the **Problem & Solution** tab:
   - Describe the industry problem and Prixtara's solution.
6. Fill in the **Capabilities & Technical Specs** tab:
   - **Core Capabilities**: Add items highlighting key features (e.g. _High-Speed Capture_).
   - **Technical Specifications**: Group specifications (e.g. _Hardware Specs_, _Optical Tolerances_) and add key-value pairs (e.g. _Throughput_: _300 parts/min_).
   - **Quantifiable Metrics**: Add benchmark statistics (e.g. Value: `300`, Unit: `parts/min`, Label: `Throughput`).
7. Fill in the **Use Cases & Process** tab:
   - Detail target industries, operational scenarios, and implementation steps.
8. Fill in the **CTA & Related** tab:
   - Configure the conversion button (e.g. _Request Demonstration_ linking to `/contact`).
   - Select related Prixtara products from the dropdown.
9. Configure SEO (see Section 4).
10. Click the green **Publish** button in the bottom right corner.

---

## 2. How to Edit an Existing Product

1. In the Studio sidebar, click **Products**.
2. Click the product you want to edit from the list.
3. Switch between tabs (**General**, **Media**, **Problem & Solution**, **Capabilities**, **Applications**, **Conversion**, **SEO**) to update the relevant fields.
4. Your edits are saved automatically as a **Draft**.
5. When ready to push changes live, click **Publish**.

---

## 3. How to Change Product Imagery & Focal Points

Prixtara uses smart focal-point cropping. This ensures that the most important part of an image (such as a hardware sensor or component) remains centered on both mobile screens and desktop monitors.

### Replacing an Image:

1. Navigate to the product and click on the **Media & Gallery** tab.
2. Hover over the image you want to change and click the **three dots (...)** or **Replace**.
3. Upload your new image file.
4. Enter mandatory **Alternative Text (Alt Text)** describing the image for screen readers and accessibility compliance.

### Adjusting the Focal Point:

1. Hover over the image preview and click **Edit Hotspot / Crop**.
2. Drag the small blue circle onto the most important visual element (e.g. the camera lens, the defect indicator, or the person).
3. The preview frames show you how the image will be cropped across square, landscape, and portrait formats.
4. Click **Close** when satisfied.
5. Click **Publish**.

---

## 4. How to Edit SEO & Social Sharing Previews

Every page and product has a dedicated **Search Engine Optimization (SEO)** section.

### Fields Explained:

1. **Meta Title**:
   - The headline displayed in Google search results and on browser tabs.
   - Recommended length: **50 to 60 characters**. Studio will show a warning if it exceeds 70 characters.
   - Example: `AI-Vision Defect Detection | Prixtara Technologies`
2. **Meta Description**:
   - The summary snippet displayed under your title in search engines.
   - Recommended length: **120 to 160 characters**.
   - Example: `Autonomous industrial vision system detecting sub-millimeter defects at up to 300 parts per minute with 98%+ accuracy.`
3. **Open Graph / Social Sharing Image**:
   - The image that appears when a link to this page is shared on LinkedIn, X/Twitter, Slack, or WhatsApp.
   - Recommended dimensions: **1200 x 630 pixels**.
   - Always provide alt text for the OG image.
4. **Disallow Search Indexing (noindex)**:
   - Leave this **unchecked** for standard public pages.
   - Check this box only if you want search engines to hide this page (e.g. private unlisted preview or internal staging).

---

## 5. How to Publish, Unpublish, or Discard Changes

Sanity Studio maintains a clear distinction between **Draft** content and **Published** content.

### Publishing Content:

- Click the green **Publish** button in the bottom right corner.
- The button will briefly show a checkmark and the status will update to **Published**.

### Unpublishing a Document (Hiding from the Live Site):

If a product is discontinued or a job opening is filled:

1. Open the document.
2. Click the dropdown arrow next to the Publish button in the bottom right corner.
3. Select **Unpublish**.
4. The document remains in your Studio as an unpublished draft, but is immediately removed from the live website and search directories.

### Discarding Unsaved Draft Changes:

If you made edits that you want to revert back to the last published version:

1. Click the dropdown arrow next to the Publish button.
2. Select **Discard changes**.
3. The draft will revert to the currently live published state.

---

## 6. How to Add or Manage a Job Posting

1. In the Studio sidebar, click **Job Postings**.
2. Click the **Create (pencil icon)** button.
3. Fill in the listing details:
   - **Job Title**: (e.g. _Senior Robotics Engineer_).
   - **URL Slug**: Click **Generate** (creates `/career/senior-robotics-engineer`).
   - **Department**: Select the team (_Computer Vision_, _AI & Reasoning_, _Language_, _Hardware_, _Software_, _Design_).
   - **Location**: Enter location (e.g. `Bengaluru, Karnataka` or `Hybrid`).
   - **Remote Eligible**: Toggle on if remote candidates can apply.
   - **Employment Type**: Select _Full-time_, _Part-time_, _Contract_, or _Internship_.
   - **Short Summary**: 1-2 sentence elevator pitch for the careers card.
   - **Detailed Description**: Full role overview.
   - **Responsibilities**: Add key bullet points.
   - **Requirements**: Add required qualifications.
   - **Optional Requirements**: Add nice-to-have skills.
   - **Application Submission CTA**:
     - Choose **Email Submission** (e.g. `careers@prixtara.com`) or **External Application Portal / Form** (e.g. Greenhouse/Lever link).
4. **Status**: Ensure the **Published** toggle is switched **ON** (green).
5. Click **Publish**.

_Note: To pause applications without deleting the role, simply toggle the **Published** switch to OFF and click Publish._

---

## 7. How to Edit Navigation & Menus

Header links, conversion buttons, and footer link columns are managed under **Navigation & Menus**.

1. In the Studio sidebar, click **Navigation & Menus**.
2. **Primary Navigation (Header Menu)**:
   - Click an item to edit its label or link destination.
   - Drag items by their left handle to reorder menu items.
   - Click **Add item** to add a new link. Choose **Internal Route** (e.g. `/products`) or **External URL**.
   - To create a dropdown menu, open the item and add child sub-links under **Child Sub-links**.
3. **Header Call to Action**:
   - Change the button text (e.g. _Request Demo_ or _Get in Touch_).
   - Change the destination route (e.g. `/contact`).
   - Choose the visual button style (_Primary_, _Secondary_, _Outline_).
4. **Footer Navigation Columns**:
   - Reorder or add columns (e.g. _Technologies_, _Company_, _Resources_).
   - Add or remove individual links in each column.
5. Click **Publish** to update navigation across all pages.

---

## 8. How to Edit Homepage Content & Sections

The Homepage is composed of modular blocks. You can reorder, edit, or add sections freely.

1. In the Studio sidebar, click **Homepage (Modular Canvas)**.
2. In the **Homepage Sections** list, you will see each section block:
   - **Hero Section**: Edit headline, subheadline, background video, and primary CTA.
   - **Products Showcase Section**: Choose whether to display _All Published Products_ automatically or select specific _Curated Products_.
   - **Vision Highlights Section**: Edit eyebrow, headline, and core principles.
   - **Metrics & Achievements Section**: Add or update key benchmark figures.
   - **Technology Themes Section**: Highlight research vectors.
   - **Process / Workflow Section**: Update the step-by-step product implementation guide.
   - **Call to Action Section**: Edit the full-width conversion banner.
   - **Testimonials Section**: Add or update partner endorsements.
3. **Reordering Sections**: Click and drag the left edge of any section block up or down to change its order on the live homepage.
4. **Adding a New Section**: Click **Add item** at the bottom of the sections list and select the desired section type.
5. **Deleting a Section**: Click the three dots on a section block and choose **Remove**.
6. When your changes look good, click **Publish**.
