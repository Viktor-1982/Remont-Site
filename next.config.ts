import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        // ✅ Конфигурация качеств изображений для Next.js 16+
        qualities: [50, 75, 85, 90, 95, 100],
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

        return config
    },
}

export default nextConfig
