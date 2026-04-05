import type { Post } from "contentlayer/generated"
import { sortPosts } from "@/lib/utils"

export type Locale = "ru" | "en"

type SeriesIcon = "chefHat" | "bath" | "wallet" | "alertTriangle"

type ArticleSeriesConfig = {
    label: Record<Locale, string>
    title: Record<Locale, string>
    description: Record<Locale, string>
    eyebrow: Record<Locale, string>
    path: Record<Locale, string>
    icon: SeriesIcon
    className: string
}

const articleSeries = {
    "kitchen-breakdown": {
        label: { ru: "Разбор кухни", en: "Kitchen Breakdown" },
        title: {
            ru: "Разбор кухни: планировка, материалы и решения без лишних трат",
            en: "Kitchen Breakdown: layout, materials, and smarter renovation decisions",
        },
        description: {
            ru: "Серия о кухнях: удачные планировки, материалы, свет и бюджетные обновления без декоративного шума.",
            en: "A focused kitchen series on layout, materials, lighting, and budget-friendly upgrades that actually improve daily use.",
        },
        eyebrow: { ru: "Серия", en: "Series" },
        path: { ru: "/series/kitchen-breakdown", en: "/en/series/kitchen-breakdown" },
        icon: "chefHat",
        className:
            "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:border-amber-300/30 dark:bg-amber-300/15 dark:text-amber-100",
    },
    "bathroom-breakdown": {
        label: { ru: "Разбор ванной", en: "Bathroom Breakdown" },
        title: {
            ru: "Разбор ванной: плитка, хранение, свет и обновления без хаоса",
            en: "Bathroom Breakdown: tile, lighting, storage, and updates without the chaos",
        },
        description: {
            ru: "Практическая серия про ванную: ошибки, плитка, хранение, свет и косметические обновления без лишней переплаты.",
            en: "A practical bathroom series on mistakes, tile, storage, lighting, and lower-stress upgrades without overspending.",
        },
        eyebrow: { ru: "Серия", en: "Series" },
        path: { ru: "/series/bathroom-breakdown", en: "/en/series/bathroom-breakdown" },
        icon: "bath",
        className:
            "border-sky-500/30 bg-sky-500/10 text-sky-950 dark:border-sky-300/30 dark:bg-sky-300/15 dark:text-sky-100",
    },
    "budget-planning": {
        label: { ru: "План и смета", en: "Budget and Planning" },
        title: {
            ru: "План и смета: как считать бюджет ремонта и не терять контроль",
            en: "Budget and Planning: how to price a renovation and stay in control",
        },
        description: {
            ru: "Серия про смету, планирование и порядок работ: где считать заранее и как не раздувать бюджет на ходу.",
            en: "A renovation planning series on budgeting, sequencing, and the decisions that keep costs from drifting later.",
        },
        eyebrow: { ru: "Серия", en: "Series" },
        path: { ru: "/series/budget-planning", en: "/en/series/budget-planning" },
        icon: "wallet",
        className:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:border-emerald-300/30 dark:bg-emerald-300/15 dark:text-emerald-100",
    },
    "avoid-rework": {
        label: { ru: "Без переделок", en: "Avoid Rework" },
        title: {
            ru: "Без переделок: решения, которые спасают от дорогих ошибок в ремонте",
            en: "Avoid Rework: decisions that prevent expensive renovation mistakes",
        },
        description: {
            ru: "Серия про ошибки и решения до финишной отделки: что проверить заранее, чтобы не платить дважды.",
            en: "A series about catching mistakes before finish work so the same room does not have to be redone later.",
        },
        eyebrow: { ru: "Серия", en: "Series" },
        path: { ru: "/series/avoid-rework", en: "/en/series/avoid-rework" },
        icon: "alertTriangle",
        className:
            "border-rose-500/30 bg-rose-500/10 text-rose-950 dark:border-rose-300/30 dark:bg-rose-300/15 dark:text-rose-100",
    },
} as const satisfies Record<string, ArticleSeriesConfig>

export type ArticleSeriesKey = keyof typeof articleSeries

export type ArticleSeriesMeta = {
    key: ArticleSeriesKey
    label: string
    title: string
    description: string
    eyebrow: string
    path: string
    icon: SeriesIcon
    className: string
}

export function isArticleSeriesKey(value: string): value is ArticleSeriesKey {
    return value in articleSeries
}

export function getArticleSeriesMeta(
    series: string | null | undefined,
    locale: Locale
): ArticleSeriesMeta | null {
    if (!series || !isArticleSeriesKey(series)) {
        return null
    }

    const meta = articleSeries[series]

    return {
        key: series,
        label: meta.label[locale],
        title: meta.title[locale],
        description: meta.description[locale],
        eyebrow: meta.eyebrow[locale],
        path: meta.path[locale],
        icon: meta.icon,
        className: meta.className,
    }
}

export function getAllArticleSeries(locale: Locale): ArticleSeriesMeta[] {
    return getAllArticleSeriesKeys().map((key) => {
        const meta = getArticleSeriesMeta(key, locale)
        if (!meta) {
            throw new Error(`Unknown article series: ${key}`)
        }
        return meta
    })
}

export function getAllArticleSeriesKeys(): ArticleSeriesKey[] {
    return Object.keys(articleSeries) as ArticleSeriesKey[]
}

export function getArticleSeriesPosts(
    posts: Post[],
    locale: Locale,
    series: ArticleSeriesKey
): Post[] {
    return sortPosts(posts).filter(
        (post) => post.locale === locale && post.series === series && !post.draft
    )
}

export function getArticleSeriesOverview(
    posts: Post[],
    locale: Locale,
    keys?: ArticleSeriesKey[]
) {
    const seriesKeys = keys ?? getAllArticleSeriesKeys()

    return seriesKeys
        .map((key) => {
            const meta = getArticleSeriesMeta(key, locale)
            if (!meta) {
                return null
            }

            const seriesPosts = getArticleSeriesPosts(posts, locale, key)

            return {
                ...meta,
                count: seriesPosts.length,
                latestPost: seriesPosts[0] ?? null,
            }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)
}
