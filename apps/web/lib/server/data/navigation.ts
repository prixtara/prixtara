import 'server-only';
import { cache } from 'react';
import { getNavigationRepository } from '../repositories';
import type { NavigationItem, NavigationSection } from '../models';

export const getHeaderNavigation = cache(async (): Promise<NavigationItem[]> => {
  return getNavigationRepository().getHeaderNavigation();
});

export const getFooterNavigation = cache(async (): Promise<NavigationSection[]> => {
  return getNavigationRepository().getFooterNavigation();
});
