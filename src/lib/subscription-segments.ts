type Locale = "ru" | "en"

export const SUBSCRIPTION_SEGMENTS = [
    "planning-budget",
    "ideas-trends",
    "mistakes-guides",
] as const

export type SubscriptionSegment = (typeof SUBSCRIPTION_SEGMENTS)[number]

type SegmentCopy = {
    label: string
    description: string
    emailHeading: string
    emailIntro: string
    emailBullets: string[]
}

type ContentMeta = {
    kind: "article" | "calculator"
    slug?: string
    rubric?: string | null
    series?: string | null
}

export const DEFAULT_SUBSCRIPTION_SEGMENT: SubscriptionSegment = "planning-budget"

const SEGMENT_COPY: Record<Locale, Record<SubscriptionSegment, SegmentCopy>> = {
    ru: {
        "planning-budget": {
            label: "Планирование и бюджет",
            description: "Сметы, инструменты и практичное планирование ремонта.",
            emailHeading: "Планирование и бюджет",
            emailIntro:
                "Вы будете получать материалы, которые помогают считать расходы и планировать ремонт без лишних трат.",
            emailBullets: [
                "сметы и бюджетные разборы",
                "калькуляторы и полезные инструменты",
                "практичные статьи по расчетам и планированию",
            ],
        },
        "ideas-trends": {
            label: "Идеи и тренды",
            description: "Тренды, вдохновение и визуальные разборы интерьеров.",
            emailHeading: "Идеи и тренды",
            emailIntro:
                "Вы будете получать свежие идеи, тренды и визуальные разборы, которые помогают собрать интерьер без лишнего шума.",
            emailBullets: [
                "статьи о трендах и новых решениях",
                "идеи по комнатам и материалам",
                "визуальные разборы и вдохновение для ремонта",
            ],
        },
        "mistakes-guides": {
            label: "Ошибки и гайды",
            description: "Пошаговые статьи, типичные ошибки и рабочие решения.",
            emailHeading: "Ошибки и гайды",
            emailIntro:
                "Вы будете получать практические материалы, которые помогают избежать переделок и быстрее принять верное решение.",
            emailBullets: [
                "пошаговые гайды по ремонту",
                "разборы типичных ошибок",
                "практические решения без лишней теории",
            ],
        },
    },
    en: {
        "planning-budget": {
            label: "Planning and budget",
            description: "Estimates, tools, and practical renovation planning.",
            emailHeading: "Planning and budget",
            emailIntro:
                "You will receive practical renovation content focused on costs, estimates, and planning decisions.",
            emailBullets: [
                "budget breakdowns and planning guides",
                "calculators and practical tools",
                "straightforward cost and planning articles",
            ],
        },
        "ideas-trends": {
            label: "Ideas and trends",
            description: "Trends, inspiration, and visual room ideas.",
            emailHeading: "Ideas and trends",
            emailIntro:
                "You will receive trend roundups, design ideas, and visual inspiration that make renovation choices easier.",
            emailBullets: [
                "trend stories and fresh design ideas",
                "room-by-room inspiration",
                "visual breakdowns and style direction",
            ],
        },
        "mistakes-guides": {
            label: "Mistakes and guides",
            description: "Step-by-step articles, common mistakes, and practical fixes.",
            emailHeading: "Mistakes and guides",
            emailIntro:
                "You will receive practical how-to content built around common mistakes, smarter choices, and step-by-step guidance.",
            emailBullets: [
                "step-by-step renovation guides",
                "common mistakes to avoid",
                "practical fixes and clearer decisions",
            ],
        },
    },
}

const ARTICLE_RUBRIC_SEGMENTS: Partial<Record<string, SubscriptionSegment[]>> = {
    calculations: ["planning-budget"],
    trends: ["ideas-trends"],
    ideas: ["ideas-trends"],
    mistakes: ["mistakes-guides"],
    guide: ["mistakes-guides"],
    diy: ["mistakes-guides"],
}

const ARTICLE_SERIES_SEGMENTS: Partial<Record<string, SubscriptionSegment[]>> = {
    "budget-planning": ["planning-budget"],
    "avoid-rework": ["mistakes-guides"],
    "kitchen-breakdown": ["ideas-trends", "mistakes-guides"],
    "bathroom-breakdown": ["ideas-trends", "mistakes-guides"],
}

const CALCULATOR_SEGMENTS: Partial<Record<string, SubscriptionSegment[]>> = {
    budget: ["planning-budget"],
    paint: ["planning-budget"],
    wallpaper: ["planning-budget"],
    tile: ["planning-budget"],
    ventilation: ["planning-budget"],
    "underfloor-heating": ["planning-budget"],
    lighting: ["planning-budget"],
    "color-palette": ["ideas-trends"],
}

export function isSubscriptionSegment(value: unknown): value is SubscriptionSegment {
    return typeof value === "string" && SUBSCRIPTION_SEGMENTS.includes(value as SubscriptionSegment)
}

export function getSubscriptionSegmentCopy(
    segment: SubscriptionSegment,
    locale: Locale
): SegmentCopy {
    return SEGMENT_COPY[locale][segment]
}

export function getSubscriptionSegments(locale: Locale) {
    return SUBSCRIPTION_SEGMENTS.map((segment) => ({
        value: segment,
        ...getSubscriptionSegmentCopy(segment, locale),
    }))
}

export function getContentSegments(meta: ContentMeta): SubscriptionSegment[] {
    if (meta.kind === "calculator") {
        return CALCULATOR_SEGMENTS[meta.slug ?? ""] ?? [DEFAULT_SUBSCRIPTION_SEGMENT]
    }

    const segments = new Set<SubscriptionSegment>()

    for (const segment of ARTICLE_SERIES_SEGMENTS[meta.series ?? ""] ?? []) {
        segments.add(segment)
    }

    for (const segment of ARTICLE_RUBRIC_SEGMENTS[meta.rubric ?? ""] ?? []) {
        segments.add(segment)
    }

    return segments.size > 0 ? [...segments] : [...SUBSCRIPTION_SEGMENTS]
}

export function matchesSubscriptionSegment(
    subscriberSegment: SubscriptionSegment,
    meta: ContentMeta
): boolean {
    return getContentSegments(meta).includes(subscriberSegment)
}
