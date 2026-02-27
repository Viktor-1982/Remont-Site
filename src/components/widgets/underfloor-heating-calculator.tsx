"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Flame, Thermometer, Waves, Cable, Zap, Home } from "lucide-react"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, UnderfloorCalcDict, ButtonsDict } from "@/types/calc"
import { computeUnderfloorHeating } from "@/lib/calculations"

const calcData = calcDataJson as CalcData

type FloorCovering = "tile" | "laminate" | "wood" | "vinyl"
type HeatingMode = "comfort" | "primary"
type HeatingSystem = "cable" | "mat"
type HeatLossLevel = "good" | "normal" | "high"
type BelowFloor = "heated" | "unheated" | "ground"

const floorOptions: Array<{
    value: FloorCovering
    labelRu: string
    labelEn: string
    hintRu: string
    hintEn: string
}> = [
    { value: "tile", labelRu: "Плитка / керамогранит", labelEn: "Tile / stone", hintRu: "Лучше всего передает тепло", hintEn: "Best heat transfer" },
    { value: "laminate", labelRu: "Ламинат", labelEn: "Laminate", hintRu: "Нужен контроль температуры", hintEn: "Keep surface temp controlled" },
    { value: "vinyl", labelRu: "Винил / ПВХ", labelEn: "Vinyl / PVC", hintRu: "Средняя теплоотдача", hintEn: "Balanced performance" },
    { value: "wood", labelRu: "Дерево / паркет", labelEn: "Wood / parquet", hintRu: "Требует мягкого режима", hintEn: "Requires gentle heating" },
]

const systemOptions: Array<{
    value: HeatingSystem
    labelRu: string
    labelEn: string
    hintRu: string
    hintEn: string
    icon: typeof Cable
}> = [
    { value: "cable", labelRu: "Кабель", labelEn: "Cable", hintRu: "Гибко по конфигурации", hintEn: "Flexible layout", icon: Cable },
    { value: "mat", labelRu: "Мат", labelEn: "Heating mat", hintRu: "Быстрый монтаж", hintEn: "Quick installation", icon: Zap },
]

const modeOptions: Array<{
    value: HeatingMode
    labelRu: string
    labelEn: string
    hintRu: string
    hintEn: string
}> = [
    { value: "comfort", labelRu: "Комфорт", labelEn: "Comfort", hintRu: "Поддержка тепла", hintEn: "Supplemental heating" },
    { value: "primary", labelRu: "Основной", labelEn: "Primary", hintRu: "Основной источник тепла", hintEn: "Main heat source" },
]

const heatLossOptions: Array<{
    value: HeatLossLevel
    factor: number
    labelRu: string
    labelEn: string
    hintRu: string
    hintEn: string
}> = [
    { value: "good", factor: 0.9, labelRu: "Хорошая изоляция", labelEn: "Well insulated", hintRu: "-10% мощности", hintEn: "-10% power" },
    { value: "normal", factor: 1.0, labelRu: "Обычная", labelEn: "Standard", hintRu: "Базовый уровень", hintEn: "Baseline" },
    { value: "high", factor: 1.15, labelRu: "Повышенные потери", labelEn: "High losses", hintRu: "+15% мощности", hintEn: "+15% power" },
]

const belowFloorOptions: Array<{
    value: BelowFloor
    factor: number
    labelRu: string
    labelEn: string
    hintRu: string
    hintEn: string
}> = [
    { value: "heated", factor: 0.95, labelRu: "Отапливаемое", labelEn: "Heated space", hintRu: "-5% мощности", hintEn: "-5% power" },
    { value: "unheated", factor: 1.1, labelRu: "Холодное/подвал", labelEn: "Unheated/basement", hintRu: "+10% мощности", hintEn: "+10% power" },
    { value: "ground", factor: 1.2, labelRu: "Грунт/первый этаж", labelEn: "Ground/1st floor", hintRu: "+20% мощности", hintEn: "+20% power" },
]

export function UnderfloorHeatingCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"

    const t: UnderfloorCalcDict = calcData[locale].calc.underfloor
    const b: ButtonsDict = calcData[locale].calc.buttons

    const [roomArea, setRoomArea] = useState("")
    const [coverage, setCoverage] = useState("80")
    const [floorCovering, setFloorCovering] = useState<FloorCovering>("tile")
    const [system, setSystem] = useState<HeatingSystem>("mat")
    const [mode, setMode] = useState<HeatingMode>("comfort")
    const [heatLoss, setHeatLoss] = useState<HeatLossLevel>("normal")
    const [belowFloor, setBelowFloor] = useState<BelowFloor>("heated")
    const [cablePower, setCablePower] = useState("17")
    const [matPower, setMatPower] = useState("150")
    const [hours, setHours] = useState("6")
    const [days, setDays] = useState("30")
    const [load, setLoad] = useState("60")
    const [tariff, setTariff] = useState("")

    const [result, setResult] = useState<ReturnType<typeof computeUnderfloorHeating> | null>(null)

    const calculate = () => {
        const areaNum = parseFloat(roomArea.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const coverageNum = parseFloat(coverage.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const cablePowerNum = parseFloat(cablePower.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const matPowerNum = parseFloat(matPower.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const hoursNum = parseFloat(hours.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const daysNum = parseFloat(days.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const loadNum = parseFloat(load.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const tariffNum = parseFloat(tariff.replace(",", ".").replace(/[^0-9.-]/g, ""))

        const res = computeUnderfloorHeating({
            roomArea: areaNum,
            coveragePercent: coverageNum,
            floorCovering,
            mode,
            system,
            heatLossFactor: heatLossOptions.find((option) => option.value === heatLoss)?.factor ?? 1,
            belowFloorFactor: belowFloorOptions.find((option) => option.value === belowFloor)?.factor ?? 1,
            cablePowerWPerM: cablePowerNum,
            matPowerWPerM2: matPowerNum,
            hoursPerDay: hoursNum,
            daysPerMonth: daysNum,
            loadPercent: loadNum,
            tariffPerKwh: Number.isFinite(tariffNum) ? tariffNum : undefined,
        })

        if (!res) return
        setResult(res)
    }

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary/15 via-transparent to-accent/20 blur-3xl opacity-60" />
            <div className="relative space-y-6 rounded-[32px] border border-primary/10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_45%),_var(--background)] p-6 md:p-8 shadow-[0_25px_80px_-35px_rgba(79,70,229,0.8)] transition">
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Thermometer className="h-3.5 w-3.5" /> Renohacks Pro Tool
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish
                            ? "Estimate heating power, cable length or mat area, and monthly energy consumption."
                            : "Рассчитайте мощность системы, длину кабеля/матов и примерное энергопотребление в месяц."}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.area}</label>
                        <Input
                            placeholder={isEnglish ? "18" : "18"}
                            value={roomArea}
                            onChange={(e) => setRoomArea(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.coverage}</label>
                        <div className="flex items-center gap-3">
                            <Input
                                type="number"
                                min="30"
                                max="100"
                                value={coverage}
                                onChange={(e) => setCoverage(e.target.value)}
                                className="w-24 rounded-xl border-border/60 bg-background/80 text-center font-semibold"
                            />
                            <input
                                type="range"
                                min="30"
                                max="100"
                                value={parseInt(coverage || "0", 10)}
                                onChange={(e) => setCoverage(e.target.value)}
                                className="flex-1 accent-primary"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground/70">
                            {isEnglish
                                ? "Usually 70–90% (leave zones under furniture unheated)"
                                : "Обычно 70–90% (без зон под мебелью)"}
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                    <label className="text-xs font-medium text-muted-foreground block">{t.floorType}</label>
                    <div className="grid gap-2 md:grid-cols-2">
                        {floorOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFloorCovering(option.value)}
                                className={`relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all ${
                                    floorCovering === option.value
                                        ? "border-primary/50 bg-primary/10 shadow-sm"
                                        : "border-border/40 bg-card/50 hover:border-primary/30"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Home className={`h-4 w-4 ${floorCovering === option.value ? "text-primary" : "text-muted-foreground"}`} />
                                    <div>
                                        <div className={`text-xs font-medium ${floorCovering === option.value ? "text-primary" : "text-foreground"}`}>
                                            {isEnglish ? option.labelEn : option.labelRu}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground">
                                            {isEnglish ? option.hintEn : option.hintRu}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                        <label className="text-xs font-medium text-muted-foreground block">{t.systemType}</label>
                        <div className="space-y-2">
                            {systemOptions.map((option) => {
                                const Icon = option.icon
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => setSystem(option.value)}
                                        className={`relative w-full overflow-hidden rounded-xl border-2 p-3 text-left transition-all ${
                                            system === option.value
                                                ? "border-primary/50 bg-primary/10 shadow-sm"
                                                : "border-border/40 bg-card/50 hover:border-primary/30"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className={`h-4 w-4 ${system === option.value ? "text-primary" : "text-muted-foreground"}`} />
                                            <div>
                                                <div className={`text-xs font-medium ${system === option.value ? "text-primary" : "text-foreground"}`}>
                                                    {isEnglish ? option.labelEn : option.labelRu}
                                                </div>
                                                <div className="text-[11px] text-muted-foreground">
                                                    {isEnglish ? option.hintEn : option.hintRu}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                        <label className="text-xs font-medium text-muted-foreground block">{t.mode}</label>
                        <div className="space-y-2">
                            {modeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setMode(option.value)}
                                    className={`relative w-full overflow-hidden rounded-xl border-2 p-3 text-left transition-all ${
                                        mode === option.value
                                            ? "border-primary/50 bg-primary/10 shadow-sm"
                                            : "border-border/40 bg-card/50 hover:border-primary/30"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Flame className={`h-4 w-4 ${mode === option.value ? "text-primary" : "text-muted-foreground"}`} />
                                        <div>
                                            <div className={`text-xs font-medium ${mode === option.value ? "text-primary" : "text-foreground"}`}>
                                                {isEnglish ? option.labelEn : option.labelRu}
                                            </div>
                                            <div className="text-[11px] text-muted-foreground">
                                                {isEnglish ? option.hintEn : option.hintRu}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                        <label className="text-xs font-medium text-muted-foreground block">{t.heatLoss}</label>
                        <div className="space-y-2">
                            {heatLossOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setHeatLoss(option.value)}
                                    className={`relative w-full overflow-hidden rounded-xl border-2 p-3 text-left transition-all ${
                                        heatLoss === option.value
                                            ? "border-primary/50 bg-primary/10 shadow-sm"
                                            : "border-border/40 bg-card/50 hover:border-primary/30"
                                    }`}
                                >
                                    <div>
                                        <div className={`text-xs font-medium ${heatLoss === option.value ? "text-primary" : "text-foreground"}`}>
                                            {isEnglish ? option.labelEn : option.labelRu}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground">
                                            {isEnglish ? option.hintEn : option.hintRu}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                        <label className="text-xs font-medium text-muted-foreground block">{t.belowFloor}</label>
                        <div className="space-y-2">
                            {belowFloorOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setBelowFloor(option.value)}
                                    className={`relative w-full overflow-hidden rounded-xl border-2 p-3 text-left transition-all ${
                                        belowFloor === option.value
                                            ? "border-primary/50 bg-primary/10 shadow-sm"
                                            : "border-border/40 bg-card/50 hover:border-primary/30"
                                    }`}
                                >
                                    <div>
                                        <div className={`text-xs font-medium ${belowFloor === option.value ? "text-primary" : "text-foreground"}`}>
                                            {isEnglish ? option.labelEn : option.labelRu}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground">
                                            {isEnglish ? option.hintEn : option.hintRu}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                            {system === "cable" ? t.cablePower : t.matPower}
                        </label>
                        <Input
                            placeholder={system === "cable" ? "17" : "150"}
                            value={system === "cable" ? cablePower : matPower}
                            onChange={(e) =>
                                system === "cable" ? setCablePower(e.target.value) : setMatPower(e.target.value)
                            }
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                        <p className="text-xs text-muted-foreground/70">
                            {isEnglish
                                ? system === "cable"
                                    ? "Typical cable: 16–20 W per meter"
                                    : "Typical mats: 130–160 W per m²"
                                : system === "cable"
                                    ? "Обычно 16–20 Вт на метр"
                                    : "Обычно 130–160 Вт на м²"}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.load}</label>
                        <div className="flex items-center gap-3">
                            <Input
                                type="number"
                                min="20"
                                max="100"
                                value={load}
                                onChange={(e) => setLoad(e.target.value)}
                                className="w-24 rounded-xl border-border/60 bg-background/80 text-center font-semibold"
                            />
                            <input
                                type="range"
                                min="20"
                                max="100"
                                value={parseInt(load || "0", 10)}
                                onChange={(e) => setLoad(e.target.value)}
                                className="flex-1 accent-primary"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground/70">
                            {isEnglish
                                ? "Thermostat usually keeps 50–70% average load"
                                : "Термостат обычно держит 50–70% средней нагрузки"}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.hours}</label>
                        <Input
                            placeholder="6"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.days}</label>
                        <Input
                            placeholder="30"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{t.tariff}</label>
                        <Input
                            placeholder={isEnglish ? "0.15" : "6.5"}
                            value={tariff}
                            onChange={(e) => setTariff(e.target.value)}
                            className="rounded-xl border-border/60 bg-background/80"
                        />
                        <p className="text-xs text-muted-foreground/70">
                            {isEnglish
                                ? "e.g. 0.15 $/kWh or 0.12 €/kWh — cost is indicative."
                                : "Например 6.5 ₽/кВт·ч или 2.5 ₴/кВт·ч — стоимость ориентировочная."}
                        </p>
                    </div>
                </div>

                <Button
                    onClick={calculate}
                    className="w-full rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition hover:translate-y-0 hover:brightness-110"
                    size="lg"
                >
                    {b.calculate}
                </Button>

                {result && (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-emerald-50/20 p-4 shadow-sm dark:from-card dark:to-emerald-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Waves className="h-3.5 w-3.5 text-primary" /> {isEnglish ? "Heated area" : "Зона обогрева"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-foreground">
                                    {result.heatedArea.toFixed(1)} {isEnglish ? "m²" : "м²"}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-blue-50/20 p-4 shadow-sm dark:from-card dark:to-blue-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Flame className="h-3.5 w-3.5 text-blue-500" /> {isEnglish ? "Power" : "Мощность"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-blue-600">
                                    {Math.round(result.totalPowerW)} {isEnglish ? "W" : "Вт"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {t.peakLoad}: {(result.totalPowerW / 1000).toFixed(2)} {isEnglish ? "kW" : "кВт"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {isEnglish
                                        ? `Recommended ${result.recommendedPowerPerM2} W/m²`
                                        : `Рекомендуется ${result.recommendedPowerPerM2} Вт/м²`}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-amber-50/20 p-4 shadow-sm dark:from-card dark:to-amber-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Calculator className="h-3.5 w-3.5 text-amber-500" /> {isEnglish ? "System size" : "Размер системы"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-amber-600">
                                    {system === "cable"
                                        ? `${result.cableLengthM?.toFixed(1)} ${isEnglish ? "m" : "м"}`
                                        : `${result.matAreaM2?.toFixed(1)} ${isEnglish ? "m²" : "м²"}`}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {system === "cable"
                                        ? isEnglish ? "Cable length" : "Длина кабеля"
                                        : isEnglish ? "Mat area" : "Площадь мата"}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 shadow-md">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-primary">
                                    <Thermometer className="h-3.5 w-3.5" /> {isEnglish ? "Monthly energy" : "Энергия/мес"}
                                </div>
                                <p className="mt-2 text-2xl font-bold text-primary">
                                    {result.monthlyKwh.toFixed(1)} {isEnglish ? "kWh" : "кВт·ч"}
                                </p>
                                {result.estimatedCost !== undefined && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {isEnglish
                                            ? `Estimated cost: ${result.estimatedCost.toFixed(2)} $`
                                            : `Стоимость: ${result.estimatedCost.toFixed(2)} ₽`}
                                    </p>
                                )}
                            </div>
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">
                            {isEnglish
                                ? "Tip: for main heating increase coverage to 90–95% and keep load at 60–70%."
                                : "Совет: для основного отопления увеличьте покрытие до 90–95% и держите загрузку 60–70%."}
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

