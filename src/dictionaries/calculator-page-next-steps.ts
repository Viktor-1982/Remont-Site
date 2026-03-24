import type { CalculatorPageLocale } from "@/dictionaries/calculator-pages"

export type CalculatorPageNextStepKey =
    | "paint"
    | "flooring"
    | "tile"
    | "wallpaper"
    | "baseboard"
    | "screed"

type NextStepSection = {
    title: string
    description?: string
    cards: Array<{
        href: string
        title: string
        description: string
        icon:
            | "airVent"
            | "flame"
            | "gauge"
            | "grid"
            | "lightbulb"
            | "layers"
            | "paintbrush"
            | "ruler"
            | "scrollText"
            | "sun"
            | "thermometer"
            | "timer"
            | "zap"
        accentClass: string
    }>
}

type CalculatorPageNextStepDictionary = {
    nextSteps: NextStepSection
}

export const calculatorPageNextSteps: Record<
    CalculatorPageLocale,
    Partial<Record<CalculatorPageNextStepKey, CalculatorPageNextStepDictionary>>
> = {
    ru: {
        paint: {
            nextSteps: {
                title: "Что считать дальше",
                description:
                    "После расхода краски обычно переходят к цветовой схеме комнаты или к общей смете по отделке.",
                cards: [
                    {
                        href: "/calculators/color-palette",
                        title: "Генератор цветовых палитр",
                        description: "Подберите рабочую палитру для стен, акцентов и текстиля до покупки всей краски.",
                        icon: "sun",
                        accentClass: "text-violet-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Соберите покраску, подготовку стен и сопутствующие расходы в одной смете.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        flooring: {
            nextSteps: {
                title: "Следующий шаг после покрытия",
                description:
                    "Когда упаковки и запас уже посчитаны, логично сразу закрыть периметр и проверить смету по полу.",
                cards: [
                    {
                        href: "/calculators/baseboard",
                        title: "Калькулятор плинтуса",
                        description: "Посчитайте длину плинтуса и количество планок по тому же помещению.",
                        icon: "ruler",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Сведите покрытие, подложку, плинтус и запас в общий бюджет по полу.",
                        icon: "layers",
                        accentClass: "text-emerald-500",
                    },
                ],
            },
        },
        tile: {
            nextSteps: {
                title: "Следующий шаг после плитки",
                description:
                    "После раскладки и коробок обычно нужно проверить инженерку мокрой зоны и итоговую смету.",
                cards: [
                    {
                        href: "/calculators/underfloor-heating",
                        title: "Калькулятор теплого пола",
                        description:
                            "Проверьте мощность и площадь теплого пола, если плитка идет в ванной, кухне или прихожей.",
                        icon: "thermometer",
                        accentClass: "text-orange-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Сведите плитку, клей, теплый пол и расходники в одну понятную смету.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        wallpaper: {
            nextSteps: {
                title: "Что считать дальше",
                description:
                    "После рулонов обычно сравнивают итог с покраской и сразу подбирают цветовую поддержку для комнаты.",
                cards: [
                    {
                        href: "/calculators/paint",
                        title: "Калькулятор краски",
                        description: "Сравните обои с покраской по расходу и бюджету до окончательного выбора отделки.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/calculators/color-palette",
                        title: "Генератор цветовых палитр",
                        description: "Соберите спокойную палитру для обоев, мебели и текстиля в одной схеме.",
                        icon: "sun",
                        accentClass: "text-violet-500",
                    },
                ],
            },
        },
        baseboard: {
            nextSteps: {
                title: "Следующий шаг после плинтуса",
                description:
                    "Если периметр уже закрыт, обычно остается проверить общий бюджет комнаты или вернуться к покрытию пола.",
                cards: [
                    {
                        href: "/calculators/flooring",
                        title: "Калькулятор напольного покрытия",
                        description: "Уточните упаковки покрытия и запас, если сначала посчитали только периметр.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Сведите покрытие, плинтус, порожки и доборные элементы в одну смету.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        screed: {
            nextSteps: {
                title: "Следующий шаг после стяжки",
                description:
                    "Как только основание посчитано, следующий рабочий переход — к финишному покрытию и затем к периметру.",
                cards: [
                    {
                        href: "/calculators/flooring",
                        title: "Калькулятор напольного покрытия",
                        description: "Сразу посчитайте ламинат, кварцвинил или паркетную доску на ту же площадь.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/calculators/baseboard",
                        title: "Калькулятор плинтуса",
                        description: "Закройте следующий шаг по полу и соберите полный комплект материалов по комнате.",
                        icon: "ruler",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
    },
    en: {
        paint: {
            nextSteps: {
                title: "What to calculate next",
                description:
                    "Once paint volume is clear, the next practical move is usually palette planning or a room-level finish budget.",
                cards: [
                    {
                        href: "/en/calculators/color-palette",
                        title: "Color Palette Generator",
                        description:
                            "Build a working palette for walls, accents and textiles before you place the final paint order.",
                        icon: "sun",
                        accentClass: "text-violet-500",
                    },
                    {
                        href: "/en/calculators/budget",
                        title: "Budget Planner",
                        description: "Roll paint, prep materials and labor reserve into one finish budget.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        flooring: {
            nextSteps: {
                title: "Next step after flooring",
                description:
                    "Once packs and waste are set, the usual follow-up is baseboard and a complete floor budget.",
                cards: [
                    {
                        href: "/en/calculators/baseboard",
                        title: "Baseboard Calculator",
                        description: "Estimate baseboard length and piece count for the same room while the measurements are fresh.",
                        icon: "ruler",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/en/calculators/budget",
                        title: "Budget Planner",
                        description: "Combine flooring, underlay, trims and reserve into one floor budget.",
                        icon: "layers",
                        accentClass: "text-emerald-500",
                    },
                ],
            },
        },
        tile: {
            nextSteps: {
                title: "Next step after tile",
                description:
                    "After box count and layout, the usual follow-up is wet-zone engineering and the full material budget.",
                cards: [
                    {
                        href: "/en/calculators/underfloor-heating",
                        title: "Underfloor Heating",
                        description: "Check heat coverage and power if tile is going into a bathroom, kitchen or entry zone.",
                        icon: "thermometer",
                        accentClass: "text-orange-500",
                    },
                    {
                        href: "/en/calculators/budget",
                        title: "Budget Planner",
                        description: "Roll tile, adhesive, heating and accessories into one cleaner purchase budget.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        wallpaper: {
            nextSteps: {
                title: "What to calculate next",
                description:
                    "After wallpaper rolls, most people compare the result with paint and then lock the room palette.",
                cards: [
                    {
                        href: "/en/calculators/paint",
                        title: "Paint Calculator",
                        description: "Compare wallpaper against paint before you commit to the final wall finish.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/en/calculators/color-palette",
                        title: "Color Palette Generator",
                        description: "Match wallpaper tones with furniture, trim and textiles in one palette.",
                        icon: "sun",
                        accentClass: "text-violet-500",
                    },
                ],
            },
        },
        baseboard: {
            nextSteps: {
                title: "Next step after baseboard",
                description:
                    "If the perimeter is done, the next useful move is usually the floor finish or the final room budget.",
                cards: [
                    {
                        href: "/en/calculators/flooring",
                        title: "Flooring Calculator",
                        description: "Estimate flooring packs and reserve if you started with trims before the finish layer.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/en/calculators/budget",
                        title: "Budget Planner",
                        description: "Combine flooring, baseboards, transitions and reserve into one room budget.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        screed: {
            nextSteps: {
                title: "Next step after screed",
                description:
                    "Once the floor base is estimated, the natural follow-up is the finish layer and then the perimeter.",
                cards: [
                    {
                        href: "/en/calculators/flooring",
                        title: "Flooring Calculator",
                        description: "Move straight from the base layer to laminate, LVT or engineered wood coverage.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/en/calculators/baseboard",
                        title: "Baseboard Calculator",
                        description: "Close the next floor step and complete the room package while the measurements are ready.",
                        icon: "ruler",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
    },
}
