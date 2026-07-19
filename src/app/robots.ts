// src/app/robots.ts
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://renohacks.com"

    return {
        rules: [
            // ── Default: all crawlers ─────────────────────────────────────────
            {
                userAgent: "*",
                allow: ["/"],
                disallow: [
                    "/api/",
                    "/private/",
                    "/404",
                    "/500",
                    "/drafts/",
                    "/temp/",
                    "/*?category=",
                    "/*?filter=",
                    "/*?*",
                ],
            },

            // ── AI Search Engines — explicitly allowed ────────────────────────
            // These bots index content for AI-powered search (Perplexity, ChatGPT, etc.)
            // Allowing them increases visibility in AI-generated answers.
            {
                userAgent: "GPTBot",        // ChatGPT / OpenAI Search
                allow: ["/"],
            },
            {
                userAgent: "PerplexityBot", // Perplexity AI Search
                allow: ["/"],
            },
            {
                userAgent: "ClaudeBot",     // Anthropic / Claude
                allow: ["/"],
            },
            {
                userAgent: "YouBot",        // You.com AI Search
                allow: ["/"],
            },
            {
                userAgent: "Applebot",      // Apple Intelligence / Spotlight
                allow: ["/"],
            },
            {
                userAgent: "anthropic-ai",  // Anthropic crawler (alternate UA)
                allow: ["/"],
            },
            {
                userAgent: "Google-Extended", // Google Bard / Gemini training
                allow: ["/"],
            },
        ],
        sitemap: [`${baseUrl}/sitemap.xml`],
    }
}
