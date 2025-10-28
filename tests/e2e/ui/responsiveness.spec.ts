import { test, expect } from '@playwright/test';

test.describe('UI and Responsiveness Tests', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1024, height: 768 },
    { name: 'Large Desktop', width: 1440, height: 900 }
  ];

  test.describe('Responsive Layout', () => {
    for (const viewport of viewports) {
      test(`should display correctly on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        
        // Проверяем, что основные элементы видны
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
        
        // Проверяем, что контент не выходит за границы
        const body = page.locator('body');
        const bodyBox = await body.boundingBox();
        
        if (bodyBox) {
          expect(bodyBox.width).toBeLessThanOrEqual(viewport.width);
        }
      });
    }
  });

  test.describe('Theme Switcher', () => {
    test('should switch themes correctly', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем начальную тему
      const html = page.locator('html');
      await expect(html).toHaveAttribute('class', /light/);
      
      // Открываем переключатель тем
      await page.click('[aria-label*="тему"], [aria-label*="theme"]');
      
      // Переключаем на темную тему
      await page.click('button:has-text("Тёмная"), button:has-text("Dark")');
      await expect(html).toHaveAttribute('class', /dark/);
      
      // Переключаем на светлую тему
      await page.click('[aria-label*="тему"], [aria-label*="theme"]');
      await page.click('button:has-text("Светлая"), button:has-text("Light")');
      await expect(html).toHaveAttribute('class', /light/);
    });

    test('should have all theme options', async ({ page }) => {
      await page.goto('/');
      
      // Открываем переключатель тем
      await page.click('[aria-label*="тему"], [aria-label*="theme"]');
      
      // Проверяем наличие всех тем
      const themes = ['Светлая', 'Тёмная', 'Сепия', 'Контраст'];
      
      for (const theme of themes) {
        const themeButton = page.locator(`button:has-text("${theme}")`);
        await expect(themeButton).toBeVisible();
      }
    });
  });

  test.describe('Mobile Navigation', () => {
    test('should have working mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Ищем кнопку мобильного меню
      const mobileMenuButton = page.locator('[aria-label*="меню"], [aria-label*="menu"]').first();
      
      if (await mobileMenuButton.isVisible()) {
        // Открываем меню
        await mobileMenuButton.click();
        
        // Проверяем, что меню открылось
        const mobileMenu = page.locator('[role="dialog"], [data-state="open"]').first();
        await expect(mobileMenu).toBeVisible();
        
        // Проверяем ссылки в меню
        const menuLinks = mobileMenu.locator('a');
        const linkCount = await menuLinks.count();
        expect(linkCount).toBeGreaterThan(0);
        
        // Закрываем меню
        const closeButton = mobileMenu.locator('button[aria-label*="закрыть"], button[aria-label*="close"]');
        if (await closeButton.isVisible()) {
          await closeButton.click();
          await expect(mobileMenu).not.toBeVisible();
        }
      }
    });
  });

  test.describe('Interactive Elements', () => {
    test('should have working hover effects', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем hover эффекты на ссылках
      const links = page.locator('a').first();
      await links.hover();
      
      // Проверяем, что элемент остается видимым
      await expect(links).toBeVisible();
    });

    test('should have visible SVG icons', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем SVG иконки
      const svgIcons = page.locator('svg');
      const iconCount = await svgIcons.count();
      
      if (iconCount > 0) {
        // Проверяем первую иконку
        const firstIcon = svgIcons.first();
        await expect(firstIcon).toBeVisible();
        
        // Проверяем, что иконка имеет размер
        const iconBox = await firstIcon.boundingBox();
        expect(iconBox?.width).toBeGreaterThan(0);
        expect(iconBox?.height).toBeGreaterThan(0);
      }
    });

    test('should have proper focus indicators', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем фокус на первой ссылке
      const firstLink = page.locator('a').first();
      await firstLink.focus();
      
      // Проверяем, что элемент получил фокус
      await expect(firstLink).toBeFocused();
    });
  });

  test.describe('Content Layout', () => {
    test('should have proper content spacing', async ({ page }) => {
      await page.goto('/posts/remont-vannoy');
      
      // Проверяем, что контент не прилипает к краям
      const content = page.locator('main, article');
      const contentBox = await content.boundingBox();
      
      if (contentBox) {
        expect(contentBox.x).toBeGreaterThan(0);
        expect(contentBox.width).toBeLessThan(page.viewportSize()?.width || 0);
      }
    });

    test('should have readable typography', async ({ page }) => {
      await page.goto('/posts/remont-vannoy');
      
      // Проверяем заголовки
      const h1 = page.locator('h1').first();
      const h1Box = await h1.boundingBox();
      
      if (h1Box) {
        expect(h1Box.height).toBeGreaterThan(20); // Минимальная высота для читаемости
      }
      
      // Проверяем параграфы
      const p = page.locator('p').first();
      const pBox = await p.boundingBox();
      
      if (pBox) {
        expect(pBox.height).toBeGreaterThan(15); // Минимальная высота для читаемости
      }
    });
  });

  test.describe('New Badge', () => {
    test('should show new badge for recent articles', async ({ page }) => {
      await page.goto('/');
      
      // Ищем статьи с бейджем "New"
      const newBadges = page.locator('text=New, text=Новое');
      const badgeCount = await newBadges.count();
      
      if (badgeCount > 0) {
        // Проверяем, что бейдж видим
        await expect(newBadges.first()).toBeVisible();
      }
    });
  });
});
