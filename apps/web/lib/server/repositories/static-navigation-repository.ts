import 'server-only';

import { HEADER_NAVIGATION, FOOTER_NAVIGATION } from '../../config';
import type { NavigationItem, NavigationSection } from '../models';
import type { NavigationRepository } from './interfaces';

export class StaticNavigationRepository implements NavigationRepository {
  async getHeaderNavigation(): Promise<NavigationItem[]> {
    return HEADER_NAVIGATION;
  }

  async getFooterNavigation(): Promise<NavigationSection[]> {
    return FOOTER_NAVIGATION;
  }
}
