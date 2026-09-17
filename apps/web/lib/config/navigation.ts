import { routes } from '../routes';

export interface HeaderNavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterNavSection {
  id: string;
  title: string;
  items: HeaderNavItem[];
}

export const HEADER_NAVIGATION: HeaderNavItem[] = [
  { id: 'nav-products', label: 'Products', href: routes.products() },
  { id: 'nav-vision', label: 'Vision', href: routes.vision() },
  { id: 'nav-career', label: 'Careers', href: routes.career() },
  { id: 'nav-about', label: 'About', href: routes.about() },
];

export const FOOTER_NAVIGATION: FooterNavSection[] = [
  {
    id: 'footer-solutions',
    title: 'Solutions',
    items: [
      { id: 'footer-products', label: 'Products Overview', href: routes.products() },
      { id: 'footer-vision', label: 'Our Vision', href: routes.vision() },
    ],
  },
  {
    id: 'footer-company',
    title: 'Company',
    items: [
      { id: 'footer-about', label: 'About Us', href: routes.about() },
      { id: 'footer-career', label: 'Careers', href: routes.career() },
    ],
  },
];
