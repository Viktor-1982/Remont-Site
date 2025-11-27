import { test, expect } from '@playwright/test';

test.describe('Functional Tests - Calculators', () => {
  test.describe('Renovation Budget Planner (RU)', () => {
    test('should add and remove categories correctly', async ({ page }) => {
      await page.goto('/calculators/budget');

      // Начально один элемент сметы
      const items = page.locator('[data-testid="expense-item"]');
      const initialCount = await items.count();
      expect(initialCount).toBe(1);

      // Добавляем категорию
      await page.getByRole('button', { name: /добавить категорию/i }).click();
      await expect(items).toHaveCount(initialCount + 1);

      // Удаляем последнюю категорию
      await page.locator('button[aria-label="Удалить категорию"]').last().click();
      await expect(items).toHaveCount(initialCount);
    });

    test('should calculate total correctly with zero reserve', async ({ page }) => {
      await page.goto('/calculators/budget');

      // Ставим резерв 0%, чтобы итог = сумме
      await page.getByRole('spinbutton').nth(1).fill('0');

      // Заполняем первую категорию
      await page.locator('input[placeholder*="Категория"]').first().fill('Потолок');
      await page.locator('input[placeholder="0"]').first().fill('50000');

      // Считаем
      await page.getByRole('button', { name: /рассчитать/i }).click();

      // Ожидаем в блоке "Итого" число 50 000 ₽
      await expect(page.getByText('50 000 ₽', { exact: false })).toBeVisible();

      // Добавляем вторую категорию и пересчитываем
      await page.getByRole('button', { name: /добавить категорию/i }).click();
      await page.locator('input[placeholder*="Категория"]').nth(1).fill('Стены');
      await page.locator('input[placeholder="0"]').nth(1).fill('30000');
      await page.getByRole('button', { name: /рассчитать/i }).click();

      await expect(page.getByText('80 000 ₽', { exact: false })).toBeVisible();
    });

    test('should handle reserve percentage correctly', async ({ page }) => {
      await page.goto('/calculators/budget');

      // Стоимость 100 000, резерв 10%
      await page.locator('input[placeholder*="Категория"]').first().fill('Потолок');
      await page.locator('input[placeholder="0"]').first().fill('100000');
      await page.getByRole('spinbutton').nth(1).fill('10');

      await page.getByRole('button', { name: /рассчитать/i }).click();

      // Итог должен содержать 110 000 ₽
      await expect(page.getByText('110 000 ₽', { exact: false })).toBeVisible();
    });

    test('should treat negative cost as zero in calculation', async ({ page }) => {
      await page.goto('/calculators/budget');

      await page.locator('input[placeholder*="Категория"]').first().fill('Тест');
      await page.locator('input[placeholder="0"]').first().fill('-1000');

      await page.getByRole('button', { name: /рассчитать/i }).click();

      // При отрицательной стоимости итог должен остаться 0
      await expect(page.getByText('0 ₽', { exact: false })).toBeVisible();
    });
  });

  test.describe('Renovation Budget Planner (EN)', () => {
    test('should calculate total correctly in English version with zero reserve', async ({ page }) => {
      await page.goto('/en/calculators/budget');

      // Проверяем заголовок
      await expect(page.locator('h1')).toContainText('Renovation Budget Planner');

      // Резерв 0%
      await page.getByRole('spinbutton').nth(1).fill('0');

      // Заполняем первую категорию
      await page.locator('input[placeholder*="Category"]').first().fill('Ceiling');
      await page.locator('input[placeholder="0"]').first().fill('1000');

      await page.getByRole('button', { name: /calculate/i }).click();

      // Ожидаем отображение $1,000
      await expect(page.getByText('$1,000', { exact: false })).toBeVisible();
    });

    test('should switch to RU calculator from EN page', async ({ page }) => {
      await page.goto('/en/calculators/budget');

      // Переключаемся на русский через переключатель языка
      await page.click('text=RU');
      await expect(page).toHaveURL(/\/calculators\/budget/);

      // Проверяем русский заголовок
      await expect(page.locator('h1')).toContainText('Планировщик бюджета ремонта');
    });
  });

  test.describe('Other Calculators', () => {
    test('should load paint calculator', async ({ page }) => {
      await page.goto('/calculators/paint');

      await expect(page.locator('h1')).toContainText('Калькулятор краски');

      const inputs = page.locator('input');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThan(0);
    });

    test('should load tile calculator', async ({ page }) => {
      await page.goto('/calculators/tile');

      await expect(page.locator('h1')).toContainText('Калькулятор плитки');

      const inputs = page.locator('input');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThan(0);
    });

    test('should load wallpaper calculator', async ({ page }) => {
      await page.goto('/calculators/wallpaper');

      await expect(page.locator('h1')).toContainText('Калькулятор обоев');

      const inputs = page.locator('input');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThan(0);
    });
  });
});
