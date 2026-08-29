"use client"

import { useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Layers,
    Copy,
    Check,
    SquareStack,
    Hammer,
    Shield,
    Volume2,
    DollarSign,
    Flame,
    FileSpreadsheet,
} from "lucide-react"
import { CalculationResultNotes } from "@/components/widgets/calculation-result-notes"
import {
    computeDrywall,
    type DrywallConstructionType,
    type DrywallSheetType,
    type StudSpacing,
} from "@/lib/calculations"

const currencyOptions = {
    ru: [
        { code: "RUB", symbol: "₽", name: "Рубль", sheetExample: "550", profileExample: "380" },
        { code: "KZT", symbol: "₸", name: "Тенге", sheetExample: "3200", profileExample: "2100" },
        { code: "BYN", symbol: "Br", name: "Белорусский рубль", sheetExample: "18", profileExample: "12" },
        { code: "UAH", symbol: "₴", name: "Гривна", sheetExample: "260", profileExample: "180" },
        { code: "USD", symbol: "$", name: "Доллар США", sheetExample: "14", profileExample: "8" },
        { code: "EUR", symbol: "€", name: "Евро", sheetExample: "12", profileExample: "7" },
    ],
    en: [
        { code: "USD", symbol: "$", name: "US Dollar", sheetExample: "15", profileExample: "9" },
        { code: "EUR", symbol: "€", name: "Euro", sheetExample: "13", profileExample: "8" },
        { code: "GBP", symbol: "£", name: "British Pound", sheetExample: "11", profileExample: "7" },
        { code: "SGD", symbol: "S$", name: "Singapore Dollar", sheetExample: "20", profileExample: "12" },
    ],
} as const

export function DrywallCalculator() {
    const pathname = usePathname()
    const isEnglish = !pathname.startsWith("/ru")
    const localeTag = isEnglish ? "en-US" : "ru-RU"

    // Form State
    const [constructionType, setConstructionType] = useState<DrywallConstructionType>("partition-single")
    const [length, setLength] = useState("5.0")
    const [height, setHeight] = useState("2.7")
    const [studSpacing, setStudSpacing] = useState<StudSpacing>(600)
    const [profileWidth, setProfileWidth] = useState<50 | 75 | 100>(50)
    const [sheetLength, setSheetLength] = useState<2.5 | 3.0>(2.5)
    const [sheetType, setSheetType] = useState<DrywallSheetType>("standard")
    const [wallLiningLayers, setWallLiningLayers] = useState<1 | 2>(1)
    const [doorsCount, setDoorsCount] = useState("1")
    const [doorWidth, setDoorWidth] = useState("0.9")
    const [doorHeight, setDoorHeight] = useState("2.1")
    const [wastePercent, setWastePercent] = useState("8")
    const [includeInsulation, setIncludeInsulation] = useState(true)
    const [pricePerSheet, setPricePerSheet] = useState("")
    const [pricePerProfile, setPricePerProfile] = useState("")
    const [currency, setCurrency] = useState(isEnglish ? "USD" : "RUB")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [copied, setCopied] = useState(false)

    const currentCurrency = useMemo(() => {
        const list = isEnglish ? currencyOptions.en : currencyOptions.ru
        return list.find((c) => c.code === currency) || list[0]
    }, [currency, isEnglish])

    const calculationResult = useMemo(() => {
        const numL = Math.min(10000, Math.max(0.1, parseFloat(length.replace(",", ".")) || 0))
        const numH = Math.min(100, Math.max(0.1, parseFloat(height.replace(",", ".")) || 0))
        const numDoors = Math.min(100, Math.max(0, parseInt(doorsCount, 10) || 0))
        const numDoorW = Math.min(10, Math.max(0.3, parseFloat(doorWidth.replace(",", ".")) || 0.9))
        const numDoorH = Math.min(10, Math.max(0.5, parseFloat(doorHeight.replace(",", ".")) || 2.1))
        const numWaste = Math.min(50, Math.max(0, parseFloat(wastePercent.replace(",", ".")) || 8))
        const numPriceSheet = parseFloat(pricePerSheet.replace(",", ".")) || undefined
        const numPriceProfile = parseFloat(pricePerProfile.replace(",", ".")) || undefined

        if (isNaN(numL) || isNaN(numH) || numL <= 0 || numH <= 0) return null

        return computeDrywall({
            constructionType,
            length: numL,
            height: numH,
            studSpacing,
            profileWidth,
            sheetLength,
            sheetWidth: 1.2,
            sheetType,
            layers: constructionType === "wall-lining" ? wallLiningLayers : 1,
            doorsCount: constructionType === "ceiling" ? 0 : numDoors,
            doorWidth: numDoorW,
            doorHeight: numDoorH,
            wastePercent: numWaste,
            includeInsulation,
            pricePerSheet: numPriceSheet,
            pricePerProfile: numPriceProfile,
        })
    }, [
        constructionType,
        length,
        height,
        studSpacing,
        profileWidth,
        sheetLength,
        sheetType,
        wallLiningLayers,
        doorsCount,
        doorWidth,
        doorHeight,
        wastePercent,
        includeInsulation,
        pricePerSheet,
        pricePerProfile,
    ])

    const formatNumber = (num: number, maxDecimals = 0) => {
        if (!isFinite(num) || isNaN(num)) return "0"
        if (num >= 100_000_000) {
            return new Intl.NumberFormat(localeTag, { notation: "compact", maximumFractionDigits: 2 }).format(num)
        }
        return num.toLocaleString(localeTag, { maximumFractionDigits: maxDecimals })
    }

    const filteredMaterials = useMemo(() => {
        if (!calculationResult) return []
        if (categoryFilter === "all") return calculationResult.materials
        return calculationResult.materials.filter((m) => m.category === categoryFilter)
    }, [calculationResult, categoryFilter])

    const handleCopySummary = () => {
        if (!calculationResult) return

        const lines = [
            isEnglish ? "--- Knauf Drywall Material Specification ---" : "--- Спецификация материалов для гипсокартона (Knauf) ---",
            `${isEnglish ? "Construction type" : "Тип конструкции"}: ${
                constructionType === "partition-single"
                    ? isEnglish ? "Single-layer Partition (Knauf W111)" : "Перегородка в 1 слой (Knauf W111)"
                    : constructionType === "partition-double"
                    ? isEnglish ? "Double-layer Acoustic Partition (Knauf W112)" : "Перегородка в 2 слоя (Knauf W112)"
                    : constructionType === "wall-lining"
                    ? isEnglish ? `Wall Lining (Knauf C623, ${wallLiningLayers} layer)` : `Облицовка стены (Knauf C623, ${wallLiningLayers} сл.)`
                    : isEnglish ? "Suspended Ceiling (Knauf D112/D113)" : "Подвесной потолок (Knauf D112/D113)"
            }`,
            `${isEnglish ? "Surface Net Area" : "Чистая площадь конструкции"}: ${calculationResult.surfaceAreaM2} ${isEnglish ? "sq m" : "м²"}`,
            `${isEnglish ? "Total Drywall Boards" : "Листов гипсокартона"}: ${calculationResult.sheetsCount} ${isEnglish ? "pcs" : "шт"} (${calculationResult.grossGklAreaM2} ${isEnglish ? "sq m" : "м²"})`,
            "",
            isEnglish ? "Bill of Materials:" : "Ведомость материалов:",
            ...calculationResult.materials.map(
                (m, idx) =>
                    `${idx + 1}. ${isEnglish ? m.nameEn : m.nameRu} — ${m.quantity.toLocaleString(localeTag)} ${
                        isEnglish ? m.unitEn : m.unitRu
                    } (${isEnglish ? m.descriptionEn : m.descriptionRu})`
            ),
        ]

        if (calculationResult.estimatedCost) {
            lines.push(
                "",
                `${isEnglish ? "Estimated Material Cost" : "Ориентировочная стоимость материалов"}: ${calculationResult.estimatedCost.toLocaleString(
                    localeTag
                )} ${currentCurrency.symbol}`
            )
        }

        navigator.clipboard.writeText(lines.join("\n"))
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    return (
        <div className="rounded-2xl border bg-card p-3.5 sm:p-6 md:p-8 shadow-sm">
            {/* Header */}
            <div className="mb-5 sm:mb-6 border-b pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Layers className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold leading-snug">
                                {isEnglish ? "Knauf Drywall & Partition Calculator" : "Инженерный калькулятор гипсокартона и перегородок Knauf"}
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                                {isEnglish
                                    ? "Precise estimation for drywall partitions (W111, W112), wall linings (C623), and ceilings (D112)"
                                    : "Высокоточный расчет перегородок (W111, W112), облицовок стен (С623) и потолков (D112) по нормам Knauf"}
                            </p>
                        </div>
                    </div>

                    {/* Currency Selector */}
                    <div className="flex items-center gap-1 rounded-lg border bg-muted/30 p-1 text-xs overflow-x-auto max-w-full scrollbar-none self-start sm:self-auto">
                        {(isEnglish ? currencyOptions.en : currencyOptions.ru).map((c) => (
                            <button
                                key={c.code}
                                type="button"
                                onClick={() => setCurrency(c.code)}
                                className={`rounded px-2 py-1 font-medium transition-all shrink-0 ${
                                    currency === c.code
                                        ? "bg-background text-foreground shadow-sm font-semibold"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {c.symbol} {c.code}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Construction Type Selector */}
            <div className="mb-6">
                <label className="mb-2 block text-xs sm:text-sm font-semibold text-foreground">
                    {isEnglish ? "1. Select Construction Type" : "1. Выберите тип гипсокартонной конструкции"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    <button
                        type="button"
                        onClick={() => setConstructionType("partition-single")}
                        className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                            constructionType === "partition-single"
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                : "border-border hover:bg-muted/50"
                        }`}
                    >
                        <span className="font-semibold text-sm flex items-center gap-1.5">
                            <SquareStack className="h-4 w-4 text-primary" />
                            {isEnglish ? "Partition W111 (1 layer)" : "Перегородка W111 (1 слой)"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                            {isEnglish ? "Standard partition: 1 layer of GKL on both sides" : "Стандартное зонирование: по 1 слою ГКЛ с двух сторон"}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setConstructionType("partition-double")}
                        className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                            constructionType === "partition-double"
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                : "border-border hover:bg-muted/50"
                        }`}
                    >
                        <span className="font-semibold text-sm flex items-center gap-1.5">
                            <Volume2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            {isEnglish ? "Partition W112 (2 layers)" : "Перегородка W112 (2 слоя)"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                            {isEnglish ? "High soundproofing: 2 layers of GKL on both sides" : "Усиленная звукоизоляция: по 2 слоя ГКЛ с двух сторон"}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setConstructionType("wall-lining")}
                        className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                            constructionType === "wall-lining"
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                : "border-border hover:bg-muted/50"
                        }`}
                    >
                        <span className="font-semibold text-sm flex items-center gap-1.5">
                            <Hammer className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            {isEnglish ? "Wall Lining C623" : "Облицовка стены С623"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                            {isEnglish ? "Framed wall lining on CD/UD profiles and hangers" : "Выравнивание стен на металлокаркасе и подвесах"}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setConstructionType("ceiling")}
                        className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                            constructionType === "ceiling"
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                : "border-border hover:bg-muted/50"
                        }`}
                    >
                        <span className="font-semibold text-sm flex items-center gap-1.5">
                            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            {isEnglish ? "Suspended Ceiling D112" : "Подвесной потолок D112"}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                            {isEnglish ? "Single-level grid ceiling with crab connectors" : "Одноуровневый каркас с соединителями «Краб»"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Inputs Grid */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Dimensions */}
                <div>
                    <label className="text-xs font-semibold mb-1 block">
                        {constructionType === "ceiling"
                            ? isEnglish ? "Room Length (m / ft)" : "Длина потолка / комнаты (м)"
                            : isEnglish ? "Wall Length (m / ft)" : "Длина стены / перегородки (м)"}
                    </label>
                    <Input
                        type="number"
                        step="0.1"
                        min="0.5"
                        max="1000"
                        value={length}
                        onChange={(e) => setLength(e.target.value.slice(0, 6))}
                        placeholder="5.0"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                        <span className="font-semibold text-foreground/80">{isEnglish ? "Limit: " : "Ограничение: "}</span>
                        {isEnglish ? "0.5 to 1,000 m" : "от 0.5 до 1 000 м"}
                    </p>
                </div>

                <div>
                    <label className="text-xs font-semibold mb-1 block">
                        {constructionType === "ceiling"
                            ? isEnglish ? "Room Width (m / ft)" : "Ширина потолка / комнаты (м)"
                            : isEnglish ? "Wall Height (m / ft)" : "Высота стены / перегородки (м)"}
                    </label>
                    <Input
                        type="number"
                        step="0.05"
                        min="1.0"
                        max="20"
                        value={height}
                        onChange={(e) => setHeight(e.target.value.slice(0, 5))}
                        placeholder="2.7"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                        <span className="font-semibold text-foreground/80">{isEnglish ? "Limit: " : "Ограничение: "}</span>
                        {isEnglish ? "1.0 to 20 m" : "от 1.0 до 20 м"}
                    </p>
                </div>

                {/* Stud Spacing */}
                <div>
                    <label className="text-xs font-semibold mb-1 block">
                        {isEnglish ? "Stud Spacing (pitch)" : "Шаг профилей стоек"}
                    </label>
                    <select
                        value={studSpacing}
                        onChange={(e) => setStudSpacing(Number(e.target.value) as StudSpacing)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <option value={600}>{isEnglish ? "600 mm (Standard drywall)" : "600 мм (Стандарт по Knauf)"}</option>
                        <option value={400}>{isEnglish ? "400 mm (Heavy tile load)" : "400 мм (Под плитку / тяжелые шкафы)"}</option>
                    </select>
                    <p className="text-[11px] text-muted-foreground mt-1">
                        {isEnglish ? "400 mm for ceramic tiles" : "400 мм под укладку плитки"}
                    </p>
                </div>

                {/* Profile Width */}
                {constructionType.startsWith("partition") ? (
                    <div>
                        <label className="text-xs font-semibold mb-1 block">
                            {isEnglish ? "Partition Profile Width" : "Толщина каркаса (ПН/ПС)"}
                        </label>
                        <select
                            value={profileWidth}
                            onChange={(e) => setProfileWidth(Number(e.target.value) as 50 | 75 | 100)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value={50}>{isEnglish ? "50 mm (Total wall: 75-100 mm)" : "50 мм (Толщина стены: 75–100 мм)"}</option>
                            <option value={75}>{isEnglish ? "75 mm (Total wall: 100-125 mm)" : "75 мм (Толщина стены: 100–125 мм)"}</option>
                            <option value={100}>{isEnglish ? "100 mm (Total wall: 125-150 mm)" : "100 мм (Максимальная звукоизоляция)"}</option>
                        </select>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            {isEnglish ? "Determines wall thickness" : "Задает общую толщину стены"}
                        </p>
                    </div>
                ) : constructionType === "wall-lining" ? (
                    <div>
                        <label className="text-xs font-semibold mb-1 block">
                            {isEnglish ? "Layers of Drywall" : "Количество слоев ГКЛ"}
                        </label>
                        <select
                            value={wallLiningLayers}
                            onChange={(e) => setWallLiningLayers(Number(e.target.value) as 1 | 2)}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value={1}>{isEnglish ? "1 Layer (Standard)" : "1 слой (Стандартное выравнивание)"}</option>
                            <option value={2}>{isEnglish ? "2 Layers (Rigid / Soundproof)" : "2 слоя (Повышенная прочность)"}</option>
                        </select>
                        <p className="text-[11px] text-muted-foreground mt-1">
                            {isEnglish ? "2 layers for soundproofing" : "2 слоя для звукоизоляции"}
                        </p>
                    </div>
                ) : null}

                {/* Sheet Type */}
                <div>
                    <label className="text-xs font-semibold mb-1 block">
                        {isEnglish ? "Drywall Board Type" : "Тип гипсокартона"}
                    </label>
                    <select
                        value={sheetType}
                        onChange={(e) => setSheetType(e.target.value as DrywallSheetType)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <option value="standard">{isEnglish ? "Standard GKL (Grey)" : "Обычный ГСП-А / ГКЛ (Серый)"}</option>
                        <option value="moisture">{isEnglish ? "Moisture-Resistant GKLV (Green)" : "Влагостойкий ГКЛВ (Зеленый)"}</option>
                        <option value="fire">{isEnglish ? "Fire-Rated GKLO (Pink)" : "Огнестойкий ГКЛО (Розовый)"}</option>
                        <option value="acoustic">{isEnglish ? "Acoustic Knauf Diamant/Sapphire" : "Акустический Knauf Сапфир"}</option>
                    </select>
                    <p className="text-[11px] text-muted-foreground mt-1">
                        {isEnglish ? "Green for bathrooms & kitchens" : "ГКЛВ (зеленый) для санузлов"}
                    </p>
                </div>

                {/* Sheet Length */}
                <div>
                    <label className="text-xs font-semibold mb-1 block">
                        {isEnglish ? "Board Length" : "Длина листа ГКЛ"}
                    </label>
                    <select
                        value={sheetLength}
                        onChange={(e) => setSheetLength(Number(e.target.value) as 2.5 | 3.0)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <option value={2.5}>{isEnglish ? "2500 x 1200 mm (3.0 m²)" : "2500 x 1200 мм (3.0 м²)"}</option>
                        <option value={3.0}>{isEnglish ? "3000 x 1200 mm (3.6 m²)" : "3000 x 1200 мм (3.6 м²)"}</option>
                    </select>
                    <p className="text-[11px] text-muted-foreground mt-1">
                        {isEnglish ? "3.0m for high ceilings" : "3.0 м при высоте от 2.5 м"}
                    </p>
                </div>

                {/* Waste */}
                <div>
                    <label className="text-xs font-semibold mb-1 block">
                        {isEnglish ? "Cutting Waste Allowance (%)" : "Запас на раскрой и подрезку (%)"}
                    </label>
                    <Input
                        type="number"
                        min="0"
                        max="30"
                        value={wastePercent}
                        onChange={(e) => setWastePercent(e.target.value.slice(0, 3))}
                        placeholder="8"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                        <span className="font-semibold text-foreground/80">{isEnglish ? "Limit: " : "Ограничение: "}</span>
                        {isEnglish ? "0% to 30%" : "от 0% до 30%"}
                    </p>
                </div>

                {/* Doors / Openings for partitions & walls */}
                {constructionType !== "ceiling" && (
                    <div>
                        <label className="text-xs font-semibold mb-1 block">
                            {isEnglish ? "Door / Window Openings" : "Количество проемов / дверей"}
                        </label>
                        <Input
                            type="number"
                            min="0"
                            max="50"
                            value={doorsCount}
                            onChange={(e) => setDoorsCount(e.target.value.slice(0, 3))}
                            placeholder="1"
                        />
                        <p className="text-[11px] text-muted-foreground mt-1">
                            <span className="font-semibold text-foreground/80">{isEnglish ? "Limit: " : "Ограничение: "}</span>
                            {isEnglish ? "0 to 50 openings" : "от 0 до 50 проемов"}
                        </p>
                    </div>
                )}
            </div>

            {/* Optional Pricing & Insulation Toggles */}
            <div className="mb-6 rounded-xl bg-muted/30 p-4 border">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="insulation-toggle"
                            checked={includeInsulation}
                            onChange={(e) => setIncludeInsulation(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="insulation-toggle" className="text-xs sm:text-sm font-medium cursor-pointer">
                            {isEnglish ? "Include acoustic mineral wool filling" : "Включить звукоизоляционную минвату в расчет"}
                        </label>
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">
                            {isEnglish ? `Price per GKL Board (${currentCurrency.symbol})` : `Цена за 1 лист ГКЛ (${currentCurrency.symbol})`}
                        </label>
                        <Input
                            type="number"
                            min="0"
                            placeholder={isEnglish ? currentCurrency.sheetExample : currentCurrency.sheetExample}
                            value={pricePerSheet}
                            onChange={(e) => setPricePerSheet(e.target.value.slice(0, 7))}
                        />
                        <p className="text-[11px] text-muted-foreground mt-1">
                            <span className="font-semibold text-foreground/80">{isEnglish ? "Limit: " : "Ограничение: "}</span>
                            {isEnglish ? "up to 999,999" : "до 999 999"}
                        </p>
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground mb-1 block">
                            {isEnglish ? `Price per 3m Profile (${currentCurrency.symbol})` : `Цена за 1 профиль 3м (${currentCurrency.symbol})`}
                        </label>
                        <Input
                            type="number"
                            min="0"
                            placeholder={isEnglish ? currentCurrency.profileExample : currentCurrency.profileExample}
                            value={pricePerProfile}
                            onChange={(e) => setPricePerProfile(e.target.value.slice(0, 7))}
                        />
                        <p className="text-[11px] text-muted-foreground mt-1">
                            <span className="font-semibold text-foreground/80">{isEnglish ? "Limit: " : "Ограничение: "}</span>
                            {isEnglish ? "up to 999,999" : "до 999 999"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {calculationResult ? (
                <div className="space-y-6">
                    {/* Top KPI Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        <div className="rounded-xl border bg-muted/20 p-3.5 sm:p-4 text-center flex flex-col justify-center min-w-0 overflow-hidden">
                            <span className="text-xs font-semibold text-muted-foreground block">
                                {isEnglish ? "Net Surface Area" : "Площадь конструкции"}
                            </span>
                            <span className="text-lg sm:text-2xl font-bold text-foreground my-1 font-mono tracking-tight block break-words">
                                {formatNumber(calculationResult.surfaceAreaM2, 1)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isEnglish ? "sq m (net)" : "м² (чистая)"}
                            </span>
                        </div>

                        <div className="rounded-xl border bg-primary/10 border-primary/25 p-3.5 sm:p-4 text-center flex flex-col justify-center min-w-0 overflow-hidden">
                            <span className="text-xs font-bold text-primary block">
                                {isEnglish ? "GKL Boards" : "Листы ГКЛ"}
                            </span>
                            <span className="text-lg sm:text-2xl font-bold text-primary my-1 font-mono tracking-tight block break-words">
                                {formatNumber(calculationResult.sheetsCount)}
                            </span>
                            <span className="text-xs font-medium text-primary/80">
                                {isEnglish ? "pcs" : "шт"} ({formatNumber(calculationResult.grossGklAreaM2, 1)} {isEnglish ? "m² gross" : "м² с запасом"})
                            </span>
                        </div>

                        <div className="rounded-xl border bg-muted/20 p-3.5 sm:p-4 text-center flex flex-col justify-center min-w-0 overflow-hidden">
                            <span className="text-xs font-semibold text-muted-foreground block">
                                {isEnglish ? "Guide Track Profiles" : "Направляющие ПН"}
                            </span>
                            <span className="text-lg sm:text-2xl font-bold text-foreground my-1 font-mono tracking-tight block break-words">
                                {formatNumber(calculationResult.guideProfilesCount)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isEnglish ? "pcs (3m length)" : "шт (по 3 метра)"}
                            </span>
                        </div>

                        <div className="rounded-xl border bg-muted/20 p-3.5 sm:p-4 text-center flex flex-col justify-center min-w-0 overflow-hidden">
                            <span className="text-xs font-semibold text-muted-foreground block">
                                {isEnglish ? "Stud / CD Profiles" : "Стоечные ПС / ПП"}
                            </span>
                            <span className="text-lg sm:text-2xl font-bold text-foreground my-1 font-mono tracking-tight block break-words">
                                {formatNumber(calculationResult.studProfilesCount)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isEnglish ? "pcs (3m length)" : "шт (по 3 метра)"}
                            </span>
                        </div>

                        <div className="rounded-xl border bg-muted/20 p-3.5 sm:p-4 text-center flex flex-col justify-center min-w-0 overflow-hidden">
                            <span className="text-xs font-semibold text-muted-foreground block">
                                {isEnglish ? "GKL Screws TN" : "Саморезы TN"}
                            </span>
                            <span className="text-lg sm:text-2xl font-bold text-foreground my-1 font-mono tracking-tight block break-words">
                                {formatNumber(calculationResult.screwsTN25Count + calculationResult.screwsTN35Count)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isEnglish ? "pcs (total)" : "шт (всего)"}
                            </span>
                        </div>

                        <div className="rounded-xl border bg-muted/20 p-3.5 sm:p-4 text-center flex flex-col justify-center min-w-0 overflow-hidden">
                            <span className="text-xs font-semibold text-muted-foreground block">
                                {isEnglish ? "Sealing Tape" : "Демпферная лента"}
                            </span>
                            <span className="text-lg sm:text-2xl font-bold text-foreground my-1 font-mono tracking-tight block break-words">
                                {formatNumber(calculationResult.sealingTapeRolls)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isEnglish ? "rolls" : "рулонов"} ({formatNumber(calculationResult.sealingTapeLengthM, 1)} {isEnglish ? "m" : "м"})
                            </span>
                        </div>
                    </div>

                    {/* Estimated Cost Banner if prices entered */}
                    {calculationResult.estimatedCost && (
                        <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 min-w-0">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span className="font-semibold text-sm sm:text-base text-emerald-950 dark:text-emerald-200">
                                    {isEnglish ? "Estimated Base Materials Cost (Sheets + Profiles):" : "Ориентировочная стоимость основы (ГКЛ + Профили):"}
                                </span>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-300 break-all">
                                {formatNumber(calculationResult.estimatedCost)} {currentCurrency.symbol}
                            </span>
                        </div>
                    )}

                    {/* Detailed Bill of Materials (BOM) Table */}
                    <div className="rounded-xl border overflow-hidden">
                        <div className="p-3.5 sm:p-4 border-b bg-muted/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                            <div>
                                <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                                    <FileSpreadsheet className="h-4 w-4 text-primary shrink-0" />
                                    {isEnglish ? "Detailed Material Specification (Knauf Standard)" : "Полная инженерная спецификация материалов (Knauf)"}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {isEnglish
                                        ? "All required components including profiles, fasteners, damping tape, joint tape and compound"
                                        : "Полный перечень комплектующих: профили, крепеж, уплотнители, ленты и заделка стыков"}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                {/* Category Filter */}
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="flex-1 sm:flex-none rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-none"
                                >
                                    <option value="all">{isEnglish ? "All Categories" : "Все категории"}</option>
                                    <option value="sheets">{isEnglish ? "Drywall Boards" : "Листы ГКЛ"}</option>
                                    <option value="profiles">{isEnglish ? "Metal Framing" : "Профили и подвесы"}</option>
                                    <option value="fasteners">{isEnglish ? "Fasteners & Screws" : "Крепеж и саморезы"}</option>
                                    <option value="damping">{isEnglish ? "Perimeter Damping" : "Демпферная лента"}</option>
                                    <option value="finishing">{isEnglish ? "Joint Finishing" : "Заделка швов"}</option>
                                    <option value="insulation">{isEnglish ? "Acoustic Insulation" : "Звукоизоляция"}</option>
                                </select>

                                {/* Copy Button */}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleCopySummary}
                                    className="text-xs gap-1.5 shrink-0"
                                >
                                    {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                                    {copied ? (isEnglish ? "Copied!" : "Скопировано!") : isEnglish ? "Copy List" : "Копировать смету"}
                                </Button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto overscroll-x-contain touch-pan-x">
                            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[340px] sm:min-w-0">
                                <thead>
                                    <tr className="border-b bg-muted/20 text-muted-foreground">
                                        <th className="py-2.5 px-3 sm:px-4 font-semibold w-12 text-center">#</th>
                                        <th className="py-2.5 px-3 sm:px-4 font-semibold">
                                            {isEnglish ? "Material / Item" : "Наименование материала"}
                                        </th>
                                        <th className="py-2.5 px-3 sm:px-4 font-semibold text-center w-28">
                                            {isEnglish ? "Quantity" : "Количество"}
                                        </th>
                                        <th className="py-2.5 px-3 sm:px-4 font-semibold text-center w-28">
                                            {isEnglish ? "Unit" : "Ед. изм."}
                                        </th>
                                        <th className="py-2.5 px-3 sm:px-4 font-semibold hidden md:table-cell">
                                            {isEnglish ? "Application / Note" : "Назначение / Примечание"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMaterials.map((item, idx) => (
                                        <tr
                                            key={item.id}
                                            className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="py-2.5 px-3 sm:px-4 text-center text-muted-foreground font-mono text-xs">
                                                {idx + 1}
                                            </td>
                                            <td className="py-2.5 px-3 sm:px-4 font-medium text-foreground">
                                                {isEnglish ? item.nameEn : item.nameRu}
                                                <div className="text-[11px] text-muted-foreground md:hidden mt-0.5">
                                                    {isEnglish ? item.descriptionEn : item.descriptionRu}
                                                </div>
                                            </td>
                                            <td className="py-2.5 px-3 sm:px-4 text-center font-bold font-mono text-primary">
                                                {item.quantity.toLocaleString(localeTag)}
                                            </td>
                                            <td className="py-2.5 px-3 sm:px-4 text-center text-muted-foreground text-xs">
                                                {isEnglish ? item.unitEn : item.unitRu}
                                            </td>
                                            <td className="py-2.5 px-3 sm:px-4 text-muted-foreground text-xs hidden md:table-cell">
                                                {isEnglish ? item.descriptionEn : item.descriptionRu}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pro Engineering Tips */}
                    <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4">
                        <h4 className="font-bold text-xs sm:text-sm text-amber-950 dark:text-amber-200 flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            {isEnglish ? "Knauf Installation Rules & Common Pitfalls" : "Золотые правила монтажа Knauf (как избежать трещин):"}
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                            <li>
                                <strong>{isEnglish ? "Perimeter Decoupling: " : "Обязательная демпферная лента: "}</strong>
                                {isEnglish
                                    ? "Never mount guide profiles directly to concrete/screed without Dichtungsband tape. It prevents structural sound transmission and cracks."
                                    : "Никогда не крепите направляющие профили к бетону или стяжке без ленты Диктунгсбанд. Она гасит вибрации и предотвращает трещины."}
                            </li>
                            <li>
                                <strong>{isEnglish ? "Staggered Seams: " : "Разбежка стыков: "}</strong>
                                {isEnglish
                                    ? "Butt seams between adjacent sheets must be staggered by at least 400 mm (16\"). Cross-shaped 4-corner intersections are strictly forbidden."
                                    : "Горизонтальные и вертикальные стыки листов должны идти с разбежкой не менее 400 мм. Крестообразные стыки строго запрещены."}
                            </li>
                            <li>
                                <strong>{isEnglish ? "Fastener Depth: " : "Глубина утопления саморезов: "}</strong>
                                {isEnglish
                                    ? "Screw heads must be countersunk by 1 mm into the board without tearing the paper liner."
                                    : "Шляпки саморезов должны утапливаться в лист на 1 мм, не прорывая картонный слой."}
                            </li>
                        </ul>
                    </div>

                    <CalculationResultNotes
                        title={isEnglish ? "Engineering Notes & Standards" : "Инженерные примечания и стандарты"}
                        intro={
                            isEnglish
                                ? "Drywall assemblies calculated in strict accordance with Knauf technical bulletins and international framing standards (ASTM C754 / DIN 18181)."
                                : "Расчет выполнен в строгом соответствии с техническими картами Knauf и строительными нормами СП 163.1325800 / DIN 18181."
                        }
                        sections={[
                            {
                                title: isEnglish ? "Acoustic Decoupling & Vibration" : "Виброразвязка и звукоизоляция",
                                items: [
                                    isEnglish
                                        ? "Dichtungsband polymer tape under perimeter tracks reduces flanking noise transmission by 6–10 dB."
                                        : "Уплотнительная лента Диктунгсбанд под направляющими снижает передачу структурного шума на 6–10 дБ.",
                                    isEnglish
                                        ? "Double-layer drywall (W112) with acoustic mineral wool achieves sound insulation index Rw up to 56–59 dB."
                                        : "Двухслойная перегородка (W112) с минеральной ватой обеспечивает индекс изоляции воздушного шума Rw до 56–59 дБ.",
                                ],
                            },
                            {
                                title: isEnglish ? "Framing & Fastener Rules" : "Правила сборки каркаса и крепежа",
                                items: [
                                    isEnglish
                                        ? "For ceramic tile application, use 16\" (400 mm) stud spacing and moisture-resistant boards."
                                        : "Под укладку керамической плитки и керамогранита шаг стоек строго 400 мм на влагостойком ГКЛВ.",
                                    isEnglish
                                        ? "Do not use gypsum plaster on metal corners without rust-inhibiting coating."
                                        : "Шпатлевание стыков лентой Knauf Kurt гарантирует отсутствие трещин даже при вибрационных нагрузках.",
                                ],
                            },
                        ]}
                    />
                </div>
            ) : null}
        </div>
    )
}
