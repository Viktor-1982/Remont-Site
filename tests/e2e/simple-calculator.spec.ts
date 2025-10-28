import { test, expect } from '@playwright/test';

test.describe('Simple Calculator Test', () => {
  test('should load calculator page', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Проверяем заголовок
    await expect(page.locator('h1')).toContainText('Планировщик бюджета');
    
    // Проверяем наличие полей
    await expect(page.locator('input[placeholder*="Категория"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="Стоимость"]')).toBeVisible();
    
    // Проверяем кнопку добавления
    await expect(page.locator('button:has-text("Добавить категорию")')).toBeVisible();
  });

  test('should add category and fill fields', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Добавляем категорию
    await page.click('button:has-text("Добавить категорию")');
    
    // Заполняем поля
    await page.fill('input[placeholder*="Категория"]', 'Тест');
    await page.fill('input[placeholder*="Стоимость"]', '5000');
    
    // Проверяем, что поля заполнились
    const categoryValue = await page.locator('input[placeholder*="Категория"]').first().inputValue();
    const costValue = await page.locator('input[placeholder*="Стоимость"]').first().inputValue();
    
    expect(categoryValue).toBe('Тест');
    expect(costValue).toBe('5000');
  });
});
