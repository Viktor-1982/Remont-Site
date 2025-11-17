import { withContentlayer } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "plus.unsplash.com" }
        ],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 31536000, // 1 год
        dangerouslyAllowSVG: false,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    experimental: {
        optimizePackageImports: ['framer-motion', 'lucide-react'],
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    // ✅ HTTP Security Headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // Content Security Policy
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://mc.yandex.ru",
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' data: https: blob:",
                            "font-src 'self' data:",
                            "connect-src 'self' https://www.googletagmanager.com https://mc.yandex.ru https://openrouter.ai",
                            "frame-src https://www.googletagmanager.com",
                            "object-src 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                            "frame-ancestors 'none'",
                            "upgrade-insecure-requests",
                        ].join('; '),
                    },
                    // HSTS (HTTP Strict Transport Security)
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    // X-Frame-Options (защита от clickjacking)
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    // X-Content-Type-Options (защита от MIME sniffing)
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // X-XSS-Protection (legacy, но полезно для старых браузеров)
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    // Referrer-Policy
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    // Permissions-Policy
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
                    },
                ],
            },
        ]
    },
}

export default withContentlayer(nextConfig)
