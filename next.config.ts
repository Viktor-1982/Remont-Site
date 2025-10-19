import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    webpack: (config, { isServer, webpack }) => {
        // 👇 создаём безопасный полифил для process
        config.plugins.push(
            new webpack.ProvidePlugin({
                process: "process/browser",
            })
        )

        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                os: false,
            }
        }

        return config
    },
}

export default nextConfig
