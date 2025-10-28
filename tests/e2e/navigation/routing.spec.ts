import { test, expect } from '@playwright/test';

test.describe('Navigation and Routing Tests', () => {
  test('should have all navigation links working', async ({ page }) => {
    await page.goto('/');
    
    // Получаем все ссылки из навигации
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Проверяем каждую ссылку
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        // Проверяем, что ссылка ведет на существующую страницу
        const response = await page.request.get(href);
        expect(response.status()).toBeLessThan(400);
        
        // Проверяем, что ссылка кликабельна
        await link.click();
        await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        await page.goBack();
      }
    }
  });

  test('should handle deep links correctly', async ({ page }) => {
    await page.goto('/');
    
    // Ищем кнопки DeepLink
    const deepLinks = page.locator('[data-deep-link]');
    const deepLinkCount = await deepLinks.count();
    
    if (deepLinkCount > 0) {
      // Тестируем первый найденный deep link
      const firstDeepLink = deepLinks.first();
      await firstDeepLink.click();
      
      // Проверяем, что приложение не сломалось
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should have working breadcrumbs and home button', async ({ page }) => {
    // Переходим на любую внутреннюю страницу
    await page.goto('/calculators/budget');
    
    // Ищем кнопку "Home" или логотип
    const homeButton = page.locator('a[href="/"], a[href="/en"]').first();
    await expect(homeButton).toBeVisible();
    
    // Кликаем на домашнюю страницу
    await homeButton.click();
    await expect(page).toHaveURL(/\/$|\/en$/);
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    const nonExistentUrls = [
      '/non-existent-page',
      '/posts/non-existent-post',
      '/tags/non-existent-tag',
      '/calculators/non-existent-calculator'
    ];

    for (const url of nonExistentUrls) {
      const response = await page.goto(url);
      expect(response?.status()).toBe(404);
      
      // Проверяем, что отображается кастомная 404 страница
      await expect(page.locator('h1')).toContainText('404');
      
      // Проверяем, что есть ссылка на главную
      const homeLink = page.locator('a[href="/"], a[href="/en"]').first();
      await expect(homeLink).toBeVisible();
    }
  });

  test('should have consistent navigation across pages', async ({ page }) => {
    const testPages = ['/', '/about', '/calculators', '/tags/diy'];
    
    let firstPageNav = '';
    
    for (const testPage of testPages) {
      await page.goto(testPage);
      
      // Получаем структуру навигации
      const nav = page.locator('nav').first();
      const navText = await nav.textContent();
      
      if (firstPageNav === '') {
        firstPageNav = navText || '';
      } else {
        // Навигация должна быть одинаковой на всех страницах
        expect(navText).toBe(firstPageNav);
      }
    }
  });

  test('should handle mobile navigation menu', async ({ page }) => {
    // Устанавливаем мобильный размер экрана
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Ищем кнопку мобильного меню
    const mobileMenuButton = page.locator('[aria-label*="меню"], [aria-label*="menu"], button[aria-expanded]').first();
    
    if (await mobileMenuButton.isVisible()) {
      // Открываем мобильное меню
      await mobileMenuButton.click();
      
      // Проверяем, что меню открылось
      const mobileMenu = page.locator('[role="dialog"], [data-state="open"]').first();
      await expect(mobileMenu).toBeVisible();
      
      // Проверяем ссылки в мобильном меню
      const mobileLinks = mobileMenu.locator('a');
      const linkCount = await mobileLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Тестируем первую ссылку
      const firstLink = mobileLinks.first();
      const href = await firstLink.getAttribute('href');
      
      if (href) {
        await firstLink.click();
        await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      }
    }
  });
});
