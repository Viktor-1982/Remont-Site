#!/usr/bin/env node

/**
 * Google Indexing API Script
 * Автоматически отправляет запросы на индексацию в Google Search Console
 * 
 * Требования:
 * 1. Настроить Google Cloud Console проект
 * 2. Включить Indexing API
 * 3. Создать Service Account и скачать JSON ключ
 * 4. Добавить Service Account в Google Search Console как владельца
 * 
 * Использование:
 * node scripts/indexing-api.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Конфигурация
const CONFIG = {
    // Путь к JSON ключу от Service Account
    keyFile: path.join(__dirname, '../google-service-account.json'),
    
    // URL сайта в Google Search Console
    siteUrl: 'https://renohacks.com',
    
    // Список URL для индексации (приоритетные)
    urlsToIndex: [
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
    ]
};

async function initializeIndexingAPI() {
    try {
        // Проверяем наличие ключа
        if (!fs.existsSync(CONFIG.keyFile)) {
            console.error('❌ Файл ключа не найден:', CONFIG.keyFile);
            console.log('📝 Создайте Service Account в Google Cloud Console и скачайте JSON ключ');
            process.exit(1);
        }

        // Инициализируем Google API
        const auth = new google.auth.GoogleAuth({
            keyFile: CONFIG.keyFile,
            scopes: ['https://www.googleapis.com/auth/indexing']
        });

        const indexing = google.indexing({ version: 'v3', auth });
        
        console.log('✅ Google Indexing API инициализирован');
        return indexing;
    } catch (error) {
        console.error('❌ Ошибка инициализации API:', error.message);
        process.exit(1);
    }
}

async function requestIndexing(indexing, url) {
    try {
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED'
            }
        });

        console.log(`✅ Запрос отправлен: ${url}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 429) {
            console.log(`⏳ Лимит запросов превышен для: ${url}`);
            return null;
        }
        console.error(`❌ Ошибка для ${url}:`, error.message);
        return null;
    }
}

async function main() {
    console.log('🚀 Запуск Google Indexing API скрипта...\n');

    const indexing = await initializeIndexingAPI();
    
    console.log(`📋 Обрабатываем ${CONFIG.urlsToIndex.length} URL...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const url of CONFIG.urlsToIndex) {
        const result = await requestIndexing(indexing, url);
        
        if (result) {
            successCount++;
        } else {
            errorCount++;
        }

        // Пауза между запросами (Google рекомендует 1-2 секунды)
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log('\n📊 Результаты:');
    console.log(`✅ Успешно: ${successCount}`);
    console.log(`❌ Ошибки: ${errorCount}`);
    console.log(`📈 Всего: ${CONFIG.urlsToIndex.length}`);

    if (successCount > 0) {
        console.log('\n🎉 Запросы на индексацию отправлены!');
        console.log('⏰ Проверьте статус в Google Search Console через 1-2 дня');
    }
}

// Запуск скрипта
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main, CONFIG };
