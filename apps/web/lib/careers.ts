/**
 * Server-side career data access facade.
 *
 * Architecture boundary: Pages consume career data through this facade or '@/lib/server'.
 */
import 'server-only';

export {
  getActiveJobOpenings,
  getJobOpeningBySlug,
  getAllJobOpeningSlugs,
} from './server/data/careers';
export type { NormalizedJobOpening } from './server/models';
