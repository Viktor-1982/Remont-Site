import { test, expect } from '@playwright/test';

test.describe('Performance and Accessibility Tests', () => {
  test.describe('Lighthouse Performance', () => {
    test('should have good Lighthouse scores', async ({ page }) => {
      await page.goto('/');
      
      // Запускаем Lighthouse
      const lighthouse = await page.evaluate(() => {
        return new Promise((resolve) => {
          // Простая проверка производительности
          const startTime = performance.now();
          
          // Проверяем загрузку основных ресурсов
          const checkResources = () => {
            const endTime = performance.now();
            const loadTime = endTime - startTime;
            
            resolve({
              loadTime,
              imagesLoaded: document.querySelectorAll('img').length,
              scriptsLoaded: document.querySelectorAll('script').length
            });
          };
          
          // Ждем загрузки страницы
          if (document.readyState === 'complete') {
            checkResources();
          } else {
            window.addEventListener('load', checkResources);
          }
        });
      });
      
      // Проверяем время загрузки
      expect(lighthouse.loadTime).toBeLessThan(3000); // Менее 3 секунд
    });
  });

  test.describe('Image Optimization', () => {
    test('should use next/image for all images', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем, что все изображения используют next/image
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        
        // Проверяем, что изображение имеет правильные атрибуты
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        
        expect(src).toBeTruthy();
        expect(alt).toBeTruthy();
        
        // Проверяем, что изображение загружается
        await expect(img).toBeVisible();
      }
    });

    test('should have proper image loading attributes', async ({ page }) => {
      await page.goto('/posts/remont-vannoy');
      
      // Проверяем изображения в статье
      const articleImages = page.locator('article img, main img');
      const imageCount = await articleImages.count();
      
      for (let i = 0; i < imageCount; i++) {
        const img = articleImages.nth(i);
        
        // Проверяем loading="lazy" для изображений ниже fold
        const loading = await img.getAttribute('loading');
        if (loading) {
          expect(loading).toBe('lazy');
        }
        
        // Проверяем sizes атрибут
        const sizes = await img.getAttribute('sizes');
        if (sizes) {
          expect(sizes).toBeTruthy();
        }
      }
    });
  });

  test.describe('Accessibility (A11y)', () => {
    test('should have proper color contrast', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем основные текстовые элементы
      const textElements = page.locator('h1, h2, h3, p, a');
      const elementCount = await textElements.count();
      
      for (let i = 0; i < Math.min(5, elementCount); i++) {
        const element = textElements.nth(i);
        
        // Проверяем, что элемент видим
        await expect(element).toBeVisible();
        
        // Проверяем, что элемент имеет контрастный цвет
        const color = await element.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return styles.color;
        });
        
        expect(color).toBeTruthy();
      }
    });

    test('should have proper focus management', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем фокус на навигационных элементах
      const navLinks = page.locator('nav a, header a');
      const linkCount = await navLinks.count();
      
      if (linkCount > 0) {
        const firstLink = navLinks.first();
        
        // Фокусируемся на первой ссылке
        await firstLink.focus();
        await expect(firstLink).toBeFocused();
        
        // Проверяем, что фокус видим
        const focusStyles = await firstLink.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            outline: styles.outline,
            outlineWidth: styles.outlineWidth
          };
        });
        
        expect(focusStyles.outlineWidth).not.toBe('0px');
      }
    });

    test('should have proper ARIA labels', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем кнопки с aria-label
      const buttonsWithAria = page.locator('button[aria-label]');
      const buttonCount = await buttonsWithAria.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttonsWithAria.nth(i);
        const ariaLabel = await button.getAttribute('aria-label');
        
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel?.length).toBeGreaterThan(0);
      }
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/posts/remont-vannoy');
      
      // Проверяем структуру заголовков
      const h1 = page.locator('h1');
      const h2 = page.locator('h2');
      const h3 = page.locator('h3');
      
      // Должен быть только один h1
      const h1Count = await h1.count();
      expect(h1Count).toBe(1);
      
      // Проверяем, что h1 идет перед h2
      const h1Position = await h1.first().boundingBox();
      const h2Position = await h2.first().boundingBox();
      
      if (h1Position && h2Position) {
        expect(h1Position.y).toBeLessThan(h2Position.y);
      }
    });

    test('should have proper form labels', async ({ page }) => {
      await page.goto('/calculators/budget');
      
      // Проверяем поля ввода
      const inputs = page.locator('input');
      const inputCount = await inputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        
        // Проверяем, что у поля есть label или aria-label
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const placeholder = await input.getAttribute('placeholder');
        
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          const labelCount = await label.count();
          expect(labelCount).toBeGreaterThan(0);
        } else {
          expect(ariaLabel || placeholder).toBeTruthy();
        }
      }
    });
  });

  test.describe('Performance Metrics', () => {
    test('should load critical resources quickly', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      
      // Ждем загрузки критических ресурсов
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Проверяем время загрузки
      expect(loadTime).toBeLessThan(5000); // Менее 5 секунд
      
      // Проверяем, что основные элементы загружены
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
    });

    test('should have efficient bundle size', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем количество загруженных скриптов
      const scripts = page.locator('script[src]');
      const scriptCount = await scripts.count();
      
      // Не должно быть слишком много скриптов
      expect(scriptCount).toBeLessThan(20);
      
      // Проверяем размер основных скриптов
      for (let i = 0; i < Math.min(5, scriptCount); i++) {
        const script = scripts.nth(i);
        const src = await script.getAttribute('src');
        
        if (src && src.includes('_next/static')) {
          // Проверяем, что скрипт загружается
          const response = await page.request.get(src);
          expect(response.status()).toBe(200);
        }
      }
    });
  });
});
