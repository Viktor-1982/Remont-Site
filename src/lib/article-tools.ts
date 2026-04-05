import type { Post } from "contentlayer/generated"
import { bathroomHubSlugs } from "@/lib/bathroom-hub"
import { getEditorialStandardsDictionary } from "@/dictionaries/editorial-standards"
import { kitchenHubSlugs } from "@/lib/kitchen-hub"
import { lightingHubSlugs } from "@/lib/lighting-hub"

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
    ctaLabel: string
}

export interface ArticleHubCard {
    href: string
    title: string
    description: string
    badge: string
    icon: ArticleToolIcon
    gradient: string
    ctaLabel: string
}

export interface ArticleTrustInfo {
    updatedLabel: string
    updatedValue: string
    basisLabel: string
    basisValue: string
    pageLabel: string
    pageHref: string
}

export interface ArticleToolSection {
    eyebrow: string
    title: string
    description: string
    primaryLabel: string
    secondaryLabel: string
    hubLabel: string
    primary: ArticleToolCard
    secondary: ArticleToolCard[]
    hub: ArticleHubCard | null
    trust: ArticleTrustInfo
}

interface ToolDefinition {
    icon: ArticleToolIcon
    gradient: string
    href: Record<ArticleToolLocale, string>
    title: Record<ArticleToolLocale, string>
    description: Record<ArticleToolLocale, string>
    badge: Record<ArticleToolLocale, string>
    ctaLabel: Record<ArticleToolLocale, string>
}

interface HubDefinition {
    href: Record<ArticleToolLocale, string>
    title: Record<ArticleToolLocale, string>
    description: Record<ArticleToolLocale, string>
    badge: Record<ArticleToolLocale, string>
    ctaLabel: Record<ArticleToolLocale, string>
    icon: ArticleToolIcon
    gradient: string
    matches: Record<ArticleToolLocale, string[]>
}

const toolCatalog: Record<ArticleToolId, ToolDefinition> = {
    paint: {
        icon: "paintbrush",
        gradient: "from-amber-500/14 via-orange-500/10 to-transparent",
        href: { ru: "/calculators/paint", en: "/en/calculators/paint" },
        title: { ru: "Калькулятор краски", en: "Paint Calculator" },
        description: {
            ru: "Быстро посчитайте расход краски по площади, окнам, дверям и количеству слоев.",
            en: "Estimate paint coverage by room size, openings, and number of coats.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
        ctaLabel: { ru: "Посчитать краску", en: "Estimate paint" },
    },
    wallpaper: {
        icon: "wallpaper",
        gradient: "from-violet-500/14 via-fuchsia-500/10 to-transparent",
        href: { ru: "/calculators/wallpaper", en: "/en/calculators/wallpaper" },
        title: { ru: "Калькулятор обоев", en: "Wallpaper Calculator" },
        description: {
            ru: "Узнайте, сколько рулонов нужно с учетом раппорта, проемов и запаса.",
            en: "Calculate how many wallpaper rolls you need with pattern repeat, openings, and waste.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
        ctaLabel: { ru: "Посчитать рулоны", en: "Estimate rolls" },
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
        ctaLabel: { ru: "Посчитать плитку", en: "Calculate tile" },
    },
    flooring: {
        icon: "layers",
        gradient: "from-emerald-500/14 via-lime-500/10 to-transparent",
        href: { ru: "/calculators/flooring", en: "/en/calculators/flooring" },
        title: { ru: "Калькулятор напольного покрытия", en: "Flooring Calculator" },
        description: {
            ru: "Рассчитайте ламинат, кварцвинил или инженерную доску по упаковкам, подложке и запасу.",
            en: "Calculate laminate, LVT, or engineered wood by packs, underlayment, and waste.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
        ctaLabel: { ru: "Посчитать покрытие", en: "Estimate flooring" },
    },
    baseboard: {
        icon: "ruler",
        gradient: "from-stone-500/14 via-zinc-500/10 to-transparent",
        href: { ru: "/calculators/baseboard", en: "/en/calculators/baseboard" },
        title: { ru: "Калькулятор плинтуса", en: "Baseboard Calculator" },
        description: {
            ru: "Посчитайте длину плинтуса, количество планок, вычет проемов и примерную стоимость.",
            en: "Measure baseboard length, number of pieces, opening deductions, and estimated cost.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
        ctaLabel: { ru: "Посчитать плинтус", en: "Estimate trim" },
    },
    screed: {
        icon: "hammer",
        gradient: "from-slate-500/16 via-neutral-500/12 to-transparent",
        href: { ru: "/calculators/screed", en: "/en/calculators/screed" },
        title: { ru: "Калькулятор стяжки пола", en: "Screed Calculator" },
        description: {
            ru: "Рассчитайте объем стяжки, количество мешков смеси, воду и ориентировочный бюджет.",
            en: "Estimate screed volume, dry mix bags, water, and rough material cost.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
        ctaLabel: { ru: "Посчитать стяжку", en: "Estimate screed" },
    },
    "underfloor-heating": {
        icon: "thermometer",
        gradient: "from-rose-500/14 via-orange-500/10 to-transparent",
        href: { ru: "/calculators/underfloor-heating", en: "/en/calculators/underfloor-heating" },
        title: { ru: "Калькулятор теплого пола", en: "Underfloor Heating Calculator" },
        description: {
            ru: "Оцените мощность, площадь покрытия, потребление энергии и примерные расходы.",
            en: "Estimate output, coverage area, energy use, and rough operating costs.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
        ctaLabel: { ru: "Посчитать теплый пол", en: "Estimate heating" },
    },
    ventilation: {
        icon: "wind",
        gradient: "from-blue-500/14 via-sky-500/10 to-transparent",
        href: { ru: "/calculators/ventilation", en: "/en/calculators/ventilation" },
        title: { ru: "Калькулятор вентиляции", en: "Ventilation Calculator" },
        description: {
            ru: "Подберите нужный расход воздуха по объему помещения и кратности воздухообмена.",
            en: "Calculate airflow needs by room volume and air-change rate.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
        ctaLabel: { ru: "Проверить воздухообмен", en: "Check airflow" },
    },
    lighting: {
        icon: "lightbulb",
        gradient: "from-yellow-500/14 via-amber-500/10 to-transparent",
        href: { ru: "/calculators/lighting", en: "/en/calculators/lighting" },
        title: { ru: "Калькулятор освещенности", en: "Lighting Calculator" },
        description: {
            ru: "Узнайте, сколько люменов нужно комнате и сколько светильников стоит закладывать.",
            en: "Work out how many lumens and fixtures a room really needs.",
        },
        badge: { ru: "Калькулятор", en: "Calculator" },
        ctaLabel: { ru: "Рассчитать свет", en: "Calculate lighting" },
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
        ctaLabel: { ru: "Открыть смету", en: "Plan the budget" },
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
        ctaLabel: { ru: "Подобрать палитру", en: "Build a palette" },
    },
}

const hubCatalog: Record<"bathroom" | "lighting" | "kitchen", HubDefinition> = {
    bathroom: {
        href: { ru: "/bathroom", en: "/en/bathroom" },
        title: { ru: "Хаб по ванной", en: "Bathroom Hub" },
        description: {
            ru: "Соберите в одном месте статьи, расчеты и решения по плитке, вентиляции, свету и теплому полу.",
            en: "Keep bathroom articles, tools, and key planning decisions in one place.",
        },
        badge: { ru: "Тема", en: "Topic Hub" },
        ctaLabel: { ru: "Открыть хаб", en: "Open hub" },
        icon: "grid3x3",
        gradient: "from-sky-500/14 via-cyan-500/10 to-transparent",
        matches: bathroomHubSlugs,
    },
    lighting: {
        href: { ru: "/lighting", en: "/en/lighting" },
        title: { ru: "Хаб по освещению", en: "Lighting Hub" },
        description: {
            ru: "Откройте статьи, расчеты и сценарии света по комнатам в одной тематической подборке.",
            en: "Open the room-by-room lighting cluster with articles, calculations, and planning guidance.",
        },
        badge: { ru: "Тема", en: "Topic Hub" },
        ctaLabel: { ru: "Открыть хаб", en: "Open hub" },
        icon: "lightbulb",
        gradient: "from-yellow-500/14 via-amber-500/10 to-transparent",
        matches: lightingHubSlugs,
    },
    kitchen: {
        href: { ru: "/kitchen", en: "/en/kitchen" },
        title: { ru: "Хаб по кухне", en: "Kitchen Hub" },
        description: {
            ru: "Соберите в одном месте статьи, расчеты и решения по планировке, материалам, свету и бюджету кухни.",
            en: "Keep kitchen articles, tools, and the main layout, finish, and budget decisions in one place.",
        },
        badge: { ru: "Тема", en: "Topic Hub" },
        ctaLabel: { ru: "Открыть хаб", en: "Open hub" },
        icon: "grid3x3",
        gradient: "from-orange-500/14 via-amber-500/10 to-transparent",
        matches: kitchenHubSlugs,
    },
}

const explicitRules: Array<{ test: RegExp; tools: ArticleToolId[] }> = [
    {
        test: /(bathroom|vann)/,
        tools: ["tile", "ventilation", "lighting"],
    },
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
        test: /(kuhn|kitchen)/,
        tools: ["budget", "lighting", "tile"],
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
        tools: ["flooring", "paint", "color-palette"],
    },
    {
        test: /(laminat|laminate|kvarcvinil|lvt|flooring)/,
        tools: ["flooring", "baseboard", "budget"],
    },
    {
        test: /(plintus|baseboard|skirting|trim)/,
        tools: ["baseboard", "flooring", "budget"],
    },
    {
        test: /(styazhk|screed)/,
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
        ctaLabel: tool.ctaLabel[locale],
    }
}

function getHubCard(post: Post, locale: ArticleToolLocale): ArticleHubCard | null {
    for (const key of ["bathroom", "lighting", "kitchen"] as const) {
        const hub = hubCatalog[key]
        if (hub.matches[locale].includes(post.slug)) {
            return {
                href: hub.href[locale],
                title: hub.title[locale],
                description: hub.description[locale],
                badge: hub.badge[locale],
                icon: hub.icon,
                gradient: hub.gradient,
                ctaLabel: hub.ctaLabel[locale],
            }
        }
    }

    return null
}

function formatDisplayDate(date: string, locale: ArticleToolLocale) {
    return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date))
}

function getSectionCopy(primaryToolId: ArticleToolId, locale: ArticleToolLocale, hasHub: boolean) {
    const titleByTool: Record<ArticleToolId, Record<ArticleToolLocale, string>> = {
        paint: {
            ru: "Сразу посчитайте расход краски",
            en: "Estimate paint before you buy",
        },
        wallpaper: {
            ru: "Сначала проверьте рулоны и запас",
            en: "Check roll count before you buy",
        },
        tile: {
            ru: "Сначала посчитайте плитку и запас",
            en: "Calculate tile and waste first",
        },
        flooring: {
            ru: "Переведите покрытие в упаковки",
            en: "Convert flooring into pack count",
        },
        baseboard: {
            ru: "Проверьте длину плинтуса и стыки",
            en: "Measure trim length before you order",
        },
        screed: {
            ru: "Проверьте объем стяжки до закупки",
            en: "Estimate screed volume before you order",
        },
        "underfloor-heating": {
            ru: "Проверьте теплый пол до раскладки",
            en: "Check heating before layout is final",
        },
        ventilation: {
            ru: "Проверьте воздухообмен до отделки",
            en: "Check airflow before finishes go in",
        },
        lighting: {
            ru: "Рассчитайте свет до выбора светильников",
            en: "Calculate lighting before choosing fixtures",
        },
        budget: {
            ru: "Переведите идею в рабочую смету",
            en: "Turn the idea into a working budget",
        },
        "color-palette": {
            ru: "Сведите цвета до покупки материалов",
            en: "Lock in colors before you buy finishes",
        },
    }

    return {
        eyebrow: locale === "ru" ? "Следующий шаг по этой статье" : "Best next step from this article",
        title: titleByTool[primaryToolId][locale],
        description:
            locale === "ru"
                ? hasHub
                    ? "Сначала откройте главный расчет, затем переходите к связанным инструментам и тематическому хабу."
                    : "Сначала откройте главный расчет, затем используйте еще два инструмента, которые логично идут после этой статьи."
                : hasHub
                  ? "Start with the main calculator, then move into the related tools and the matching topic hub."
                  : "Start with the main calculator, then use the two tools that most naturally follow this article.",
        primaryLabel: locale === "ru" ? "Главный следующий шаг" : "Main next step",
        secondaryLabel: locale === "ru" ? "Полезно следом" : "Useful next",
        hubLabel: locale === "ru" ? "Тематическая подборка" : "Topic hub",
    }
}

function getTrustInfo(post: Post, locale: ArticleToolLocale): ArticleTrustInfo {
    const standards = getEditorialStandardsDictionary(locale)
    const basisByRubric = {
        trends: {
            ru: "Материал собран вокруг актуальных трендов, практики по комнатам и решений, которые можно применить в реальном ремонте.",
            en: "This piece is grounded in current trends, room-by-room practice, and decisions that translate into real remodel work.",
        },
        guide: {
            ru: "Материал собран как последовательный сценарий работ, выбора материалов и решений без лишних шагов.",
            en: "This piece is structured as a practical sequence of work, material choices, and decisions without extra steps.",
        },
        mistakes: {
            ru: "Материал основан на типовых ошибках ремонта, их последствиях и практичных способах избежать переделки.",
            en: "This piece is based on common renovation mistakes, what they lead to, and practical ways to avoid rework.",
        },
        calculations: {
            ru: "Материал основан на размерах, запасах материалов и прикладных расчетах, которые нужны до закупки.",
            en: "This piece is built around dimensions, material waste, and practical calculations needed before ordering.",
        },
        ideas: {
            ru: "Материал основан на подборе решений, материалов и сочетаний, которые можно перенести в реальный проект.",
            en: "This piece is based on design directions, finish choices, and combinations that can be carried into a real project.",
        },
        diy: {
            ru: "Материал основан на самостоятельном сценарии работ, выборе материалов и безопасной последовательности шагов.",
            en: "This piece is based on a do-it-yourself workflow, material choices, and a safe order of steps.",
        },
        default: {
            ru: "Материал основан на теме статьи, связанных расчетах и практических решениях для ремонта без лишней теории.",
            en: "This piece is grounded in the article topic, related calculations, and practical renovation decisions without extra theory.",
        },
    } as const

    const rubricKey =
        post.rubric && post.rubric in basisByRubric ? (post.rubric as keyof typeof basisByRubric) : "default"

    return {
        updatedLabel: locale === "ru" ? "Обновлено" : "Updated",
        updatedValue: formatDisplayDate(post.date, locale),
        basisLabel: locale === "ru" ? "На чем основан материал" : "What this piece is based on",
        basisValue: basisByRubric[rubricKey][locale],
        pageLabel: standards.articleLinkLabel,
        pageHref: standards.path,
    }
}

export function getArticleTools(post: Post, locale: ArticleToolLocale): ArticleToolSection {
    const toolIds = getExplicitTools(post) || getScoredTools(post)
    const cards = toolIds.map((toolId) => buildToolCard(toolId, locale))
    const hub = getHubCard(post, locale)
    const copy = getSectionCopy(cards[0].id, locale, Boolean(hub))

    return {
        eyebrow: copy.eyebrow,
        title: copy.title,
        description: copy.description,
        primaryLabel: copy.primaryLabel,
        secondaryLabel: copy.secondaryLabel,
        hubLabel: copy.hubLabel,
        primary: cards[0],
        secondary: cards.slice(1),
        hub,
        trust: getTrustInfo(post, locale),
    }
}
