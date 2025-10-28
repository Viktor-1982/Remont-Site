import { NextResponse } from "next/server"
import { allPosts } from ".contentlayer/generated"

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const path = (url.searchParams.get("path") || "/")
            .split("?")[0]
            .split("#")[0]

        const isEnglish = /^\/en(\/|$)/.test(path)
        const targetLocale = isEnglish ? "ru" : "en"
        let targetUrl: string | null = null

        // ==========================================================
        // 🔹 1. Посты (через translationOf / slug / locale)
        // ==========================================================
        function extractSlug(p: string) {
            const clean = p.split("?")[0].split("#")[0]
            if (clean.startsWith("/en/posts/")) return clean.replace("/en/posts/", "")
            if (clean.startsWith("/posts/")) return clean.replace("/posts/", "")
            return null
        }

        const slug = extractSlug(path)
        if (slug) {
            const current = allPosts.find((p) => p.slug === slug)

            if (current) {
                const key = current.translationOf || current.slug
                const mirror = allPosts.find(
                    (p) =>
                        (p.translationOf === key || p.slug === key) &&
                        p.locale !== current.locale
                )
                if (mirror) targetUrl = mirror.url
            }
        }

        // ==========================================================
        // 🔹 2. About
        // ==========================================================
        if (!targetUrl && /^\/(en\/)?about/.test(path)) {
            targetUrl = targetLocale === "en" ? "/en/about" : "/about"
        }

        // ==========================================================
        // 🔹 3. 404 / Not-found
        // ==========================================================
        if (!targetUrl && /(404|not-found)/.test(path)) {
            targetUrl = targetLocale === "en" ? "/en/not-found" : "/not-found"
        }

        // ==========================================================
        // 🔹 4. Calculators (учёт подстраниц)
        // ==========================================================
        if (!targetUrl && /^\/(en\/)?calculators/.test(path)) {
            const subPath = path.replace(/^\/(en\/)?calculators/, "")
            targetUrl =
                targetLocale === "en"
                    ? `/en/calculators${subPath}`
                    : `/calculators${subPath}`
        }

        // ==========================================================
        // 🔹 5. Tags
        // ==========================================================
        if (!targetUrl && /^\/(en\/)?tags\//.test(path)) {
            // Маппинг тегов: английский -> русский
            const enToRuMap: Record<string, string> = {
                "interior-design": "интерьер",
                "interior design": "интерьер", 
                "design": "дизайн",
                "interior": "интерьер",
                "trends": "тренды",
                "renovation": "ремонт",
                "diy": "diy",
                "kitchen": "кухня",
                "bathroom": "ванная",
                "walls": "стены",
                "wallpaper": "обои",
                "materials": "материалы",
                "color": "цвет",
                "bedroom": "спальня",
                "cozy": "уют",
                "minimalism": "минимализм",
                "scandinavian-style": "скандинавский стиль",
                "scandinavian style": "скандинавский стиль",
                "living-room": "гостиная",
                "living room": "гостиная",
                "tips": "советы",
                "decor": "декор",
                "preparation": "подготовка",
                "painting": "покраска",
                "small-spaces": "маленькие пространства",
                "small spaces": "маленькие пространства",
                "budget-renovation": "бюджетный ремонт",
                "budget renovation": "бюджетный ремонт",
                "cosmetic-makeover": "косметический ремонт",
                "cosmetic makeover": "косметический ремонт",
                "budget-friendly": "бюджетный ремонт",
                "architecture": "архитектура",
                "nature": "природа",
                "cave-living": "в скале",
                "cave living": "в скале",
                "rough-finish": "черновая отделка",
                "rough finish": "черновая отделка",
                "planning": "планирование",
                "plumbing": "сантехника",
                "electricity": "отделка",
                "finishing": "отделка",
                "home-decor": "декор",
                "home decor": "декор",
                "lighting": "освещение",
                "paint-testing": "советы",
                "paint testing": "советы",
                "lifestyle": "лайфхаки",
                "stress-free-renovation": "ремонт без стресса",
                "stress-free renovation": "ремонт без стресса",
                "renovation-plan": "план ремонта",
                "renovation plan": "план ремонта",
                "eco-design": "экодизайн",
                "eco design": "экодизайн",
                "smart-home": "умный дом",
                "smart home": "умный дом",
                "wellness": "wellness",
            }

            // Маппинг тегов: русский -> английский
            const ruToEnMap: Record<string, string> = {
                "интерьер": "interior-design",
                "дизайн": "design", 
                "тренды": "trends",
                "ремонт": "renovation",
                "кухня": "kitchen",
                "ванная": "bathroom",
                "стены": "walls",
                "обои": "wallpaper",
                "материалы": "materials",
                "цвет": "color",
                "спальня": "bedroom",
                "уют": "cozy",
                "минимализм": "minimalism",
                "скандинавский-стиль": "scandinavian-style",
                "скандинавский стиль": "scandinavian-style",
                "гостиная": "living-room",
                "советы": "tips",
                "декор": "decor",
                "подготовка": "preparation",
                "покраска": "painting",
                "маленькие-пространства": "small-spaces",
                "маленькие пространства": "small-spaces",
                "бюджетный-ремонт": "budget-renovation",
                "бюджетный ремонт": "budget-renovation",
                "косметический-ремонт": "cosmetic-makeover",
                "косметический ремонт": "cosmetic-makeover",
                "архитектура": "architecture",
                "природа": "nature",
                "в-скале": "cave-living",
                "в скале": "cave-living",
                "черновая-отделка": "rough-finish",
                "черновая отделка": "rough-finish",
                "планирование": "planning",
                "сантехника": "plumbing",
                "отделка": "finishing",
                "освещение": "lighting",
                "лайфхаки": "lifestyle",
                "ремонт-без-стресса": "stress-free-renovation",
                "ремонт без стресса": "stress-free-renovation",
                "план-ремонта": "renovation-plan",
                "план ремонта": "renovation-plan",
                "экодизайн": "eco-design",
                "умный-дом": "smart-home",
                "умный дом": "smart-home",
                "wellness": "wellness",
            }

            const tag = decodeURIComponent(path.split("/").pop() ?? "")
            const mappedTag = targetLocale === "en" 
                ? (ruToEnMap[tag] || tag)
                : (enToRuMap[tag] || tag)

            targetUrl =
                targetLocale === "en"
                    ? `/en/tags/${encodeURIComponent(mappedTag)}`
                    : `/tags/${encodeURIComponent(mappedTag)}`
        }

        // ==========================================================
        // 🔹 6. Categories
        // ==========================================================
        if (!targetUrl && /^\/(en\/)?category\//.test(path)) {
            const categoryMap: Record<string, string> = {
                novinki: "trends",
                trends: "novinki",
                diy: "diy",
                kitchen: "kitchen",
                bathroom: "bathroom",
                walls: "walls",
                eco: "eco",
                design: "design",
                interior: "interior",
                furniture: "furniture",
                lighting: "lighting",
                color: "color",
                renovation: "renovation",
                ideas: "ideas",
                materials: "materials",
                budget: "budget",
                // Русские категории
                кухня: "kitchen",
                ванная: "bathroom",
                стены: "walls",
            }

            const cat = path.split("/").pop() ?? ""
            const encodedCat = encodeURIComponent(cat)
            const mappedCat = categoryMap[cat] || cat

            targetUrl =
                targetLocale === "en"
                    ? `/en/category/${mappedCat === cat ? encodedCat : mappedCat}`
                    : `/category/${mappedCat === cat ? encodedCat : mappedCat}`
        }

        // ==========================================================
        // 🔹 7. Fallback — просто меняем язык
        // ==========================================================
        if (!targetUrl) {
            targetUrl = isEnglish
                ? path.replace(/^\/en/, "") || "/"
                : `/en${path === "/" ? "" : path}`
        }

        // ==========================================================
        // 🔹 8. Финальный ответ
        // ==========================================================
        return NextResponse.json({
            success: true,
            targets: {
                ru: isEnglish
                    ? targetUrl || path.replace(/^\/en/, "") || "/"
                    : path,
                en: !isEnglish
                    ? targetUrl || `/en${path === "/" ? "" : path}`
                    : path,
            },
        })
    } catch (e) {
        console.error("❌ Language switch error:", e)
        return NextResponse.json({
            success: false,
            targets: { ru: "/", en: "/en" },
        })
    }
}
