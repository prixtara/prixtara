import type { CmsNavigation, CmsSiteSettings } from '../types';

export interface HeaderNavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
  badge?: string;
  children?: Array<{
    label: string;
    description?: string;
    path: string;
    isExternal?: boolean;
  }>;
}

export interface FooterNavigationSection {
  title: string;
  items: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
}

export const SEED_HEADER_NAVIGATION: HeaderNavigationItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'Vision', href: '/vision' },
  { label: 'Career', href: '/career' },
  { label: 'About', href: '/about' },
];

export const SEED_FOOTER_NAVIGATION: FooterNavigationSection[] = [
  {
    title: 'Technologies',
    items: [
      { label: 'AI-Vision Defect Detection', href: '/products/ai-vision-defect-detection' },
      { label: 'Existential AI', href: '/products/existential-ai' },
      { label: 'Sambhashi', href: '/products/sambhashi' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Vision', href: '/vision' },
      { label: 'Career', href: '/career' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function normalizeCmsNavigation(raw: CmsNavigation): {
  header: HeaderNavigationItem[];
  footer: FooterNavigationSection[];
  cta?: CmsNavigation['cta'];
} {
  const header: HeaderNavigationItem[] = (raw.primaryNavigation || []).map((item) => ({
    label: item.label,
    href: item.linkType === 'external' ? item.externalUrl || '#' : item.internalPath || '#',
    isExternal: item.linkType === 'external',
    badge: item.badge,
    children: item.children,
  }));

  const footer: FooterNavigationSection[] = (raw.footerNavigation || []).map((col) => ({
    title: col.columnTitle,
    items: (col.links || []).map((l) => ({
      label: l.label,
      href: l.href,
      isExternal: Boolean(l.isExternal),
    })),
  }));

  return {
    header: header.length > 0 ? header : SEED_HEADER_NAVIGATION,
    footer: footer.length > 0 ? footer : SEED_FOOTER_NAVIGATION,
    cta: raw.cta,
  };
}

export function normalizeCmsSiteSettings(raw: CmsSiteSettings) {
  return {
    id: raw._id,
    companyName: raw.companyName,
    primaryContact: raw.primaryContact,
    socialLinks: raw.socialLinks || [],
    defaultSeo: raw.defaultSeo,
    footer: raw.footer,
  };
}
