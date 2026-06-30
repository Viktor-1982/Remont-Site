"use client"

import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Grid3X3, Package, Layers } from "lucide-react"
import { CalculationResultNotes } from "@/components/widgets/calculation-result-notes"
import { computeFlooring, type FlooringLayout } from "@/lib/calculations"

type CoveringType = "laminate" | "vinyl" | "engineered"

const coveringOptions: Array<{
    value: CoveringType
    ru: { label: string; hint: string }
    en: { label: string; hint: string }
}> = [
    {
        value: "laminate",
        ru: { label: "Ламинат", hint: "Классический расчёт по упаковкам и подрезке" },
        en: { label: "Laminate", hint: "Classic pack-based calculation" },
    },
    {
        value: "vinyl",
        ru: { label: "Кварцвинил", hint: "Подходит для клеевых и замковых коллекций" },
        en: { label: "Vinyl / LVT", hint: "Works for click and glue-down products" },
    },
    {
        value: "engineered",
        ru: { label: "Паркетная доска", hint: "С учётом более аккуратного запаса" },
        en: { label: "Engineered wood", hint: "Useful for engineered boards and parquet planks" },
    },
]

const layoutOptions: Array<{
    value: FlooringLayout
    ru: { label: string; hint: string }
    en: { label: string; hint: string }
}> = [
    {
        value: "straight",
        ru: { label: "Прямая укладка", hint: "Базовый запас 7%" },
        en: { label: "Straight layout", hint: "Base waste 7%" },
    },
    {
        value: "diagonal",
        ru: { label: "Диагональ", hint: "Базовый запас 12%" },
        en: { label: "Diagonal", hint: "Base waste 12%" },
    },
    {
        value: "herringbone",
        ru: { label: "Ёлка", hint: "Базовый запас 15%" },
        en: { label: "Herringbone", hint: "Base waste 15%" },
    },
]

const currencyOptions = {
    ru: [
        { code: "RUB", symbol: "₽", name: "Рубль", priceExample: "3200" },
        { code: "BYN", symbol: "Br", name: "Белорусский рубль", priceExample: "110" },
        { code: "UAH", symbol: "₴", name: "Гривна", priceExample: "1650" },
        { code: "KZT", symbol: "₸", name: "Тенге", priceExample: "19800" },
        { code: "USD", symbol: "$", name: "Доллар США", priceExample: "42" },
        { code: "EUR", symbol: "€", name: "Евро", priceExample: "39" },
        { code: "TRY", symbol: "₺", name: "Турецкая лира", priceExample: "1350" },
    ],
    en: [
        { code: "USD", symbol: "$", name: "US Dollar", priceExample: "42" },
        { code: "EUR", symbol: "€", name: "Euro", priceExample: "39" },
        { code: "GBP", symbol: "£", name: "British Pound", priceExample: "34" },
        { code: "SGD", symbol: "S$", name: "Singapore Dollar", priceExample: "55" },
    ],
} as const

export function FlooringCalculator() {
    const pathname = usePathname()
    const isEnglish = !pathname.startsWith("/ru")
    const locale = isEnglish ? "en" : "ru"
    const localeTag = isEnglish ? "en-US" : "ru-RU"

    const [covering, setCovering] = useState<CoveringType>("laminate")
    const [layout, setLayout] = useState<FlooringLayout>("straight")
    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [exclusionArea, setExclusionArea] = useState("0")
    const [plankLength, setPlankLength] = useState("138")
    const [plankWidth, setPlankWidth] = useState("19.3")
    const [packArea, setPackArea] = useState("2.22")
    const [additionalWaste, setAdditionalWaste] = useState("0")
    const [underlayReserve, setUnderlayReserve] = useState("3")
    const [pricePerPack, setPricePerPack] = useState("")
    const [currency, setCurrency] = useState(isEnglish ? "USD" : "RUB")
    const [result, setResult] = useState<ReturnType<typeof computeFlooring> | null>(null)

    const availableCurrencies = currencyOptions[locale]
    const selectedCurrency =
        availableCurrencies.find((item) => item.code === currency) ?? availableCurrencies[0]

    const formatter = useMemo(
        () =>
            new Intl.NumberFormat(localeTag, {
                style: "currency",
                currency: selectedCurrency.code,
                maximumFractionDigits: 2,
            }),
        [localeTag, selectedCurrency.code],
    )

    const parseNumber = (value: string) =>
        parseFloat(value.replace(",", ".").replace(/[^0-9.-]/g, ""))

    const calculate = () => {
        const parsedPrice = parseNumber(pricePerPack)
        const res = computeFlooring({
            length: parseNumber(length),
            width: parseNumber(width),
            exclusionArea: parseNumber(exclusionArea) || 0,
            plankLengthCm: parseNumber(plankLength),
            plankWidthCm: parseNumber(plankWidth),
            packAreaM2: parseNumber(packArea),
            layout,
            additionalWastePercent: parseNumber(additionalWaste) || 0,
            underlayReservePercent: parseNumber(underlayReserve) || 0,
            pricePerPack: Number.isFinite(parsedPrice) ? parsedPrice : undefined,
        })

        if (!res) return
        setResult(res)
    }

    const c = coveringOptions.find((item) => item.value === covering) ?? coveringOptions[0]
    const activeLayout = layoutOptions.find((item) => item.value === layout) ?? layoutOptions[0]
    const resultNotes =
        result !== null
            ? isEnglish
                ? {
                      title: "How to read this result",
                      intro: `The result already includes ${result.wastePercent}% total waste for the selected layout and gives you packs, planks and underlay separately.`,
                      sections: [
                          {
                              title: "Already included",
                              items: [
                                  `Net floor area after exclusions: ${result.netArea.toFixed(2)} m².`,
                                  `Layout reserve: ${activeLayout.en.hint}, plus your extra waste if added.`,
                                  "Pack count, plank count and underlay quantity.",
                                  pricePerPack ? "Estimated cost by pack price." : "Cost is optional until you enter a pack price.",
                              ],
                          },
                          {
                              title: "Not included automatically",
                              items: [
                                  "Transitions, trims, leveling compounds and floor prep.",
                                  "Batch matching issues if you need material from more than one lot.",
                                  "Complex cuts around curved walls, columns or irregular niches beyond the reserve you set.",
                              ],
                          },
                          {
                              title: "Reserve in the number",
                              items: [
                                  `The material result already contains ${result.wastePercent}% waste.`,
                                  `Underlay is calculated with a separate ${underlayReserve || "0"}% reserve.`,
                                  "If the room has difficult cuts, increase the extra waste instead of subtracting more floor area.",
                              ],
                          },
                          {
                              title: "Where people miscalculate",
                              items: [
                                  "They subtract movable furniture or beds instead of only fixed built-ins.",
                                  "They confuse pack coverage with plank size and underbuy.",
                                  "They buy the exact pack count without checking whether the layout is straight, diagonal or herringbone.",
                              ],
                          },
                      ],
                  }
                : {
                      title: "Как читать этот результат",
                      intro: `В результате уже заложен суммарный запас ${result.wastePercent}% под выбранную схему укладки. Калькулятор отдельно показывает упаковки, планки и подложку.`,
                      sections: [
                          {
                              title: "Что уже учтено",
                              items: [
                                  `Чистая площадь после вычета стационарных зон: ${result.netArea.toFixed(2)} м².`,
                                  `Запас под схему укладки: ${activeLayout.ru.hint.toLowerCase()}.`,
                                  "Количество упаковок, планок и площадь подложки.",
                                  pricePerPack ? "Примерная стоимость по цене упаковки." : "Стоимость появится, если указать цену упаковки.",
                              ],
                          },
                          {
                              title: "Что не учтено автоматически",
                              items: [
                                  "Порожки, доборные планки, выравнивание основания и подрезка нестандартных зон сверх заложенного запаса.",
                                  "Разбивка по партиям и возможная докупка точно в тот же декор.",
                                  "Потери на сложных нишах, радиусах и кривых стенах, если вы их не добавили в запас.",
                              ],
                          },
                          {
                              title: "Какой запас уже заложен",
                              items: [
                                  `В материал уже включен запас ${result.wastePercent}%`,
                                  `Подложка считается отдельно с резервом ${underlayReserve || "0"}%.`,
                                  "Если комната сложная, лучше добавить доп. запас, а не вычитать лишние зоны.",
                              ],
                          },
                          {
                              title: "Где чаще ошибаются",
                              items: [
                                  "Вычитают диваны, кровати и другую подвижную мебель вместо только стационарных встроенных зон.",
                                  "Путают площадь упаковки с размером одной планки и недокупают материал.",
                                  "Берут упаковки впритык и забывают, что диагональ и елка требуют большего резерва.",
                              ],
                          },
                      ],
                  }
            : null

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary/15 via-transparent to-accent/20 blur-3xl opacity-60" />
            <div className="relative space-y-6 rounded-[32px] border border-primary/10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_45%),_var(--background)] p-6 md:p-8 shadow-[0_25px_80px_-35px_rgba(79,70,229,0.8)] transition">
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Calculator className="h-3.5 w-3.5" /> Renohacks Pro Tool
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {isEnglish
                            ? "Flooring Calculator"
                            : "Калькулятор ламината, кварцвинила и паркетной доски"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish
                            ? "Estimate packs, planks, underlay and waste for laminate, vinyl or engineered wood flooring."
                            : "Рассчитайте упаковки, планки, подложку и запас для ламината, кварцвинила или паркетной доски."}
                    </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                    <label className="text-xs font-medium text-muted-foreground block">
                        {isEnglish ? "Flooring type" : "Тип покрытия"}
                    </label>
                    <div className="grid gap-2 md:grid-cols-3">
                        {coveringOptions.map((option) => {
                            const active = covering === option.value
                            const text = isEnglish ? option.en : option.ru
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setCovering(option.value)}
                                    className={`rounded-xl border-2 p-3 text-left transition-all ${
                                        active
                                            ? "border-primary/50 bg-primary/10 shadow-sm"
                                            : "border-border/40 bg-card/50 hover:border-primary/30"
                                    }`}
                                >
                                    <div className={`text-xs font-medium ${active ? "text-primary" : "text-foreground"}`}>
                                        {text.label}
                                    </div>
                                    <div className="mt-1 text-[11px] text-muted-foreground">{text.hint}</div>
                                </button>
                            )
                        })}
                    </div>
                    <p className="text-xs text-muted-foreground/80">{isEnglish ? c.en.hint : c.ru.hint}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Room length (m)" : "Длина комнаты (м)"}</label>
                        <Input value={length} onChange={(e) => setLength(e.target.value)} placeholder="5.2" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Room width (m)" : "Ширина комнаты (м)"}</label>
                        <Input value={width} onChange={(e) => setWidth(e.target.value)} placeholder="3.8" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Excluded area (m²)" : "Вычитаемая площадь (м²)"}</label>
                        <Input value={exclusionArea} onChange={(e) => setExclusionArea(e.target.value)} placeholder="0.8" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Plank length (cm)" : "Длина планки (см)"}</label>
                        <Input value={plankLength} onChange={(e) => setPlankLength(e.target.value)} placeholder="138" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Plank width (cm)" : "Ширина планки (см)"}</label>
                        <Input value={plankWidth} onChange={(e) => setPlankWidth(e.target.value)} placeholder="19.3" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Pack coverage (m²)" : "Площадь упаковки (м²)"}</label>
                        <Input value={packArea} onChange={(e) => setPackArea(e.target.value)} placeholder="2.22" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                    <label className="text-xs font-medium text-muted-foreground block">{isEnglish ? "Layout" : "Схема укладки"}</label>
                    <div className="grid gap-2 md:grid-cols-3">
                        {layoutOptions.map((option) => {
                            const active = layout === option.value
                            const text = isEnglish ? option.en : option.ru
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setLayout(option.value)}
                                    className={`rounded-xl border-2 p-3 text-left transition-all ${
                                        active
                                            ? "border-primary/50 bg-primary/10 shadow-sm"
                                            : "border-border/40 bg-card/50 hover:border-primary/30"
                                    }`}
                                >
                                    <div className={`text-xs font-medium ${active ? "text-primary" : "text-foreground"}`}>{text.label}</div>
                                    <div className="mt-1 text-[11px] text-muted-foreground">{text.hint}</div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Extra waste (%)" : "Доп. запас (%)"}</label>
                        <Input value={additionalWaste} onChange={(e) => setAdditionalWaste(e.target.value)} placeholder="0" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Underlay reserve (%)" : "Запас подложки (%)"}</label>
                        <Input value={underlayReserve} onChange={(e) => setUnderlayReserve(e.target.value)} placeholder="3" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? `Price per pack (${selectedCurrency.code})` : `Цена упаковки (${selectedCurrency.code})`}</label>
                        <Input value={pricePerPack} onChange={(e) => setPricePerPack(e.target.value)} placeholder={selectedCurrency.priceExample} className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Currency" : "Валюта"}</label>
                        <select className="w-full rounded-xl border border-border/70 bg-background/70 px-4 py-2.5 text-sm font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            {availableCurrencies.map((item) => (
                                <option key={item.code} value={item.code}>
                                    {item.symbol} {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Button onClick={calculate} className="w-full rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition hover:translate-y-0 hover:brightness-110" size="lg">
                    {isEnglish ? "Calculate flooring" : "Рассчитать покрытие"}
                </Button>

                {result && (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-emerald-50/20 p-4 shadow-sm dark:to-emerald-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Grid3X3 className="h-3.5 w-3.5 text-primary" /> {isEnglish ? "Net area" : "Чистая площадь"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-foreground">{result.netArea.toFixed(2)} {isEnglish ? "m²" : "м²"}</p>
                                <p className="text-xs text-muted-foreground mt-1">{isEnglish ? `Gross: ${result.grossArea.toFixed(2)} m²` : `Общая: ${result.grossArea.toFixed(2)} м²`}</p>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-blue-50/20 p-4 shadow-sm dark:to-blue-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Package className="h-3.5 w-3.5 text-blue-500" /> {isEnglish ? "Packs" : "Упаковки"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-blue-600">{result.packsNeeded}</p>
                                <p className="text-xs text-muted-foreground mt-1">{isEnglish ? `${result.planksNeeded} planks total` : `${result.planksNeeded} планок всего`}</p>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-amber-50/20 p-4 shadow-sm dark:to-amber-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Layers className="h-3.5 w-3.5 text-amber-500" /> {isEnglish ? "Underlay" : "Подложка"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-amber-600">{result.underlayAreaM2.toFixed(2)} {isEnglish ? "m²" : "м²"}</p>
                                <p className="text-xs text-muted-foreground mt-1">{isEnglish ? `Waste included: ${result.wastePercent}%` : `Запас учтён: ${result.wastePercent}%`}</p>
                            </div>
                            <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 shadow-md">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-primary">
                                    <Calculator className="h-3.5 w-3.5" /> {isEnglish ? "Cost" : "Стоимость"}
                                </div>
                                <p className="mt-2 text-2xl font-bold text-primary">
                                    {result.estimatedCost !== undefined ? formatter.format(result.estimatedCost) : isEnglish ? "Optional" : "Опционально"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{isEnglish ? `Required material area: ${result.requiredArea.toFixed(2)} m²` : `Площадь материала: ${result.requiredArea.toFixed(2)} м²`}</p>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{isEnglish ? "Tip: subtract only fixed built-ins that will definitely not receive flooring." : "Совет: вычитайте только стационарные зоны, под которые покрытие точно не укладывается."}</p>
                        {resultNotes ? <CalculationResultNotes {...resultNotes} /> : null}
                    </>
                )}
            </div>
        </div>
    )
}
