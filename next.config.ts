import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        // ✅ Конфигурация качеств и форматов изображений для Next.js 16+
        qualities: [50, 75, 85, 90, 95, 100],
        formats: ["image/webp", "image/avif"], // Приоритет: WebP → AVIF → исходный формат
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
                ],
            },
            {
                source: "/((?!api|_next).*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=86400, stale-while-revalidate=604800",
                    },
                ],
            },
        ]
    },
    webpack: (config, { isServer, webpack }) => {
        // ✅ process/browser нужен только в браузере
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

        // Игнорируем предупреждения о oklch - lightningcss обработает это
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
