import type { CalculatorPageDictionary, CalculatorPageLocale } from "@/dictionaries/calculator-pages"

export type ExtraCalculatorPageKey =
    | "tile"
    | "wallpaper"
    | "ventilation"
    | "lighting"
    | "underfloorHeating"

export const extraCalculatorPageDictionaries: Record<
    CalculatorPageLocale,
    Record<ExtraCalculatorPageKey, CalculatorPageDictionary>
> = {
    ru: {
        tile: {
            metadata: {
                path: "/calculators/tile",
                title: "Калькулятор плитки онлайн — рассчитать количество для пола и стен | Renohacks",
                description:
                    "Бесплатный калькулятор плитки: рассчитайте точное количество плитки для пола и стен. Учитывает площадь, размеры плитки, окна, двери и запас на подрезку.",
                keywords: [
                    "калькулятор плитки",
                    "расчет плитки",
                    "сколько нужно плитки",
                    "калькулятор плитки для ванной",
                    "калькулятор плитки для кухни",
                    "онлайн калькулятор плитки",
                ],
            },
            share: {
                url: "/calculators/tile",
                title: "Калькулятор плитки онлайн — рассчитать количество для пола и стен | Renohacks",
                description: "Бесплатный калькулятор плитки: точный расчет плитки для пола и стен",
            },
            hero: {
                title: "Калькулятор плитки",
                description:
                    "Рассчитайте количество плитки для пола или одной стены. Учитываются размеры поверхности, размеры плитки, ширина швов, способ укладки, окна, двери, ванна или экран, отходы на подрезку, количество упаковок и необходимое количество клея.",
                leadClass: "text-lg leading-relaxed",
            },
            benefits: {
                title: "Почему профессионалы выбирают этот калькулятор плитки",
                items: [
                    {
                        strong: "Расчет для пола и стен.",
                        text: "Отдельные настройки для разных типов поверхностей с учетом окон, дверей и встроенной ванны или экрана.",
                    },
                    {
                        strong: "Точные размеры плитки.",
                        text: "Учитываются длина и ширина плитки, а также ширина швов для более точного результата.",
                    },
                    {
                        strong: "Способ укладки.",
                        text: "Автоматический расчет запаса для прямой, диагональной, елочки и кирпичной раскладки.",
                    },
                    {
                        strong: "Расчет упаковок и клея.",
                        text: "Можно сразу оценить количество коробок и примерный расход клея.",
                    },
                    {
                        strong: "Гибкий запас.",
                        text: "Добавьте дополнительный резерв, если проект сложный или опыта укладки мало.",
                    },
                ],
            },
            guide: {
                title: "Пошаговое руководство по расчету плитки",
                steps: [
                    "Выберите тип поверхности: пол или стена.",
                    "Для пола введите длину и ширину помещения, для стены — ширину стены и высоту облицовки.",
                    "При необходимости укажите площадь ванны или экрана, если речь идет о полу.",
                    "Введите размеры плитки, ширину шва и количество плиток в упаковке.",
                    "Для стены добавьте окна и двери на этой поверхности.",
                    "Выберите способ укладки и при необходимости добавьте дополнительный запас.",
                    "Получите точное количество плитки, упаковок и клея.",
                ],
                tip: "Совет: для начинающих мастеров лучше добавить еще 5–10% к автоматическому запасу на подрезку.",
            },
            faq: {
                title: "Часто задаваемые вопросы о расчете плитки",
                items: [
                    {
                        question: "Как правильно рассчитать количество плитки?",
                        answer:
                            "Введите точные размеры поверхности и плитки, укажите ширину шва, количество плиток в упаковке и выберите способ укладки. Калькулятор автоматически учтет запас, проемы и даст итог по плитке, коробкам и клею.",
                    },
                    {
                        question: "Какой запас на подрезку нужен?",
                        answer:
                            "Для прямой укладки обычно достаточно 10%, для диагонали — около 15%, для елочки — около 20%. Если помещение сложное, добавьте дополнительный запас вручную.",
                    },
                    {
                        question: "Зачем указывать ширину шва?",
                        answer:
                            "Ширина шва влияет на эффективную площадь покрытия и помогает избежать грубой недооценки количества плитки.",
                    },
                    {
                        question: "Нужно ли вычитать площадь ванны или экрана?",
                        answer:
                            "Да. Если на части пола плитка не укладывается из-за встроенной ванны или экрана, этот участок лучше исключить из расчета.",
                    },
                ],
            },
            related: {
                title: "Дополнительные ресурсы для планирования ремонта",
                cards: [
                    {
                        href: "/calculators/budget",
                        title: "Калькулятор бюджета",
                        description: "Рассчитайте полную стоимость ремонта с учетом материалов, работ и резерва.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/calculators/paint",
                        title: "Калькулятор краски",
                        description: "Оцените расход краски для стен и потолков с учетом проемов.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/calculators/wallpaper",
                        title: "Калькулятор обоев",
                        description: "Сравните отделочные сценарии и узнайте, сколько рулонов понадобится.",
                        icon: "scrollText",
                        accentClass: "text-indigo-500",
                    },
                    {
                        href: "/calculators",
                        title: "Все калькуляторы",
                        description: "Откройте полный набор инструментов Renohacks для планирования материалов.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
            structuredData: [
                {
                    id: "tile-calculator-schema",
                    data: {
                        "@context": "https://schema.org",
                        "@type": ["SoftwareApplication", "WebApplication"],
                        name: "Калькулятор плитки онлайн",
                        alternateName: "Расчет количества плитки",
                        operatingSystem: "All",
                        applicationCategory: ["UtilityApplication", "BusinessApplication"],
                        offers: {
                            "@type": "Offer",
                            price: "0",
                            priceCurrency: "RUB",
                            availability: "https://schema.org/InStock",
                        },
                        description:
                            "Бесплатный онлайн-калькулятор для расчета количества плитки для пола и стен с учетом площади, размеров плитки, отходов и запаса.",
                        url: "https://renohacks.com/calculators/tile",
                        image: "https://renohacks.com/images/og-default.png",
                        inLanguage: "ru",
                        isAccessibleForFree: true,
                    },
                },
            ],
        },
        wallpaper: {
            metadata: {
                path: "/calculators/wallpaper",
                title: "Калькулятор обоев онлайн — рассчитать количество рулонов | Renohacks",
                description:
                    "Онлайн калькулятор обоев: введите размеры стен и узнайте, сколько рулонов понадобится с учетом проемов и раппорта рисунка.",
            },
            share: {
                url: "/calculators/wallpaper",
                title: "Калькулятор обоев онлайн — рассчитать количество рулонов | Renohacks",
                description: "Рассчитайте количество рулонов обоев с учетом высоты стен, проемов и рисунка",
            },
            hero: {
                title: "Калькулятор обоев",
                description:
                    "Рассчитайте необходимое количество рулонов обоев для комнаты или одной стены. Калькулятор учитывает площадь стен, окна, двери и раппорт рисунка. Проемы уменьшают эквивалентную площадь, но для подстраховки обычно стоит взять еще один рулон.",
                leadClass: "text-lg leading-relaxed",
            },
            benefits: {
                title: "Почему профессионалы выбирают этот калькулятор обоев",
                items: [
                    {
                        strong: "Точный расчет с учетом раппорта.",
                        text: "Учитывается не только площадь стен, но и влияние рисунка на расход рулонов.",
                    },
                    {
                        strong: "Учет окон и дверей.",
                        text: "Проемы уменьшают эквивалентную площадь оклейки, поэтому оценка ближе к реальному расходу.",
                    },
                    {
                        strong: "Гибкие настройки.",
                        text: "Можно задать размеры рулона и раппорт под конкретный тип обоев.",
                    },
                    {
                        strong: "Мобильная версия.",
                        text: "Калькулятор удобно использовать прямо в магазине или на объекте.",
                    },
                ],
            },
            guide: {
                title: "Пошаговое руководство по расчету обоев",
                steps: [
                    "Выберите расчет по комнате или по одной стене и введите соответствующие размеры в метрах.",
                    "Укажите длину и ширину рулона.",
                    "Для обоев с рисунком добавьте высоту раппорта.",
                    "Добавьте окна и двери — калькулятор уменьшит расход по эквивалентной площади проемов.",
                    "Получите расчет рулонов и заложите минимум один рулон на запас.",
                ],
                tip: "Совет: всегда покупайте минимум один дополнительный рулон на случай ремонта, брака или сложной подгонки рисунка.",
            },
            faq: {
                title: "Часто задаваемые вопросы о расчете обоев",
                items: [
                    {
                        question: "Что такое раппорт и почему он важен?",
                        answer:
                            "Раппорт — это вертикальное расстояние между повторяющимися элементами рисунка. Чем он больше, тем больше отходов при подгонке рисунка и тем выше расход рулонов.",
                    },
                    {
                        question: "Нужно ли покупать дополнительные рулоны?",
                        answer:
                            "Да. Один запасной рулон помогает пережить ошибки при поклейке, локальный ремонт и различия между партиями.",
                    },
                    {
                        question: "Проемы всегда уменьшают расход?",
                        answer:
                            "Да, но не всегда так сильно, как кажется. При полосной раскладке часть потерь все равно остается, поэтому запас не стоит убирать полностью.",
                    },
                ],
            },
            related: {
                title: "Дополнительные ресурсы для планирования ремонта",
                cards: [
                    {
                        href: "/calculators/budget",
                        title: "Калькулятор бюджета",
                        description: "Соберите смету по категориям и держите отделочные расходы под контролем.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/calculators/paint",
                        title: "Калькулятор краски",
                        description: "Сравните вариант с покраской стен и оцените расход материалов.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/bathroom",
                        title: "Хаб по ванной",
                        description: "Откройте подборку статей про плитку, ошибки, свет и планирование ванной.",
                        icon: "grid",
                        accentClass: "text-sky-500",
                    },
                    {
                        href: "/calculators",
                        title: "Все калькуляторы",
                        description: "Посмотрите весь набор инструментов Renohacks для ремонта.",
                        icon: "scrollText",
                        accentClass: "text-indigo-500",
                    },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
        },
        ventilation: {
            metadata: {
                path: "/calculators/ventilation",
                title: "Калькулятор вентиляции — объем и кратность | Renohacks",
                description:
                    "Точный калькулятор вентиляции: объем помещения, кратность воздухообмена (ACH) и расход воздуха в м³/ч. Подходит для кухни, ванной, спальни и офиса.",
                keywords: ["калькулятор вентиляции", "кратность воздухообмена", "расход воздуха", "объем помещения", "ACH"],
            },
            share: {
                url: "/calculators/ventilation",
                title: "Калькулятор вентиляции — объем и кратность | Renohacks",
                description: "Точный расчет вентиляции по объему помещения и кратности воздухообмена",
            },
            hero: {
                title: "Калькулятор вентиляции",
                description:
                    "Рассчитайте расход воздуха по объему помещения и кратности воздухообмена (ACH). Реальная формула простая: расход = объем × ACH.",
                leadClass: "text-lg leading-relaxed",
            },
            infoCards: {
                cards: [
                    { title: "Объем", description: "Объем = длина × ширина × высота. Измеряйте помещение от стены до стены.", icon: "ruler" },
                    { title: "Кратность", description: "Для жилых комнат обычно берут 3–4 ACH, для кухни 6–10, для ванной 6–8.", icon: "airVent" },
                    { title: "Резерв", description: "Добавьте 10–15% на потери в каналах и общую погрешность расчета.", icon: "gauge" },
                ],
            },
            related: {
                title: "Другие полезные инструменты",
                cards: [
                    {
                        href: "/bathroom",
                        title: "Хаб по ванной",
                        description: "Соберите в одном месте статьи про вентиляцию, плитку, свет и ошибки ремонта ванной.",
                        icon: "airVent",
                        accentClass: "text-sky-500",
                    },
                    {
                        href: "/calculators/underfloor-heating",
                        title: "Калькулятор теплого пола",
                        description: "Рассчитайте мощность, длину кабеля и примерное энергопотребление.",
                        icon: "flame",
                        accentClass: "text-orange-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Соберите смету по категориям и добавьте инженерные работы в общий бюджет.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
            layout: { maxWidthClass: "max-w-3xl" },
            structuredData: [
                {
                    id: "ventilation-schema",
                    data: {
                        "@context": "https://schema.org",
                        "@type": ["SoftwareApplication", "WebApplication"],
                        name: "Калькулятор вентиляции",
                        alternateName: "Расчет воздухообмена",
                        operatingSystem: "All",
                        applicationCategory: ["UtilityApplication", "BusinessApplication"],
                        offers: { "@type": "Offer", price: "0", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
                        description: "Онлайн-калькулятор вентиляции: расчет расхода воздуха по объему помещения и кратности воздухообмена (ACH).",
                        url: "https://renohacks.com/calculators/ventilation",
                        image: "https://renohacks.com/images/og-default.png",
                        inLanguage: "ru",
                        isAccessibleForFree: true,
                    },
                },
            ],
        },
        lighting: {
            metadata: {
                path: "/calculators/lighting",
                title: "Калькулятор освещенности — люмены и количество ламп | Renohacks",
                description:
                    "Рассчитайте, сколько люмен нужно комнате и сколько ламп установить. Нормы по типам помещений и запас на высоту потолка.",
                keywords: ["калькулятор освещенности", "люмены для комнаты", "сколько ламп нужно", "нормы освещения", "расчет освещения"],
            },
            share: {
                url: "/calculators/lighting",
                title: "Калькулятор освещенности — люмены и количество ламп | Renohacks",
                description: "Рассчитайте, сколько люмен и ламп нужно для комнаты по площади и типу помещения",
            },
            hero: {
                title: "Калькулятор освещенности",
                description:
                    "Узнайте, сколько люмен нужно вашей комнате и сколько ламп или светильников установить. Калькулятор использует типовые нормы освещенности по помещениям и учитывает запас на высоту потолка.",
                leadClass: "text-lg leading-relaxed",
            },
            infoCards: {
                cards: [
                    { title: "Площадь", description: "Длина × ширина комнаты в метрах. Измеряйте по полу от стены до стены.", icon: "ruler" },
                    { title: "Люксы", description: "Типовые значения: гостиная и спальня — 150 лк, кухня — 250, кабинет — 300, коридор — 100.", icon: "sun" },
                    { title: "Люмены на лампу", description: "Смотрите на упаковке. LED-лампа обычно дает 800–1000 лм на одну точку света.", icon: "lightbulb" },
                ],
            },
            related: {
                title: "Другие полезные инструменты",
                cards: [
                    {
                        href: "/lighting",
                        title: "Хаб по освещению",
                        description: "Откройте подборку статей про свет, сценарии освещения, спальню, ванную и маленькие квартиры.",
                        icon: "lightbulb",
                        accentClass: "text-yellow-500",
                    },
                    {
                        href: "/calculators/ventilation",
                        title: "Калькулятор вентиляции",
                        description: "Рассчитайте воздухообмен для кухни, ванной, спальни и других помещений.",
                        icon: "airVent",
                        accentClass: "text-cyan-500",
                    },
                    {
                        href: "/calculators/budget",
                        title: "Планировщик бюджета",
                        description: "Добавьте светильники, проводку и монтаж в общую смету ремонта.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
            layout: { maxWidthClass: "max-w-3xl" },
            structuredData: [
                {
                    id: "lighting-schema",
                    data: {
                        "@context": "https://schema.org",
                        "@type": ["SoftwareApplication", "WebApplication"],
                        name: "Калькулятор освещенности",
                        alternateName: "Расчет освещения по люменам",
                        operatingSystem: "All",
                        applicationCategory: ["UtilityApplication", "LifestyleApplication"],
                        offers: { "@type": "Offer", price: "0", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
                        description: "Онлайн-калькулятор освещенности: расчет нужных люмен и количества ламп по площади и типу помещения.",
                        url: "https://renohacks.com/calculators/lighting",
                        image: "https://renohacks.com/images/og-default.png",
                        inLanguage: "ru",
                        isAccessibleForFree: true,
                    },
                },
            ],
        },
        underfloorHeating: {
            metadata: {
                path: "/calculators/underfloor-heating",
                title: "Калькулятор теплого пола — мощность, кабель, расход | Renohacks",
                description:
                    "Калькулятор теплого пола: рассчитайте мощность системы, длину кабеля или площадь матов и примерное энергопотребление. Подходит для плитки, ламината, винила и дерева.",
                keywords: [
                    "калькулятор теплого пола",
                    "расчет теплого пола",
                    "мощность теплого пола",
                    "длина кабеля теплого пола",
                    "энергопотребление теплого пола",
                ],
            },
            share: {
                url: "/calculators/underfloor-heating",
                title: "Калькулятор теплого пола — мощность, кабель, расход | Renohacks",
                description: "Бесплатный калькулятор теплого пола: мощность, длина кабеля или матов и энергопотребление",
            },
            hero: {
                title: "Калькулятор теплого пола",
                description:
                    "Рассчитайте мощность системы, длину кабеля или площадь матов и примерное энергопотребление в месяц. Учитываются тип покрытия, режим работы и зона обогрева.",
                leadClass: "text-lg leading-relaxed",
            },
            benefits: {
                title: "Что учитывает калькулятор теплого пола",
                items: [
                    { strong: "Тип покрытия.", text: "Плитка, ламинат, дерево и винил требуют разной рекомендованной мощности." },
                    { strong: "Режим работы.", text: "Комфортный подогрев и основное отопление дают разные рекомендации по мощности." },
                    { strong: "Система.", text: "Можно считать длину кабеля либо площадь нагревательных матов." },
                    { strong: "Энергопотребление.", text: "Учитываются часы, дни и средняя загрузка термостата." },
                ],
            },
            infoCards: {
                cards: [
                    {
                        title: "Подбор мощности",
                        description: "Для плитки чаще берут 150–180 Вт/м², для ламината и винила — 120–160 Вт/м², для дерева — 100–140 Вт/м².",
                        icon: "flame",
                    },
                    {
                        title: "Энергопотребление",
                        description: "Средняя загрузка термостата обычно 50–70% при 5–8 часах работы в день.",
                        icon: "timer",
                    },
                    {
                        title: "Система и кабель",
                        description: "Сравните кабель и маты в одном интерфейсе и подберите подходящий сценарий обогрева.",
                        icon: "zap",
                    },
                ],
            },
            guide: {
                title: "Простая инструкция",
                steps: [
                    "Введите площадь помещения и долю обогреваемой зоны, обычно это 70–90% от общей площади.",
                    "Выберите тип покрытия, режим работы и основание под полом.",
                    "Укажите тип системы и мощность кабеля или мата.",
                    "Задайте часы работы, дни и среднюю загрузку — калькулятор покажет мощность, длину и энергопотребление.",
                ],
            },
            related: {
                title: "Другие полезные инструменты",
                cards: [
                    {
                        href: "/bathroom",
                        title: "Хаб по ванной",
                        description: "Откройте подборку статей про плитку, теплый пол, вентиляцию и планировку ванной.",
                        icon: "grid",
                        accentClass: "text-sky-500",
                    },
                    {
                        href: "/calculators/tile",
                        title: "Калькулятор плитки",
                        description: "Подсчитайте плитку, запас и клей для пола и стен.",
                        icon: "zap",
                        accentClass: "text-sky-500",
                    },
                ],
            },
            shareTitle: "Поделитесь калькулятором",
            structuredData: [
                {
                    id: "underfloor-schema",
                    data: {
                        "@context": "https://schema.org",
                        "@type": ["SoftwareApplication", "WebApplication"],
                        name: "Калькулятор теплого пола",
                        alternateName: "Расчет теплого пола",
                        operatingSystem: "All",
                        applicationCategory: ["UtilityApplication", "BusinessApplication"],
                        offers: { "@type": "Offer", price: "0", priceCurrency: "RUB", availability: "https://schema.org/InStock" },
                        description:
                            "Бесплатный онлайн-калькулятор для расчета мощности теплого пола, длины кабеля или матов и ориентировочного энергопотребления.",
                        url: "https://renohacks.com/calculators/underfloor-heating",
                        image: "https://renohacks.com/images/og-default.png",
                        inLanguage: "ru",
                        isAccessibleForFree: true,
                    },
                },
            ],
        },
    },
    en: {
        tile: {
            metadata: {
                path: "/en/calculators/tile",
                title: "Tile Calculator Online — Calculate Tiles for Floor and Walls | Renohacks",
                description:
                    "Free tile calculator: calculate exact tile quantity for floors and walls. Accounts for area, tile size, windows, doors and cutting waste.",
                keywords: [
                    "tile calculator",
                    "tile calculation",
                    "how many tiles do I need",
                    "bathroom tile calculator",
                    "kitchen tile calculator",
                ],
            },
            share: {
                url: "/en/calculators/tile",
                title: "Tile Calculator Online — Calculate Tiles for Floor and Walls | Renohacks",
                description: "Free tile calculator for floors and walls with waste, packs and adhesive",
            },
            hero: {
                title: "Tile Calculator",
                description:
                    "Calculate the amount of tile needed for floors or a single wall. The calculator accounts for surface size, tile dimensions, grout width, layout pattern, openings, bathtub or screen area, cutting waste, pack quantity and adhesive.",
                leadClass: "text-lg leading-relaxed",
            },
            benefits: {
                title: "Why professionals choose this tile calculator",
                items: [
                    {
                        strong: "Floor and wall modes.",
                        text: "Different settings cover floor areas, single walls, windows, doors and fixed bathtub or screen zones.",
                    },
                    {
                        strong: "Accurate tile sizing.",
                        text: "Tile length, width and grout width all affect the result and are included in the estimate.",
                    },
                    {
                        strong: "Layout-specific waste.",
                        text: "Straight, diagonal, herringbone and brick patterns use different base waste assumptions.",
                    },
                    {
                        strong: "Packs and adhesive.",
                        text: "The result goes beyond square footage and helps with purchasing boxes and adhesive.",
                    },
                ],
            },
            guide: {
                title: "Step-by-step tile calculation guide",
                steps: [
                    "Choose the surface type: floor or wall.",
                    "Enter the room or wall dimensions in meters.",
                    "If needed, specify bathtub or screen area for floor calculations.",
                    "Add tile size, grout width and tiles per pack.",
                    "For wall mode, include windows and doors on that wall.",
                    "Select the layout pattern and adjust additional waste if needed.",
                    "Review the tile count, pack quantity and adhesive estimate.",
                ],
                tip: "Tip: if the room has many cuts or you are new to tiling, add an extra 5–10% on top of the automatic waste allowance.",
            },
            faq: {
                title: "Tile calculation FAQs",
                items: [
                    {
                        question: "How do I estimate the right number of tiles?",
                        answer:
                            "Enter accurate dimensions, tile size, grout width and layout pattern. The calculator then adds waste and gives you a practical result in tiles, packs and adhesive.",
                    },
                    {
                        question: "How much waste should I allow?",
                        answer:
                            "Straight layouts usually need about 10%, diagonal layouts around 15% and herringbone around 20%. Complex rooms may need a bit more.",
                    },
                    {
                        question: "Why should I enter grout width?",
                        answer:
                            "Grout width changes the effective coverage of each tile and improves the accuracy of the estimate.",
                    },
                    {
                        question: "Should I subtract bathtub or screen area?",
                        answer:
                            "Yes. If tile is not installed on part of the floor because of a built-in bathtub or fixed screen, it should be excluded from the floor estimate.",
                    },
                ],
            },
            related: {
                title: "More renovation planning resources",
                cards: [
                    {
                        href: "/en/calculators/budget",
                        title: "Budget Calculator",
                        description: "Build a full renovation estimate including material and labor reserve.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/en/calculators/paint",
                        title: "Paint Calculator",
                        description: "Compare tile scenarios with painted walls and ceilings.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/en/calculators/wallpaper",
                        title: "Wallpaper Calculator",
                        description: "Estimate wallpaper rolls for dry rooms or alternate finish options.",
                        icon: "scrollText",
                        accentClass: "text-indigo-500",
                    },
                    {
                        href: "/en/calculators",
                        title: "All Calculators",
                        description: "Explore the full Renohacks toolkit for renovation planning.",
                        icon: "grid",
                        accentClass: "text-emerald-500",
                    },
                ],
            },
            shareTitle: "Share the calculator",
            structuredData: [
                {
                    id: "tile-calculator-schema-en",
                    data: {
                        "@context": "https://schema.org",
                        "@type": ["SoftwareApplication", "WebApplication"],
                        name: "Tile Calculator Online",
                        alternateName: "Tile Quantity Calculator",
                        operatingSystem: "All",
                        applicationCategory: ["UtilityApplication", "BusinessApplication"],
                        offers: {
                            "@type": "Offer",
                            price: "0",
                            priceCurrency: "USD",
                            availability: "https://schema.org/InStock",
                        },
                        description:
                            "Free online calculator to estimate tile quantity for floors and walls with waste, pack count and adhesive.",
                        url: "https://renohacks.com/en/calculators/tile",
                        image: "https://renohacks.com/images/og-default.png",
                        inLanguage: "en",
                        isAccessibleForFree: true,
                    },
                },
            ],
        },
        wallpaper: {
            metadata: {
                path: "/en/calculators/wallpaper",
                title: "Wallpaper Calculator Online — Calculate Rolls Needed | Renohacks",
                description:
                    "Online wallpaper calculator: estimate how many rolls you need by wall size, openings and pattern repeat.",
            },
            share: {
                url: "/en/calculators/wallpaper",
                title: "Wallpaper Calculator Online — Calculate Rolls Needed | Renohacks",
                description: "Estimate wallpaper rolls by wall size, pattern repeat and openings",
            },
            hero: {
                title: "Wallpaper Calculator",
                description:
                    "Calculate how many rolls of wallpaper you need for a room or a single wall. The tool accounts for wall area, windows, doors and pattern repeat. Openings reduce the equivalent wall area, but it is still wise to buy one extra roll.",
                leadClass: "text-lg leading-relaxed",
            },
            benefits: {
                title: "Why professionals choose this wallpaper calculator",
                items: [
                    {
                        strong: "Pattern repeat included.",
                        text: "The estimate reflects the extra material required for matching patterned wallpaper.",
                    },
                    {
                        strong: "Windows and doors accounted for.",
                        text: "Openings reduce the equivalent wall area, which makes the roll estimate closer to real site conditions.",
                    },
                    {
                        strong: "Flexible roll settings.",
                        text: "Adjust the roll dimensions and repeat height for the exact wallpaper you are buying.",
                    },
                    {
                        strong: "Mobile friendly.",
                        text: "Use it while comparing wallpaper options in store or on site.",
                    },
                ],
            },
            guide: {
                title: "Step-by-step wallpaper calculation guide",
                steps: [
                    "Choose room mode or single-wall mode and enter the dimensions in meters.",
                    "Add the wallpaper roll length and width.",
                    "For patterned wallpaper, enter the pattern repeat height.",
                    "Add windows and doors so the opening area is taken into account.",
                    "Review the roll estimate and add at least one extra roll for safety.",
                ],
                tip: "Tip: an extra roll is often the cheapest insurance against batch changes, cutting mistakes and future repairs.",
            },
            faq: {
                title: "Wallpaper calculation FAQs",
                items: [
                    {
                        question: "What is pattern repeat and why does it matter?",
                        answer:
                            "Pattern repeat is the vertical distance between matching elements in the wallpaper pattern. Larger repeats mean more waste during matching and a higher roll count.",
                    },
                    {
                        question: "Should I always buy extra rolls?",
                        answer:
                            "Yes. At least one extra roll helps with repairs, installation mistakes and color consistency from the same batch.",
                    },
                    {
                        question: "Do openings always reduce the result a lot?",
                        answer:
                            "They help, but not as dramatically as simple area math suggests. Strip layout still creates waste, so openings do not remove the need for a reserve.",
                    },
                ],
            },
            related: {
                title: "More renovation planning resources",
                cards: [
                    {
                        href: "/en/calculators/budget",
                        title: "Budget Calculator",
                        description: "Keep finishing costs under control while comparing wallpaper options.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                    {
                        href: "/en/calculators/paint",
                        title: "Paint Calculator",
                        description: "Compare wallpaper with painted walls as an alternate finish route.",
                        icon: "paintbrush",
                        accentClass: "text-rose-500",
                    },
                    {
                        href: "/en/bathroom",
                        title: "Bathroom Hub",
                        description: "Open the article hub with bathroom planning, tile choices, mistakes, and lighting guidance.",
                        icon: "grid",
                        accentClass: "text-sky-500",
                    },
                    {
                        href: "/en/calculators",
                        title: "All Calculators",
                        description: "Open the full Renohacks renovation toolkit.",
                        icon: "scrollText",
                        accentClass: "text-indigo-500",
                    },
                ],
            },
            shareTitle: "Share the calculator",
        },
        ventilation: {
            metadata: {
                path: "/en/calculators/ventilation",
                title: "Ventilation Calculator — Volume and ACH | Renohacks",
                description:
                    "Accurate ventilation calculator: room volume, air changes per hour (ACH) and airflow in m³/h. Works for kitchens, bathrooms, bedrooms and offices.",
                keywords: ["ventilation calculator", "air changes per hour", "airflow", "room volume", "ACH"],
            },
            share: {
                url: "/en/calculators/ventilation",
                title: "Ventilation Calculator — Volume and ACH | Renohacks",
                description: "Accurate ventilation calculation based on room volume and air changes per hour",
            },
            hero: {
                title: "Ventilation Calculator",
                description:
                    "Calculate airflow using room volume and air changes per hour (ACH). The working formula is simple: airflow = volume × ACH.",
                leadClass: "text-lg leading-relaxed",
            },
            infoCards: {
                cards: [
                    { title: "Volume", description: "Volume = length × width × height. Measure the room wall to wall.", icon: "ruler" },
                    { title: "ACH", description: "Typical values: living rooms 3–4 ACH, kitchens 6–10, bathrooms 6–8.", icon: "airVent" },
                    { title: "Reserve", description: "Add 10–15% to account for duct losses and general tolerance.", icon: "gauge" },
                ],
            },
            related: {
                title: "Other useful tools",
                cards: [
                    {
                        href: "/en/bathroom",
                        title: "Bathroom Hub",
                        description: "Keep bathroom ventilation, tile, lighting, and layout guidance in one place.",
                        icon: "airVent",
                        accentClass: "text-sky-500",
                    },
                    {
                        href: "/en/calculators/underfloor-heating",
                        title: "Underfloor Heating",
                        description: "Estimate power, cable length and energy usage for heated floors.",
                        icon: "flame",
                        accentClass: "text-orange-500",
                    },
                    {
                        href: "/en/calculators/budget",
                        title: "Budget Planner",
                        description: "Add engineering work and equipment costs to your renovation plan.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
            shareTitle: "Share the calculator",
            layout: { maxWidthClass: "max-w-3xl" },
            structuredData: [
                {
                    id: "ventilation-schema-en",
                    data: {
                        "@context": "https://schema.org",
                        "@type": ["SoftwareApplication", "WebApplication"],
                        name: "Ventilation Calculator",
                        alternateName: "Airflow Calculator",
                        operatingSystem: "All",
                        applicationCategory: ["UtilityApplication", "BusinessApplication"],
                        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
                        description: "Ventilation calculator based on room volume and air changes per hour (ACH).",
                        url: "https://renohacks.com/en/calculators/ventilation",
                        image: "https://renohacks.com/images/og-default.png",
                        inLanguage: "en",
                        isAccessibleForFree: true,
                    },
                },
            ],
        },
        lighting: {
            metadata: {
                path: "/en/calculators/lighting",
                title: "Lighting Calculator — Lumens and Number of Lamps | Renohacks",
                description:
                    "Calculate how many lumens your room needs and how many lamps to install. Includes room-type lighting standards and ceiling-height reserve.",
                keywords: ["lighting calculator", "lumens for room", "how many lamps", "illuminance standards", "lux by room type"],
            },
            share: {
                url: "/en/calculators/lighting",
                title: "Lighting Calculator — Lumens and Number of Lamps | Renohacks",
                description: "Calculate lumens and lamp count for a room by area and room type",
            },
            hero: {
                title: "Lighting Calculator",
                description:
                    "Find out how many lumens your room needs and how many lamps or fixtures to install. The calculator uses typical illuminance levels by room type and adds a reserve for ceiling height.",
                leadClass: "text-lg leading-relaxed",
            },
            infoCards: {
                cards: [
                    { title: "Area", description: "Area = length × width in meters. Measure the room floor wall to wall.", icon: "ruler" },
                    { title: "Lux", description: "Typical values: living room and bedroom 150 lux, kitchen 250, office 300, hallway 100.", icon: "sun" },
                    { title: "Lumens per lamp", description: "Check the packaging. A common LED bulb often delivers around 800–1000 lumens.", icon: "lightbulb" },
                ],
            },
            related: {
                title: "Other useful tools",
                cards: [
                    {
                        href: "/en/lighting",
                        title: "Lighting Hub",
                        description: "Open the article hub with room-by-room lighting ideas, lighting trends, and practical planning guidance.",
                        icon: "lightbulb",
                        accentClass: "text-yellow-500",
                    },
                    {
                        href: "/en/calculators/ventilation",
                        title: "Ventilation Calculator",
                        description: "Estimate airflow for kitchens, bathrooms, bedrooms and other rooms.",
                        icon: "airVent",
                        accentClass: "text-cyan-500",
                    },
                    {
                        href: "/en/calculators/budget",
                        title: "Budget Planner",
                        description: "Include fixtures, wiring and installation in your total renovation budget.",
                        icon: "layers",
                        accentClass: "text-amber-500",
                    },
                ],
            },
            shareTitle: "Share calculator",
            layout: { maxWidthClass: "max-w-3xl" },
            structuredData: [
                {
                    id: "lighting-schema-en",
                    data: {
                        "@context": "https://schema.org",
                        "@type": ["SoftwareApplication", "WebApplication"],
                        name: "Lighting Calculator",
                        alternateName: "Lumen and Lamp Count Calculator",
                        operatingSystem: "All",
                        applicationCategory: ["UtilityApplication", "LifestyleApplication"],
                        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
                        description: "Online lighting calculator for lumens needed and lamp count by room area and room type.",
                        url: "https://renohacks.com/en/calculators/lighting",
                        image: "https://renohacks.com/images/og-default.png",
                        inLanguage: "en",
                        isAccessibleForFree: true,
                    },
                },
            ],
        },
        underfloorHeating: {
            metadata: {
                path: "/en/calculators/underfloor-heating",
                title: "Underfloor Heating Calculator — Power, Cable Length and Energy | Renohacks",
                description:
                    "Underfloor heating calculator: estimate system power, cable length or mat area, and monthly energy usage for tile, laminate, vinyl and wood floors.",
                keywords: [
                    "underfloor heating calculator",
                    "floor heating power",
                    "heating cable length",
                    "heating mat area",
                    "floor heating energy consumption",
                ],
            },
            share: {
                url: "/en/calculators/underfloor-heating",
                title: "Underfloor Heating Calculator — Power, Cable Length and Energy | Renohacks",
                description: "Free underfloor heating calculator: power, cable length or mat area, and energy usage",
            },
            hero: {
                title: "Underfloor Heating Calculator",
                description:
                    "Estimate system power, cable length or mat area, and monthly energy usage. The calculator accounts for floor finish, heating mode and heated coverage.",
                leadClass: "text-lg leading-relaxed",
            },
            benefits: {
                title: "What the calculator includes",
                items: [
                    { strong: "Floor finish.", text: "Tile, laminate, vinyl and wood have different recommended power levels." },
                    { strong: "Heating mode.", text: "Comfort heating and primary heating require different output assumptions." },
                    { strong: "System type.", text: "Choose cable or mat mode and estimate the correct quantity for each system." },
                    { strong: "Energy usage.", text: "Hours, days and average thermostat load are included in the monthly estimate." },
                ],
            },
            infoCards: {
                cards: [
                    {
                        title: "Power selection",
                        description: "Typical guidance: 150–180 W/m² for tile, 120–160 W/m² for laminate or vinyl, and 100–140 W/m² for wood.",
                        icon: "flame",
                    },
                    {
                        title: "Energy estimate",
                        description: "A thermostat usually keeps average load around 50–70% with 5–8 hours of daily operation.",
                        icon: "timer",
                    },
                    {
                        title: "System choice",
                        description: "Compare cable length and mat area in one flow and adjust the result to your installation method.",
                        icon: "zap",
                    },
                ],
            },
            guide: {
                title: "Simple instructions",
                steps: [
                    "Enter the room area and heated coverage, usually 70–90% of the room.",
                    "Choose the floor finish, heating mode and the floor below.",
                    "Pick cable or mat mode and enter the selected product power.",
                    "Set hours, days and average load to review power, cable or mat quantity, and energy usage.",
                ],
            },
            related: {
                title: "More renovation tools",
                cards: [
                    {
                        href: "/en/bathroom",
                        title: "Bathroom Hub",
                        description: "Open the article hub with bathroom tile, heated floors, ventilation, and remodel planning.",
                        icon: "grid",
                        accentClass: "text-sky-500",
                    },
                    {
                        href: "/en/calculators/tile",
                        title: "Tile Calculator",
                        description: "Calculate tiles, waste and adhesive for kitchens, bathrooms and heated floors.",
                        icon: "zap",
                        accentClass: "text-sky-500",
                    },
                ],
            },
            shareTitle: "Share the calculator",
            structuredData: [
                {
                    id: "underfloor-schema-en",
                    data: {
                        "@context": "https://schema.org",
                        "@type": ["SoftwareApplication", "WebApplication"],
                        name: "Underfloor Heating Calculator",
                        alternateName: "Floor Heating Calculator",
                        operatingSystem: "All",
                        applicationCategory: ["UtilityApplication", "BusinessApplication"],
                        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
                        description:
                            "Free calculator for underfloor heating power, cable length or mat area, and estimated energy use.",
                        url: "https://renohacks.com/en/calculators/underfloor-heating",
                        image: "https://renohacks.com/images/og-default.png",
                        inLanguage: "en",
                        isAccessibleForFree: true,
                    },
                },
            ],
        },
    },
}
