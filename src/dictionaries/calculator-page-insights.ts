import type { CalculatorPageLocale } from "@/dictionaries/calculator-pages"

export type CalculatorPageInsightKey =
    | "paint"
    | "flooring"
    | "tile"
    | "wallpaper"
    | "baseboard"
    | "screed"

type InsightSection = {
    title: string
    items: Array<{
        strong: string
        text: string
    }>
}

type CalculatorPageInsight = {
    mistakes?: InsightSection
    purchaseChecklist?: InsightSection
}

export const calculatorPageInsights: Record<
    CalculatorPageLocale,
    Partial<Record<CalculatorPageInsightKey, CalculatorPageInsight>>
> = {
    ru: {
        paint: {
            mistakes: {
                title: "Частые ошибки в расчете",
                items: [
                    {
                        strong: "Считать только площадь пола.",
                        text: "Для краски важна именно площадь стен и потолка. Если отталкиваться от метража комнаты, материала почти всегда не хватает.",
                    },
                    {
                        strong: "Игнорировать укрывистость основания.",
                        text: "Голая шпаклевка, темная старая краска и фактурные стены расходуют заметно больше, чем гладкая загрунтованная поверхность.",
                    },
                    {
                        strong: "Не закладывать второй слой.",
                        text: "В большинстве жилых комнат один слой дает только базовое перекрытие. Для ровного цвета обычно нужен минимум второй проход.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "Что учесть перед покупкой",
                items: [
                    {
                        strong: "Сверьте расход с банкой.",
                        text: "У разных красок на одной и той же площади расход отличается. Опираться лучше на данные конкретного производителя, а не на среднюю цифру.",
                    },
                    {
                        strong: "Покупайте весь объем одной партией.",
                        text: "Даже удачный оттенок может немного отличаться между партиями. Это особенно заметно на длинных стенах и при боковом свете.",
                    },
                    {
                        strong: "Оставляйте запас на подкраску.",
                        text: "Минимальный резерв в 10–15% спасает от лишней поездки в магазин и помогает спокойно закрыть сколы, углы и будущий мелкий ремонт.",
                    },
                ],
            },
        },
        flooring: {
            mistakes: {
                title: "Частые ошибки в расчете",
                items: [
                    {
                        strong: "Брать запас как для прямой укладки.",
                        text: "Для диагонали и елочки отходов всегда больше. Если считать их по базовому сценарию, одной-двух упаковок легко не хватит.",
                    },
                    {
                        strong: "Не учитывать стационарную мебель.",
                        text: "Если покрытие точно не заводится под шкафы-купе, кухню или остров, эти зоны лучше исключить еще на этапе расчета.",
                    },
                    {
                        strong: "Считать только метры, а не упаковки.",
                        text: "Материал продается коробками. Даже точная площадь без перевода в упаковки и планки плохо помогает на закупке.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "Что учесть перед покупкой",
                items: [
                    {
                        strong: "Проверьте площадь покрытия в одной упаковке.",
                        text: "У разных коллекций она отличается, даже если формат планки похож. Ошибка в этом поле меняет весь итог по коробкам.",
                    },
                    {
                        strong: "Берите материал из одной партии.",
                        text: "По оттенку и фактуре разные партии могут слегка расходиться. Для ламината и кварцвинила это особенно заметно на больших открытых зонах.",
                    },
                    {
                        strong: "Не забудьте про подложку и порожки.",
                        text: "Часто считают только покрытие, а потом отдельно докупают подложку, переходные профили и запасные планки. Лучше учитывать их сразу.",
                    },
                ],
            },
        },
        tile: {
            mistakes: {
                title: "Частые ошибки в расчете",
                items: [
                    {
                        strong: "Недооценивать подрезку по краям.",
                        text: "На бумаге плитка часто ложится ровно, а на реальном объекте углы, коробки и сантехника съедают заметный запас.",
                    },
                    {
                        strong: "Не учитывать формат и рисунок.",
                        text: "Крупный формат, диагональ и активный рисунок повышают отходы. Для таких сценариев стандартного запаса обычно мало.",
                    },
                    {
                        strong: "Забывать про разные поверхности.",
                        text: "Пол и стена требуют разного подхода. Если считать их одной площадью, легко ошибиться с проемами, упаковками и клеем.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "Что учесть перед покупкой",
                items: [
                    {
                        strong: "Сверьте плитку по калибру и тону.",
                        text: "Даже у одной коллекции коробки могут отличаться. Перед укладкой важно убедиться, что партия и тон совпадают.",
                    },
                    {
                        strong: "Проверьте плиток в коробке и расход клея.",
                        text: "Один и тот же формат продается разными упаковками, а клей зависит не только от площади, но и от толщины слоя и гребенки.",
                    },
                    {
                        strong: "Оставьте резерв на ремонт.",
                        text: "Несколько плиток из той же партии лучше сохранить после сдачи объекта. Через год подобрать точно такой же оттенок уже сложнее.",
                    },
                ],
            },
        },
        wallpaper: {
            mistakes: {
                title: "Частые ошибки в расчете",
                items: [
                    {
                        strong: "Игнорировать раппорт рисунка.",
                        text: "Даже красивый точный метраж не спасает, если обои требуют подгонки по рисунку. На этом чаще всего теряют целый рулон.",
                    },
                    {
                        strong: "Слишком сильно вычитать окна и двери.",
                        text: "Проемы уменьшают расчет, но не так радикально, как кажется по чистой площади. Полотна все равно режутся полосами, и отходы остаются.",
                    },
                    {
                        strong: "Покупать без запаса на партию.",
                        text: "Если не взять резерв сразу, потом легко столкнуться с тем, что нужной партии уже нет, а оттенок отличается.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "Что учесть перед покупкой",
                items: [
                    {
                        strong: "Проверьте ширину и длину именно вашего рулона.",
                        text: "У разных коллекций рулоны отличаются, и это напрямую влияет на итог по количеству. Лучше вбивать данные с этикетки, а не усредненный формат.",
                    },
                    {
                        strong: "Сверьте раппорт и смещение рисунка.",
                        text: "Если у рисунка есть смещение, фактический запас нужен больше. Это особенно важно для акцентных стен и крупных орнаментов.",
                    },
                    {
                        strong: "Берите минимум один лишний рулон.",
                        text: "Запас помогает пережить ошибки поклейки, ремонт углов и будущую замену поврежденного участка без поиска новой партии.",
                    },
                ],
            },
        },
        baseboard: {
            mistakes: {
                title: "Частые ошибки в расчете",
                items: [
                    {
                        strong: "Считать периметр без вычета проемов.",
                        text: "В большинстве комнат плинтус не идет через дверной проем. Если не вычитать эти участки, закупка почти всегда получается завышенной.",
                    },
                    {
                        strong: "Не учитывать запилы и углы.",
                        text: "На коротких стенах и сложных углах потери на подрезку заметнее, чем кажется по сухому периметру комнаты.",
                    },
                    {
                        strong: "Ориентироваться только на метры.",
                        text: "В магазине вы покупаете планки фиксированной длины. Поэтому важно сразу понимать не только общий метраж, но и количество штук.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "Что учесть перед покупкой",
                items: [
                    {
                        strong: "Проверьте длину одной планки.",
                        text: "Плинтус одной серии может выпускаться в разных длинах. От этого зависит итог по количеству штук и запасу.",
                    },
                    {
                        strong: "Сразу решите вопрос с углами и соединителями.",
                        text: "Даже если используете скрытый монтаж или запил, полезно заранее понимать, понадобятся ли наружные и внутренние элементы.",
                    },
                    {
                        strong: "Смотрите на совпадение оттенка.",
                        text: "Для окрашенного и ламинированного плинтуса партии тоже имеют значение. Лучше купить весь объем сразу, особенно на открытые длинные стены.",
                    },
                ],
            },
        },
        screed: {
            mistakes: {
                title: "Частые ошибки в расчете",
                items: [
                    {
                        strong: "Брать толщину только по одной точке.",
                        text: "Если основание гуляет, расчет по минимальному или максимальному месту дает сильную ошибку. Для стяжки важна средняя рабочая толщина.",
                    },
                    {
                        strong: "Использовать чужую норму расхода.",
                        text: "Даже похожие смеси расходуются по-разному. Универсальная цифра удобна для прикидки, но для закупки лучше брать данные с конкретного мешка.",
                    },
                    {
                        strong: "Не закладывать резерв на перепады и потери.",
                        text: "На больших помещениях и сложном основании дополнительные 5–10% почти всегда оправданы.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "Что учесть перед покупкой",
                items: [
                    {
                        strong: "Проверьте расход смеси на 10 мм слоя.",
                        text: "Именно эта цифра определяет итог по мешкам. Ошибка в норме расхода быстро превращается в недостачу нескольких упаковок.",
                    },
                    {
                        strong: "Сверьте допустимую толщину слоя.",
                        text: "Не каждая смесь подходит для тонкого выравнивания и не каждая — для толстой стяжки. Это нужно проверить до оплаты.",
                    },
                    {
                        strong: "Сразу считайте доставку и подъем.",
                        text: "Для стяжки логистика часто стоит заметную сумму. Если считать только мешки, смета получается слишком оптимистичной.",
                    },
                ],
            },
        },
    },
    en: {
        paint: {
            mistakes: {
                title: "Common calculation mistakes",
                items: [
                    {
                        strong: "Using floor area instead of wall area.",
                        text: "Paint is bought for walls and ceilings, not for the room footprint. That shortcut usually leaves you short on material.",
                    },
                    {
                        strong: "Ignoring surface absorption.",
                        text: "Fresh filler, dark previous paint and textured walls all use more paint than a smooth primed surface.",
                    },
                    {
                        strong: "Planning for a single coat.",
                        text: "One coat is rarely enough for an even finish in a real room. In most cases you should budget for at least two.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "What to check before buying",
                items: [
                    {
                        strong: "Match the coverage to the actual product.",
                        text: "Different paints cover differently. The safest input is the coverage printed on the exact can you plan to buy.",
                    },
                    {
                        strong: "Buy the full amount from one batch.",
                        text: "Slight batch variation is still visible on long walls and in rooms with strong side light.",
                    },
                    {
                        strong: "Keep a touch-up reserve.",
                        text: "A 10–15% reserve is cheap insurance for corners, repairs and the small fixes that show up after move-in.",
                    },
                ],
            },
        },
        flooring: {
            mistakes: {
                title: "Common calculation mistakes",
                items: [
                    {
                        strong: "Using straight-layout waste for every pattern.",
                        text: "Diagonal and herringbone layouts generate much more offcut waste. Treating them like a basic layout is the fastest way to underorder.",
                    },
                    {
                        strong: "Forgetting fixed built-ins.",
                        text: "If flooring definitely will not go under kitchen runs or large fitted wardrobes, those zones should be removed from the estimate.",
                    },
                    {
                        strong: "Stopping at square meters.",
                        text: "Material is purchased by the box. Area alone is not enough if you want a clean purchase list.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "What to check before buying",
                items: [
                    {
                        strong: "Confirm the pack coverage.",
                        text: "Two collections with similar plank size can still cover different areas per box. That one number changes the whole purchase plan.",
                    },
                    {
                        strong: "Keep the same production batch.",
                        text: "Color and texture can shift slightly between batches, especially in large open-plan spaces.",
                    },
                    {
                        strong: "Add underlay and transitions early.",
                        text: "The flooring itself is only part of the order. Underlay, trims and spare planks are easier to budget for in the same pass.",
                    },
                ],
            },
        },
        tile: {
            mistakes: {
                title: "Common calculation mistakes",
                items: [
                    {
                        strong: "Underestimating edge cuts.",
                        text: "A neat rectangle on paper still turns into real cuts around corners, boxes, niches and plumbing on site.",
                    },
                    {
                        strong: "Ignoring tile format and pattern.",
                        text: "Large-format tile, diagonals and directional patterns all increase waste and should never be treated like a simple grid.",
                    },
                    {
                        strong: "Mixing floor and wall logic.",
                        text: "Floors and walls need different deductions and assumptions. Running them as one surface usually distorts both box count and adhesive use.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "What to check before buying",
                items: [
                    {
                        strong: "Verify caliber and shade.",
                        text: "Boxes from the same collection can still vary slightly. Matching the batch before installation saves a lot of frustration.",
                    },
                    {
                        strong: "Double-check pieces per box and adhesive rate.",
                        text: "The final order depends on the actual packaging and on how thick the adhesive bed will be on your substrate.",
                    },
                    {
                        strong: "Keep spare tiles for repairs.",
                        text: "A small reserve from the same batch is much easier to store now than to source months later.",
                    },
                ],
            },
        },
        wallpaper: {
            mistakes: {
                title: "Common calculation mistakes",
                items: [
                    {
                        strong: "Ignoring pattern repeat.",
                        text: "A neat wall area number means very little if the wallpaper needs pattern matching. That is where people most often lose a full extra roll.",
                    },
                    {
                        strong: "Subtracting openings too aggressively.",
                        text: "Windows and doors help, but they do not cancel strip-based waste. The result should go down, just not as sharply as raw area math suggests.",
                    },
                    {
                        strong: "Buying with no batch reserve.",
                        text: "If you run out later, the same design may still exist but the production batch and tone may not match what is already on the wall.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "What to check before buying",
                items: [
                    {
                        strong: "Confirm the exact roll size.",
                        text: "Collections vary in roll width and length, and that changes the final count immediately. Use the label, not a generic assumption.",
                    },
                    {
                        strong: "Check repeat and pattern offset.",
                        text: "If the pattern is offset, the effective waste is higher than for a simple straight repeat. That matters most on accent walls.",
                    },
                    {
                        strong: "Keep at least one extra roll.",
                        text: "That reserve covers installation mistakes, later repairs and the very common problem of not finding the same batch again.",
                    },
                ],
            },
        },
        baseboard: {
            mistakes: {
                title: "Common calculation mistakes",
                items: [
                    {
                        strong: "Using the full perimeter without doorway deductions.",
                        text: "In most rooms the baseboard does not pass through the doorway, so leaving those openings in the number usually overstates the order.",
                    },
                    {
                        strong: "Ignoring cuts and corners.",
                        text: "Small walls, awkward corners and outside returns create more waste than the clean perimeter figure suggests.",
                    },
                    {
                        strong: "Thinking only in linear feet.",
                        text: "You buy fixed-length pieces, not loose footage. The piece count matters just as much as the total perimeter.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "What to check before buying",
                items: [
                    {
                        strong: "Verify the length of one piece.",
                        text: "Baseboards that look similar can come in very different lengths, and that changes the final quantity right away.",
                    },
                    {
                        strong: "Decide on corners and connectors early.",
                        text: "Even if you plan to miter everything, it is worth deciding up front whether you need matching trim accessories.",
                    },
                    {
                        strong: "Watch the finish and batch.",
                        text: "Painted and laminated profiles can still vary slightly. Buying the full run in one go is safer, especially for long visible walls.",
                    },
                ],
            },
        },
        screed: {
            mistakes: {
                title: "Common calculation mistakes",
                items: [
                    {
                        strong: "Using thickness from only one point.",
                        text: "If the substrate is uneven, a single low or high spot will distort the estimate. Screed planning needs the average working thickness.",
                    },
                    {
                        strong: "Using a generic mix rate.",
                        text: "Similar products still consume differently. A handy average is fine for a first estimate, but not for the final order.",
                    },
                    {
                        strong: "Skipping a reserve for site losses.",
                        text: "On large rooms or rough substrates, an extra 5–10% is usually justified and often saves a second delivery.",
                    },
                ],
            },
            purchaseChecklist: {
                title: "What to check before buying",
                items: [
                    {
                        strong: "Confirm the product rate per 10 mm.",
                        text: "That single number drives the entire bag count. If it is wrong, the purchase list is wrong.",
                    },
                    {
                        strong: "Check the allowed layer thickness.",
                        text: "Not every compound works for a thin skim and not every mix is intended for a thick structural screed.",
                    },
                    {
                        strong: "Include delivery and handling.",
                        text: "For screed, logistics can be a real cost line. Counting only the bags often makes the budget look cleaner than it really is.",
                    },
                ],
            },
        },
    },
}
