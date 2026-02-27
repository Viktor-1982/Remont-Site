// src/app/robots.ts
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://renohacks.com"

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/"],
                disallow: [
                    "/api/",
                    "/dev-check/",
                    "/private/",
                    "/404",
                    "/500",
                    "/drafts/",
                    "/temp/",
                ],
            },
        ],
        sitemap: [`${baseUrl}/sitemap.xml`], // ✅  sitemap!
        // host удалён: не является стандартной директивой robots.txt
        // Поддерживается только Яндексом, но вызывает ошибки в валидаторах
    }
}
