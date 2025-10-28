import { test, expect } from '@playwright/test';

test.describe('Smoke Tests - Basic Site Structure', () => {
  const pages = [
    { path: '/', title: 'Renohacks.com' },
    { path: '/en', title: 'Renohacks.com' },
    { path: '/about', title: 'О проекте' },
    { path: '/en/about', title: 'About' },
    { path: '/calculators', title: 'Калькуляторы' },
    { path: '/en/calculators', title: 'Calculators' },
    { path: '/calculators/budget', title: 'Планировщик бюджета' },
    { path: '/en/calculators/budget', title: 'Renovation Budget Planner' },
  ];

  for (const page of pages) {
    test(`should load ${page.path} with correct title and structure`, async ({ page: testPage }) => {
      const response = await testPage.goto(page.path);
      expect(response?.status()).toBe(200);

      // Проверяем title
      await expect(testPage).toHaveTitle(new RegExp(page.title));

      // Проверяем наличие meta description
      const metaDescription = testPage.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content');

      // Проверяем наличие h1
      const h1 = testPage.locator('h1').first();
      await expect(h1).toBeVisible();

      // Проверяем наличие SiteHeader
      const header = testPage.locator('header, [role="banner"]').first();
      await expect(header).toBeVisible();

      // Проверяем наличие SiteFooter
      const footer = testPage.locator('footer, [role="contentinfo"]').first();
      await expect(footer).toBeVisible();
    });
  }

  test('should have clickable navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем основные ссылки в хедере
    const navLinks = [
      { text: 'Новинки', url: '/tags/тренды' },
      { text: 'DIY', url: '/tags/diy' },
      { text: 'О проекте', url: '/about' },
      { text: 'Калькуляторы', url: '/calculators' }
    ];

    for (const link of navLinks) {
      const linkElement = page.locator(`a:has-text("${link.text}")`).first();
      await expect(linkElement).toBeVisible();
      
      // Проверяем, что ссылка ведет на правильный URL
      await expect(linkElement).toHaveAttribute('href', link.url);
      
      // Проверяем, что ссылка кликабельна
      await linkElement.click();
      await expect(page).toHaveURL(new RegExp(link.url));
      await page.goBack();
    }
  });

  test('should have valid footer links', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем ссылки в футере
    const footerLinks = page.locator('footer a');
    const linkCount = await footerLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Проверяем первые несколько ссылок
    for (let i = 0; i < Math.min(5, linkCount); i++) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        // Проверяем, что ссылка ведет на существующую страницу
        const response = await page.request.get(href);
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('should handle 404 pages correctly', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);
    
    // Проверяем, что отображается кастомная 404 страница
    await expect(page.locator('h1')).toContainText('404');
  });
});
