export type NotifiableCalculator = {
    slug: string
    locale: "ru" | "en"
    title: string
    description: string
    url: string
    publishedAt: string
}

export const NOTIFIABLE_CALCULATORS: NotifiableCalculator[] = [
    {
        slug: "paint",
        locale: "ru",
        title: "Калькулятор краски",
        description: "Рассчитывает расход краски для стен и потолков с учетом слоев и проемов.",
        url: "/ru/calculators/paint",
        publishedAt: "2025-09-17",
    },
    {
        slug: "paint",
        locale: "en",
        title: "Paint Calculator",
        description: "Estimates paint coverage for walls and ceilings, including coats and openings.",
        url: "/calculators/paint",
        publishedAt: "2025-10-01",
    },
    {
        slug: "wallpaper",
        locale: "ru",
        title: "Калькулятор обоев",
        description: "Помогает оценить количество рулонов с учетом размеров комнаты, раппорта и проемов.",
        url: "/ru/calculators/wallpaper",
        publishedAt: "2025-09-17",
    },
    {
        slug: "wallpaper",
        locale: "en",
        title: "Wallpaper Calculator",
        description: "Estimates the number of wallpaper rolls from room dimensions, repeat, and openings.",
        url: "/calculators/wallpaper",
        publishedAt: "2025-10-01",
    },
    {
        slug: "tile",
        locale: "ru",
        title: "Калькулятор плитки",
        description: "Считает количество плитки, упаковок и клея для пола или стен с запасом.",
        url: "/ru/calculators/tile",
        publishedAt: "2025-09-17",
    },
    {
        slug: "tile",
        locale: "en",
        title: "Tile Calculator",
        description: "Calculates tile count, packs, and adhesive for floors or walls with waste included.",
        url: "/calculators/tile",
        publishedAt: "2025-10-01",
    },
    {
        slug: "budget",
        locale: "ru",
        title: "Планировщик бюджета ремонта",
        description: "Собирает смету по категориям расходов и показывает резерв на непредвиденные траты.",
        url: "/ru/calculators/budget",
        publishedAt: "2025-10-28",
    },
    {
        slug: "budget",
        locale: "en",
        title: "Renovation Budget Planner",
        description: "Builds a renovation estimate by cost category and adds a contingency reserve.",
        url: "/calculators/budget",
        publishedAt: "2025-10-28",
    },
    {
        slug: "color-palette",
        locale: "ru",
        title: "Генератор палитр",
        description: "Подбирает цветовые палитры для интерьера и помогает собрать сочетаемые оттенки.",
        url: "/ru/calculators/color-palette",
        publishedAt: "2026-01-06",
    },
    {
        slug: "color-palette",
        locale: "en",
        title: "Color Palette Generator",
        description: "Generates interior color palettes and suggests matching shades.",
        url: "/calculators/color-palette",
        publishedAt: "2026-01-06",
    },
    {
        slug: "ventilation",
        locale: "ru",
        title: "Калькулятор вентиляции",
        description: "Оценивает требуемый воздухообмен по размерам помещения и кратности обмена воздуха.",
        url: "/ru/calculators/ventilation",
        publishedAt: "2026-02-02",
    },
    {
        slug: "ventilation",
        locale: "en",
        title: "Ventilation Calculator",
        description: "Estimates required airflow from room size and target air changes per hour.",
        url: "/calculators/ventilation",
        publishedAt: "2026-02-02",
    },
    {
        slug: "underfloor-heating",
        locale: "ru",
        title: "Калькулятор теплого пола",
        description: "Считает площадь укладки, мощность и ориентировочные ежемесячные затраты.",
        url: "/ru/calculators/underfloor-heating",
        publishedAt: "2026-02-02",
    },
    {
        slug: "underfloor-heating",
        locale: "en",
        title: "Underfloor Heating Calculator",
        description: "Calculates heated area, system power, and estimated monthly running cost.",
        url: "/calculators/underfloor-heating",
        publishedAt: "2026-02-02",
    },
    {
        slug: "lighting",
        locale: "ru",
        title: "Калькулятор освещения",
        description: "Подбирает необходимый световой поток и количество светильников для комнаты.",
        url: "/ru/calculators/lighting",
        publishedAt: "2026-02-02",
    },
    {
        slug: "lighting",
        locale: "en",
        title: "Lighting Calculator",
        description: "Estimates target lumens and fixture count for a room.",
        url: "/calculators/lighting",
        publishedAt: "2026-02-02",
    },
]
