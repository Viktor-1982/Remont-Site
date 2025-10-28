import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Renohacks/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем основные ссылки навигации
    await expect(page.locator('a[href="/"]')).toBeVisible();
    await expect(page.locator('a[href="/tags/тренды"]')).toBeVisible();
    await expect(page.locator('a[href="/tags/diy"]')).toBeVisible();
    await expect(page.locator('a[href="/about"]')).toBeVisible();
    await expect(page.locator('a[href="/calculators"]')).toBeVisible();
  });

  test('should have working language switcher', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем переключение языка
    await page.click('text=EN');
    await expect(page).toHaveURL(/\/en/);
    
    await page.click('text=RU');
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('Tag Pages', () => {
  test('should load tag pages without 404', async ({ page }) => {
    const tags = ['тренды', 'diy', 'kitchen', 'bathroom', 'walls'];
    
    for (const tag of tags) {
      await page.goto(`/tags/${tag}`);
      await expect(page).toHaveTitle(/Renohacks/);
      // Проверяем, что нет 404 ошибки
      await expect(page.locator('text=404')).not.toBeVisible();
    }
  });

  test('should have working language switch on tag pages', async ({ page }) => {
    await page.goto('/tags/kitchen');
    
    // Переключаем на английский
    await page.click('text=EN');
    await expect(page).toHaveURL(/\/en\/tags\/kitchen/);
    
    // Переключаем обратно на русский
    await page.click('text=RU');
    await expect(page).toHaveURL(/\/tags\/kitchen/);
  });
});

test.describe('Calculators', () => {
  test('should load budget calculator', async ({ page }) => {
    await page.goto('/calculators/budget');
    await expect(page).toHaveTitle(/Планировщик бюджета/);
    
    // Проверяем, что калькулятор загрузился
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('button')).toBeVisible();
  });

  test('should work budget calculator functionality', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Добавляем категорию
    await page.click('button:has-text("Добавить категорию")');
    
    // Заполняем поля
    await page.fill('input[placeholder*="Категория"]', 'Тестовая категория');
    await page.fill('input[placeholder*="Стоимость"]', '10000');
    
    // Проверяем, что поля заполнились
    await expect(page.locator('input[value="Тестовая категория"]')).toBeVisible();
    await expect(page.locator('input[value="10000"]')).toBeVisible();
  });
});

test.describe('Articles', () => {
  test('should load article pages', async ({ page }) => {
    // Проверяем несколько статей
    const articles = [
      '/posts/remont-vannoy',
      '/posts/pokraska-sten',
      '/posts/malenkaya-kuhnya'
    ];
    
    for (const article of articles) {
      await page.goto(article);
      await expect(page).toHaveTitle(/Renohacks/);
      await expect(page.locator('article')).toBeVisible();
    }
  });

  test('should have related posts section', async ({ page }) => {
    await page.goto('/posts/remont-vannoy');
    
    // Проверяем блок "Читайте также"
    await expect(page.locator('text=Читайте также')).toBeVisible();
    await expect(page.locator('aside')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Проверяем, что страница загрузилась за разумное время
    expect(loadTime).toBeLessThan(5000); // 5 секунд
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Проверяем мобильное меню
    await page.click('button[aria-label*="меню"]');
    await expect(page.locator('nav')).toBeVisible();
  });
});
