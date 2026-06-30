import type { ColorPaletteLocale } from "@/dictionaries/color-palette-page"

export const colorPalettePageNextSteps: Record<
    ColorPaletteLocale,
    {
        nextSteps: {
            title: string
            description?: string
            ctaLabel: string
            cards: Array<{
                href: string
                title: string
                description: string
                icon: "paintbrush" | "layers"
                accent: string
            }>
        }
    }
> = {
    ru: {
        nextSteps: {
            title: "Следующий шаг после палитры",
            description:
                "Когда палитра уже собрана, логично проверить расход краски и затем свести комнату в общий бюджет.",
            ctaLabel: "Открыть",
            cards: [
                {
                    href: "/ru/calculators/paint",
                    title: "Калькулятор краски",
                    description: "Сразу рассчитайте объем краски под выбранную палитру и реальную площадь стен.",
                    icon: "paintbrush",
                    accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
                },
                {
                    href: "/ru/calculators/budget",
                    title: "Планировщик бюджета",
                    description: "Сведите краску, текстиль, свет и декоративные акценты в общую смету комнаты.",
                    icon: "layers",
                    accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
                },
            ],
        },
    },
    en: {
        nextSteps: {
            title: "Next step after the palette",
            description:
                "Once the palette is set, the natural follow-up is paint quantity and then the broader room budget.",
            ctaLabel: "Open",
            cards: [
                {
                    href: "/calculators/paint",
                    title: "Paint Calculator",
                    description: "Estimate the actual paint volume for the palette you just chose and the real wall area.",
                    icon: "paintbrush",
                    accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
                },
                {
                    href: "/calculators/budget",
                    title: "Budget Planner",
                    description: "Roll paint, lighting and decorative accents into one room budget.",
                    icon: "layers",
                    accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
                },
            ],
        },
    },
}
