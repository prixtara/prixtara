import { describe, it, expect } from 'vitest';
import { cn, formatDate, slugify, truncate, assertNever } from '@prixtara/utils';

describe('@prixtara/utils', () => {
  describe('cn (classNames helper)', () => {
    it('merges class names correctly', () => {
      expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
    });

    it('handles conditional classes and falsy values', () => {
      expect(cn('base', false && 'hidden', null, undefined, 'active')).toBe('base active');
    });

    it('resolves conflicting Tailwind utility classes', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });
  });

  describe('slugify', () => {
    it('converts strings into clean URL-safe slugs', () => {
      expect(slugify('AI-Vision Defect Detection')).toBe('ai-vision-defect-detection');
      expect(slugify('Existential AI & Advanced Robotics')).toBe(
        'existential-ai-advanced-robotics',
      );
      expect(slugify('  Sambhashi   Multi-lingual / ISL ')).toBe('sambhashi-multi-lingual-isl');
    });

    it('strips punctuation and special characters', () => {
      expect(slugify('Hello World! #1 @Prixtara')).toBe('hello-world-1-prixtara');
      expect(slugify('---leading-trailing---')).toBe('leading-trailing');
    });
  });

  describe('formatDate', () => {
    const testDate = '2025-01-15T10:30:00.000Z';

    it('formats a date string in long style by default', () => {
      const formatted = formatDate(testDate, 'long', 'en-US');
      expect(formatted).toBe('January 15, 2025');
    });

    it('formats a date in short style', () => {
      const formatted = formatDate(testDate, 'short', 'en-US');
      expect(formatted).toBe('Jan 15, 2025');
    });

    it('supports Date objects directly', () => {
      const d = new Date('2025-06-20T00:00:00.000Z');
      const formatted = formatDate(d, 'long', 'en-US');
      expect(formatted).toContain('June 20, 2025');
    });
  });

  describe('truncate', () => {
    it('does not truncate strings shorter than max length', () => {
      expect(truncate('Short string', 20)).toBe('Short string');
      expect(truncate('Exact length string', 19)).toBe('Exact length string');
    });

    it('truncates strings longer than max length with ellipsis', () => {
      expect(truncate('This is a very long string that should be cut', 20)).toBe(
        'This is a very lo...',
      );
      expect(truncate('This is a very long string that should be cut', 20).length).toBe(20);
    });
  });

  describe('assertNever', () => {
    it('throws an error with unhandled value', () => {
      expect(() => assertNever('unexpected' as never)).toThrow('Unhandled case: "unexpected"');
    });
  });
});
