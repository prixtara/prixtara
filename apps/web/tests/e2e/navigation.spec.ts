import { test, expect } from '@playwright/test';

test.describe('Navigation & Route Behavior', () => {
  test('homepage loads correctly with semantic hero and featured products', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Prixtara Technologies/);
    await expect(page.locator('h1')).toHaveText('Prixtara Technologies');
    await expect(page.locator('section[aria-label="Hero"]')).toBeVisible();
    await expect(page.locator('section[aria-label="Featured Products"]')).toBeVisible();

    // Verify presence of quick links
    const productsLink = page.locator('nav[aria-label="Quick links"] a[href="/products"]');
    await expect(productsLink).toBeVisible();

    const visionLink = page.locator('nav[aria-label="Quick links"] a[href="/vision"]');
    await expect(visionLink).toBeVisible();
  });

  test('products listing page renders all products and links to product details', async ({
    page,
  }) => {
    const response = await page.goto('/products');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveText('Our Products');

    const productLinks = page.locator('nav[aria-label="Products directory"] a');
    const count = await productLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Click first product link and verify navigation
    await productLinks.first().click();
    await expect(page).toHaveURL(/\/products\/[a-z0-9-]+/);
    await expect(page.locator('article h1')).toBeVisible();
  });

  test('product slug page loads with details and Product JSON-LD schema', async ({ page }) => {
    const response = await page.goto('/products/ai-vision-defect-detection');
    expect(response?.status()).toBe(200);

    await expect(page.locator('article h1')).toHaveText('AI-Vision Defect Detection');
    await expect(page.locator('article')).toContainText('High-speed industrial vision');

    // Verify Product JSON-LD structured data is present and valid
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const scriptCount = await jsonLdScripts.count();
    expect(scriptCount).toBeGreaterThanOrEqual(1);

    let foundProductSchema = false;
    for (let i = 0; i < scriptCount; i++) {
      const content = await jsonLdScripts.nth(i).textContent();
      if (content) {
        try {
          const parsed = JSON.parse(content);
          if (parsed['@type'] === 'Product' && parsed.name === 'AI-Vision Defect Detection') {
            foundProductSchema = true;
            expect(parsed.brand?.name).toBe('Prixtara Technologies');
            break;
          }
        } catch {
          // ignore parsing error for other scripts
        }
      }
    }
    expect(foundProductSchema).toBe(true);
  });

  test('careers listing page renders open positions', async ({ page }) => {
    const response = await page.goto('/career');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveText('Careers at Prixtara');
    await expect(page.locator('section[aria-label="Open positions"]')).toBeVisible();

    const jobLinks = page.locator('section[aria-label="Open positions"] a');
    const count = await jobLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('career slug page renders role description and JobPosting JSON-LD schema', async ({
    page,
  }) => {
    const response = await page.goto('/career/senior-computer-vision-engineer');
    expect(response?.status()).toBe(200);

    await expect(page.locator('article h1')).toContainText('Computer Vision Engineer');
    await expect(page.locator('section[aria-label="Role Summary"]')).toBeVisible();

    // Verify JobPosting JSON-LD structured data
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const scriptCount = await jsonLdScripts.count();

    let foundJobSchema = false;
    for (let i = 0; i < scriptCount; i++) {
      const content = await jsonLdScripts.nth(i).textContent();
      if (content) {
        try {
          const parsed = JSON.parse(content);
          if (parsed['@type'] === 'JobPosting') {
            foundJobSchema = true;
            expect(parsed.title).toContain('Computer Vision Engineer');
            expect(parsed.hiringOrganization?.name).toBe('Prixtara Technologies');
            break;
          }
        } catch {
          // ignore
        }
      }
    }
    expect(foundJobSchema).toBe(true);
  });

  test('about page renders corporate copy and mission statement', async ({ page }) => {
    const response = await page.goto('/about');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveText('About Prixtara');
    await expect(page.locator('main')).toContainText('Deep-Tech Architectures');
  });

  test('404 behavior: unknown routes return 404 and render recovery navigation', async ({
    page,
  }) => {
    const response = await page.goto('/this-route-does-not-exist-xyz-123');
    expect(response?.status()).toBe(404);

    await expect(page.locator('h1')).toContainText('Page Not Found');
    const returnLink = page.locator('main a[href="/"]');
    await expect(returnLink).toBeVisible();

    // Click return link and verify navigation back to home
    await returnLink.click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toHaveText('Prixtara Technologies');
  });
});
