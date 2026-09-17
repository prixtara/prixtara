import { type StructureBuilder } from 'sanity/structure';

/**
 * Sanity Studio structure builder.
 *
 * Customises the Studio sidebar navigation.
 * Default structure groups documents by type; override here for custom grouping.
 *
 * TODO(cms): Add singleton document handling (siteSettings, navigation).
 * TODO(cms): Add dividers between document groups.
 * TODO(cms): Add custom views (preview pane) when live preview is configured.
 */
export function structure(S: StructureBuilder) {
  return S.list()
    .title('Prixtara Content')
    .items([
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),

      S.divider(),

      S.listItem()
        .title('Job Openings')
        .schemaType('jobOpening')
        .child(S.documentTypeList('jobOpening').title('Job Openings')),

      // TODO(cms): S.listItem().title('Pages').schemaType('page')...
      // TODO(cms): S.listItem().title('Site Settings').id('siteSettings')...
    ]);
}
