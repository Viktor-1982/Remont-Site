import { test, expect } from '@playwright/test';

test.describe('SEO and Content Tests', () => {
  test('should have proper meta tags on all pages', async ({ page }) => {
    const testPages = [
      { path: '/', minTitleLength: 10, maxTitleLength: 60 },
      { path: '/about', minTitleLength: 10, maxTitleLength: 60 },
      { path: '/calculators/budget', minTitleLength: 10, maxTitleLength: 60 },
      { path: '/posts/remont-vannoy', minTitleLength: 10, maxTitleLength: 60 }
    ];

    for (const testPage of testPages) {
      await page.goto(testPage.path);
      
      // Проверяем title
      const title = await page.title();
      expect(title.length).toBeGreaterThanOrEqual(testPage.minTitleLength);
      expect(title.length).toBeLessThanOrEqual(testPage.maxTitleLength);
      
      // Проверяем meta description
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content');
      
      const description = await metaDescription.getAttribute('content');
      expect(description?.length).toBeLessThanOrEqual(160);
      
      // Проверяем Open Graph теги
      const ogTitle = page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content');
      
      const ogDescription = page.locator('meta[property="og:description"]');
      await expect(ogDescription).toHaveAttribute('content');
      
      const ogImage = page.locator('meta[property="og:image"]');
      await expect(ogImage).toHaveAttribute('content');
    }
  });

  test('should have JSON-LD structured data', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Проверяем наличие JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeVisible();
    
    // Проверяем содержимое JSON-LD
    const jsonContent = await jsonLd.textContent();
    expect(jsonContent).toContain('@context');
    expect(jsonContent).toContain('@type');
    expect(jsonContent).toContain('SoftwareApplication');
  });

  test('should have proper image alt attributes', async ({ page }) => {
    await page.goto('/');
    
    // Получаем все изображения
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Проверяем, что alt атрибут существует и не пустой
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test('should have robots.txt and sitemap.xml', async ({ page }) => {
    // Проверяем robots.txt
    const robotsResponse = await page.request.get('/robots.txt');
    expect(robotsResponse.status()).toBe(200);
    
    const robotsContent = await robotsResponse.text();
    expect(robotsContent).toContain('User-agent');
    expect(robotsContent).toContain('Sitemap');
    
    // Проверяем sitemap.xml
    const sitemapResponse = await page.request.get('/sitemap.xml');
    expect(sitemapResponse.status()).toBe(200);
    
    const sitemapContent = await sitemapResponse.text();
    expect(sitemapContent).toContain('<?xml');
    expect(sitemapContent).toContain('<urlset');
  });

  test('should not have noindex on production pages', async ({ page }) => {
    const testPages = ['/', '/about', '/calculators', '/posts/remont-vannoy'];
    
    for (const testPage of testPages) {
      await page.goto(testPage);
      
      // Проверяем, что нет noindex
      const noindex = page.locator('meta[name="robots"][content*="noindex"]');
      await expect(noindex).toHaveCount(0);
      
      // Проверяем, что есть index
      const index = page.locator('meta[name="robots"][content*="index"]');
      await expect(index).toHaveCount(1);
    }
  });

  test('should have proper canonical URLs', async ({ page }) => {
    const testPages = ['/', '/about', '/calculators/budget'];
    
    for (const testPage of testPages) {
      await page.goto(testPage);
      
      // Проверяем canonical
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href');
      
      const canonicalHref = await canonical.getAttribute('href');
      expect(canonicalHref).toContain('renohacks.com');
      expect(canonicalHref).toContain(testPage);
    }
  });

  test('should have proper hreflang for multilingual content', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем hreflang для русской версии
    const hreflangRu = page.locator('link[hreflang="ru"]');
    await expect(hreflangRu).toHaveAttribute('href', /\/$/);
    
    // Проверяем hreflang для английской версии
    const hreflangEn = page.locator('link[hreflang="en"]');
    await expect(hreflangEn).toHaveAttribute('href', /\/en/);
    
    // Проверяем x-default
    const hreflangDefault = page.locator('link[hreflang="x-default"]');
    await expect(hreflangDefault).toHaveAttribute('href', /\/$/);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/posts/remont-vannoy');
    
    // Проверяем, что есть только один h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Проверяем, что h1 содержит заголовок статьи
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    // Проверяем наличие h2 для подзаголовков
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });
});
