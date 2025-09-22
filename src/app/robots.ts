import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://renohacks.com/sitemap.xml",
        host: "https://renohacks.com",
    }
}

