import { test, expect } from '@playwright/test';

test.describe('Simple Calculator Test', () => {
  test('should load RU budget calculator page', async ({ page }) => {
    await page.goto('/calculators/budget');

    await expect(page.locator('h1')).toContainText('Планировщик бюджета ремонта');

    await expect(page.locator('input[placeholder*="Категория"]')).toBeVisible();
    await expect(page.locator('input[placeholder="0"]')).toBeVisible();

    await expect(page.getByRole('button', { name: /добавить категорию/i })).toBeVisible();
  });

  test('should add category and calculate total in RU', async ({ page }) => {
    await page.goto('/calculators/budget');

    await page.getByRole('button', { name: /добавить категорию/i }).click();

    await page.locator('input[placeholder*="Категория"]').first().fill('Тест');
    await page.locator('input[placeholder="0"]').first().fill('5000');

    await page.getByRole('button', { name: /рассчитать/i }).click();

    await expect(page.getByText('5 000 ₽', { exact: false })).toBeVisible();
  });
});
