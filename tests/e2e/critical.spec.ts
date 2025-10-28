import { test, expect } from '@playwright/test';

test.describe('Critical Path Tests', () => {
  test('should load homepage and navigate to all main sections', async ({ page }) => {
    // Главная страница
    await page.goto('/');
    await expect(page).toHaveTitle(/Renohacks/);
    
    // Проверяем все основные ссылки
    const mainLinks = [
      { text: 'Новинки', url: '/tags/тренды' },
      { text: 'DIY', url: '/tags/diy' },
      { text: 'О проекте', url: '/about' },
      { text: 'Калькуляторы', url: '/calculators' }
    ];
    
    for (const link of mainLinks) {
      await page.click(`text=${link.text}`);
      await expect(page).toHaveURL(new RegExp(link.url));
      await page.goBack();
    }
  });

  test('should test budget calculator functionality', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Добавляем категорию
    await page.click('button:has-text("Добавить категорию")');
    
    // Заполняем поля
    await page.fill('input[placeholder*="Категория"]', 'Тестовая категория');
    await page.fill('input[placeholder*="Стоимость"]', '10000');
    
    // Проверяем результат - ищем по значению в поле
    await expect(page.locator('input[value="Тестовая категория"]')).toBeVisible();
    await expect(page.locator('input[value="10000"]')).toBeVisible();
  });

  test('should test language switching', async ({ page }) => {
    await page.goto('/');
    
    // Переключаем на английский
    await page.click('text=EN');
    await expect(page).toHaveURL(/\/en/);
    
    // Переключаем обратно
    await page.click('text=RU');
    await expect(page).toHaveURL(/\/$/);
  });
});
