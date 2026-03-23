import type { Post } from "contentlayer/generated"

export type ArticleToolLocale = "ru" | "en"

export type ArticleToolId =
    | "paint"
    | "wallpaper"
    | "tile"
    | "flooring"
    | "baseboard"
    | "screed"
    | "underfloor-heating"
    | "ventilation"
    | "lighting"
    | "budget"
    | "color-palette"

export type ArticleToolIcon =
    | "paintbrush"
    | "wallpaper"
    | "grid3x3"
    | "layers"
    | "ruler"
    | "hammer"
    | "thermometer"
    | "wind"
    | "lightbulb"
    | "wallet"
    | "palette"

export interface ArticleToolCard {
    id: ArticleToolId
    href: string
    title: string
    description: string
    badge: string
    icon: ArticleToolIcon
    gradient: string
}

export interface ArticleToolSection {
    eyebrow: string
    title: string
    description: string
    primaryLabel: string
    secondaryLabel: string
    buttonLabel: string
    primary: ArticleToolCard
    secondary: ArticleToolCard[]
}

interface ToolDefinition {
    icon: ArticleToolIcon
    gradient: string
    href: Record<ArticleToolLocale, string>
    title: Record<ArticleToolLocale, string>
    description: Record<ArticleToolLocale, string>
    badge: Record<ArticleToolLocale, string>
}

const toolCatalog: Record<ArticleToolId, ToolDefinition> = {
    paint: {
        icon: "paintbrush",
        gradient: "from-amber-500/14 via-orange-500/10 to-transparent",
        href: { ru: "/calculators/paint", en: "/en/calculators/paint" },
        title: { ru: "Калькулятор краски", en: "Paint Calculator" },
        description: {
            ru: "Быстро рассчитайте расход краски по площади, окнам, дверям и количеству слоёв.",
            en: "Estimate paint coverage by room size, openings, and number of coats.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    wallpaper: {
        icon: "wallpaper",
        gradient: "from-violet-500/14 via-fuchsia-500/10 to-transparent",
        href: { ru: "/calculators/wallpaper", en: "/en/calculators/wallpaper" },
        title: { ru: "Калькулятор обоев", en: "Wallpaper Calculator" },
        description: {
            ru: "Узнайте, сколько рулонов нужно с учётом раппорта, проёмов и запаса.",
            en: "Calculate how many wallpaper rolls you need with pattern repeat, openings, and waste.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    tile: {
        icon: "grid3x3",
        gradient: "from-sky-500/14 via-cyan-500/10 to-transparent",
        href: { ru: "/calculators/tile", en: "/en/calculators/tile" },
        title: { ru: "Калькулятор плитки", en: "Tile Calculator" },
        description: {
            ru: "Подсчитайте плитку для пола или стен, запас на подрезку и расход клея.",
            en: "Estimate wall or floor tile, waste allowance, and adhesive consumption.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    flooring: {
        icon: "layers",
        gradient: "from-emerald-500/14 via-lime-500/10 to-transparent",
        href: { ru: "/calculators/flooring", en: "/en/calculators/flooring" },
        title: { ru: "Калькулятор напольного покрытия", en: "Flooring Calculator" },
        description: {
            ru: "Рассчитайте ламинат, кварцвинил или паркетную доску по упаковкам, подложке и запасу.",
            en: "Calculate laminate, LVT, or engineered wood by packs, underlayment, and waste.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    baseboard: {
        icon: "ruler",
        gradient: "from-stone-500/14 via-zinc-500/10 to-transparent",
        href: { ru: "/calculators/baseboard", en: "/en/calculators/baseboard" },
        title: { ru: "Калькулятор плинтуса", en: "Baseboard Calculator" },
        description: {
            ru: "Посчитайте длину плинтуса, количество планок, вычет проёмов и примерную стоимость.",
            en: "Measure baseboard length, number of pieces, opening deductions, and estimated cost.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    screed: {
        icon: "hammer",
        gradient: "from-slate-500/16 via-neutral-500/12 to-transparent",
        href: { ru: "/calculators/screed", en: "/en/calculators/screed" },
        title: { ru: "Калькулятор стяжки пола", en: "Screed Calculator" },
        description: {
            ru: "Рассчитайте объём стяжки, количество мешков смеси, воду и ориентировочный бюджет.",
            en: "Estimate screed volume, dry mix bags, water, and rough material cost.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    "underfloor-heating": {
        icon: "thermometer",
        gradient: "from-rose-500/14 via-orange-500/10 to-transparent",
        href: { ru: "/calculators/underfloor-heating", en: "/en/calculators/underfloor-heating" },
        title: { ru: "Калькулятор тёплого пола", en: "Underfloor Heating Calculator" },
        description: {
            ru: "Оцените мощность, площадь покрытия, потребление энергии и ориентировочные расходы.",
            en: "Estimate output, coverage area, energy use, and rough operating costs.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    ventilation: {
        icon: "wind",
        gradient: "from-blue-500/14 via-sky-500/10 to-transparent",
        href: { ru: "/calculators/ventilation", en: "/en/calculators/ventilation" },
        title: { ru: "Калькулятор вентиляции", en: "Ventilation Calculator" },
        description: {
            ru: "Подберите нужный расход воздуха по объёму помещения и кратности воздухообмена.",
            en: "Calculate airflow needs by room volume and air-change rate.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    lighting: {
        icon: "lightbulb",
        gradient: "from-yellow-500/14 via-amber-500/10 to-transparent",
        href: { ru: "/calculators/lighting", en: "/en/calculators/lighting" },
        title: { ru: "Калькулятор освещённости", en: "Lighting Calculator" },
        description: {
            ru: "Узнайте, сколько люмен нужно комнате и сколько светильников стоит закладывать.",
            en: "Work out how many lumens and fixtures a room really needs.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
    },
    budget: {
        icon: "wallet",
        gradient: "from-green-500/14 via-emerald-500/10 to-transparent",
        href: { ru: "/calculators/budget", en: "/en/calculators/budget" },
        title: { ru: "Планировщик бюджета", en: "Budget Planner" },
        description: {
            ru: "Соберите смету по категориям работ, валюте и резерву, чтобы контролировать весь проект.",
            en: "Build a renovation budget by category, currency, and contingency reserve.",
        },
        badge: { ru: "Планировщик", en: "Planner" },
    },
    "color-palette": {
        icon: "palette",
        gradient: "from-pink-500/14 via-purple-500/10 to-transparent",
        href: { ru: "/calculators/color-palette", en: "/en/calculators/color-palette" },
        title: { ru: "Генератор цветовых палитр", en: "Color Palette Generator" },
        description: {
            ru: "Подберите гармоничную палитру и проверьте, как цвета работают вместе до начала ремонта.",
            en: "Build a balanced interior color palette before you commit to paint and finishes.",
        },
        badge: { ru: "Инструмент", en: "Tool" },
    },
}

const explicitRules: Array<{ test: RegExp; tools: ArticleToolId[] }> = [
    {
        test: /(podborka-tsvetov|living-room-color-tips|sovety-tsveta-gostinaya|bedroom-design|dizain-spalni)/,
        tools: ["color-palette", "paint", "lighting"],
    },
    {
        test: /(pokrask|painting-walls|preparing-walls-for-painting)/,
        tools: ["paint", "color-palette", "budget"],
    },
    {
        test: /(oboy|wallpaper)/,
        tools: ["wallpaper", "paint", "budget"],
    },
    {
        test: /(plitk|tile)/,
        tools: ["tile", "budget", "lighting"],
    },
    {
        test: /(vann|bathroom)/,
        tools: ["tile", "lighting", "budget"],
    },
    {
        test: /(kuhn|kitchen)/,
        tools: ["tile", "lighting", "budget"],
    },
    {
        test: /(spalni-2026|bedroom-trends-2026)/,
        tools: ["lighting", "color-palette", "budget"],
    },
    {
        test: /(small-apartment|malenkaya-kvartira|small-studio|studiya)/,
        tools: ["lighting", "color-palette", "budget"],
    },
    {
        test: /(wellness|country-house|zagorodnyh-domov)/,
        tools: ["ventilation", "underfloor-heating", "lighting"],
    },
    {
        test: /(material|surface)/,
        tools: ["flooring", "baseboard", "paint"],
    },
    {
        test: /(laminat|laminate|kvarcvinil|кварцвинил|lvt|flooring)/,
        tools: ["flooring", "baseboard", "budget"],
    },
    {
        test: /(plintus|плинтус|baseboard|skirting|trim)/,
        tools: ["baseboard", "flooring", "budget"],
    },
    {
        test: /(styazhk|стяжк|screed)/,
        tools: ["screed", "flooring", "budget"],
    },
    {
        test: /(modul|cave-living|zhilaya-zona-v-skale)/,
        tools: ["budget", "ventilation", "lighting"],
    },
    {
        test: /(chernov|rough|old-apartment|staroy-kvartiry)/,
        tools: ["screed", "flooring", "budget"],
    },
    {
        test: /(bez-peredelok|without-rework|plan|save-money|ekonom|mistakes|tips|modern-apartment-renovation|sovremennye-podkhody|trends-2026|interior-design-trends-2026|interior-trends-2025|8-interior-trends-2025)/,
        tools: ["budget", "lighting", "color-palette"],
    },
]

const scoreRules: Array<{ toolId: ArticleToolId; weight: number; patterns: RegExp[] }> = [
    {
        toolId: "paint",
        weight: 22,
        patterns: [/краск/g, /покраск/g, /paint/g, /painting/g, /coats?/g],
    },
    {
        toolId: "wallpaper",
        weight: 26,
        patterns: [/обои/g, /wallpaper/g, /раппорт/g, /pattern repeat/g],
    },
    {
        toolId: "tile",
        weight: 24,
        patterns: [/плитк/g, /tile/g, /bathroom/g, /ванн/g, /shower/g, /кухн/g, /kitchen/g],
    },
    {
        toolId: "flooring",
        weight: 22,
        patterns: [/floor/g, /пол/g, /ламинат/g, /vinyl/g, /кварцвинил/g, /паркет/g, /surface/g, /wood/g],
    },
    {
        toolId: "baseboard",
        weight: 18,
        patterns: [/плинтус/g, /baseboard/g, /skirting/g, /trim/g, /molding/g],
    },
    {
        toolId: "screed",
        weight: 26,
        patterns: [/стяж/g, /screed/g, /чернов/g, /rough renovation/g, /subfloor/g],
    },
    {
        toolId: "underfloor-heating",
        weight: 22,
        patterns: [/тепл/g, /underfloor/g, /heating/g, /warm floor/g],
    },
    {
        toolId: "ventilation",
        weight: 22,
        patterns: [/вентиляц/g, /ventilation/g, /airflow/g, /воздух/g, /air quality/g],
    },
    {
        toolId: "lighting",
        weight: 18,
        patterns: [/свет/g, /освещ/g, /lighting/g, /light /g, /lamps?/g],
    },
    {
        toolId: "budget",
        weight: 16,
        patterns: [/бюдж/g, /смет/g, /эконом/g, /cost/g, /budget/g, /renovation/g, /ремонт/g, /remodel/g],
    },
    {
        toolId: "color-palette",
        weight: 20,
        patterns: [/цвет/g, /palette/g, /color/g, /палитр/g, /design/g, /дизайн/g],
    },
]

function normalizeText(value: string) {
    return value.toLowerCase()
}

function getHaystack(post: Post) {
    return normalizeText(
        [
            post.slug,
            post.title,
            post.description,
            ...(post.tags || []),
            ...(post.keywords || []),
        ].join(" ")
    )
}

function getExplicitTools(post: Post): ArticleToolId[] | null {
    const slug = post.slug.toLowerCase()

    for (const rule of explicitRules) {
        if (rule.test.test(slug)) {
            return rule.tools
        }
    }

    return null
}

function getScoredTools(post: Post): ArticleToolId[] {
    const haystack = getHaystack(post)
    const scores = new Map<ArticleToolId, number>()

    for (const rule of scoreRules) {
        for (const pattern of rule.patterns) {
            const matches = haystack.match(pattern)
            if (matches?.length) {
                scores.set(rule.toolId, (scores.get(rule.toolId) || 0) + matches.length * rule.weight)
            }
        }
    }

    const ranked = Array.from(scores.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([toolId]) => toolId)

    if (ranked.length >= 3) {
        return ranked.slice(0, 3)
    }

    const fallback: ArticleToolId[] = ["budget", "lighting", "color-palette"]
    for (const toolId of fallback) {
        if (!ranked.includes(toolId)) {
            ranked.push(toolId)
        }
        if (ranked.length === 3) {
            break
        }
    }

    return ranked.slice(0, 3)
}

function buildToolCard(toolId: ArticleToolId, locale: ArticleToolLocale): ArticleToolCard {
    const tool = toolCatalog[toolId]

    return {
        id: toolId,
        href: tool.href[locale],
        title: tool.title[locale],
        description: tool.description[locale],
        badge: tool.badge[locale],
        icon: tool.icon,
        gradient: tool.gradient,
    }
}

export function getArticleTools(post: Post, locale: ArticleToolLocale): ArticleToolSection {
    const toolIds = getExplicitTools(post) || getScoredTools(post)
    const cards = toolIds.map((toolId) => buildToolCard(toolId, locale))

    return {
        eyebrow: locale === "ru" ? "Инструменты по теме статьи" : "Tools for This Article",
        title:
            locale === "ru"
                ? "Сразу перейдите от идеи к расчёту"
                : "Turn Ideas Into Real Numbers",
        description:
            locale === "ru"
                ? "Подобрали главный калькулятор и ещё два полезных инструмента, которые чаще всего нужны после этой статьи."
                : "We picked the main calculator plus two practical tools readers usually need next.",
        primaryLabel: locale === "ru" ? "Лучший следующий шаг" : "Best Next Step",
        secondaryLabel: locale === "ru" ? "Полезно следом" : "Useful Next",
        buttonLabel: locale === "ru" ? "Открыть инструмент" : "Open Tool",
        primary: cards[0],
        secondary: cards.slice(1),
    }
}
