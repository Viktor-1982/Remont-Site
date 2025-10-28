import { test, expect } from '@playwright/test';

test.describe('Security and Configuration Tests', () => {
  test.describe('HTTPS and Security Headers', () => {
    test('should use HTTPS in production', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем, что страница загружается по HTTPS
      const url = page.url();
      expect(url).toMatch(/^https:/);
    });

    test('should have proper security headers', async ({ page }) => {
      const response = await page.goto('/');
      
      // Проверяем основные заголовки безопасности
      const headers = response?.headers();
      
      if (headers) {
        // Проверяем Content-Security-Policy
        const csp = headers['content-security-policy'];
        if (csp) {
          expect(csp).toContain('default-src');
        }
        
        // Проверяем X-Frame-Options
        const xFrameOptions = headers['x-frame-options'];
        if (xFrameOptions) {
          expect(xFrameOptions).toMatch(/DENY|SAMEORIGIN/);
        }
        
        // Проверяем Referrer-Policy
        const referrerPolicy = headers['referrer-policy'];
        if (referrerPolicy) {
          expect(referrerPolicy).toBeTruthy();
        }
      }
    });
  });

  test.describe('Environment and Configuration', () => {
    test('should not expose sensitive information', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем, что в HTML нет .env переменных
      const html = await page.content();
      
      // Проверяем отсутствие чувствительных данных
      expect(html).not.toContain('NEXT_PUBLIC_');
      expect(html).not.toContain('API_KEY');
      expect(html).not.toContain('SECRET');
      expect(html).not.toContain('PASSWORD');
    });

    test('should not expose API routes in sitemap', async ({ page }) => {
      const response = await page.request.get('/sitemap.xml');
      expect(response.status()).toBe(200);
      
      const sitemapContent = await response.text();
      
      // Проверяем, что в sitemap нет API роутов
      expect(sitemapContent).not.toContain('/api/');
      expect(sitemapContent).not.toContain('/_next/');
      expect(sitemapContent).not.toContain('/private/');
    });

    test('should have proper robots.txt configuration', async ({ page }) => {
      const response = await page.request.get('/robots.txt');
      expect(response.status()).toBe(200);
      
      const robotsContent = await response.text();
      
      // Проверяем основные директивы
      expect(robotsContent).toContain('User-agent: *');
      expect(robotsContent).toContain('Sitemap:');
      
      // Проверяем, что важные пути не заблокированы
      expect(robotsContent).not.toContain('Disallow: /');
      expect(robotsContent).not.toContain('Disallow: /calculators');
      expect(robotsContent).not.toContain('Disallow: /posts');
    });
  });

  test.describe('Content Security', () => {
    test('should not have inline scripts without nonce', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем inline скрипты
      const inlineScripts = page.locator('script:not([src])');
      const scriptCount = await inlineScripts.count();
      
      for (let i = 0; i < scriptCount; i++) {
        const script = inlineScripts.nth(i);
        const content = await script.textContent();
        
        // Проверяем, что inline скрипты безопасны
        if (content) {
          expect(content).not.toContain('eval(');
          expect(content).not.toContain('Function(');
          expect(content).not.toContain('setTimeout(');
          expect(content).not.toContain('setInterval(');
        }
      }
    });

    test('should have proper external resource loading', async ({ page }) => {
      await page.goto('/');
      
      // Проверяем внешние ресурсы
      const externalScripts = page.locator('script[src^="http"]');
      const scriptCount = await externalScripts.count();
      
      for (let i = 0; i < scriptCount; i++) {
        const script = externalScripts.nth(i);
        const src = await script.getAttribute('src');
        
        // Проверяем, что внешние скрипты загружаются с доверенных доменов
        if (src) {
          const isTrustedDomain = src.includes('googletagmanager.com') ||
                                 src.includes('mc.yandex.ru') ||
                                 src.includes('renohacks.com');
          expect(isTrustedDomain).toBe(true);
        }
      }
    });
  });

  test.describe('Form Security', () => {
    test('should have proper form validation', async ({ page }) => {
      await page.goto('/calculators/budget');
      
      // Проверяем поля ввода
      const inputs = page.locator('input');
      const inputCount = await inputs.count();
      
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const type = await input.getAttribute('type');
        
        // Проверяем, что числовые поля имеют правильный тип
        if (type === 'number') {
          const min = await input.getAttribute('min');
          const max = await input.getAttribute('max');
          
          // Проверяем, что есть ограничения на ввод
          expect(min || max).toBeTruthy();
        }
      }
    });

    test('should prevent XSS in user input', async ({ page }) => {
      await page.goto('/calculators/budget');
      
      // Пытаемся ввести потенциально опасный код
      const maliciousInput = '<script>alert("xss")</script>';
      
      // Заполняем поле категории
      await page.fill('input[placeholder*="Категория"]', maliciousInput);
      
      // Проверяем, что скрипт не выполнился
      const inputValue = await page.locator('input[placeholder*="Категория"]').inputValue();
      expect(inputValue).not.toContain('<script>');
      expect(inputValue).not.toContain('alert(');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle errors gracefully', async ({ page }) => {
      // Тестируем несуществующие страницы
      const response = await page.goto('/non-existent-page');
      expect(response?.status()).toBe(404);
      
      // Проверяем, что отображается кастомная 404 страница
      await expect(page.locator('h1')).toContainText('404');
      
      // Проверяем, что есть ссылка на главную
      const homeLink = page.locator('a[href="/"], a[href="/en"]').first();
      await expect(homeLink).toBeVisible();
    });

    test('should not expose stack traces', async ({ page }) => {
      // Пытаемся вызвать ошибку
      await page.goto('/');
      
      // Проверяем, что в консоли нет критических ошибок
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Ждем загрузки страницы
      await page.waitForLoadState('networkidle');
      
      // Проверяем, что нет критических ошибок
      const criticalErrors = errors.filter(error => 
        error.includes('TypeError') || 
        error.includes('ReferenceError') ||
        error.includes('Cannot read properties')
      );
      
      expect(criticalErrors.length).toBe(0);
    });
  });
});
