/**
 * Server-side CMS data fetching utilities.
 *
 * This module is an intermediary between the route layer and @prixtara/cms.
 * Pages and layouts call functions here — never importing from @prixtara/cms
 * directly.
 *
 * Architecture rule: All data-fetching is isolated in lib/ — keep pages clean.
 *
 * TODO(cms): Add request memoisation via React cache() for deduplication.
 * TODO(cms): Add error handling / fallback patterns.
 * TODO(monitoring): Add telemetry for CMS query performance.
 */
import 'server-only';

import { sanityClient } from '@prixtara/cms/client';

export { sanityClient };
