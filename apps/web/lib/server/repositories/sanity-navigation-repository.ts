import 'server-only';

import { getNavigation, normalizeCmsNavigation, isSanityConfigured } from '@prixtara/cms';
import { HEADER_NAVIGATION, FOOTER_NAVIGATION } from '../../config';
import type { NavigationItem, NavigationSection } from '../models';
import { StaticNavigationRepository } from './static-navigation-repository';

/**
 * Sanity-backed Navigation repository implementation.
 *
 * Queries CMS Navigation document, normalizes menu items, and provides
 * graceful fallback to verified static navigation configuration.
 */
export class SanityNavigationRepository extends StaticNavigationRepository {
  override async getHeaderNavigation(): Promise<NavigationItem[]> {
    try {
      if (isSanityConfigured()) {
        const raw = await getNavigation();
        if (raw) {
          const normalized = normalizeCmsNavigation(raw);
          if (normalized.header && normalized.header.length > 0) {
            return normalized.header.map((item, index) => ({
              id: `header-nav-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || index}`,
              label: item.label,
              href: item.href,
              isExternal: item.isExternal,
            }));
          }
        }
      }
    } catch (error) {
      console.warn(
        '[SanityNavigationRepository] Failed to fetch header navigation from CMS:',
        error,
      );
    }
    return HEADER_NAVIGATION;
  }

  override async getFooterNavigation(): Promise<NavigationSection[]> {
    try {
      if (isSanityConfigured()) {
        const raw = await getNavigation();
        if (raw) {
          const normalized = normalizeCmsNavigation(raw);
          if (normalized.footer && normalized.footer.length > 0) {
            return normalized.footer.map((section, sIndex) => ({
              id: `footer-sec-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || sIndex}`,
              title: section.title,
              items: section.items.map((item, iIndex) => ({
                id: `footer-item-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || iIndex}`,
                label: item.label,
                href: item.href,
                isExternal: item.isExternal,
              })),
            }));
          }
        }
      }
    } catch (error) {
      console.warn(
        '[SanityNavigationRepository] Failed to fetch footer navigation from CMS:',
        error,
      );
    }
    return FOOTER_NAVIGATION;
  }
}
