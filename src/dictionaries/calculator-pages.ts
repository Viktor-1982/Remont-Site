import { extraCalculatorPageDictionaries, type ExtraCalculatorPageKey } from "@/dictionaries/calculator-pages-extra"
import {
    calculatorPageNextSteps,
    type CalculatorPageNextStepKey,
} from "@/dictionaries/calculator-page-next-steps"
import {
    calculatorPageInsights,
    type CalculatorPageInsightKey,
} from "@/dictionaries/calculator-page-insights"

export type CalculatorPageLocale = "ru" | "en"
export type CalculatorPageKey =
    | "paint"
    | "flooring"
    | "baseboard"
    | "screed"
    | ExtraCalculatorPageKey

export type InsightCalculatorPageKey = Extract<CalculatorPageKey, CalculatorPageInsightKey>
export type NextStepCalculatorPageKey = Extract<CalculatorPageKey, CalculatorPageNextStepKey>

type RelatedCardIcon =
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

export type CalculatorRelatedCard = {
    href: string
    title: string
    description: string
    icon: RelatedCardIcon
    accentClass: string
}

export type CalculatorInfoCard = {
    title: string
    description: string
    icon: RelatedCardIcon
}

export type CalculatorStructuredData = {
    id: string
    data: Record<string, unknown>
}

export type CalculatorPageDictionary = {
    metadata: {
        path: string
        title: string
        description: string
        keywords?: string[]
    }
    share: {
        url: string
        title: string
        description: string
    }
    hero: {
        title: string
        description: string
        leadClass?: string
    }
    benefits?: {
        title: string
        items: Array<{
            strong: string
            text: string
        }>
    }
    infoCards?: {
        title?: string
        cards: CalculatorInfoCard[]
    }
    guide?: {
        title: string
        steps: string[]
        tip?: string
    }
    mistakes?: {
        title: string
        items: Array<{
            strong: string
            text: string
        }>
    }
    purchaseChecklist?: {
        title: string
        items: Array<{
            strong: string
            text: string
        }>
    }
    nextSteps?: {
        title: string
        description?: string
        cards: CalculatorRelatedCard[]
    }
    faq?: {
        title: string
        items: Array<{
            question: string
            answer: string
        }>
    }
    related?: {
        title: string
        cards: CalculatorRelatedCard[]
    }
    shareTitle: string
    layout?: {
        maxWidthClass?: string
    }
    structuredData?: CalculatorStructuredData[]
}

export const calculatorPageDictionaries: Record<
    CalculatorPageLocale,
    Partial<Record<CalculatorPageKey, CalculatorPageDictionary>>
> = {
    ru: {
        paint: {
            metadata: {
                path: "/ru/calculators/paint",
                title: "Калькулятор краски онлайн — рассчитать расход краски | Renohacks",
                description:
                    "Онлайн калькулятор краски: введите размеры комнаты и узнайте, сколько литров краски нужно. Удобный инструмент Renohacks.",
            },
            share: {
                url: "/ru/calculators/paint",
                title: "Калькулятор краски онлайн — рассчитать расход краски | Renohacks",
                description:
                    "Онлайн калькулятор краски: введите размеры комнаты и узнайте, сколько литров краски нужно",
            },
            hero: {
                title: "Калькулятор краски",
                description:
                    "Рассчитайте точный расход краски для покраски стен и потолков. Учитываются окна, двери и необходимость нанесения второго слоя.",
            },
            benefits: {
                title: "Почему профессионалы выбирают этот калькулятор краски",
                items: [
                    { strong: "Точный расчет с учетом всех факторов.", text: "Учитываются окна, двери, количество слоев и расход краски на м²." },
                    { strong: "Учет окон и дверей.", text: "Автоматически вычитаются площади проемов для точного расчета." },
                    { strong: "Гибкие настройки.", text: "Настройте количество слоев и расход краски в зависимости от типа поверхности." },
                    { strong: "Мобильная версия.", text: "Работает на всех устройствах — рассчитывайте расход краски где угодно." },
                    { strong: "Бесплатно и без регистрации.", text: "Используйте калькулятор без ограничений." },
                ],
            },
            guide: {
                title: "Пошаговое руководство по расчету краски",
                steps: [
                    "Введите размеры комнаты: длину, ширину и высоту стен в метрах.",
                    "Укажите количество окон и дверей — калькулятор автоматически вычтет их площадь.",
                    "Выберите количество слоев краски (обычно 2 слоя для качественного покрытия).",
                    "Укажите расход краски на м² (обычно 8-12 л/м², указано на банке).",
                    "Получите точный расчет в литрах и добавьте 10% про запас.",
                ],
                tip: "💡 Совет: Всегда покупайте краску с небольшим запасом (10-15%) на случай непредвиденных ситуаций и подкрашивания.",
            },
            faq: {
                title: "Часто задаваемые вопросы о расчете краски",
                items: [
                    {
                        question: "Как правильно рассчитать расход краски?",
                        answer:
                            "Введите точные размеры комнаты, укажите количество окон и дверей, выберите количество слоев и расход краски. Калькулятор автоматически учтет все факторы и даст точный результат.",
                    },
                    {
                        question: "Сколько слоев краски нужно наносить?",
                        answer:
                            "Обычно достаточно 2 слоев для качественного покрытия. Для темных цветов или при покраске поверх темной краски может потребоваться 3 слоя.",
                    },
                    {
                        question: "Нужно ли учитывать запас при покупке краски?",
                        answer:
                            "Да, обязательно добавьте 10-15% к расчетному количеству на случай непредвиденных ситуаций, подкрашивания и возможных ошибок при нанесении.",
                    },
                ],
            },
            related: {
                title: "Дополнительные ресурсы для планирования ремонта",
                cards: [
                    { href: "/ru/calculators/budget", title: "Калькулятор бюджета", description: "Рассчитайте полную стоимость ремонта с учетом всех категорий работ и резерва.", icon: "layers", accentClass: "text-amber-500" },
                    { href: "/ru/calculators/tile", title: "Калькулятор плитки", description: "Рассчитайте количество плитки для пола и стен с учетом запаса и клея.", icon: "grid", accentClass: "text-emerald-500" },
                    { href: "/ru/calculators/wallpaper", title: "Калькулятор обоев", description: "Определите количество рулонов обоев с учетом высоты стен и рисунка.", icon: "scrollText", accentClass: "text-indigo-500" },
                    { href: "/ru/calculators", title: "Все инструменты", description: "Изучите полный набор инструментов Renohacks для планирования материалов.", icon: "paintbrush", accentClass: "text-rose-500" },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
        },
        flooring: {
            metadata: {
                path: "/ru/calculators/flooring",
                title: "Калькулятор ламината и кварцвинила - упаковки и запас | Renohacks",
                description:
                    "Онлайн калькулятор ламината, кварцвинила и паркетной доски: площадь, упаковки, подложка и запас на подрезку.",
            },
            share: {
                url: "/ru/calculators/flooring",
                title: "Калькулятор ламината и кварцвинила - упаковки и запас | Renohacks",
                description: "Рассчитайте упаковки покрытия, подложку и запас на подрезку",
            },
            hero: {
                title: "Калькулятор напольного покрытия",
                description:
                    "Рассчитайте ламинат, кварцвинил или паркетную доску по площади комнаты, схеме укладки, упаковкам и запасу на подрезку. Подходит для прямой укладки, диагонали и елки.",
            },
            benefits: {
                title: "Что учитывает калькулятор покрытия",
                items: [
                    { strong: "Чистую площадь пола.", text: "Можно вычесть стационарные зоны без покрытия." },
                    { strong: "Схему укладки.", text: "Базовый запас меняется для прямой укладки, диагонали и елки." },
                    { strong: "Реальные упаковки.", text: "Расчет идет не только по м², но и по упаковкам и количеству планок." },
                    { strong: "Подложку и стоимость.", text: "Можно сразу прикинуть подложку и бюджет по цене упаковки." },
                ],
            },
            faq: {
                title: "Частые вопросы",
                items: [
                    {
                        question: "Какой запас брать на ламинат или кварцвинил?",
                        answer:
                            "Для прямой укладки обычно хватает 7%. Для диагонали нужен больший запас, а для елки он еще выше из-за подрезки.",
                    },
                    {
                        question: "Нужно ли вычитать шкафы и кухню?",
                        answer:
                            "Да, но только если покрытие точно не будет заводиться под стационарную мебель и встроенные конструкции.",
                    },
                ],
            },
            related: {
                title: "Связанные инструменты",
                cards: [
                    { href: "/ru/calculators/baseboard", title: "Калькулятор плинтуса", description: "Сразу рассчитайте длину и количество планок по тому же помещению.", icon: "ruler", accentClass: "text-amber-500" },
                    { href: "/ru/calculators/tile", title: "Калькулятор плитки", description: "Сравните расход разных покрытий для пола и мокрых зон.", icon: "grid", accentClass: "text-emerald-500" },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
        },
        baseboard: {
            metadata: {
                path: "/ru/calculators/baseboard",
                title: "Калькулятор плинтуса - длина, планки и стоимость | Renohacks",
                description:
                    "Онлайн калькулятор плинтуса: погонные метры, количество планок, вычет проемов, запас и примерная стоимость.",
            },
            share: {
                url: "/ru/calculators/baseboard",
                title: "Калькулятор плинтуса - длина, планки и стоимость | Renohacks",
                description: "Рассчитайте длину, запас и количество планок плинтуса",
            },
            hero: {
                title: "Калькулятор плинтуса",
                description:
                    "Рассчитайте плинтус по размерам комнаты или готовому периметру. Калькулятор вычитает дверные проемы, добавляет запас и показывает, сколько планок нужно купить.",
            },
            benefits: {
                title: "Когда этот расчет особенно полезен",
                items: [
                    { strong: "Для стандартной комнаты.", text: "Можно посчитать плинтус по длине и ширине без ручного периметра." },
                    { strong: "Для сложной формы.", text: "Если периметр уже снят, переключитесь в режим готового периметра." },
                    { strong: "Для закупки.", text: "Калькулятор сразу показывает количество планок и ориентир по стоимости." },
                ],
            },
            faq: {
                title: "Частые вопросы",
                items: [
                    {
                        question: "Нужно ли вычитать дверные проемы?",
                        answer:
                            "Да. Обычно плинтус не проходит через дверной проем, поэтому эту длину лучше вычесть.",
                    },
                    {
                        question: "Какой запас брать на плинтус?",
                        answer:
                            "Для обычной комнаты часто хватает 5-7%. Если много подрезки, углов и нестандартных узлов, запас можно увеличить.",
                    },
                ],
            },
            related: {
                title: "Связанные инструменты",
                cards: [
                    { href: "/ru/calculators/flooring", title: "Калькулятор покрытия", description: "Удобно считать плинтус вместе с ламинатом или кварцвинилом по одной комнате.", icon: "grid", accentClass: "text-emerald-500" },
                    { href: "/ru/calculators/screed", title: "Калькулятор стяжки", description: "Сначала база пола, потом покрытие и плинтус: логичная связка для закупки.", icon: "layers", accentClass: "text-amber-500" },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
        },
        screed: {
            metadata: {
                path: "/ru/calculators/screed",
                title: "Калькулятор стяжки пола - объем смеси и мешки | Renohacks",
                description:
                    "Онлайн калькулятор стяжки пола: объем, расход сухой смеси, количество мешков, вода на замес и стоимость.",
            },
            share: {
                url: "/ru/calculators/screed",
                title: "Калькулятор стяжки пола - объем смеси и мешки | Renohacks",
                description: "Рассчитайте объем стяжки, сухую смесь и количество мешков",
            },
            hero: {
                title: "Калькулятор стяжки пола",
                description:
                    "Рассчитайте объем стяжки, расход сухой смеси, количество мешков и воду на замес. Подходит для цементной стяжки, наливного пола и облегченных смесей.",
            },
            benefits: {
                title: "Что важно перед расчетом стяжки",
                items: [
                    { strong: "Берите среднюю толщину.", text: "Если основание неровное, ориентируйтесь на среднее значение по маякам." },
                    { strong: "Проверяйте норму расхода.", text: "Для точного результата лучше брать данные с мешка конкретной смеси." },
                    { strong: "Добавляйте запас.", text: "Даже аккуратный расчет лучше вести с резервом 5-10%." },
                ],
            },
            faq: {
                title: "Частые вопросы",
                items: [
                    {
                        question: "Чем объем отличается от расхода смеси?",
                        answer:
                            "Объем показывает геометрию слоя в м³, а расход смеси - сколько сухого материала потребуется по норме производителя.",
                    },
                    {
                        question: "Можно ли считать наливной пол и цементную стяжку одинаково?",
                        answer:
                            "Принцип один, но расход на 10 мм разный. Поэтому в калькуляторе есть пресеты и ручная корректировка расхода.",
                    },
                ],
            },
            related: {
                title: "Связанные инструменты",
                cards: [
                    { href: "/ru/calculators/flooring", title: "Калькулятор покрытия", description: "После выравнивания пола удобно сразу перейти к расчету финишного покрытия.", icon: "grid", accentClass: "text-emerald-500" },
                    { href: "/ru/calculators/baseboard", title: "Калькулятор плинтуса", description: "Закрывает финальный этап по полу после стяжки и покрытия.", icon: "ruler", accentClass: "text-amber-500" },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
        },
    },
    en: {
        paint: {
            metadata: {
                path: "/calculators/paint",
                title: "Paint Calculator Online — calculate paint consumption | Renohacks",
                description:
                    "Online paint calculator: enter your room dimensions and find out how many liters of paint you need. A handy tool by Renohacks.",
            },
            share: {
                url: "/calculators/paint",
                title: "Paint Calculator Online — calculate paint consumption | Renohacks",
                description:
                    "Online paint calculator: enter your room dimensions and find out how many liters of paint you need",
            },
            hero: {
                title: "Paint Calculator",
                description:
                    "Calculate the exact amount of paint needed for walls and ceilings. Accounts for windows, doors, and second coat requirements.",
            },
            benefits: {
                title: "Why professionals choose this paint calculator",
                items: [
                    { strong: "Accurate calculation with all factors.", text: "Accounts for windows, doors, number of coats, and paint coverage per m²." },
                    { strong: "Windows and doors accounted for.", text: "Automatically subtracts opening areas for accurate calculation." },
                    { strong: "Flexible settings.", text: "Adjust the number of coats and paint coverage depending on surface type." },
                    { strong: "Mobile version.", text: "Works on all devices — calculate paint consumption anywhere." },
                    { strong: "Free and no registration.", text: "Use the calculator without restrictions." },
                ],
            },
            guide: {
                title: "Step-by-step paint calculation guide",
                steps: [
                    "Enter room dimensions: length, width, and wall height in meters.",
                    "Specify the number of windows and doors — the calculator will automatically subtract their area.",
                    "Choose the number of paint coats (usually 2 coats for quality coverage).",
                    "Enter paint coverage per m² (usually 8-12 L/m², indicated on the can).",
                    "Get accurate calculation in liters and add 10% extra for safety.",
                ],
                tip: "💡 Tip: Always buy paint with a small reserve (10-15%) for unexpected situations and touch-ups.",
            },
            faq: {
                title: "Paint calculation FAQs",
                items: [
                    {
                        question: "How to correctly calculate paint consumption?",
                        answer:
                            "Enter accurate room dimensions, specify the number of windows and doors, choose the number of coats and paint coverage. The calculator will automatically account for all factors and give you an accurate result.",
                    },
                    {
                        question: "How many coats of paint should be applied?",
                        answer:
                            "Usually 2 coats are enough for quality coverage. For dark colors or when painting over dark paint, 3 coats may be needed.",
                    },
                    {
                        question: "Should I account for extra paint when buying?",
                        answer:
                            "Yes, always add 10-15% to the calculated amount for unexpected situations, touch-ups, and possible application errors.",
                    },
                ],
            },
            related: {
                title: "More renovation planning resources",
                cards: [
                    { href: "/calculators/budget", title: "Budget Calculator", description: "Calculate the total renovation cost including all work categories and reserve.", icon: "layers", accentClass: "text-amber-500" },
                    { href: "/calculators/tile", title: "Tile Calculator", description: "Calculate tile quantity for floors and walls including waste and adhesive.", icon: "grid", accentClass: "text-emerald-500" },
                    { href: "/calculators/wallpaper", title: "Wallpaper Calculator", description: "Determine the number of wallpaper rolls accounting for wall height and pattern.", icon: "scrollText", accentClass: "text-indigo-500" },
                    { href: "/calculators", title: "All tools", description: "Explore the full Renohacks toolkit for planning materials.", icon: "paintbrush", accentClass: "text-rose-500" },
                ],
            },
            shareTitle: "Share the calculator",
        },
        flooring: {
            metadata: {
                path: "/calculators/flooring",
                title: "Flooring Calculator - packs, waste and underlay | Renohacks",
                description:
                    "Online flooring calculator for laminate, vinyl and engineered wood: area, packs, underlay and cutting waste.",
            },
            share: {
                url: "/calculators/flooring",
                title: "Flooring Calculator - packs, waste and underlay | Renohacks",
                description: "Estimate flooring packs, underlay and waste in minutes",
            },
            hero: {
                title: "Flooring Calculator",
                description:
                    "Calculate laminate, vinyl or engineered wood flooring by room area, layout pattern, pack coverage and cutting waste. Built for real renovation planning.",
            },
            benefits: {
                title: "What this calculator covers",
                items: [
                    { strong: "Net floor area.", text: "You can subtract fixed built-ins that will not receive flooring." },
                    { strong: "Layout-specific waste.", text: "Straight, diagonal and herringbone layouts use different base waste rates." },
                    { strong: "Real pack math.", text: "The result includes packs and plank count, not just square footage." },
                    { strong: "Underlay and cost.", text: "You can estimate underlay and budget in the same pass." },
                ],
            },
            faq: {
                title: "FAQs",
                items: [
                    {
                        question: "How much waste should I allow for laminate or vinyl?",
                        answer:
                            "Straight layouts usually need less waste than diagonal or herringbone patterns. The calculator applies a layout-based base percentage and lets you add extra waste if needed.",
                    },
                    {
                        question: "Should I subtract closets or kitchen units?",
                        answer:
                            "Yes, but only for fixed built-ins where flooring definitely will not be installed.",
                    },
                ],
            },
            related: {
                title: "Related tools",
                cards: [
                    { href: "/calculators/baseboard", title: "Baseboard Calculator", description: "Use the same room dimensions to estimate baseboard pieces and linear footage.", icon: "ruler", accentClass: "text-amber-500" },
                    { href: "/calculators/tile", title: "Tile Calculator", description: "Compare wood-look flooring with tile options for kitchens, bathrooms or entry zones.", icon: "grid", accentClass: "text-emerald-500" },
                ],
            },
            shareTitle: "Share the calculator",
        },
        baseboard: {
            metadata: {
                path: "/calculators/baseboard",
                title: "Baseboard Calculator - length, pieces and cost | Renohacks",
                description:
                    "Online baseboard calculator: estimate linear footage, piece count, waste and approximate cost.",
            },
            share: {
                url: "/calculators/baseboard",
                title: "Baseboard Calculator - length, pieces and cost | Renohacks",
                description: "Calculate baseboard length, waste and piece count",
            },
            hero: {
                title: "Baseboard Calculator",
                description:
                    "Calculate baseboard by room size or known perimeter. The tool deducts doorway widths, adds waste and shows how many pieces you should buy.",
            },
            benefits: {
                title: "When this estimate is most useful",
                items: [
                    { strong: "For standard rooms.", text: "Use length and width and let the calculator build the perimeter." },
                    { strong: "For complex layouts.", text: "If you already measured perimeter manually, switch to custom mode." },
                    { strong: "For purchasing.", text: "The result gives you total length, piece count and a quick cost estimate." },
                ],
            },
            faq: {
                title: "FAQs",
                items: [
                    {
                        question: "Should I deduct door openings?",
                        answer:
                            "Yes. In most rooms, baseboard does not run through the door opening, so that width should be deducted from the perimeter.",
                    },
                    {
                        question: "How much waste should I allow?",
                        answer:
                            "Five to seven percent is often enough for a simple room. If there are more cuts, tricky corners or material defects, use a slightly higher reserve.",
                    },
                ],
            },
            related: {
                title: "Related tools",
                cards: [
                    { href: "/calculators/flooring", title: "Flooring Calculator", description: "A natural follow-up when you are finishing the same room floor by floor.", icon: "grid", accentClass: "text-emerald-500" },
                    { href: "/calculators/screed", title: "Screed Calculator", description: "Estimate the floor base first, then the finish and baseboard in one workflow.", icon: "layers", accentClass: "text-amber-500" },
                ],
            },
            shareTitle: "Share the calculator",
        },
        screed: {
            metadata: {
                path: "/calculators/screed",
                title: "Screed Calculator - volume, dry mix and bags | Renohacks",
                description:
                    "Online screed calculator: estimate volume, dry mix, number of bags, mixing water and approximate cost.",
            },
            share: {
                url: "/calculators/screed",
                title: "Screed Calculator - volume, dry mix and bags | Renohacks",
                description: "Estimate screed volume, dry mix and bag count",
            },
            hero: {
                title: "Screed Calculator",
                description:
                    "Calculate screed volume, dry mix consumption, bag count and mixing water for floor leveling. Suitable for cement screed, self-leveling compounds and lightweight mixes.",
            },
            benefits: {
                title: "What matters before you estimate screed",
                items: [
                    { strong: "Use average thickness.", text: "If the subfloor is uneven, base the estimate on the average working thickness." },
                    { strong: "Check product consumption.", text: "For the best accuracy, use the exact kg-per-square-meter figure from the bag." },
                    { strong: "Keep a reserve.", text: "Even a careful screed estimate is safer with a 5-10% margin." },
                ],
            },
            faq: {
                title: "FAQs",
                items: [
                    {
                        question: "What is the difference between volume and dry mix consumption?",
                        answer:
                            "Volume is the geometric size of the layer in cubic meters. Dry mix consumption shows how much material is actually needed based on the manufacturer rate.",
                    },
                    {
                        question: "Can I use the same logic for self-leveling and cement screed?",
                        answer:
                            "The logic is similar, but the consumption per 10 mm is different. That is why the calculator includes presets and manual override for the mix rate.",
                    },
                ],
            },
            related: {
                title: "Related tools",
                cards: [
                    { href: "/calculators/flooring", title: "Flooring Calculator", description: "Move from floor base to the final finish in one planning workflow.", icon: "grid", accentClass: "text-emerald-500" },
                    { href: "/calculators/baseboard", title: "Baseboard Calculator", description: "Finish the perimeter once the screed and floor finish are decided.", icon: "ruler", accentClass: "text-amber-500" },
                ],
            },
            shareTitle: "Share the calculator",
        },
    },
}

export function getCalculatorPageDictionary(
    locale: CalculatorPageLocale,
    key: CalculatorPageKey
): CalculatorPageDictionary {
    const localDictionaries = {
        ...calculatorPageDictionaries[locale],
        ...extraCalculatorPageDictionaries[locale],
    } as Record<CalculatorPageKey, CalculatorPageDictionary>

    const insightDictionary = calculatorPageInsights[locale][key as InsightCalculatorPageKey]
    const nextStepDictionary = calculatorPageNextSteps[locale][key as NextStepCalculatorPageKey]

    return {
        ...localDictionaries[key],
        ...(insightDictionary ?? {}),
        ...(nextStepDictionary ?? {}),
    }
}
