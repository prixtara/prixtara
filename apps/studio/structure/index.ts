import { type StructureBuilder } from 'sanity/structure';

/**
 * Helper to build singleton document list items (prevents duplicate document creation).
 */
const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title: string,
  id: string = typeName,
) =>
  S.listItem()
    .title(title)
    .id(id)
    .schemaType(typeName)
    .child(S.document().schemaType(typeName).documentId(id));

/**
 * Sanity Studio structure builder.
 *
 * Customises the Studio sidebar navigation into intuitive editorial domains:
 * - Configuration & Global (Site Settings, Navigation)
 * - Core Marketing Pages (Homepage, Vision, Career Page, About)
 * - Catalogs & Directories (Products, Job Postings)
 */
export function structure(S: StructureBuilder) {
  return S.list()
    .title('Prixtara Content')
    .items([
      // Global Configuration
      singletonListItem(S, 'siteSettings', 'Site Settings'),
      singletonListItem(S, 'navigation', 'Navigation & Menus'),

      S.divider(),

      // Core Pages
      singletonListItem(S, 'homepage', 'Homepage (Modular Canvas)'),
      singletonListItem(S, 'visionPage', 'Vision Page'),
      singletonListItem(S, 'aboutPage', 'About Page'),
      singletonListItem(S, 'careerPage', 'Careers Page Overview'),

      S.divider(),

      // Data-Driven Catalogs
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('All Products').filter('_type == "product"')),

      S.listItem()
        .title('Job Postings')
        .schemaType('jobPosting')
        .child(
          S.documentTypeList('jobPosting')
            .title('All Job Postings')
            .filter('_type == "jobPosting"'),
        ),
    ]);
}
