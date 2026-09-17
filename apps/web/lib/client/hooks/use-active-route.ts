'use client';

import { usePathname } from 'next/navigation';
import { isRouteActive } from '../../routes/matchers';

/**
 * Client-side hook to determine if a specific target path is currently active.
 *
 * @param targetPath - The path to test against the current location
 * @param exact - Whether to match strictly (true for '/', false for nested segments)
 */
export function useActiveRoute(targetPath: string, exact = false): boolean {
  const pathname = usePathname();
  if (!pathname) return false;
  return isRouteActive(pathname, targetPath, exact);
}
