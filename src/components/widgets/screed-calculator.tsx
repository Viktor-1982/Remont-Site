"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Layers, Package, Droplets } from "lucide-react"
import { computeScreed, type ScreedMixType } from "@/lib/calculations"

const mixOptions: Array<{
    value: ScreedMixType
    consumption: string
    ru: { label: string; hint: string }
    en: { label: string; hint: string }
}> = [
    {
        value: "self-leveling",
        consumption: "16",
        ru: { label: "Наливной пол", hint: "Обычно 15–17 кг на м² при 10 мм" },
        en: { label: "Self-leveling mix", hint: "Usually 15–17 kg per m² at 10 mm" },
    },
    {
        value: "cement-sand",
        consumption: "18",
        ru: { label: "Цементная стяжка", hint: "Обычно 17–20 кг на м² при 10 мм" },
        en: { label: "Cement screed", hint: "Usually 17–20 kg per m² at 10 mm" },
    },
    {
        value: "lightweight",
        consumption: "12",
        ru: { label: "Лёгкая смесь", hint: "Для облегчённых составов и выравнивания" },
        en: { label: "Lightweight mix", hint: "For lightweight leveling mixes" },
    },
]

const currencyOptions = {
    ru: [
        { code: "RUB", symbol: "₽", name: "Рубль", priceExample: "420" },
        { code: "BYN", symbol: "Br", name: "Белорусский рубль", priceExample: "14" },
        { code: "UAH", symbol: "₴", name: "Гривна", priceExample: "220" },
        { code: "KZT", symbol: "₸", name: "Тенге", priceExample: "2600" },
        { code: "USD", symbol: "$", name: "Доллар США", priceExample: "5" },
        { code: "EUR", symbol: "€", name: "Евро", priceExample: "4.7" },
        { code: "TRY", symbol: "₺", name: "Турецкая лира", priceExample: "160" },
    ],
    en: [
        { code: "USD", symbol: "$", name: "US Dollar", priceExample: "5" },
        { code: "EUR", symbol: "€", name: "Euro", priceExample: "4.7" },
        { code: "GBP", symbol: "£", name: "British Pound", priceExample: "4.2" },
    ],
} as const

export function ScreedCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const locale = isEnglish ? "en" : "ru"
    const localeTag = isEnglish ? "en-US" : "ru-RU"

    const [mixType, setMixType] = useState<ScreedMixType>("cement-sand")
    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [thickness, setThickness] = useState("50")
    const [consumption, setConsumption] = useState("18")
    const [bagWeight, setBagWeight] = useState("25")
    const [reserve, setReserve] = useState("5")
    const [waterPerBag, setWaterPerBag] = useState("4.5")
    const [pricePerBag, setPricePerBag] = useState("")
    const [currency, setCurrency] = useState(isEnglish ? "USD" : "RUB")
    const [result, setResult] = useState<ReturnType<typeof computeScreed> | null>(null)

    useEffect(() => {
        const preset = mixOptions.find((option) => option.value === mixType)
        if (preset) setConsumption(preset.consumption)
    }, [mixType])

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
        const parsedWater = parseNumber(waterPerBag)
        const parsedPrice = parseNumber(pricePerBag)
        const res = computeScreed({
            length: parseNumber(length),
            width: parseNumber(width),
            thicknessMm: parseNumber(thickness),
            consumptionKgPerM2Per10Mm: parseNumber(consumption),
            bagWeightKg: parseNumber(bagWeight),
            reservePercent: parseNumber(reserve),
            waterPerBagL: Number.isFinite(parsedWater) ? parsedWater : undefined,
            pricePerBag: Number.isFinite(parsedPrice) ? parsedPrice : undefined,
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
                        <Calculator className="h-3.5 w-3.5" /> Renohacks Pro Tool
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {isEnglish ? "Screed Calculator" : "Калькулятор стяжки пола"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish
                            ? "Calculate screed volume, dry mix, bag count and water for a floor leveling layer."
                            : "Рассчитайте объём стяжки, расход сухой смеси, количество мешков и воду для выравнивания пола."}
                    </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                    <label className="text-xs font-medium text-muted-foreground block">{isEnglish ? "Mix type" : "Тип смеси"}</label>
                    <div className="grid gap-2 md:grid-cols-3">
                        {mixOptions.map((option) => {
                            const active = mixType === option.value
                            const text = isEnglish ? option.en : option.ru
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setMixType(option.value)}
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

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Room length (m)" : "Длина помещения (м)"}</label>
                        <Input value={length} onChange={(e) => setLength(e.target.value)} placeholder="5.0" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Room width (m)" : "Ширина помещения (м)"}</label>
                        <Input value={width} onChange={(e) => setWidth(e.target.value)} placeholder="4.0" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Average thickness (mm)" : "Средняя толщина (мм)"}</label>
                        <Input value={thickness} onChange={(e) => setThickness(e.target.value)} placeholder="50" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Consumption (kg/m²/10 mm)" : "Расход (кг/м²/10 мм)"}</label>
                        <Input value={consumption} onChange={(e) => setConsumption(e.target.value)} placeholder="18" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Bag weight (kg)" : "Вес мешка (кг)"}</label>
                        <Input value={bagWeight} onChange={(e) => setBagWeight(e.target.value)} placeholder="25" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Reserve (%)" : "Запас (%)"}</label>
                        <Input value={reserve} onChange={(e) => setReserve(e.target.value)} placeholder="5" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Water per bag (L)" : "Вода на мешок (л)"}</label>
                        <Input value={waterPerBag} onChange={(e) => setWaterPerBag(e.target.value)} placeholder="4.5" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? `Price per bag (${selectedCurrency.code})` : `Цена мешка (${selectedCurrency.code})`}</label>
                        <Input value={pricePerBag} onChange={(e) => setPricePerBag(e.target.value)} placeholder={selectedCurrency.priceExample} className="rounded-xl border-border/60 bg-background/80" />
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
                    {isEnglish ? "Calculate screed" : "Рассчитать стяжку"}
                </Button>

                {result && (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-emerald-50/20 p-4 shadow-sm dark:to-emerald-500/10">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Layers className="h-3.5 w-3.5 text-primary" /> {isEnglish ? "Area" : "Площадь"}
                            </div>
                            <p className="mt-2 text-lg font-semibold text-foreground">{result.areaM2.toFixed(2)} {isEnglish ? "m²" : "м²"}</p>
                            <p className="text-xs text-muted-foreground mt-1">{isEnglish ? `Volume: ${result.volumeM3.toFixed(3)} m³` : `Объём: ${result.volumeM3.toFixed(3)} м³`}</p>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-blue-50/20 p-4 shadow-sm dark:to-blue-500/10">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Package className="h-3.5 w-3.5 text-blue-500" /> {isEnglish ? "Dry mix" : "Сухая смесь"}
                            </div>
                            <p className="mt-2 text-lg font-semibold text-blue-600">{result.dryMixKg.toFixed(0)} {isEnglish ? "kg" : "кг"}</p>
                            <p className="text-xs text-muted-foreground mt-1">{isEnglish ? `${result.bagsNeeded} bags` : `${result.bagsNeeded} мешков`}</p>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-amber-50/20 p-4 shadow-sm dark:to-amber-500/10">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Droplets className="h-3.5 w-3.5 text-amber-500" /> {isEnglish ? "Water" : "Вода"}
                            </div>
                            <p className="mt-2 text-lg font-semibold text-amber-600">
                                {result.waterLiters !== undefined ? `${result.waterLiters.toFixed(1)} ${isEnglish ? "L" : "л"}` : isEnglish ? "Optional" : "Опционально"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{isEnglish ? "Based on water per bag" : "По норме воды на мешок"}</p>
                        </div>
                        <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 shadow-md">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-primary">
                                <Calculator className="h-3.5 w-3.5" /> {isEnglish ? "Cost" : "Стоимость"}
                            </div>
                            <p className="mt-2 text-2xl font-bold text-primary">
                                {result.estimatedCost !== undefined ? formatter.format(result.estimatedCost) : isEnglish ? "Optional" : "Опционально"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
