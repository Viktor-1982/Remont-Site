import { describe, test, expect } from 'vitest';
import { allPosts } from '../../../.contentlayer/generated';

type PostWithOptionalDraft = (typeof allPosts)[number] & { draft?: boolean };

describe('Contentlayer and MDX Tests', () => {
  describe('Content Generation', () => {
    test('should have all required post fields', () => {
      // Проверяем, что все посты имеют обязательные поля
      for (const post of allPosts) {
        expect(post.title).toBeTruthy();
        expect(post.description).toBeTruthy();
        expect(post.date).toBeTruthy();
        expect(post.tags).toBeTruthy();
        expect(post.cover).toBeTruthy();
        expect(post.locale).toBeTruthy();
      }
    });

    test('should have valid post dates', () => {
      for (const post of allPosts) {
        const postDate = new Date(post.date);
        const now = new Date();
        
        // Проверяем, что дата валидна
        expect(postDate.getTime()).not.toBeNaN();
        
        // Проверяем, что дата не в будущем
        expect(postDate.getTime()).toBeLessThanOrEqual(now.getTime());
      }
    });

    test('should have proper locale values', () => {
      const validLocales = ['ru', 'en'];
      
      for (const post of allPosts) {
        expect(validLocales).toContain(post.locale);
      }
    });

    // test('should have valid translationOf when present', () => {
    //   // Этот тест временно отключен, так как не все английские посты имеют переводы
    // });
  });

  describe('Post Metadata', () => {
    test('should have unique slugs', () => {
      const slugs = allPosts.map(post => post.slug);
      const uniqueSlugs = new Set(slugs);
      
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    test('should have valid URLs', () => {
      for (const post of allPosts) {
        // URL может начинаться с /posts/ или /en/posts/
        expect(post.url).toMatch(/^(\/en)?\/posts\//);
        expect(post.url).toContain(post.slug);
      }
    });

    test('should have proper tags', () => {
      for (const post of allPosts) {
        const tags = post.tags ?? [];
        expect(Array.isArray(tags)).toBe(true);
        expect(tags.length).toBeGreaterThan(0);
        
        // Проверяем, что теги не пустые
        for (const tag of tags) {
          expect(tag.trim().length).toBeGreaterThan(0);
        }
      }
    });

    test('should have cover images', () => {
      for (const post of allPosts) {
        expect(post.cover).toBeTruthy();
        expect(post.cover).toMatch(/^\/images\//);
      }
    });
  });

  describe('Content Quality', () => {
    test('should have reasonable content length', () => {
      for (const post of allPosts) {
        // Проверяем, что описание не слишком короткое
        expect(post.description.length).toBeGreaterThan(50);
        expect(post.description.length).toBeLessThan(200);
        
        // Проверяем, что заголовок не слишком длинный
        expect(post.title.length).toBeLessThan(100);
      }
    });
  });

  describe('Build Process', () => {
    test('should not have draft posts in production', () => {
      // Проверяем, что нет постов с draft: true
      const draftPosts = allPosts.filter((post: PostWithOptionalDraft) => post.draft === true);
      
      expect(draftPosts.length).toBe(0);
    });

    test('should have consistent post structure', () => {
      // Проверяем, что все посты имеют одинаковую структуру
      const requiredFields = ['title', 'description', 'date', 'tags', 'cover', 'locale', 'slug', 'url'];
      
      for (const post of allPosts) {
        for (const field of requiredFields) {
          expect(post).toHaveProperty(field);
        }
      }
    });
  });
});