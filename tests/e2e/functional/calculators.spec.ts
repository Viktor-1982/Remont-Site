import { test, expect } from '@playwright/test';

test.describe('Functional Tests - Calculators', () => {
  test.describe('Renovation Budget Planner (RU)', () => {
    test('should add and remove categories correctly', async ({ page }) => {
      await page.goto('/calculators/budget');
      
      // Проверяем начальное состояние
      const initialItems = page.locator('[data-testid="expense-item"]');
      const initialCount = await initialItems.count();
      expect(initialCount).toBe(1);
      
      // Добавляем категорию
      await page.click('button:has-text("Добавить категорию")');
      
      const afterAddItems = page.locator('[data-testid="expense-item"]');
      const afterAddCount = await afterAddItems.count();
      expect(afterAddCount).toBe(initialCount + 1);
      
      // Удаляем категорию
      await page.locator('button[aria-label="Удалить категорию"]').last().click();
      
      const afterRemoveItems = page.locator('[data-testid="expense-item"]');
      const afterRemoveCount = await afterRemoveItems.count();
      expect(afterRemoveCount).toBe(initialCount);
    });

    test('should calculate total correctly', async ({ page }) => {
      await page.goto('/calculators/budget');
      
      // Заполняем первую категорию
      await page.fill('input[placeholder*="Категория"]', 'Потолок');
      await page.fill('input[placeholder*="Стоимость"]', '50000');
      
      // Проверяем расчет
      await expect(page.locator('text=Итого: 50 000 ₽')).toBeVisible();
      
      // Добавляем вторую категорию
      await page.click('button:has-text("Добавить категорию")');
      await page.locator('input[placeholder*="Категория"]').nth(1).fill('Стены');
      await page.locator('input[placeholder*="Стоимость"]').nth(1).fill('30000');
      
      // Проверяем общий расчет
      await expect(page.locator('text=Итого: 80 000 ₽')).toBeVisible();
    });

    test('should handle reserve percentage correctly', async ({ page }) => {
      await page.goto('/calculators/budget');
      
      // Заполняем категорию
      await page.fill('input[placeholder*="Категория"]', 'Потолок');
      await page.fill('input[placeholder*="Стоимость"]', '100000');
      
      // Устанавливаем резерв 10%
      await page.fill('input[placeholder*="Резерв"]', '10');
      
      // Проверяем расчет с резервом
      await expect(page.locator('text=Итого: 110 000 ₽')).toBeVisible();
    });

    test('should validate input fields', async ({ page }) => {
      await page.goto('/calculators/budget');
      
      // Проверяем, что нельзя ввести отрицательные значения
      await page.fill('input[placeholder*="Стоимость"]', '-1000');
      
      // Проверяем, что значение не сохранилось
      const costValue = await page.locator('input[placeholder*="Стоимость"]').inputValue();
      expect(costValue).not.toBe('-1000');
    });

    test('should clear form correctly', async ({ page }) => {
      await page.goto('/calculators/budget');
      
      // Заполняем форму
      await page.fill('input[placeholder*="Категория"]', 'Тест');
      await page.fill('input[placeholder*="Стоимость"]', '10000');
      
      // Очищаем форму
      await page.click('button:has-text("Очистить")');
      
      // Проверяем, что форма очищена
      const categoryValue = await page.locator('input[placeholder*="Категория"]').inputValue();
      const costValue = await page.locator('input[placeholder*="Стоимость"]').inputValue();
      
      expect(categoryValue).toBe('');
      expect(costValue).toBe('');
    });
  });

  test.describe('Renovation Budget Planner (EN)', () => {
    test('should work in English version', async ({ page }) => {
      await page.goto('/en/calculators/budget');
      
      // Проверяем английский интерфейс
      await expect(page.locator('h1')).toContainText('Renovation Budget Planner');
      
      // Добавляем категорию
      await page.click('button:has-text("Add Category")');
      
      // Заполняем поля
      await page.fill('input[placeholder*="Category"]', 'Ceiling');
      await page.fill('input[placeholder*="Cost"]', '1000');
      
      // Проверяем расчет
      await expect(page.locator('text=Total: 1 000 $')).toBeVisible();
    });

    test('should switch language and preserve values', async ({ page }) => {
      await page.goto('/en/calculators/budget');
      
      // Заполняем форму
      await page.fill('input[placeholder*="Category"]', 'Ceiling');
      await page.fill('input[placeholder*="Cost"]', '1000');
      
      // Переключаем на русский
      await page.click('text=RU');
      await expect(page).toHaveURL(/\/calculators\/budget/);
      
      // Проверяем, что значения сохранились
      await expect(page.locator('input[value="Ceiling"]')).toBeVisible();
      await expect(page.locator('input[value="1000"]')).toBeVisible();
    });
  });

  test.describe('Other Calculators', () => {
    test('should load paint calculator', async ({ page }) => {
      await page.goto('/calculators/paint');
      
      // Проверяем заголовок
      await expect(page.locator('h1')).toContainText('Калькулятор краски');
      
      // Проверяем наличие полей ввода
      const inputs = page.locator('input[type="number"]');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThan(0);
    });

    test('should load tile calculator', async ({ page }) => {
      await page.goto('/calculators/tile');
      
      // Проверяем заголовок
      await expect(page.locator('h1')).toContainText('Калькулятор плитки');
      
      // Проверяем наличие полей ввода
      const inputs = page.locator('input[type="number"]');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThan(0);
    });

    test('should load wallpaper calculator', async ({ page }) => {
      await page.goto('/calculators/wallpaper');
      
      // Проверяем заголовок
      await expect(page.locator('h1')).toContainText('Калькулятор обоев');
      
      // Проверяем наличие полей ввода
      const inputs = page.locator('input[type="number"]');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThan(0);
    });
  });
});
