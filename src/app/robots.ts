import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/_next/",
                    "/private/",
                    "/404", // 🚫 кастомная страница ошибки
                    "/500", // 🚫 если есть страница 500
                ],
            },
        ],
        sitemap: "https://renohacks.com/sitemap.xml",
        host: "https://renohacks.com",
    }
}
