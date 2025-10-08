// src/app/robots.ts
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://renohacks.com"

    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/"], // можно массивом, чтобы расширять в будущем
                disallow: [
                    "/api/",
                    "/_next/",
                    "/private/",
                    "/404",
                    "/500",
                    "/drafts/",
                    "/temp/",
                ],
            },
        ],
        sitemap: [`${baseUrl}/sitemap.xml`],
        host: "renohacks.com", 
    }
}
