import type { CalculatorPageLocale } from "@/dictionaries/calculator-pages"

export type CalculatorPageNextStepKey =
    | "paint"
    | "flooring"
    | "tile"
    | "wallpaper"
    | "baseboard"
    | "screed"
    | "underfloorHeating"
    | "ventilation"
    | "lighting"
    | "budget"
    | "color-palette"

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
                        href: "/ru/calculators/color-palette",
                        title: "Генератор цветовых палитр",
                        description: "Подберите рабочую палитру для стен, акцентов и текстиля до покупки всей краски.",
                        icon: "sun",
                        accentClass: "text-violet-500",
                    },
                    {
                        href: "/ru/calculators/budget",
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
                        href: "/ru/calculators/baseboard",
                        title: "Калькулятор плинтуса",
                        description: "Посчитайте длину плинтуса и количество планок по тому же помещению.",
                        icon: "ruler",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/ru/calculators/budget",
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
                title: "Что проверить после расчета плитки",
                description:
                    "После раскладки и коробок обычно переходят к инженерке мокрой зоны и связанной планировке ванной.",
                cards: [
                    {
                        href: "/ru/calculators/underfloor-heating",
                        title: "Калькулятор теплого пола",
                        description:
                            "Проверьте мощность и площадь теплого пола, если плитка идет в ванной, кухне или прихожей.",
                        icon: "thermometer",
                        accentClass: "text-orange-500",
                    },
                    {
                        href: "/ru/bathroom",
                        title: "Хаб по ванной",
                        description: "Откройте подборку статей про плитку, вентиляцию, свет и ошибки ремонта ванной.",
                        icon: "grid",
                        accentClass: "text-sky-500",
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
                        href: "/ru/calculators/paint",
                        title: "Калькулятор краски",
                        description: "Сравните обои с покраской по расходу и бюджету до окончательного выбора отделки.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/ru/calculators/color-palette",
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
                        href: "/ru/calculators/flooring",
                        title: "Калькулятор напольного покрытия",
                        description: "Уточните упаковки покрытия и запас, если сначала посчитали только периметр.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/ru/calculators/budget",
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
                        href: "/ru/calculators/flooring",
                        title: "Калькулятор напольного покрытия",
                        description: "Сразу посчитайте ламинат, кварцвинил или паркетную доску на ту же площадь.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/ru/calculators/baseboard",
                        title: "Калькулятор плинтуса",
                        description: "Закройте следующий шаг по полу и соберите полный комплект материалов по комнате.",
                        icon: "ruler",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        underfloorHeating: {
            nextSteps: {
                title: "Следующий шаг после теплого пола",
                description:
                    "После мощности и площади обычно проверяют вентиляцию мокрой зоны или сразу собирают бюджет по инженерке.",
                cards: [
                    {
                        href: "/ru/calculators/ventilation",
                        title: "Калькулятор вентиляции",
                        description: "Проверьте воздухообмен в ванной, кухне или санузле, если теплый пол идет в мокрой зоне.",
                        icon: "airVent",
                        accentClass: "text-sky-500",
                    },
                    {
                        href: "/ru/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Сведите теплый пол, терморегулятор, расходники и монтаж в одну смету.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        ventilation: {
            nextSteps: {
                title: "Следующий шаг после вентиляции",
                description:
                    "Когда воздухообмен уже понятен, обычно переходят к освещению помещения или к общей инженерной смете.",
                cards: [
                    {
                        href: "/ru/calculators/lighting",
                        title: "Калькулятор освещенности",
                        description: "Проверьте световой сценарий для той же комнаты, пока размеры и назначение помещения под рукой.",
                        icon: "lightbulb",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/ru/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Соберите вентиляцию, освещение и прочие инженерные расходы в одну смету.",
                        icon: "layers",
                        accentClass: "text-emerald-500",
                    },
                ],
            },
        },
        lighting: {
            nextSteps: {
                title: "Следующий шаг после освещения",
                description:
                    "После света обычно переходят к палитре комнаты или сводят отделку и электрику в общий бюджет.",
                cards: [
                    {
                        href: "/ru/calculators/color-palette",
                        title: "Генератор цветовых палитр",
                        description: "Проверьте, как освещение и цвета комнаты будут работать вместе до покупки отделки.",
                        icon: "sun",
                        accentClass: "text-violet-500",
                    },
                    {
                        href: "/ru/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Сведите светильники, лампы, диммеры и монтаж в одну понятную смету.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        budget: {
            nextSteps: {
                title: "Что проверить после сметы",
                description:
                    "Если итог уже понятен, следующий шаг — перепроверить самые дорогие категории отдельными инструментами.",
                cards: [
                    {
                        href: "/ru/calculators/flooring",
                        title: "Калькулятор напольного покрытия",
                        description: "Уточните одну из самых дорогих отделочных позиций по упаковкам, запасу и стоимости.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/ru/calculators/tile",
                        title: "Калькулятор плитки",
                        description: "Перепроверьте плитку, клей и запас отдельно, если именно эта зона тянет смету вверх.",
                        icon: "grid",
                        accentClass: "text-sky-500",
                    },
                ],
            },
        },
        "color-palette": {
            nextSteps: {
                title: "Следующий шаг после палитры",
                description:
                    "Когда палитра уже собрана, логично проверить расход краски и затем свести комнату в общий бюджет.",
                cards: [
                    {
                        href: "/ru/calculators/paint",
                        title: "Калькулятор краски",
                        description: "Сразу рассчитайте объем краски под выбранную палитру и реальную площадь стен.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/ru/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Сведите краску, текстиль, свет и декоративные акценты в общую смету комнаты.",
                        icon: "layers",
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
                        href: "/calculators/color-palette",
                        title: "Color Palette Generator",
                        description:
                            "Build a working palette for walls, accents and textiles before you place the final paint order.",
                        icon: "sun",
                        accentClass: "text-violet-500",
                    },
                    {
                        href: "/calculators/budget",
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
                        href: "/calculators/baseboard",
                        title: "Baseboard Calculator",
                        description: "Estimate baseboard length and piece count for the same room while the measurements are fresh.",
                        icon: "ruler",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/calculators/budget",
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
                title: "What to review after tile planning",
                description:
                    "After tile layout and box count, the usual follow-up is wet-zone engineering and the connected bathroom planning decisions.",
                cards: [
                    {
                        href: "/calculators/underfloor-heating",
                        title: "Underfloor Heating",
                        description: "Check heat coverage and power if tile is going into a bathroom, kitchen or entry zone.",
                        icon: "thermometer",
                        accentClass: "text-orange-500",
                    },
                    {
                        href: "/bathroom",
                        title: "Bathroom Hub",
                        description: "Open the article hub with bathroom tile, ventilation, lighting, and remodeling guidance.",
                        icon: "grid",
                        accentClass: "text-sky-500",
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
                        href: "/calculators/paint",
                        title: "Paint Calculator",
                        description: "Compare wallpaper against paint before you commit to the final wall finish.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/calculators/color-palette",
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
                        href: "/calculators/flooring",
                        title: "Flooring Calculator",
                        description: "Estimate flooring packs and reserve if you started with trims before the finish layer.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/calculators/budget",
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
                        href: "/calculators/flooring",
                        title: "Flooring Calculator",
                        description: "Move straight from the base layer to laminate, LVT or engineered wood coverage.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/calculators/baseboard",
                        title: "Baseboard Calculator",
                        description: "Close the next floor step and complete the room package while the measurements are ready.",
                        icon: "ruler",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        underfloorHeating: {
            nextSteps: {
                title: "Next step after underfloor heating",
                description:
                    "Once coverage and power are set, the usual follow-up is wet-zone ventilation or a cleaner engineering budget.",
                cards: [
                    {
                        href: "/calculators/ventilation",
                        title: "Ventilation Calculator",
                        description: "Check airflow for the same bathroom, kitchen or utility room while the room assumptions are still fresh.",
                        icon: "airVent",
                        accentClass: "text-sky-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Budget Planner",
                        description: "Roll heating mats, thermostat, accessories and installation into one budget line.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        ventilation: {
            nextSteps: {
                title: "Next step after ventilation",
                description:
                    "Once airflow is clear, the next useful move is usually lighting or the broader engineering budget.",
                cards: [
                    {
                        href: "/calculators/lighting",
                        title: "Lighting Calculator",
                        description: "Check the lighting load for the same room while its size and function are already defined.",
                        icon: "lightbulb",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Budget Planner",
                        description: "Combine ventilation, lighting and related engineering costs in one estimate.",
                        icon: "layers",
                        accentClass: "text-emerald-500",
                    },
                ],
            },
        },
        lighting: {
            nextSteps: {
                title: "Next step after lighting",
                description:
                    "Once the light level is set, the next practical step is usually palette work or the full room budget.",
                cards: [
                    {
                        href: "/calculators/color-palette",
                        title: "Color Palette Generator",
                        description: "Check how light and color will work together before you lock the final room mood.",
                        icon: "sun",
                        accentClass: "text-violet-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Budget Planner",
                        description: "Bundle fixtures, lamps, controls and installation into one room-level budget.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
        budget: {
            nextSteps: {
                title: "What to validate after the budget",
                description:
                    "Once the headline number is clear, the best next move is to verify the expensive finish categories one by one.",
                cards: [
                    {
                        href: "/calculators/flooring",
                        title: "Flooring Calculator",
                        description: "Validate one of the most expensive finish categories by packs, waste and actual floor coverage.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                    {
                        href: "/calculators/tile",
                        title: "Tile Calculator",
                        description: "Double-check tile, adhesive and reserve separately if that zone drives the project budget.",
                        icon: "grid",
                        accentClass: "text-sky-500",
                    },
                ],
            },
        },
        "color-palette": {
            nextSteps: {
                title: "Next step after the palette",
                description:
                    "Once the palette is set, the natural follow-up is paint quantity and then the broader room budget.",
                cards: [
                    {
                        href: "/calculators/paint",
                        title: "Paint Calculator",
                        description: "Estimate the actual paint volume for the palette you just chose and the real wall area.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Budget Planner",
                        description: "Roll paint, lighting and decorative accents into one room budget.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
        },
    },
}
