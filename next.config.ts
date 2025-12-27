import type { NextConfig } from "next"
import webpack from "webpack"

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
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
