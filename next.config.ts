import type { NextConfig } from "next"

const contentSecurityPolicy = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://mc.yandex.ru https://mc.yandex.com https://www.clarity.ms https://scripts.clarity.ms https://va.vercel-scripts.com https://vitals.vercel-insights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' wss://mc.yandex.com https://www.google-analytics.com https://region1.google-analytics.com https://mc.yandex.ru https://mc.yandex.com https://www.clarity.ms https://va.vercel-scripts.com https://vitals.vercel-insights.com https:",
    "frame-src 'self' https://www.googletagmanager.com https://mc.yandex.ru",
    "manifest-src 'self'",
    "media-src 'self' data: blob: https:",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: contentSecurityPolicy,
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
]

const nextConfig: NextConfig = {
    images: {
        qualities: [50, 75, 85, 90, 95, 100],
        formats: ["image/webp", "image/avif"],
    },
    async headers() {
        return [
            {
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                ],
            },
            {
                source: "/((?!api|_next).*)",
                headers: [
                    ...securityHeaders,
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=86400, stale-while-revalidate=604800",
                    },
                ],
            },
        ]
    },
    webpack: (config, { isServer, webpack }) => {
        if (!isServer) {
            config.plugins = config.plugins || []
            config.plugins.push(
                new webpack.ProvidePlugin({
                    process: "process/browser",
                })
            )

            config.resolve = config.resolve || {}
            config.resolve.fallback = {
                ...(config.resolve.fallback || {}),
                fs: false,
                path: false,
                os: false,
            }
        }

        config.ignoreWarnings = [
            ...(config.ignoreWarnings || []),
            {
                module: /\.css$/,
                message: /oklch/,
            },
        ]

        return config
    },
}

export default nextConfig
