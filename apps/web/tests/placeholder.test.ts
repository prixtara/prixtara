import { describe, it, expect } from 'vitest';
import { cn } from '@prixtara/utils';
import { formatDate, slugify, truncate } from '@prixtara/utils';

/**
 * Architecture scaffold tests.
 *
 * These tests verify that the monorepo packages are correctly wired
 * together and their core utilities function correctly.
 *
 * TODO(testing): Add component render tests with @testing-library/react.
 * TODO(testing): Add integration tests for data fetching functions.
 * TODO(testing): Add snapshot tests for page layouts.
 */

describe('@prixtara/utils — cn', () => {
  it('merges class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('resolves tailwind conflicts — last class wins', () => {
    const result = cn('px-4', 'px-6');
    expect(result).toBe('px-6');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    expect(cn('base', isActive && 'active')).toBe('base active');
    expect(cn('base', !isActive && 'active')).toBe('base');
  });
});

describe('@prixtara/utils — slugify', () => {
  it('converts to lowercase slug', () => {
    expect(slugify('AI Vision Defect Detection')).toBe('ai-vision-defect-detection');
  });

  it('handles special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });
});

describe('@prixtara/utils — truncate', () => {
  it('returns string unchanged if within limit', () => {
    expect(truncate('Short text', 20)).toBe('Short text');
  });

  it('truncates and appends ellipsis', () => {
    expect(truncate('A very long string here', 15)).toBe('A very long ...');
  });
});

describe('@prixtara/utils — formatDate', () => {
  it('formats a date string', () => {
    const result = formatDate('2024-01-15', 'long', 'en-US');
    expect(result).toContain('2024');
    expect(result).toContain('15');
  });
});
