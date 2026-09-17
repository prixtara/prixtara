/**
 * Normalized Navigation domain models.
 */

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}
