import type { BudgetLocale } from "@/dictionaries/budget-page"

export const budgetPageNextSteps: Record<
    BudgetLocale,
    {
        nextSteps: {
            title: string
            description?: string
            ctaLabel: string
            cards: Array<{
                href: string
                title: string
                description: string
                icon: "paintbrush" | "grid" | "scrollText" | "layers"
                accent: string
            }>
        }
    }
> = {
    ru: {
        nextSteps: {
            title: "Что проверить после сметы",
            description:
                "Когда общий итог уже ясен, лучше перепроверить самые дорогие отделочные категории отдельными калькуляторами.",
            ctaLabel: "Открыть",
            cards: [
                {
                    href: "/calculators/flooring",
                    title: "Калькулятор напольного покрытия",
                    description: "Уточните упаковки, запас и стоимость покрытия, если именно пол тянет смету вверх.",
                    icon: "grid",
                    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
                },
                {
                    href: "/calculators/tile",
                    title: "Калькулятор плитки",
                    description:
                        "Перепроверьте плитку, клей и запас отдельно, если мокрые зоны съедают большую часть бюджета.",
                    icon: "grid",
                    accent: "from-sky-500/15 to-sky-500/5 text-sky-500",
                },
            ],
        },
    },
    en: {
        nextSteps: {
            title: "What to validate after the budget",
            description:
                "Once the headline number is clear, the smartest next move is to verify the expensive finish categories one by one.",
            ctaLabel: "Open",
            cards: [
                {
                    href: "/en/calculators/flooring",
                    title: "Flooring Calculator",
                    description: "Validate one of the biggest finish cost lines by packs, waste and actual floor coverage.",
                    icon: "grid",
                    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
                },
                {
                    href: "/en/calculators/tile",
                    title: "Tile Calculator",
                    description: "Double-check tile, adhesive and reserve separately if that zone drives the renovation total.",
                    icon: "grid",
                    accent: "from-sky-500/15 to-sky-500/5 text-sky-500",
                },
            ],
        },
    },
}
