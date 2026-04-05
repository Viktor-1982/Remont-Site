export type ToolsLocale = "ru" | "en"

type ToolIconName =
    | "paintbrush"
    | "wallpaper"
    | "grid3x3"
    | "layers"
    | "ruler"
    | "thermometer"
    | "wind"
    | "lightbulb"
    | "wallet"
    | "palette"
    | "sparkles"
    | "shoppingCart"

type ToolScenarioIconName = "floors" | "walls" | "bathroom" | "budget"

export type ToolCard = {
    href: string
    label: string
    emoji: string
    icon: ToolIconName
    desc: string
    badge: string
    gradient: string
}

export type ToolScenario = {
    title: string
    description: string
    href: string
    tools: string[]
    icon: ToolScenarioIconName
}

export type ToolJourney = {
    title: string
    description: string
    steps: Array<{
        label: string
        href: string
    }>
}

export type ToolsDictionary = {
    metadata: {
        title: string
        description: string
    }
    breadcrumb: {
        homeLabel: string
        pageLabel: string
        pagePath: string
    }
    hero: {
        badge: string
        title: string
        description: string
    }
    cards: ToolCard[]
    ctaLabel: string
    scenarios: {
        title: string
        items: ToolScenario[]
    }
    journeys: {
        title: string
        items: ToolJourney[]
    }
    explainer: {
        title: string
        description: string
    }
}

export const toolsDictionaries: Record<ToolsLocale, ToolsDictionary> = {
    ru: {
        metadata: {
            title: "Инструменты для ремонта: краска, пол, стяжка, плинтус | Renohacks",
            description:
                "Точные инструменты для ремонта: краска, обои, плитка, напольные покрытия, стяжка, плинтус, вентиляция, теплый пол и бюджет.",
        },
        breadcrumb: {
            homeLabel: "Главная",
            pageLabel: "Инструменты",
            pagePath: "/tools",
        },
        hero: {
            badge: "Инструменты для ремонта Renohacks",
            title: "Умные инструменты для ремонта квартиры и дома",
            description:
                "Выберите инструмент, чтобы за пару минут прикинуть расход материалов и бюджет. Инструменты учитывают реальные размеры помещений, запасы и особенности монтажа.",
        },
        cards: [
            {
                href: "/calculators/paint",
                label: "Калькулятор краски",
                emoji: "🎨",
                icon: "paintbrush",
                desc: "Рассчитайте расход краски по размерам комнаты с учетом окон, дверей и количества слоев.",
                badge: "Стены и потолки",
                gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
            },
            {
                href: "/calculators/wallpaper",
                label: "Калькулятор обоев",
                emoji: "🪟",
                icon: "wallpaper",
                desc: "Узнайте, сколько рулонов обоев нужно с учетом раппорта, запаса и размеров комнаты.",
                badge: "Обои и рисунок",
                gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
            },
            {
                href: "/calculators/tile",
                label: "Калькулятор плитки",
                emoji: "🧱",
                icon: "grid3x3",
                desc: "Подсчитайте плитку для пола и стен, процент отходов и примерный расход клея.",
                badge: "Пол и стены",
                gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
            },
            {
                href: "/calculators/flooring",
                label: "Калькулятор напольного покрытия",
                emoji: "🪵",
                icon: "layers",
                desc: "Рассчитайте ламинат, кварцвинил или паркетную доску по площади комнаты, упаковкам, подложке и запасу.",
                badge: "Ламинат и кварцвинил",
                gradient: "from-lime-500/15 via-emerald-400/10 to-teal-400/10",
            },
            {
                href: "/calculators/baseboard",
                label: "Калькулятор плинтуса",
                emoji: "📏",
                icon: "ruler",
                desc: "Узнайте длину плинтуса, количество планок, вычет проемов и примерную стоимость.",
                badge: "Периметр и планки",
                gradient: "from-amber-500/15 via-orange-400/10 to-yellow-400/10",
            },
            {
                href: "/calculators/screed",
                label: "Калькулятор стяжки пола",
                emoji: "🧰",
                icon: "layers",
                desc: "Рассчитайте объем стяжки, расход сухой смеси, количество мешков, воду на замес и ориентировочную стоимость.",
                badge: "Основание пола",
                gradient: "from-stone-500/15 via-slate-400/10 to-zinc-400/10",
            },
            {
                href: "/calculators/underfloor-heating",
                label: "Калькулятор теплого пола",
                emoji: "🔥",
                icon: "thermometer",
                desc: "Рассчитайте мощность, длину кабеля или площадь матов и энергопотребление.",
                badge: "Теплый пол",
                gradient: "from-orange-500/15 via-amber-400/10 to-yellow-400/10",
            },
            {
                href: "/calculators/ventilation",
                label: "Калькулятор вентиляции",
                emoji: "🌬️",
                icon: "wind",
                desc: "Рассчитайте расход воздуха по объему помещения и кратности воздухообмена.",
                badge: "Вентиляция",
                gradient: "from-cyan-500/15 via-sky-400/10 to-blue-400/10",
            },
            {
                href: "/calculators/lighting",
                label: "Калькулятор освещенности",
                emoji: "💡",
                icon: "lightbulb",
                desc: "Узнайте, сколько люмен нужно комнате и сколько ламп установить по площади и типу помещения.",
                badge: "Освещение",
                gradient: "from-amber-500/15 via-yellow-400/10 to-orange-400/10",
            },
            {
                href: "/calculators/budget",
                label: "Планировщик бюджета",
                emoji: "💰",
                icon: "wallet",
                desc: "Соберите смету по категориям работ, валюте и резерву, чтобы контролировать бюджет ремонта.",
                badge: "Полная смета",
                gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
            },
            {
                href: "/calculators/color-palette",
                label: "Генератор цветовых палитр",
                emoji: "🎨",
                icon: "palette",
                desc: "Создайте гармоничную цветовую схему для интерьера с рекомендациями по применению.",
                badge: "Дизайн и цвета",
                gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
            },
            {
                href: "/quiz/interior-style",
                label: "Квиз: стиль интерьера",
                emoji: "✨",
                icon: "sparkles",
                desc: "Пройдите тест и узнайте, какой стиль интерьера лучше всего подходит вашему вкусу и образу жизни.",
                badge: "Дизайн",
                gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
            },
            {
                href: "/tools/materials-checklist",
                label: "Чеклист покупок материалов",
                emoji: "🛒",
                icon: "shoppingCart",
                desc: "Полный список материалов для ремонта с возможностью отмечать уже купленные позиции.",
                badge: "Планирование",
                gradient: "from-green-500/15 via-emerald-400/10 to-teal-400/10",
            },
        ],
        ctaLabel: "Открыть",
        scenarios: {
            title: "Выберите сценарий ремонта",
            items: [
                {
                    title: "Для пола",
                    description:
                        "Сначала выровняйте основание, потом посчитайте покрытие и сразу доберите плинтус по тому же помещению.",
                    href: "/calculators/screed",
                    tools: ["Стяжка пола", "Напольное покрытие", "Плинтус"],
                    icon: "floors",
                },
                {
                    title: "Для стен",
                    description:
                        "Сравните покраску, обои и плитку, чтобы сразу понять расход материалов по каждой отделке.",
                    href: "/calculators/paint",
                    tools: ["Краска", "Обои", "Плитка"],
                    icon: "walls",
                },
                {
                    title: "Для ванной",
                    description:
                        "Соберите базовый набор расчетов для плитки, теплого пола, вентиляции и света в одном сценарии.",
                    href: "/calculators/tile",
                    tools: ["Плитка", "Теплый пол", "Вентиляция", "Освещение"],
                    icon: "bathroom",
                },
                {
                    title: "Для сметы",
                    description:
                        "Начните с общей суммы, затем проверьте дорогие категории по отдельным инструментам, чтобы не промахнуться с закупкой.",
                    href: "/calculators/budget",
                    tools: ["Бюджет", "Краска", "Плитка", "Напольное покрытие"],
                    icon: "budget",
                },
            ],
        },
        journeys: {
            title: "Популярные сценарии",
            items: [
                {
                    title: "Быстрый расчет пола",
                    description: "Подходит, если вы уже знаете комнату и хотите быстро собрать закупку по полу.",
                    steps: [
                        { label: "Стяжка пола", href: "/calculators/screed" },
                        { label: "Напольное покрытие", href: "/calculators/flooring" },
                        { label: "Плинтус", href: "/calculators/baseboard" },
                    ],
                },
                {
                    title: "Отделка стен без сюрпризов",
                    description: "Помогает сравнить финишную отделку и заранее заложить запас на подрезку и второй слой.",
                    steps: [
                        { label: "Краска", href: "/calculators/paint" },
                        { label: "Обои", href: "/calculators/wallpaper" },
                        { label: "Цветовая палитра", href: "/calculators/color-palette" },
                    ],
                },
                {
                    title: "Ванная под ключ",
                    description: "Набор инструментов для мокрой зоны, где чаще всего ошибаются с количеством и инженеркой.",
                    steps: [
                        { label: "Плитка", href: "/calculators/tile" },
                        { label: "Теплый пол", href: "/calculators/underfloor-heating" },
                        { label: "Вентиляция", href: "/calculators/ventilation" },
                        { label: "Освещение", href: "/calculators/lighting" },
                        { label: "Бюджет", href: "/calculators/budget" },
                    ],
                },
            ],
        },
        explainer: {
            title: "Как использовать инструменты Renohacks",
            description:
                "Начните с планировщика бюджета, чтобы понять общий диапазон затрат, затем переходите к точечным расчетам по полу, стенам и инженерным системам. Результаты удобно использовать как основу для закупки материалов и обсуждения сметы с подрядчиком.",
        },
    },
    en: {
        metadata: {
            title: "Renovation tools: paint, flooring, baseboard, screed | Renohacks",
            description:
                "Modern renovation tools for paint, wallpaper, tile, flooring, baseboard, screed, ventilation, heating and budget planning.",
        },
        breadcrumb: {
            homeLabel: "Home",
            pageLabel: "Tools",
            pagePath: "/en/tools",
        },
        hero: {
            badge: "Renohacks renovation tools",
            title: "Smart tools for home renovation planning",
            description:
                "Choose a tool to estimate materials, layout waste and budget in just a couple of minutes. Each tool is tuned for real room dimensions, reserves and installation specifics.",
        },
        cards: [
            {
                href: "/en/calculators/paint",
                label: "Paint Calculator",
                emoji: "🎨",
                icon: "paintbrush",
                desc: "Estimate paint needed by room size, including windows, doors and number of coats.",
                badge: "Walls and ceilings",
                gradient: "from-rose-500/15 via-rose-400/10 to-orange-400/10",
            },
            {
                href: "/en/calculators/wallpaper",
                label: "Wallpaper Calculator",
                emoji: "🪟",
                icon: "wallpaper",
                desc: "Find out how many wallpaper rolls you need, including pattern repeat and waste.",
                badge: "Wallpaper and pattern",
                gradient: "from-emerald-500/15 via-emerald-400/10 to-teal-400/10",
            },
            {
                href: "/en/calculators/tile",
                label: "Tile Calculator",
                emoji: "🧱",
                icon: "grid3x3",
                desc: "Calculate tile for floors and walls, waste percentage and approximate adhesive usage.",
                badge: "Floors and walls",
                gradient: "from-sky-500/15 via-sky-400/10 to-indigo-400/10",
            },
            {
                href: "/en/calculators/flooring",
                label: "Flooring Calculator",
                emoji: "🪵",
                icon: "layers",
                desc: "Estimate laminate, vinyl or engineered wood packs, underlay and waste by room size and layout.",
                badge: "Laminate and LVT",
                gradient: "from-lime-500/15 via-emerald-400/10 to-teal-400/10",
            },
            {
                href: "/en/calculators/baseboard",
                label: "Baseboard Calculator",
                emoji: "📏",
                icon: "ruler",
                desc: "Calculate baseboard length, piece count, doorway deductions and approximate cost from room dimensions or perimeter.",
                badge: "Perimeter and pieces",
                gradient: "from-amber-500/15 via-orange-400/10 to-yellow-400/10",
            },
            {
                href: "/en/calculators/screed",
                label: "Screed Calculator",
                emoji: "🧰",
                icon: "layers",
                desc: "Estimate screed volume, dry mix, bag count, water and approximate cost for floor leveling.",
                badge: "Floor base",
                gradient: "from-stone-500/15 via-slate-400/10 to-zinc-400/10",
            },
            {
                href: "/en/calculators/underfloor-heating",
                label: "Underfloor Heating",
                emoji: "🔥",
                icon: "thermometer",
                desc: "Estimate power, cable or mat coverage and monthly energy use.",
                badge: "Floor heating",
                gradient: "from-orange-500/15 via-amber-400/10 to-yellow-400/10",
            },
            {
                href: "/en/calculators/ventilation",
                label: "Ventilation Calculator",
                emoji: "🌬️",
                icon: "wind",
                desc: "Calculate airflow by room volume and target air changes per hour.",
                badge: "Ventilation",
                gradient: "from-cyan-500/15 via-sky-400/10 to-blue-400/10",
            },
            {
                href: "/en/calculators/lighting",
                label: "Lighting Calculator",
                emoji: "💡",
                icon: "lightbulb",
                desc: "Find how many lumens and light fixtures your room needs by area and room type.",
                badge: "Lighting",
                gradient: "from-amber-500/15 via-yellow-400/10 to-orange-400/10",
            },
            {
                href: "/en/calculators/budget",
                label: "Budget Planner",
                emoji: "💰",
                icon: "wallet",
                desc: "Build a renovation budget by work category, currency and reserve for extra costs.",
                badge: "Full budget",
                gradient: "from-amber-500/20 via-orange-400/10 to-rose-400/10",
            },
            {
                href: "/en/calculators/color-palette",
                label: "Color Palette Generator",
                emoji: "🎨",
                icon: "palette",
                desc: "Create a harmonious color scheme for your interior with practical application notes.",
                badge: "Design and color",
                gradient: "from-purple-500/15 via-pink-400/10 to-rose-400/10",
            },
            {
                href: "/en/quiz/interior-style",
                label: "Interior Style Quiz",
                emoji: "✨",
                icon: "sparkles",
                desc: "Take a quiz to find the interior style that best matches your taste and lifestyle.",
                badge: "Design",
                gradient: "from-indigo-500/15 via-purple-400/10 to-pink-400/10",
            },
            {
                href: "/en/tools/materials-checklist",
                label: "Materials Purchase Checklist",
                emoji: "🛒",
                icon: "shoppingCart",
                desc: "Keep a full renovation materials checklist and mark the items you have already purchased.",
                badge: "Planning",
                gradient: "from-green-500/15 via-emerald-400/10 to-teal-400/10",
            },
        ],
        ctaLabel: "Open",
        scenarios: {
            title: "Start with a renovation scenario",
            items: [
                {
                    title: "For floors",
                    description:
                        "Level the base first, then estimate the finish and close the perimeter with baseboards in the same workflow.",
                    href: "/en/calculators/screed",
                    tools: ["Screed", "Flooring", "Baseboard"],
                    icon: "floors",
                },
                {
                    title: "For walls",
                    description:
                        "Compare paint, wallpaper and tile so you can judge material demand before you choose the finish route.",
                    href: "/en/calculators/paint",
                    tools: ["Paint", "Wallpaper", "Tile"],
                    icon: "walls",
                },
                {
                    title: "For bathrooms",
                    description:
                        "Bundle the most error-prone bathroom calculations: tile, floor heating, ventilation and lighting.",
                    href: "/en/calculators/tile",
                    tools: ["Tile", "Underfloor Heating", "Ventilation", "Lighting"],
                    icon: "bathroom",
                },
                {
                    title: "For budgeting",
                    description:
                        "Start with the full budget, then validate the expensive finish categories with focused tools.",
                    href: "/en/calculators/budget",
                    tools: ["Budget", "Paint", "Tile", "Flooring"],
                    icon: "budget",
                },
            ],
        },
        journeys: {
            title: "Popular planning flows",
            items: [
                {
                    title: "Fast floor package",
                    description: "Best when you already know the room and want a practical purchase list for the floor.",
                    steps: [
                        { label: "Screed", href: "/en/calculators/screed" },
                        { label: "Flooring", href: "/en/calculators/flooring" },
                        { label: "Baseboard", href: "/en/calculators/baseboard" },
                    ],
                },
                {
                    title: "Wall finish comparison",
                    description: "Use this flow to compare finishes and avoid underestimating reserve, repeat and second coats.",
                    steps: [
                        { label: "Paint", href: "/en/calculators/paint" },
                        { label: "Wallpaper", href: "/en/calculators/wallpaper" },
                        { label: "Color Palette", href: "/en/calculators/color-palette" },
                    ],
                },
                {
                    title: "Bathroom scope check",
                    description: "A compact sequence for wet zones where material mistakes and engineering gaps cost the most.",
                    steps: [
                        { label: "Tile", href: "/en/calculators/tile" },
                        { label: "Underfloor Heating", href: "/en/calculators/underfloor-heating" },
                        { label: "Ventilation", href: "/en/calculators/ventilation" },
                        { label: "Lighting", href: "/en/calculators/lighting" },
                        { label: "Budget", href: "/en/calculators/budget" },
                    ],
                },
            ],
        },
        explainer: {
            title: "How to use Renohacks tools",
            description:
                "Start with the budget planner to define the cost range, then move into focused material estimates for floors, walls and systems. The results work well as a basis for purchasing lists and contractor quotes.",
        },
    },
}

export function getToolsDictionary(locale: ToolsLocale): ToolsDictionary {
    return toolsDictionaries[locale]
}
