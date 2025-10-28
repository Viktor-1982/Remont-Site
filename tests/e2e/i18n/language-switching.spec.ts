import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n) Tests', () => {
  test('should switch between Russian and English correctly', async ({ page }) => {
    // Начинаем с русской версии
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    
    // Проверяем русский контент
    await expect(page.locator('h1')).toContainText(/Renohacks|Ремонт/);
    
    // Переключаем на английский
    await page.click('text=EN');
    await expect(page).toHaveURL(/\/en/);
    
    // Проверяем английский контент
    await expect(page.locator('h1')).toContainText(/Renohacks|Renovation/);
    
    // Переключаем обратно на русский
    await page.click('text=RU');
    await expect(page).toHaveURL(/\/$/);
  });

  test('should have correct hreflang attributes', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем hreflang для русской версии
    const hreflangRu = page.locator('link[hreflang="ru"]');
    await expect(hreflangRu).toHaveAttribute('href', /\/$/);
    
    const hreflangEn = page.locator('link[hreflang="en"]');
    await expect(hreflangEn).toHaveAttribute('href', /\/en/);
    
    // Проверяем canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /renohacks\.com\/$/);
  });

  test('should have localized meta titles and descriptions', async ({ page }) => {
    // Русская версия
    await page.goto('/');
    const ruTitle = await page.title();
    const ruDescription = await page.locator('meta[name="description"]').getAttribute('content');
    
    expect(ruTitle).toContain('Renohacks');
    expect(ruDescription).toContain('ремонт');
    
    // Английская версия
    await page.goto('/en');
    const enTitle = await page.title();
    const enDescription = await page.locator('meta[name="description"]').getAttribute('content');
    
    expect(enTitle).toContain('Renohacks');
    expect(enDescription).toContain('renovation');
  });

  test('should have mirror pages with same structure', async ({ page }) => {
    const mirrorPages = [
      { ru: '/', en: '/en' },
      { ru: '/about', en: '/en/about' },
      { ru: '/calculators', en: '/en/calculators' },
      { ru: '/calculators/budget', en: '/en/calculators/budget' }
    ];

    for (const pages of mirrorPages) {
      // Проверяем русскую версию
      await page.goto(pages.ru);
      const ruH1 = await page.locator('h1').first().textContent();
      const ruNav = await page.locator('nav').count();
      
      // Проверяем английскую версию
      await page.goto(pages.en);
      const enH1 = await page.locator('h1').first().textContent();
      const enNav = await page.locator('nav').count();
      
      // Структура должна быть одинаковой
      expect(ruNav).toBe(enNav);
      
      // Контент должен быть разным
      expect(ruH1).not.toBe(enH1);
    }
  });

  test('should handle language switching on tag pages', async ({ page }) => {
    // Тестируем переключение на странице тегов
    await page.goto('/tags/кухня');
    await expect(page).toHaveURL(/\/tags\/кухня/);
    
    // Переключаем на английский
    await page.click('text=EN');
    await expect(page).toHaveURL(/\/en\/tags\/kitchen/);
    
    // Проверяем, что контент изменился
    await expect(page.locator('h1')).toContainText(/kitchen/i);
  });

  test('should preserve language preference in URL', async ({ page }) => {
    // Переходим на английскую версию калькулятора
    await page.goto('/en/calculators/budget');
    await expect(page).toHaveURL(/\/en\/calculators\/budget/);
    
    // Проверяем, что все ссылки остаются в английской версии
    const links = page.locator('a[href*="/en/"]');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});
