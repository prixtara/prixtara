import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility & Keyboard Navigation (WCAG 2.1 AA)', () => {
  test('keyboard smoke test: skip link receives initial focus and moves focus to main-content', async ({
    page,
  }) => {
    await page.goto('/');

    // Initial Tab press focuses the Skip Link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveText('Skip to main content');

    // Press Enter to activate the skip link
    await page.keyboard.press('Enter');

    // Main content container receives focus
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('keyboard smoke test: main navigation links are sequential and focusable', async ({
    page,
  }) => {
    await page.goto('/');

    // Tab through Skip Link into header navigation
    await page.keyboard.press('Tab'); // Skip Link
    await page.keyboard.press('Tab'); // Home logo link

    const homeLink = page.locator('header nav a[href="/"]');
    await expect(homeLink).toBeFocused();

    await page.keyboard.press('Tab'); // Products
    const productsLink = page.locator('header nav a[href="/products"]');
    await expect(productsLink).toBeFocused();

    await page.keyboard.press('Tab'); // Vision
    const visionLink = page.locator('header nav a[href="/vision"]');
    await expect(visionLink).toBeFocused();

    await page.keyboard.press('Tab'); // Careers
    const careerLink = page.locator('header nav a[href="/career"]');
    await expect(careerLink).toBeFocused();

    await page.keyboard.press('Tab'); // About
    const aboutLink = page.locator('header nav a[href="/about"]');
    await expect(aboutLink).toBeFocused();
  });

  test.describe('Automated axe-core Accessibility Scans', () => {
    test('homepage passes axe-core accessibility audit with zero critical/serious violations', async ({
      page,
    }) => {
      await page.goto('/');
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const criticalOrSerious = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(criticalOrSerious).toEqual([]);
    });

    test('products listing page passes axe-core accessibility audit', async ({ page }) => {
      await page.goto('/products');
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const criticalOrSerious = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(criticalOrSerious).toEqual([]);
    });

    test('product detail page passes axe-core accessibility audit', async ({ page }) => {
      await page.goto('/products/ai-vision-defect-detection');
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const criticalOrSerious = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(criticalOrSerious).toEqual([]);
    });

    test('careers page passes axe-core accessibility audit', async ({ page }) => {
      await page.goto('/career');
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const criticalOrSerious = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(criticalOrSerious).toEqual([]);
    });

    test('career detail page passes axe-core accessibility audit', async ({ page }) => {
      await page.goto('/career/senior-computer-vision-engineer');
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const criticalOrSerious = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(criticalOrSerious).toEqual([]);
    });

    test('about page passes axe-core accessibility audit', async ({ page }) => {
      await page.goto('/about');
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const criticalOrSerious = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(criticalOrSerious).toEqual([]);
    });

    test('404 page passes axe-core accessibility audit', async ({ page }) => {
      await page.goto('/unknown-page-route-404');
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const criticalOrSerious = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(criticalOrSerious).toEqual([]);
    });
  });
});
