/**
 * GROQ query for Site Settings document.
 */
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  _id,
  _type,
  companyName,
  logo {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption,
    credit
  },
  logoDark {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption,
    credit
  },
  favicon {
    asset-> { _id, url }
  },
  primaryContact,
  socialLinks[] {
    platform,
    label,
    url
  },
  defaultSeo {
    metaTitle,
    metaDescription,
    canonicalUrl,
    ogImage {
      asset-> { _id, url, metadata { dimensions } },
      alt
    },
    noindex,
    structuredData
  },
  defaultOgImage {
    asset-> { _id, url, metadata { dimensions } },
    altText,
    caption,
    credit
  },
  footer {
    copyrightText,
    tagline,
    disclaimer,
    legalLinks[] {
      label,
      href,
      isExternal
    }
  }
}`;
