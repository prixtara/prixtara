/**
 * GROQ query for Site Navigation document.
 */
export const navigationQuery = `*[_type == "navigation"][0] {
  _id,
  _type,
  title,
  primaryNavigation[] {
    label,
    description,
    linkType,
    internalPath,
    externalUrl,
    openInNewTab,
    badge,
    children[] {
      label,
      description,
      path,
      isExternal
    }
  },
  cta {
    label,
    linkType,
    internalPath,
    externalUrl,
    variant,
    openInNewTab
  },
  footerNavigation[] {
    columnTitle,
    links[] {
      label,
      href,
      isExternal,
      badge
    }
  },
  externalLinks[] {
    label,
    url,
    description,
    openInNewTab
  }
}`;
