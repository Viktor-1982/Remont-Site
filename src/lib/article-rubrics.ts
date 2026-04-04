type Locale = "ru" | "en"

const articleRubrics = {
    trends: {
        label: { ru: "Тренды", en: "Trends" },
        className:
            "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:border-amber-300/30 dark:bg-amber-300/15 dark:text-amber-100",
    },
    guide: {
        label: { ru: "Гайд", en: "Guide" },
        className:
            "border-sky-500/30 bg-sky-500/10 text-sky-950 dark:border-sky-300/30 dark:bg-sky-300/15 dark:text-sky-100",
    },
    mistakes: {
        label: { ru: "Ошибки", en: "Mistakes" },
        className:
            "border-rose-500/30 bg-rose-500/10 text-rose-950 dark:border-rose-300/30 dark:bg-rose-300/15 dark:text-rose-100",
    },
    calculations: {
        label: { ru: "Расчеты", en: "Calculations" },
        className:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:border-emerald-300/30 dark:bg-emerald-300/15 dark:text-emerald-100",
    },
    ideas: {
        label: { ru: "Идеи", en: "Ideas" },
        className:
            "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-950 dark:border-fuchsia-300/30 dark:bg-fuchsia-300/15 dark:text-fuchsia-100",
    },
    diy: {
        label: { ru: "DIY", en: "DIY" },
        className:
            "border-orange-500/30 bg-orange-500/10 text-orange-950 dark:border-orange-300/30 dark:bg-orange-300/15 dark:text-orange-100",
    },
} as const

export type ArticleRubricKey = keyof typeof articleRubrics

export function getArticleRubricMeta(rubric: string | null | undefined, locale: Locale) {
    if (!rubric || !(rubric in articleRubrics)) {
        return null
    }

    const meta = articleRubrics[rubric as ArticleRubricKey]

    return {
        key: rubric as ArticleRubricKey,
        label: meta.label[locale],
        className: meta.className,
    }
}
