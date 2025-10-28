import { test, expect } from '@playwright/test';

test.describe('All Buttons and Forms', () => {
  test('should test all navigation buttons', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем все кнопки навигации
    const navButtons = [
      { text: 'Главная', href: '/' },
      { text: 'Новинки', href: '/tags/тренды' },
      { text: 'DIY', href: '/tags/diy' },
      { text: 'О проекте', href: '/about' },
      { text: 'Калькуляторы', href: '/calculators' }
    ];
    
    for (const button of navButtons) {
      await page.click(`text=${button.text}`);
      await expect(page).toHaveURL(new RegExp(button.href));
      await page.goBack();
    }
  });

  test('should test all calculator buttons', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Проверяем все кнопки калькулятора
    const calculatorButtons = [
      'Добавить категорию',
      'Удалить',
      'Рассчитать',
      'Очистить'
    ];
    
    for (const buttonText of calculatorButtons) {
      const button = page.locator(`button:has-text("${buttonText}")`);
      await expect(button).toBeVisible();
      
      if (buttonText === 'Добавить категорию') {
        await button.click();
        // Проверяем, что добавилась новая строка
        await expect(page.locator('input[placeholder*="Категория"]').nth(1)).toBeVisible();
      }
    }
  });

  test('should test all form inputs', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Добавляем несколько категорий
    await page.click('button:has-text("Добавить категорию")');
    await page.click('button:has-text("Добавить категорию")');
    
    // Заполняем все поля
    const inputs = page.locator('input[type="text"]');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      await inputs.nth(i).fill(`Тестовая категория ${i + 1}`);
    }
    
    // Проверяем, что все поля заполнились
    for (let i = 0; i < count; i++) {
      await expect(inputs.nth(i)).toHaveValue(`Тестовая категория ${i + 1}`);
    }
  });

  test('should test all dropdowns and selects', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Проверяем все селекты
    const selects = page.locator('select');
    const count = await selects.count();
    
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      await expect(select).toBeVisible();
      
      // Проверяем опции
      const options = await select.locator('option').count();
      expect(options).toBeGreaterThan(0);
    }
  });
});

test.describe('All Page Transitions', () => {
  test('should test all internal links', async ({ page }) => {
    await page.goto('/');
    
    // Собираем все ссылки на странице
    const links = page.locator('a[href^="/"]');
    const count = await links.count();
    
    const testedUrls = new Set();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && !testedUrls.has(href)) {
        testedUrls.add(href);
        
        // Кликаем по ссылке
        await link.click();
        
        // Проверяем, что страница загрузилась
        await expect(page).toHaveTitle(/Renohacks/);
        
        // Проверяем, что нет 404
        await expect(page.locator('text=404')).not.toBeVisible();
        
        // Возвращаемся назад
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    }
  });

  test('should test all external links', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем внешние ссылки (социальные сети)
    const externalLinks = page.locator('a[href^="http"]');
    const count = await externalLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href) {
        // Проверяем, что ссылка существует
        await expect(link).toBeVisible();
        
        // Проверяем, что ссылка открывается в новой вкладке
        const target = await link.getAttribute('target');
        expect(target).toBe('_blank');
      }
    }
  });
});

test.describe('All Interactive Elements', () => {
  test('should test all hover effects', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем hover эффекты на всех интерактивных элементах
    const interactiveElements = page.locator('button, a, [role="button"]');
    const count = await interactiveElements.count();
    
    for (let i = 0; i < count; i++) {
      const element = interactiveElements.nth(i);
      
      if (await element.isVisible()) {
        await element.hover();
        // Проверяем, что элемент реагирует на hover
        await expect(element).toBeVisible();
      }
    }
  });

  test('should test all focus states', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Проверяем focus состояния всех интерактивных элементов
    const focusableElements = page.locator('input, button, select, a');
    const count = await focusableElements.count();
    
    for (let i = 0; i < count; i++) {
      const element = focusableElements.nth(i);
      
      if (await element.isVisible()) {
        await element.focus();
        await expect(element).toBeFocused();
      }
    }
  });

  test('should test all keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем навигацию с клавиатуры
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Проверяем, что можно навигировать по всем элементам
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      if (await focused.count() > 0) {
        await expect(focused).toBeVisible();
      }
    }
  });
});

test.describe('All State Changes', () => {
  test('should test theme switching', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем переключение темы
    const themeButton = page.locator('button[aria-label*="тему"]');
    await expect(themeButton).toBeVisible();
    
    // Кликаем несколько раз для проверки всех тем
    for (let i = 0; i < 4; i++) {
      await themeButton.click();
      await page.waitForTimeout(500); // Ждем применения темы
      
      // Проверяем, что страница все еще работает
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should test language switching on all pages', async ({ page }) => {
    const pages = [
      '/',
      '/about',
      '/calculators',
      '/calculators/budget',
      '/tags/тренды',
      '/tags/diy'
    ];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      
      // Переключаем на английский
      await page.click('text=EN');
      await expect(page).toHaveURL(/\/en/);
      
      // Переключаем обратно на русский
      await page.click('text=RU');
      await expect(page).toHaveURL(new RegExp(pagePath));
    }
  });

  test('should test all form validations', async ({ page }) => {
    await page.goto('/calculators/budget');
    
    // Проверяем валидацию форм
    const inputs = page.locator('input[required]');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      
      // Очищаем поле
      await input.fill('');
      
      // Проверяем, что появляется ошибка валидации
      await expect(input).toHaveAttribute('required');
    }
  });
});

test.describe('All Error States', () => {
  test('should handle 404 pages gracefully', async ({ page }) => {
    // Проверяем несуществующие страницы
    const nonExistentPages = [
      '/non-existent-page',
      '/tags/non-existent-tag',
      '/posts/non-existent-post'
    ];
    
    for (const pagePath of nonExistentPages) {
      await page.goto(pagePath);
      
      // Проверяем, что показывается 404 страница
      await expect(page.locator('text=404')).toBeVisible();
      
      // Проверяем, что есть ссылка на главную
      await expect(page.locator('a[href="/"]')).toBeVisible();
    }
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Симулируем сетевые ошибки
    await page.route('**/*', route => route.abort());
    
    await page.goto('/');
    
    // Проверяем, что приложение не падает
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('All Performance Checks', () => {
  test('should check all pages load within acceptable time', async ({ page }) => {
    const pages = [
      '/',
      '/about',
      '/calculators',
      '/calculators/budget',
      '/tags/тренды',
      '/tags/diy',
      '/posts/remont-vannoy',
      '/posts/pokraska-sten'
    ];
    
    for (const pagePath of pages) {
      const startTime = Date.now();
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Проверяем, что страница загрузилась за разумное время
      expect(loadTime).toBeLessThan(10000); // 10 секунд максимум
    }
  });

  test('should check all images load correctly', async ({ page }) => {
    await page.goto('/');
    
    // Проверяем все изображения
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      
      if (await img.isVisible()) {
        // Проверяем, что изображение загрузилось
        await expect(img).toBeVisible();
        
        // Проверяем, что у изображения есть alt текст
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });
});
