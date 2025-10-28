#!/usr/bin/env node

/**
 * Тестовый скрипт для проверки настройки Google Indexing API
 * Запустите этот скрипт после настройки Google Cloud Console
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка настройки Google Indexing API...\n');

// Проверяем наличие файла ключа
const keyFile = path.join(__dirname, '../google-service-account.json');

if (!fs.existsSync(keyFile)) {
    console.log('❌ Файл ключа не найден:', keyFile);
    console.log('\n📝 Что нужно сделать:');
    console.log('1. Скачать JSON ключ из Google Cloud Console');
    console.log('2. Переименовать его в "google-service-account.json"');
    console.log('3. Поместить в корень проекта (рядом с package.json)');
    console.log('\n🌐 Откройте: https://console.cloud.google.com/');
    process.exit(1);
}

console.log('✅ Файл ключа найден');

// Проверяем содержимое файла
try {
    const keyData = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
    
    if (!keyData.client_email) {
        console.log('❌ Неверный формат JSON ключа');
        process.exit(1);
    }
    
    console.log('✅ JSON ключ валиден');
    console.log('📧 Service Account email:', keyData.client_email);
    console.log('🆔 Project ID:', keyData.project_id);
    
    console.log('\n🎯 Следующий шаг:');
    console.log('Добавьте этот email в Google Search Console как владельца:');
    console.log(`📧 ${keyData.client_email}`);
    console.log('\n🌐 Откройте: https://search.google.com/search-console');
    console.log('Перейдите: Settings → Users and permissions → Add user');
    
} catch (error) {
    console.log('❌ Ошибка чтения JSON файла:', error.message);
    process.exit(1);
}

console.log('\n✅ Настройка завершена! Теперь можно запустить основной скрипт:');
console.log('🚀 node scripts/indexing-api.js');
