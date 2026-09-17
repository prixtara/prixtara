/**
 * GROQ query for Homepage document with expanded polymorphic sections.
 */
export const homepageQuery = `*[_type == "homepage"][0] {
  _id,
  _type,
  title,
  sections[] {
    _key,
    _type,
    _type == "heroSection" => {
      headline,
      subheadline,
      tagline,
      primaryCta { label, linkType, internalPath, externalUrl, variant },
      secondaryCta { label, linkType, internalPath, externalUrl, variant },
      backgroundVideo {
        title,
        videoFile { asset-> { _id, url } },
        externalUrl,
        posterImage { asset-> { _id, url }, altText },
        autoPlay,
        loop
      },
      backgroundImage { asset-> { _id, url }, altText, caption, credit },
      badges
    },
    _type == "productsSection" => {
      sectionTitle,
      sectionSubtitle,
      displayMode,
      displayMode == "manual" => {
        curatedProducts[]-> {
          _id,
          title,
          "slug": slug.current,
          productCategory,
          shortDescription,
          thumbnail { asset-> { _id, url }, altText, caption },
          metrics[] { value, unit, label, highlight }
        }
      },
      displayMode == "all" => {
        "allProducts": *[_type == "product"] | order(_createdAt asc) {
          _id,
          title,
          "slug": slug.current,
          productCategory,
          shortDescription,
          thumbnail { asset-> { _id, url }, altText, caption },
          metrics[] { value, unit, label, highlight }
        }
      },
      viewAllCta { label, linkType, internalPath, externalUrl, variant }
    },
    _type == "visionSection" => {
      eyebrow,
      headline,
      description,
      principles[] { number, title, description, impact },
      featuredMedia { asset-> { _id, url }, altText, caption, credit },
      cta { label, linkType, internalPath, externalUrl, variant }
    },
    _type == "metricsSection" => {
      sectionTitle,
      sectionSubtitle,
      metrics[] { value, unit, label, context, highlight }
    },
    _type == "techThemesSection" => {
      sectionTitle,
      sectionDescription,
      themes[] { title, description, badge, iconName }
    },
    _type == "processSection" => {
      sectionTitle,
      sectionDescription,
      steps[] { stepNumber, title, description, duration }
    },
    _type == "ctaSection" => {
      headline,
      description,
      primaryCta { label, linkType, internalPath, externalUrl, variant },
      secondaryCta { label, linkType, internalPath, externalUrl, variant }
    },
    _type == "testimonialsSection" => {
      sectionTitle,
      quotes[] {
        quote,
        author,
        role,
        organization,
        avatar { asset-> { _id, url }, altText }
      }
    }
  },
  seo {
    metaTitle,
    metaDescription,
    canonicalUrl,
    ogImage { asset-> { _id, url }, alt },
    noindex,
    structuredData
  }
}`;
