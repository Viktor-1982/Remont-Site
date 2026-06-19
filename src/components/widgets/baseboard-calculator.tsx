"use client"

import { useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Ruler, DoorOpen, Package } from "lucide-react"
import { CalculationResultNotes } from "@/components/widgets/calculation-result-notes"
import { computeBaseboard, type BaseboardMode } from "@/lib/calculations"

const currencyOptions = {
    ru: [
        { code: "RUB", symbol: "₽", name: "Рубль", priceExample: "480" },
        { code: "BYN", symbol: "Br", name: "Белорусский рубль", priceExample: "16" },
        { code: "UAH", symbol: "₴", name: "Гривна", priceExample: "250" },
        { code: "KZT", symbol: "₸", name: "Тенге", priceExample: "2900" },
        { code: "USD", symbol: "$", name: "Доллар США", priceExample: "6" },
        { code: "EUR", symbol: "€", name: "Евро", priceExample: "5.5" },
        { code: "TRY", symbol: "₺", name: "Турецкая лира", priceExample: "190" },
    ],
    en: [
        { code: "USD", symbol: "$", name: "US Dollar", priceExample: "6" },
        { code: "EUR", symbol: "€", name: "Euro", priceExample: "5.5" },
        { code: "GBP", symbol: "£", name: "British Pound", priceExample: "5" },
        { code: "SGD", symbol: "S$", name: "Singapore Dollar", priceExample: "8" },
    ],
} as const

export function BaseboardCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const locale = isEnglish ? "en" : "ru"
    const localeTag = isEnglish ? "en-US" : "ru-RU"

    const [mode, setMode] = useState<BaseboardMode>("room")
    const [roomLength, setRoomLength] = useState("")
    const [roomWidth, setRoomWidth] = useState("")
    const [customPerimeter, setCustomPerimeter] = useState("")
    const [doorways, setDoorways] = useState("1")
    const [doorwayWidth, setDoorwayWidth] = useState("0.8")
    const [profileLength, setProfileLength] = useState("2.4")
    const [waste, setWaste] = useState("7")
    const [pricePerPiece, setPricePerPiece] = useState("")
    const [currency, setCurrency] = useState(isEnglish ? "USD" : "RUB")
    const [result, setResult] = useState<ReturnType<typeof computeBaseboard> | null>(null)

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
        const parsedPrice = parseNumber(pricePerPiece)
        const res = computeBaseboard({
            mode,
            roomLength: parseNumber(roomLength),
            roomWidth: parseNumber(roomWidth),
            customPerimeter: parseNumber(customPerimeter),
            doorways: parseInt(doorways.replace(/[^0-9]/g, "") || "0", 10),
            doorwayWidth: parseNumber(doorwayWidth),
            profileLengthM: parseNumber(profileLength),
            wastePercent: parseNumber(waste),
            pricePerPiece: Number.isFinite(parsedPrice) ? parsedPrice : undefined,
        })

        if (!res) return
        setResult(res)
    }

    const resultNotes =
        result !== null
            ? isEnglish
                ? {
                      title: "How to read this result",
                      intro: `The calculator already subtracts doorway width, adds your waste percentage and converts the total length into full baseboard pieces.`,
                      sections: [
                          {
                              title: "Already included",
                              items: [
                                  mode === "room"
                                      ? `Room perimeter from ${roomLength || "-"} m × ${roomWidth || "-"} m.`
                                      : `Custom perimeter: ${customPerimeter || "-"} m.`,
                                  `Doorway deduction: ${doorways || "0"} opening(s) × ${doorwayWidth || "-"} m.`,
                                  `Waste reserve: ${waste || "0"}%.`,
                                  `Piece count based on ${profileLength || "-"} m profile length.`,
                              ],
                          },
                          {
                              title: "Not included automatically",
                              items: [
                                  "Outside corners, end caps, connectors or custom decorative moldings.",
                                  "Additional loss from bad cuts if corners are far from square.",
                                  "Separate pricing for accessories if the brand sells them outside the main profile.",
                              ],
                          },
                          {
                              title: "Reserve in the number",
                              items: [
                                  `The total already contains ${waste || "0"}% waste.`,
                                  "That reserve is usually enough for standard rectangular rooms with normal corner cutting.",
                                  "For complicated hallways or many external corners, increase waste instead of forcing the piece count down.",
                              ],
                          },
                          {
                              title: "Where people miscalculate",
                              items: [
                                  "They subtract every opening but forget returns, corner cuts and short offcuts.",
                                  "They count linear meters correctly but forget the profile is sold in fixed piece lengths.",
                                  "They price only the main boards and ignore corner accessories and connectors.",
                              ],
                          },
                      ],
                  }
                : {
                      title: "Как читать этот результат",
                      intro: `Калькулятор уже вычитает ширину проемов, добавляет ваш запас и переводит общую длину в полные планки плинтуса.`,
                      sections: [
                          {
                              title: "Что уже учтено",
                              items: [
                                  mode === "room"
                                      ? `Периметр комнаты по размерам ${roomLength || "-"} × ${roomWidth || "-"} м.`
                                      : `Готовый периметр: ${customPerimeter || "-"} м.`,
                                  `Вычет проемов: ${doorways || "0"} проем(ов) × ${doorwayWidth || "-"} м.`,
                                  `Запас: ${waste || "0"}%.`,
                                  `Количество планок по длине профиля ${profileLength || "-"} м.`,
                              ],
                          },
                          {
                              title: "Что не учтено автоматически",
                              items: [
                                  "Наружные углы, заглушки, соединители и декоративные доборы.",
                                  "Повышенный перерасход, если углы далеки от 90° и резов будет больше обычного.",
                                  "Отдельная стоимость аксессуаров, если производитель продает их вне основной планки.",
                              ],
                          },
                          {
                              title: "Какой запас уже заложен",
                              items: [
                                  `В расчет уже включен запас ${waste || "0"}%.`,
                                  "Обычно его хватает для стандартной прямоугольной комнаты с обычной подрезкой углов.",
                                  "Если коридор сложный или наружных углов много, лучше увеличить запас, а не пытаться ужать число планок.",
                              ],
                          },
                          {
                              title: "Где чаще ошибаются",
                              items: [
                                  "Вычитают все проемы, но забывают про возвраты, запилы на углах и короткие остатки.",
                                  "Правильно считают погонные метры, но забывают, что плинтус продается фиксированной длиной планки.",
                                  "Смотрят только на цену основных планок и не добавляют аксессуары.",
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
                        {isEnglish ? "Baseboard Calculator" : "Калькулятор плинтуса"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish
                            ? "Calculate linear meters, number of baseboard pieces and cost with doorway deductions."
                            : "Рассчитайте погонные метры, количество планок плинтуса и стоимость с вычетом дверных проёмов."}
                    </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                    <label className="text-xs font-medium text-muted-foreground block">
                        {isEnglish ? "Calculation mode" : "Режим расчёта"}
                    </label>
                    <div className="grid gap-2 md:grid-cols-2">
                        {[
                            {
                                value: "room" as BaseboardMode,
                                label: isEnglish ? "Room dimensions" : "Размеры комнаты",
                                hint: isEnglish ? "For a standard rectangular room" : "Для обычной прямоугольной комнаты",
                            },
                            {
                                value: "custom" as BaseboardMode,
                                label: isEnglish ? "Custom perimeter" : "Готовый периметр",
                                hint: isEnglish ? "If the room has a complex shape" : "Если форма сложная и периметр уже известен",
                            },
                        ].map((option) => {
                            const active = mode === option.value
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setMode(option.value)}
                                    className={`rounded-xl border-2 p-3 text-left transition-all ${
                                        active
                                            ? "border-primary/50 bg-primary/10 shadow-sm"
                                            : "border-border/40 bg-card/50 hover:border-primary/30"
                                    }`}
                                >
                                    <div className={`text-xs font-medium ${active ? "text-primary" : "text-foreground"}`}>
                                        {option.label}
                                    </div>
                                    <div className="mt-1 text-[11px] text-muted-foreground">{option.hint}</div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {mode === "room" ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Room length (m)" : "Длина комнаты (м)"}</label>
                            <Input value={roomLength} onChange={(e) => setRoomLength(e.target.value)} placeholder="5.0" className="rounded-xl border-border/60 bg-background/80" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Room width (m)" : "Ширина комнаты (м)"}</label>
                            <Input value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} placeholder="4.0" className="rounded-xl border-border/60 bg-background/80" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Perimeter (m)" : "Периметр (м)"}</label>
                        <Input value={customPerimeter} onChange={(e) => setCustomPerimeter(e.target.value)} placeholder="22.4" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Doorways" : "Количество проёмов"}</label>
                        <Input value={doorways} onChange={(e) => setDoorways(e.target.value)} placeholder="1" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Doorway width (m)" : "Ширина проёма (м)"}</label>
                        <Input value={doorwayWidth} onChange={(e) => setDoorwayWidth(e.target.value)} placeholder="0.8" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Profile length (m)" : "Длина планки (м)"}</label>
                        <Input value={profileLength} onChange={(e) => setProfileLength(e.target.value)} placeholder="2.4" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? "Waste (%)" : "Запас (%)"}</label>
                        <Input value={waste} onChange={(e) => setWaste(e.target.value)} placeholder="7" className="rounded-xl border-border/60 bg-background/80" />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">{isEnglish ? `Price per piece (${selectedCurrency.code})` : `Цена планки (${selectedCurrency.code})`}</label>
                        <Input value={pricePerPiece} onChange={(e) => setPricePerPiece(e.target.value)} placeholder={selectedCurrency.priceExample} className="rounded-xl border-border/60 bg-background/80" />
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
                    {isEnglish ? "Calculate baseboard" : "Рассчитать плинтус"}
                </Button>

                {result && (
                    <>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-emerald-50/20 p-4 shadow-sm dark:to-emerald-500/10">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Ruler className="h-3.5 w-3.5 text-primary" /> {isEnglish ? "Perimeter" : "Периметр"}
                            </div>
                            <p className="mt-2 text-lg font-semibold text-foreground">{result.perimeterM.toFixed(2)} {isEnglish ? "m" : "м"}</p>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-blue-50/20 p-4 shadow-sm dark:to-blue-500/10">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <DoorOpen className="h-3.5 w-3.5 text-blue-500" /> {isEnglish ? "Openings deducted" : "Вычет проёмов"}
                            </div>
                            <p className="mt-2 text-lg font-semibold text-blue-600">{result.openingsWidthM.toFixed(2)} {isEnglish ? "m" : "м"}</p>
                            <p className="text-xs text-muted-foreground mt-1">{isEnglish ? `Net length: ${result.netLengthM.toFixed(2)} m` : `Чистая длина: ${result.netLengthM.toFixed(2)} м`}</p>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-amber-50/20 p-4 shadow-sm dark:to-amber-500/10">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Package className="h-3.5 w-3.5 text-amber-500" /> {isEnglish ? "Pieces" : "Планки"}
                            </div>
                            <p className="mt-2 text-lg font-semibold text-amber-600">{result.piecesNeeded}</p>
                            <p className="text-xs text-muted-foreground mt-1">{isEnglish ? `With waste: ${result.totalLengthWithWasteM.toFixed(2)} m` : `С запасом: ${result.totalLengthWithWasteM.toFixed(2)} м`}</p>
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
                    {resultNotes ? <CalculationResultNotes {...resultNotes} /> : null}
                    </>
                )}
            </div>
        </div>
    )
}
