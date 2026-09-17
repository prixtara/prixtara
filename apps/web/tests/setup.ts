import { vi } from 'vitest';

/**
 * Vitest test setup file.
 *
 * Runs before each test suite.
 */

// Mock server-only to allow testing server modules in jsdom environment
vi.mock('server-only', () => ({}));
