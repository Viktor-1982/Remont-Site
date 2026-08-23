"use client"

import { useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Layers,
    Volume2,
    Copy,
    Check,
    ShieldAlert,
    SquareStack,
} from "lucide-react"
import { CalculationResultNotes } from "@/components/widgets/calculation-result-notes"
import {
    computeSoundproofing,
    type SoundproofingSurface,
    type SoundproofingSystemType,
} from "@/lib/calculations"

const currencyOptions = {
    ru: [
        { code: "RUB", symbol: "₽", name: "Рубль", priceExample: "2500" },
        { code: "KZT", symbol: "₸", name: "Тенге", priceExample: "15000" },
        { code: "BYN", symbol: "Br", name: "Белорусский рубль", priceExample: "85" },
        { code: "UAH", symbol: "₴", name: "Гривна", priceExample: "1200" },
        { code: "USD", symbol: "$", name: "Доллар США", priceExample: "30" },
        { code: "EUR", symbol: "€", name: "Евро", priceExample: "28" },
    ],
    en: [
        { code: "USD", symbol: "$", name: "US Dollar", priceExample: "30" },
        { code: "EUR", symbol: "€", name: "Euro", priceExample: "28" },
        { code: "GBP", symbol: "£", name: "British Pound", priceExample: "25" },
        { code: "SGD", symbol: "S$", name: "Singapore Dollar", priceExample: "42" },
    ],
} as const

export function SoundproofingCalculator() {
    const pathname = usePathname()
    const isEnglish = !pathname.startsWith("/ru")
    const localeTag = isEnglish ? "en-US" : "ru-RU"

    // Form State
    const [surface, setSurface] = useState<SoundproofingSurface>("wall")
    const [systemType, setSystemType] = useState<SoundproofingSystemType>("independent")
    const [length, setLength] = useState("5.0")
    const [widthOrHeight, setWidthOrHeight] = useState("2.7")
    const [doors, setDoors] = useState("0")
    const [windows, setWindows] = useState("0")
    const [layers, setLayers] = useState("2")
    const [studSpacingMm, setStudSpacingMm] = useState<600 | 400>(600)
    const [screedThicknessMm, setScreedThicknessMm] = useState("50")
    const [reserve, setReserve] = useState("7")
    const [pricePerM2, setPricePerM2] = useState("")
    const [currency, setCurrency] = useState(isEnglish ? "USD" : "RUB")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [copied, setCopied] = useState(false)

    // Handlers
    const handleSurfaceChange = (newSurface: SoundproofingSurface) => {
        setSurface(newSurface)
        if (newSurface === "wall") {
            setSystemType("independent")
            setWidthOrHeight("2.7")
        } else if (newSurface === "ceiling") {
            setSystemType("two-level")
            setWidthOrHeight("4.0")
        } else {
            setSystemType("floating-screed")
            setWidthOrHeight("4.0")
        }
    }

    const currentCurrency = useMemo(() => {
        const list = isEnglish ? currencyOptions.en : currencyOptions.ru
        return list.find((c) => c.code === currency) || list[0]
    }, [currency, isEnglish])

    const calculationResult = useMemo(() => {
        const numL = parseFloat(length)
        const numWH = parseFloat(widthOrHeight)
        const numDoors = parseInt(doors, 10) || 0
        const numWindows = parseInt(windows, 10) || 0
        const numLayers = parseInt(layers, 10) || 2
        const numScreed = parseInt(screedThicknessMm, 10) || 50
        const numReserve = parseFloat(reserve) || 0
        const numPrice = parseFloat(pricePerM2) || undefined

        if (isNaN(numL) || isNaN(numWH) || numL <= 0 || numWH <= 0) return null

        return computeSoundproofing({
            surface,
            systemType,
            length: numL,
            widthOrHeight: numWH,
            doors: numDoors,
            windows: numWindows,
            layers: numLayers,
            studSpacingMm,
            screedThicknessMm: numScreed,
            reservePercent: numReserve,
            pricePerM2: numPrice,
        })
    }, [
        surface,
        systemType,
        length,
        widthOrHeight,
        doors,
        windows,
        layers,
        studSpacingMm,
        screedThicknessMm,
        reserve,
        pricePerM2,
    ])

    const filteredItems = useMemo(() => {
        if (!calculationResult) return []
        if (categoryFilter === "all") return calculationResult.items
        return calculationResult.items.filter((item) => item.category === categoryFilter)
    }, [calculationResult, categoryFilter])

    const handleCopyBOM = () => {
        if (!calculationResult) return
        const header = isEnglish
            ? `Soundproofing BOM (${calculationResult.surface.toUpperCase()} - ${calculationResult.netAreaM2} sq m / ${(calculationResult.netAreaM2 * 10.764).toFixed(1)} sq ft):\n`
            : `Спецификация звукоизоляции (${calculationResult.surface.toUpperCase()} - ${calculationResult.netAreaM2} м²):\n`

        const body = calculationResult.items
            .map(
                (item, idx) =>
                    `${idx + 1}. ${isEnglish ? item.nameEn : item.nameRu} — ${item.quantity} ${isEnglish ? item.unitEn : item.unitRu}`
            )
            .join("\n")

        navigator.clipboard.writeText(header + body)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="space-y-8">
            {/* Header & Surface Switcher */}
            <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm backdrop-blur-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                            {isEnglish ? "Acoustic System Configurator" : "Конфигуратор звукоизоляции"}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {isEnglish
                                ? "Select partition type and enter dimensions for a complete material specification"
                                : "Выберите тип конструкции и укажите размеры для расчёта полной ведомости материалов"}
                        </p>
                    </div>
                </div>

                {/* Surface Type Toggle */}
                <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-muted/60 p-1.5 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => handleSurfaceChange("wall")}
                        className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all ${
                            surface === "wall"
                                ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Layers className="h-4 w-4 shrink-0 text-blue-500" />
                        <span>{isEnglish ? "Walls" : "Стены"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSurfaceChange("ceiling")}
                        className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all ${
                            surface === "ceiling"
                                ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <SquareStack className="h-4 w-4 shrink-0 text-indigo-500" />
                        <span>{isEnglish ? "Ceiling" : "Потолок"}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSurfaceChange("floor")}
                        className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all ${
                            surface === "floor"
                                ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Volume2 className="h-4 w-4 shrink-0 text-amber-500" />
                        <span>{isEnglish ? "Floor" : "Пол"}</span>
                    </button>
                </div>
            </div>

            {/* Inputs & Presets Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
                {/* Left Column: Configuration Controls */}
                <div className="space-y-6 lg:col-span-6">
                    <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm">
                        <h3 className="text-base font-semibold text-foreground">
                            {isEnglish ? "1. Assembly Preset" : "1. Тип звукоизоляционной системы"}
                        </h3>

                        {surface === "wall" && (
                            <div className="mt-4 space-y-2.5">
                                <label
                                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                                        systemType === "independent"
                                            ? "border-blue-500/60 bg-blue-500/5 ring-1 ring-blue-500/30"
                                            : "border-border/60 hover:bg-muted/40"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="systemType"
                                        checked={systemType === "independent"}
                                        onChange={() => setSystemType("independent")}
                                        className="mt-1 text-blue-600"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {isEnglish
                                                ? "Independent Decoupled Frame 2\" (50 mm)"
                                                : "Независимый каркас 50 мм (без виброподвесов)"}
                                            <span className="ml-2 inline-flex rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600">
                                                {isEnglish ? "Recommended" : "Рекомендуем"}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {isEnglish
                                                ? "True air gap with zero mechanical ties to existing wall. Best for party walls (~STC 53–56)."
                                                : "Полный относ от стены, нулевая передача вибрации. Идеально для межквартирных стен (Rw ~53–56 дБ)."}
                                        </p>
                                    </div>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                                        systemType === "vibro-mount"
                                            ? "border-blue-500/60 bg-blue-500/5 ring-1 ring-blue-500/30"
                                            : "border-border/60 hover:bg-muted/40"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="systemType"
                                        checked={systemType === "vibro-mount"}
                                        onChange={() => setSystemType("vibro-mount")}
                                        className="mt-1 text-blue-600"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {isEnglish
                                                ? "Frame on Resilient Isolation Clips (RSIC / Sylomer)"
                                                : "Каркас на виброподвесах с эластомером"}
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {isEnglish
                                                ? "Mechanical decoupling for high walls (>3m / 10ft) or heavy multi-layer sheathing."
                                                : "Виброразвязанные точки крепления к стене. Для высоких стен (>3 м) и студийных перегородок."}
                                        </p>
                                    </div>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                                        systemType === "slim-panel"
                                            ? "border-blue-500/60 bg-blue-500/5 ring-1 ring-blue-500/30"
                                            : "border-border/60 hover:bg-muted/40"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="systemType"
                                        checked={systemType === "slim-panel"}
                                        onChange={() => setSystemType("slim-panel")}
                                        className="mt-1 text-blue-600"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {isEnglish
                                                ? "Slim Sandwich Panels (ZIPS Direct Resilient)"
                                                : "Бескаркасная сэндвич-система (ЗИПС)"}
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {isEnglish
                                                ? "Compact 1.5\"–2\" (40–55 mm) thickness. Mounts directly to flat, plastered masonry."
                                                : "Минимальная потеря площади (40–55 мм). Монтаж напрямую на оштукатуренную стену."}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        )}

                        {surface === "ceiling" && (
                            <div className="mt-4 space-y-2.5">
                                <label
                                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                                        systemType === "two-level"
                                            ? "border-indigo-500/60 bg-indigo-500/5 ring-1 ring-indigo-500/30"
                                            : "border-border/60 hover:bg-muted/40"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="systemType"
                                        checked={systemType === "two-level"}
                                        onChange={() => setSystemType("two-level")}
                                        className="mt-1 text-indigo-600"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {isEnglish
                                                ? "Two-Level Acoustic Ceiling on Vibro-Hangers (Knauf D112)"
                                                : "Двухуровневый потолок на виброподвесах (Knauf D112)"}
                                            <span className="ml-2 inline-flex rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-600">
                                                {isEnglish ? "Maximum Isolation" : "Максимум защиты"}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {isEnglish
                                                ? "Dual grid framework on Sylomer hangers with cavity batts and dual gypsum sheathing."
                                                : "Двойная сетка профилей ПП 60/27, виброподвесы Sylomer, 50 мм минваты и 2 слоя ГВЛ+ГКЛ."}
                                        </p>
                                    </div>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                                        systemType === "one-level"
                                            ? "border-indigo-500/60 bg-indigo-500/5 ring-1 ring-indigo-500/30"
                                            : "border-border/60 hover:bg-muted/40"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="systemType"
                                        checked={systemType === "one-level"}
                                        onChange={() => setSystemType("one-level")}
                                        className="mt-1 text-indigo-600"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {isEnglish
                                                ? "One-Level Ceiling with Crab Connectors (Knauf D113)"
                                                : "Одноуровневый потолок с соединителями-крабами (Knauf D113)"}
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {isEnglish
                                                ? "Slim profile for low ceilings. Single-tier grid on resilient isolation clips."
                                                : "Экономия высоты помещения. Профили в одном уровне на крабах и виброподвесах."}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        )}

                        {surface === "floor" && (
                            <div className="mt-4 space-y-2.5">
                                <label
                                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                                        systemType === "floating-screed"
                                            ? "border-amber-500/60 bg-amber-500/5 ring-1 ring-amber-500/30"
                                            : "border-border/60 hover:bg-muted/40"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="systemType"
                                        checked={systemType === "floating-screed"}
                                        onChange={() => setSystemType("floating-screed")}
                                        className="mt-1 text-amber-600"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {isEnglish
                                                ? "Reinforced Wet Screed over Acoustic Boards (50–60 mm)"
                                                : "Мокрая армированная стяжка по акустическим плитам (50–60 мм)"}
                                            <span className="ml-2 inline-flex rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600">
                                                {isEnglish ? "Best for Impact Noise" : "Лучшая защита от шагов"}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {isEnglish
                                                ? "Heavy cementitious slab over high-density mineral wool (100–140 kg/m³) with perimeter isolation tape."
                                                : "ЦПС М300 с сеткой по плитам плотностью 100–140 кг/м³ и кромочной демпферной лентой."}
                                        </p>
                                    </div>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${
                                        systemType === "dry-floor"
                                            ? "border-amber-500/60 bg-amber-500/5 ring-1 ring-amber-500/30"
                                            : "border-border/60 hover:bg-muted/40"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="systemType"
                                        checked={systemType === "dry-floor"}
                                        onChange={() => setSystemType("dry-floor")}
                                        className="mt-1 text-amber-600"
                                    />
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {isEnglish
                                                ? "Dry Floating Floor (Knauf Superfloor / GVL Elements)"
                                                : "Сухой сборный пол (Кнауф-Суперпол / элементы ГВЛВ)"}
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {isEnglish
                                                ? "Fast clean installation without wet processes over acoustic underlayment mat."
                                                : "Быстрый монтаж без мокрых процессов по звукоизоляционному холсту."}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Dimensions Form */}
                    <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm">
                        <h3 className="text-base font-semibold text-foreground">
                            {isEnglish ? "2. Dimensions & Openings" : "2. Размеры и проёмы"}
                        </h3>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">
                                    {isEnglish ? "Length (m)" : "Длина (м)"}
                                </label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    min="0.5"
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                    className="mt-1.5 rounded-xl"
                                    placeholder="5.0"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">
                                    {surface === "wall"
                                        ? isEnglish
                                            ? "Height (m)"
                                            : "Высота (м)"
                                        : isEnglish
                                          ? "Width (m)"
                                          : "Ширина (м)"}
                                </label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    min="0.5"
                                    value={widthOrHeight}
                                    onChange={(e) => setWidthOrHeight(e.target.value)}
                                    className="mt-1.5 rounded-xl"
                                    placeholder={surface === "wall" ? "2.7" : "4.0"}
                                />
                            </div>
                        </div>

                        {surface === "wall" && (
                            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {isEnglish ? "Doors count" : "Дверей (шт)"}
                                    </label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={doors}
                                        onChange={(e) => setDoors(e.target.value)}
                                        className="mt-1.5 rounded-xl"
                                        placeholder="0"
                                    />
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {isEnglish ? "~1.9 m² / door deducted" : "Вычет ~1.9 м² на дверь"}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {isEnglish ? "Windows count" : "Окон (шт)"}
                                    </label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={windows}
                                        onChange={(e) => setWindows(e.target.value)}
                                        className="mt-1.5 rounded-xl"
                                        placeholder="0"
                                    />
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {isEnglish ? "~1.8 m² / window deducted" : "Вычет ~1.8 м² на окно"}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Sheathing Layers / Stud spacing */}
                        {surface !== "floor" && systemType !== "slim-panel" && (
                            <div className="mt-4 border-t border-border/50 pt-4">
                                <label className="text-xs font-medium text-muted-foreground">
                                    {isEnglish ? "Sheathing Layers" : "Количество слоёв обшивки"}
                                </label>
                                <div className="mt-2 grid grid-cols-3 gap-1.5 sm:gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setLayers("1")}
                                        className={`rounded-xl px-1.5 py-2 text-[11px] sm:text-xs font-semibold text-center transition-all ${
                                            layers === "1"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {isEnglish ? "1 Layer (Economy)" : "1 Слой (Эконом)"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setLayers("2")}
                                        className={`rounded-xl px-1.5 py-2 text-[11px] sm:text-xs font-semibold text-center transition-all ${
                                            layers === "2"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {isEnglish ? "2 Layers (GVL+GKL)" : "2 Слоя (ГВЛ+ГКЛ)"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setLayers("3")}
                                        className={`rounded-xl px-1.5 py-2 text-[11px] sm:text-xs font-semibold text-center transition-all ${
                                            layers === "3"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {isEnglish ? "3 Layers + MLV" : "3 Слоя + Мембрана"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {surface === "wall" && systemType !== "slim-panel" && (
                            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {isEnglish ? "Stud Spacing" : "Шаг стоек профиля"}
                                    </label>
                                    <select
                                        value={studSpacingMm}
                                        onChange={(e) => setStudSpacingMm(Number(e.target.value) as 600 | 400)}
                                        className="mt-1.5 flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    >
                                        <option value={600}>{isEnglish ? "600 mm (24\" Standard)" : "600 мм (Стандарт)"}</option>
                                        <option value={400}>{isEnglish ? "400 mm (16\" Reinforced)" : "400 мм (Усиленный)"}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {isEnglish ? "Waste reserve (%)" : "Запас на подрезку (%)"}
                                    </label>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="30"
                                        value={reserve}
                                        onChange={(e) => setReserve(e.target.value)}
                                        className="mt-1.5 rounded-xl"
                                        placeholder="7"
                                    />
                                </div>
                            </div>
                        )}

                        {surface === "floor" && systemType === "floating-screed" && (
                            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {isEnglish ? "Screed Thickness (mm)" : "Толщина стяжки (мм)"}
                                    </label>
                                    <Input
                                        type="number"
                                        min="40"
                                        max="100"
                                        value={screedThicknessMm}
                                        onChange={(e) => setScreedThicknessMm(e.target.value)}
                                        className="mt-1.5 rounded-xl"
                                        placeholder="50"
                                    />
                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                        {isEnglish ? "Min 50 mm recommended" : "Мин. 50–60 мм над ватой"}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground">
                                        {isEnglish ? "Waste reserve (%)" : "Запас на подрезку (%)"}
                                    </label>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="30"
                                        value={reserve}
                                        onChange={(e) => setReserve(e.target.value)}
                                        className="mt-1.5 rounded-xl"
                                        placeholder="7"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Optional Cost Estimation */}
                    <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm">
                        <h3 className="text-base font-semibold text-foreground">
                            {isEnglish ? "3. Cost Estimation (Optional)" : "3. Расчёт ориентировочной стоимости"}
                        </h3>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">
                                    {isEnglish ? "Cost per sq m" : "Стоимость за 1 м²"}
                                </label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={pricePerM2}
                                    onChange={(e) => setPricePerM2(e.target.value)}
                                    className="mt-1.5 rounded-xl"
                                    placeholder={currentCurrency.priceExample}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground">
                                    {isEnglish ? "Currency" : "Валюта"}
                                </label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="mt-1.5 flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                >
                                    {(isEnglish ? currencyOptions.en : currencyOptions.ru).map((c) => (
                                        <option key={c.code} value={c.code}>
                                            {c.symbol} ({c.name})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Calculated Specification & BOM */}
                <div className="space-y-6 lg:col-span-6">
                    {/* Summary Metrics Cards */}
                    {calculationResult && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                                <div className="text-xs font-medium text-muted-foreground">
                                    {isEnglish ? "Net Area" : "Чистая площадь"}
                                </div>
                                <div className="mt-1 text-2xl font-bold text-foreground">
                                    {calculationResult.netAreaM2}{" "}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        {isEnglish ? "sq m" : "м²"}
                                    </span>
                                </div>
                                <div className="text-[11px] text-muted-foreground">
                                    {(calculationResult.netAreaM2 * 10.764).toFixed(1)} sq ft
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border/70 bg-card/60 p-4">
                                <div className="text-xs font-medium text-muted-foreground">
                                    {isEnglish ? "Perimeter" : "Периметр"}
                                </div>
                                <div className="mt-1 text-2xl font-bold text-foreground">
                                    {calculationResult.perimeterM}{" "}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        {isEnglish ? "m" : "м"}
                                    </span>
                                </div>
                                <div className="text-[11px] text-muted-foreground">
                                    {(calculationResult.perimeterM * 3.281).toFixed(1)} ft
                                </div>
                            </div>

                            <div className="col-span-2 rounded-2xl border border-border/70 bg-primary/5 p-4 sm:col-span-1">
                                <div className="text-xs font-medium text-primary">
                                    {isEnglish ? "Estimated Budget" : "Оценка сметы"}
                                </div>
                                <div className="mt-1 text-2xl font-bold text-foreground">
                                    {calculationResult.estimatedCost
                                        ? `${calculationResult.estimatedCost.toLocaleString(localeTag)} ${currentCurrency.symbol}`
                                        : "—"}
                                </div>
                                <div className="text-[11px] text-muted-foreground">
                                    {isEnglish ? `Reserve +${reserve}% included` : `Запас +${reserve}% включён`}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BOM Table */}
                    <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-sm">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">
                                    {isEnglish ? "Bill of Materials (BOM)" : "Спецификация материалов"}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {isEnglish
                                        ? "Detailed purchasing list based on tested acoustic assemblies"
                                        : "Готовый список покупок по нормам звукоизоляции"}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleCopyBOM}
                                className="flex items-center gap-1.5 rounded-xl text-xs"
                            >
                                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                                <span>{copied ? (isEnglish ? "Copied!" : "Скопировано!") : isEnglish ? "Copy List" : "Копировать"}</span>
                            </Button>
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="mt-4 flex flex-wrap gap-1.5 border-b border-border/50 pb-3">
                            {[
                                { id: "all", labelRu: "Все позиции", labelEn: "All Items" },
                                { id: "boards", labelRu: "Плиты и листы", labelEn: "Boards & Drywall" },
                                { id: "insulation", labelRu: "Изоляция", labelEn: "Insulation" },
                                { id: "framing", labelRu: "Каркас", labelEn: "Framing" },
                                { id: "damping", labelRu: "Виброразвязка", labelEn: "Damping & Tape" },
                                { id: "fasteners", labelRu: "Крепёж", labelEn: "Fasteners" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setCategoryFilter(tab.id)}
                                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                                        categoryFilter === tab.id
                                            ? "bg-foreground text-background"
                                            : "bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {isEnglish ? tab.labelEn : tab.labelRu}
                                </button>
                            ))}
                        </div>

                        {/* Items List */}
                        <div className="mt-4 space-y-2.5">
                            {filteredItems.map((item, idx) => (
                                <div
                                    key={item.id + idx}
                                    className="flex items-start justify-between gap-3 rounded-2xl border border-border/50 bg-background/60 p-3.5 transition-all hover:bg-background"
                                >
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-semibold text-foreground">
                                            {isEnglish ? item.nameEn : item.nameRu}
                                        </div>
                                        {(item.descriptionRu || item.descriptionEn) && (
                                            <div className="text-xs text-muted-foreground">
                                                {isEnglish ? item.descriptionEn : item.descriptionRu}
                                            </div>
                                        )}
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <span className="text-base font-bold text-foreground">
                                            {item.quantity}
                                        </span>{" "}
                                        <span className="text-xs text-muted-foreground">
                                            {isEnglish ? item.unitEn : item.unitRu}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Critical Acoustic Jobsite Warnings */}
                        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                                <ShieldAlert className="h-4 w-4 shrink-0" />
                                <span>{isEnglish ? "Critical Jobsite Rules:" : "Критические правила монтажа:"}</span>
                            </div>
                            <ul className="mt-2 list-disc space-y-1 pl-4">
                                <li>
                                    {isEnglish
                                        ? "Never allow drywall or screed to directly touch perimeter walls without isolation tape."
                                        : "Ни в коем случае не допускайте жесткого касания ГКЛ или стяжки к стенам — только через демпферную ленту."}
                                </li>
                                <li>
                                    {isEnglish
                                        ? "Seal all perimeter joints with non-hardening acoustical caulk (never standard silicone or foam)."
                                        : "Герметизируйте все стыки по периметру виброакустическим герметиком (монтажная пена — звуковой мостик)."}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Insight Notes */}
            <CalculationResultNotes
                title={isEnglish ? "Engineering Acoustics Rules" : "Инженерные правила звукоизоляции"}
                intro={
                    isEnglish
                        ? "Soundproofing efficiency is governed by the mass-air-mass principle and strict airtightness. Superficial treatments do not alter transmission loss."
                        : "Эффективность звукоизоляции подчиняется закону массы и принципу «масса–упругость–масса». Тонкие материалы без относа и массы не блокируют шум."
                }
                sections={[
                    {
                        title: isEnglish ? "Key Soundproofing Principles" : "Главные принципы звукоизоляции",
                        items: [
                            isEnglish
                                ? "Mechanical Decoupling: Breaking structural contact prevents vibration transfer."
                                : "Виброразвязка: Разрыв механической связи исключает передачу структурного шума.",
                            isEnglish
                                ? "Mass + Cavity: Heavier outer sheets and deeper insulation damp low-frequency bass."
                                : "Масса и глубина: Чем тяжелее обшивка и глубже относ, тем ниже частота резонанса f₀.",
                            isEnglish
                                ? "Airtight Sealing: Sound travels wherever air can leak. Seal every joint with acoustic caulk."
                                : "Герметичность: Звук проникает везде, где есть воздух. Герметик по периметру обязателен.",
                        ],
                    },
                    {
                        title: isEnglish ? "Tested Standards Reference" : "Соответствие стандартам",
                        items: [
                            isEnglish
                                ? "North America: ASTM E90 (STC airborne) & ASTM E492 (IIC impact)."
                                : "СНГ: СП РК 2.04-03-2020 (Казахстан), СП 51.13330 (РФ) — Rw ≥ 50–54 дБ, Lnw ≤ 55–60 дБ.",
                            isEnglish
                                ? "International: ISO 717-1 (Rw) & ISO 717-2 (Lnw normalized impact)."
                                : "Международные: ISO 717-1/2, DIN 4109 и американские нормы ASTM / IBC 1206.",
                        ],
                    },
                ]}
            />
        </div>
    )
}
