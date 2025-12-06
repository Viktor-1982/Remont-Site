// Service Worker для PWA
const CACHE_NAME = 'renohacks-v1'
const STATIC_CACHE = 'renohacks-static-v1'
const DYNAMIC_CACHE = 'renohacks-dynamic-v1'

// Файлы для кеширования при установке
const STATIC_ASSETS = [
    '/',
    '/en',
    '/icon.svg',
    '/favicon.ico',
    '/manifest.json',
]

// Установка Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(STATIC_ASSETS)
        })
    )
    self.skipWaiting()
})

// Активация Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
                    .map((name) => caches.delete(name))
            )
        })
    )
    return self.clients.claim()
})

// Стратегия кеширования: Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)

    // Пропускаем внешние запросы и API
    if (url.origin !== location.origin || url.pathname.startsWith('/api/')) {
        return
    }

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Клонируем ответ для кеша
                const responseToCache = response.clone()
                
                // Кешируем только успешные GET запросы
                if (request.method === 'GET' && response.status === 200) {
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(request, responseToCache)
                    })
                }
                
                return response
            })
            .catch(() => {
                // Если сеть недоступна, используем кеш
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse
                    }
                    
                    // Fallback для навигационных запросов
                    if (request.mode === 'navigate') {
                        return caches.match('/').then((fallback) => {
                            return fallback || new Response('Offline', { status: 503 })
                        })
                    }
                    
                    return new Response('Offline', { status: 503 })
                })
            })
    )
})

