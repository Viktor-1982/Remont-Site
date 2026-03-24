import type { CalculatorPageLocale } from "@/dictionaries/calculator-pages"

export type CalculatorPageInsightKey = "paint" | "flooring" | "tile"

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
    },
}
