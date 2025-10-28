#!/usr/bin/env node

/**
 * Ручная индексация через Google Search Console
 * Генерирует список URL для копирования в GSC
 */

const fs = require('fs');

// Приоритетные URL для индексации
const PRIORITY_URLS = [
    'https://renohacks.com/calculators/budget',
    'https://renohacks.com/en/calculators/budget',
    'https://renohacks.com/posts/remont-vannoy',
    'https://renohacks.com/posts/pokraska-sten',
    'https://renohacks.com/posts/malenkaya-kuhnya',
    'https://renohacks.com/posts/remont-chernovoy-kvartiry',
    'https://renohacks.com/posts/dizain-spalni',
    'https://renohacks.com/posts/sovety-tsveta-gostinaya',
    'https://renohacks.com/posts/trends-2026',
    'https://renohacks.com/posts/vidy-oboyev',
    'https://renohacks.com/en/posts/bedroom-design',
    'https://renohacks.com/en/posts/kitchen-makeover',
    'https://renohacks.com/en/posts/diy-bathroom-makeover',
    'https://renohacks.com/en/posts/living-room-color-tips',
    'https://renohacks.com/en/posts/interior-trends-2025',
];

console.log('🚀 Ручная индексация через Google Search Console\n');

console.log('📋 Список URL для копирования в GSC:');
console.log('=' .repeat(60));

PRIORITY_URLS.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
});

console.log('=' .repeat(60));

console.log('\n🎯 Инструкция по ручной индексации:');
console.log('1. Откройте: https://search.google.com/search-console');
console.log('2. Выберите свойство: renohacks.com');
console.log('3. Перейдите: "Индексирование" → "Запрос на индексацию"');
console.log('4. Скопируйте каждый URL из списка выше');
console.log('5. Вставьте в поле "URL" и нажмите "Запросить индексацию"');
console.log('6. Повторите для всех 15 URL');

console.log('\n⏰ Рекомендации:');
console.log('- Добавляйте по 5-10 URL в день (лимит Google)');
console.log('- Начните с калькуляторов (самые важные)');
console.log('- Проверяйте статус через 1-2 дня');

console.log('\n📊 Ожидаемые результаты:');
console.log('- Через 1-3 дня: Google начнет индексировать');
console.log('- Через 1-2 недели: Все страницы в индексе');
console.log('- Улучшится позиционирование в поиске');

console.log('\n✅ Готово! Скопируйте URL из списка выше и добавьте в GSC');
