"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Grid, Ruler, Square } from "lucide-react"
import { CalculationResultNotes } from "@/components/widgets/calculation-result-notes"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, TilesCalcDict, ButtonsDict } from "@/types/calc"
import { computeTile } from "@/lib/calculations"

const calcData = calcDataJson as CalcData

type LayoutType = "straight" | "diagonal" | "herringbone" | "brick"

const layoutOptions = [
    { value: "straight" as LayoutType, labelRu: "Прямая (шов в шов)", labelEn: "Straight (seam to seam)", waste: 10 },
    { value: "diagonal" as LayoutType, labelRu: "Диагональная", labelEn: "Diagonal", waste: 15 },
    { value: "herringbone" as LayoutType, labelRu: "Ёлочка", labelEn: "Herringbone", waste: 20 },
    { value: "brick" as LayoutType, labelRu: "Вразбежку (кирпичная)", labelEn: "Brick pattern", waste: 12 },
]

export function TileCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"

    const t: TilesCalcDict = calcData[locale].calc.tiles
    const b: ButtonsDict = calcData[locale].calc.buttons

    const [surfaceType, setSurfaceType] = useState<"floor" | "wall">("floor")
    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [bathArea, setBathArea] = useState("0") // Площадь ванны/экрана
    const [tileLength, setTileLength] = useState("30")
    const [tileWidth, setTileWidth] = useState("30")
    const [groutWidth, setGroutWidth] = useState("2") // Ширина шва в мм
    const [tilesPerPack, setTilesPerPack] = useState("11") // Количество плиток в упаковке
    const [layoutType, setLayoutType] = useState<LayoutType>("straight")
    const [additionalWaste, setAdditionalWaste] = useState("0") // Дополнительный запас
    const [windows, setWindows] = useState("0")
    const [doors, setDoors] = useState("0")
    const [windowArea, setWindowArea] = useState("2")
    const [doorArea, setDoorArea] = useState("2")
    
    const [result, setResult] = useState<number | null>(null)
    const [packsNeeded, setPacksNeeded] = useState<number | null>(null)
    const [tileArea, setTileArea] = useState<number | null>(null)
    const [glueAmount, setGlueAmount] = useState<number | null>(null)

    const calculate = () => {
        const l = parseFloat(length.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const w = parseFloat(width.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const bath = parseFloat(bathArea.replace(",", ".").replace(/[^0-9.-]/g, "") || "0")
        const tl = parseFloat(tileLength.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const tw = parseFloat(tileWidth.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const grout = parseFloat(groutWidth.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const tilesPerP = parseInt(tilesPerPack.replace(/[^0-9]/g, "") || "1")
        const windowsNum = parseInt(windows.replace(/[^0-9]/g, "") || "0")
        const doorsNum = parseInt(doors.replace(/[^0-9]/g, "") || "0")
        const windowAParsed = parseFloat(windowArea.replace(",", ".").replace(/[^0-9.-]/g, "") || "0")
        const doorAParsed = parseFloat(doorArea.replace(",", ".").replace(/[^0-9.-]/g, "") || "0")
        const windowA = windowsNum > 0 ? (windowAParsed > 0 ? windowAParsed : 2) : 0
        const doorA = doorsNum > 0 ? (doorAParsed > 0 ? doorAParsed : 2) : 0
        const addWaste = parseFloat(additionalWaste.replace(",", ".").replace(/[^0-9.-]/g, "") || "0")

        if (
            [l, w, tl, tw, grout].some((v) => isNaN(v) || !isFinite(v))
        ) {
            return
        }

        const selectedLayout = layoutOptions.find((opt) => opt.value === layoutType)
        const baseWaste = selectedLayout?.waste || 10

        const res = computeTile({
            surfaceType,
            length: l,
            width: w,
            bathArea: bath,
            tileLength: tl,
            tileWidth: tw,
            groutWidth: grout,
            tilesPerPack: tilesPerP,
            windows: windowsNum,
            doors: doorsNum,
            windowArea: windowA,
            doorArea: doorA,
            baseWastePercent: baseWaste,
            additionalWastePercent: addWaste,
        })

        if (!res) return

        setResult(res.tilesNeeded)
        setPacksNeeded(res.packsNeeded)
        setTileArea(res.tileArea)
        setGlueAmount(res.glueAmountKg)
    }

    const buildSummary = () => {
        const lines: string[] = []

        if (isEnglish) {
            lines.push("Tile Calculator Result")
        } else {
            lines.push("Результат расчета плитки")
        }

        lines.push("")

        if (length || width) {
            lines.push(
                isEnglish
                    ? surfaceType === "floor"
                        ? `Floor size: length ${length || "-"} m, width ${width || "-"} m.`
                        : `Wall size: width ${length || "-"} m, height ${width || "-"} m.`
                    : surfaceType === "floor"
                        ? `Размер пола: длина ${length || "-"} м, ширина ${width || "-"} м.`
                        : `Размер стены: ширина ${length || "-"} м, высота ${width || "-"} м.`,
            )
        }

        if (surfaceType === "floor" && bathArea) {
            lines.push(
                isEnglish
                    ? `Subtract bathtub/screen area: ${bathArea || "0"} m².`
                    : `Вычтена площадь ванны/экрана: ${bathArea || "0"} м².`,
            )
        }

        lines.push(
            isEnglish
                ? `Tile size: ${tileLength || "-"} × ${tileWidth || "-"} cm, grout width: ${groutWidth || "0"} mm.`
                : `Размер плитки: ${tileLength || "-"} × ${tileWidth || "-"} см, ширина шва: ${groutWidth || "0"} мм.`,
        )

        if (surfaceType === "wall") {
            lines.push(
                isEnglish
                    ? `Openings: windows ${windows || "0"} (area per window ~${windowArea || "2"} m²), doors ${doors || "0"} (area per door ~${doorArea || "2"} m²).`
                    : `Проёмы: окна ${windows || "0"} (площадь одного ~${windowArea || "2"} м²), двери ${doors || "0"} (площадь одной ~${doorArea || "2"} м²).`,
            )
        }

        lines.push(
            isEnglish
                ? `Layout: ${layoutType}, base waste: ${
                      layoutOptions.find((o) => o.value === layoutType)?.waste ?? 10
                  }%, extra waste: ${additionalWaste || "0"}%.`
                : `Способ укладки: ${layoutType}, базовый запас: ${
                      layoutOptions.find((o) => o.value === layoutType)?.waste ?? 10
                  }%, дополнительный запас: ${additionalWaste || "0"}%.`,
        )

        if (result !== null) {
            lines.push("")
            lines.push(
                isEnglish
                    ? `Tile quantity: ${result} pcs. Add a few spare tiles from the same batch for future repairs.`
                    : `Плитки нужно: ${result} шт. Для спокойной докупки и будущего ремонта лучше оставить несколько плиток из той же партии.`,
            )
        }

        if (packsNeeded !== null) {
            lines.push(
                isEnglish
                    ? `Pack count: ${packsNeeded} packs.`
                    : `Количество упаковок: ${packsNeeded} уп.`,
            )
        }

        if (glueAmount !== null) {
            lines.push(
                isEnglish
                    ? `Adhesive estimate: about ${glueAmount} kg. On larger jobs it is safer to keep one reserve bag.`
                    : `Клей: ориентировочно ${glueAmount} кг. На большой площади лучше держать один мешок в запасе.`,
            )
        }

        lines.push("")
        lines.push(
            isEnglish
                ? "Source: renohacks.com — online calculators and renovation guides."
                : "Источник: renohacks.com — онлайн-калькуляторы и статьи о ремонте.",
        )

        return lines.join("\n")
    }

    const handlePrint = () => {
        if (typeof window === "undefined") return

        const summaryText = buildSummary()
        const printWindow = window.open("", "_blank", "width=800,height=1000")
        if (!printWindow) return

        const doc = printWindow.document
        doc.open()
        doc.write(`<!DOCTYPE html>
<html lang="${isEnglish ? "en" : "ru"}">
  <head>
    <meta charSet="utf-8" />
    <title>${isEnglish ? "Tile result — renohacks.com" : "Результат расчёта плитки — renohacks.com"}</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 24px; color: #111827; }
      h1 { font-size: 20px; margin-bottom: 12px; }
      pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
    </style>
  </head>
  <body>
    <h1>${isEnglish ? "Tile calculator result" : "Результат калькулятора плитки"}</h1>
    <pre>`)
        doc.write(summaryText)
        doc.write(`</pre>
  </body>
</html>`)
        doc.close()
        printWindow.focus()
        printWindow.print()
    }

    const selectedLayout = layoutOptions.find((option) => option.value === layoutType) ?? layoutOptions[0]
    const resultNotes =
        result !== null
            ? isEnglish
                ? {
                      title: "How to read this result",
                      intro: `The tile count already includes ${selectedLayout.waste + (parseFloat(additionalWaste || "0") || 0)}% total waste for the selected layout and any extra reserve you added.`,
                      sections: [
                          {
                              title: "Already included",
                              items: [
                                  surfaceType === "floor"
                                      ? "Floor area minus the bathtub or screen area."
                                      : "Wall area minus windows and doors.",
                                  `Grout width: ${groutWidth || "0"} mm.`,
                                  `Layout reserve: ${selectedLayout.labelEn}.`,
                                  "Pack count and adhesive estimate.",
                              ],
                          },
                          {
                              title: "Not included automatically",
                              items: [
                                  "Grout, spacers, leveling clips and trims.",
                                  "Extra loss from cracked tiles, pattern selection by shade or one-off decorative inserts.",
                                  "Very complex cuts around boxes, niches and corners beyond the reserve you set.",
                              ],
                          },
                          {
                              title: "Reserve in the result",
                              items: [
                                  `Base layout waste: ${selectedLayout.waste}%.`,
                                  `Extra reserve added manually: ${additionalWaste || "0"}%.`,
                                  "Adhesive is estimated from net covered area, so it is still worth keeping one bag in reserve on larger jobs.",
                              ],
                          },
                          {
                              title: "Where people miscalculate",
                              items: [
                                  "They use the nominal tile size but ignore the actual grout joint and layout.",
                                  "They subtract openings too aggressively on walls and end up short after strip cuts.",
                                  "They buy exact box count without checking whether the batch, shade and caliber can be matched later.",
                              ],
                          },
                      ],
                  }
                : {
                      title: "Как читать этот результат",
                      intro: `В количестве плитки уже заложен суммарный запас ${selectedLayout.waste + (parseFloat(additionalWaste || "0") || 0)}% под выбранную раскладку и ваш дополнительный резерв.`,
                      sections: [
                          {
                              title: "Что уже учтено",
                              items: [
                                  surfaceType === "floor"
                                      ? "Площадь пола за вычетом ванны или экрана."
                                      : "Площадь стены за вычетом окон и дверей.",
                                  `Ширина шва: ${groutWidth || "0"} мм.`,
                                  `Раскладка: ${selectedLayout.labelRu}.`,
                                  "Количество упаковок и ориентировочный расход клея.",
                              ],
                          },
                          {
                              title: "Что не учтено автоматически",
                              items: [
                                  "Затирка, крестики, СВП, профили и декоративные вставки.",
                                  "Потери на бой, подбор рисунка и нестандартные вставки по тону.",
                                  "Сложные подрезки вокруг коробов, ниш и наружных углов сверх того запаса, который вы добавили.",
                              ],
                          },
                          {
                              title: "Какой запас уже заложен",
                              items: [
                                  `Базовый запас по раскладке: ${selectedLayout.waste}%.`,
                                  `Дополнительный запас вручную: ${additionalWaste || "0"}%.`,
                                  "Клей считается по чистой площади, поэтому на больших объемах лучше держать один мешок в резерве.",
                              ],
                          },
                          {
                              title: "Где чаще ошибаются",
                              items: [
                                  "Смотрят только на размер плитки и забывают про шов и способ укладки.",
                                  "Слишком агрессивно вычитают проемы на стенах и потом не хватает плитки на подрезку.",
                                  "Покупают коробки впритык, не думая о калибре, тоне и возможной докупке из другой партии.",
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
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
                    <p className="text-sm text-muted-foreground">
                        {isEnglish 
                            ? "Calculate the exact number of tiles needed for floors or walls, including waste, grout, and adhesive."
                            : "Рассчитайте точное количество плитки для пола или стен с учетом запаса, швов и клея."}
                    </p>
                </div>

                {/* Выбор типа поверхности */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setSurfaceType("floor")}
                        className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all ${
                            surfaceType === "floor"
                                ? "border-primary/50 bg-primary/10 shadow-md"
                                : "border-border/40 bg-card/50 hover:border-primary/30"
                        }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Square className={`h-6 w-6 ${surfaceType === "floor" ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`text-sm font-medium ${surfaceType === "floor" ? "text-primary" : "text-muted-foreground"}`}>
                                {isEnglish ? "Floor" : "Пол"}
                            </span>
                        </div>
                    </button>
                    <button
                        onClick={() => setSurfaceType("wall")}
                        className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all ${
                            surfaceType === "wall"
                                ? "border-primary/50 bg-primary/10 shadow-md"
                                : "border-border/40 bg-card/50 hover:border-primary/30"
                        }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Grid className={`h-6 w-6 ${surfaceType === "wall" ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`text-sm font-medium ${surfaceType === "wall" ? "text-primary" : "text-muted-foreground"}`}>
                                {isEnglish ? "Wall" : "Стена"}
                            </span>
                        </div>
                    </button>
                </div>

                {/* Размеры поверхности */}
                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
                    <label className="text-xs font-medium text-muted-foreground mb-3 block">
                        {surfaceType === "floor"
                            ? (isEnglish ? "Room dimensions" : "Параметры помещения")
                            : (isEnglish ? "Wall dimensions" : "Параметры стены")}
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground flex items-center gap-2">
                                <Ruler className="h-3.5 w-3.5" />
                                {surfaceType === "floor"
                                    ? (isEnglish ? "Length (m)" : "Длина помещения (м)")
                                    : (isEnglish ? "Wall width (m)" : "Ширина стены (м)")}
                            </label>
                            <Input
                                type="number"
                                placeholder="3"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                            <p className="text-xs text-muted-foreground/70">
                                {surfaceType === "floor"
                                    ? (isEnglish ? "Measure from wall to wall" : "Измерьте рулеткой от стены до стены")
                                    : (isEnglish ? "Useful width of the wall to be tiled" : "Полезная ширина стены под облицовку")}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground flex items-center gap-2">
                                <Ruler className="h-3.5 w-3.5" />
                                {surfaceType === "floor"
                                    ? (isEnglish ? "Width (m)" : "Ширина помещения (м)")
                                    : (isEnglish ? "Wall height (m)" : "Высота стены (м)")}
                            </label>
                            <Input
                                type="number"
                                placeholder={surfaceType === "floor" ? "2.5" : "2.7"}
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                            <p className="text-xs text-muted-foreground/70">
                                {surfaceType === "floor"
                                    ? (isEnglish ? "From one wall to another" : "От одной стены к другой")
                                    : (isEnglish ? "From floor finish to the planned top edge" : "От чистого пола до верхней границы плитки")}
                            </p>
                        </div>
                    </div>
                    {surfaceType === "wall" && (
                        <p className="mt-3 text-xs text-muted-foreground/70">
                            {isEnglish
                                ? "For a full room, calculate each wall separately and sum the results."
                                : "Для всей комнаты рассчитайте каждую стену отдельно и сложите результаты."}
                        </p>
                    )}
                    {surfaceType === "floor" && (
                        <div className="mt-3 space-y-2">
                            <label className="text-xs text-muted-foreground">
                                {isEnglish ? "Subtract bathtub/screen area (m²)" : "Вычесть площадь ванны/экрана (м²)"}
                            </label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={bathArea}
                                onChange={(e) => setBathArea(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                            <p className="text-xs text-muted-foreground/70">
                                {isEnglish ? "If there is a built-in bathtub or fixed screen" : "Если есть встроенная ванна или неподвижный экран"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Размеры плитки */}
                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
                    <label className="text-xs font-medium text-muted-foreground mb-3 block">
                        {isEnglish ? "Tile parameters" : "Параметры плитки"}
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">{isEnglish ? "Tile length (cm)" : "Длина плитки (см)"}</label>
                            <Input
                                type="number"
                                placeholder="30"
                                value={tileLength}
                                onChange={(e) => setTileLength(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                            <p className="text-xs text-muted-foreground/70">
                                {isEnglish ? "Indicated on the package, e.g. 30×30 cm" : "Указана на упаковке, например 30×30 см"}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">{isEnglish ? "Tile width (cm)" : "Ширина плитки (см)"}</label>
                            <Input
                                type="number"
                                placeholder="30"
                                value={tileWidth}
                                onChange={(e) => setTileWidth(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                            <p className="text-xs text-muted-foreground/70">
                                {isEnglish ? "For square tiles, same as length" : "Для квадратной плитки совпадает с длиной"}
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 mt-3">
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">{isEnglish ? "Grout width (mm)" : "Ширина шва (мм)"}</label>
                            <Input
                                type="number"
                                placeholder="2"
                                value={groutWidth}
                                onChange={(e) => setGroutWidth(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                            <p className="text-xs text-muted-foreground/70">
                                {isEnglish ? "Usually 2–5 mm for ceramic, 1–3 mm for porcelain" : "Обычно 2–5 мм для керамики, 1–3 мм для керамогранита"}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">{isEnglish ? "Tiles per pack (pcs)" : "Количество плиток в упаковке (шт)"}</label>
                            <Input
                                type="number"
                                placeholder="11"
                                value={tilesPerPack}
                                onChange={(e) => setTilesPerPack(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                            <p className="text-xs text-muted-foreground/70">
                                {isEnglish ? "Indicated on the box; needed for pack calculation" : "Указано на коробке; нужно для расчета упаковок"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Окна и двери (только для стен) */}
                {surfaceType === "wall" && (
                    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-4">
                        <label className="text-xs font-medium text-muted-foreground block">
                            {isEnglish ? "Windows and doors" : "Окна и двери"}
                        </label>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">{isEnglish ? "Number of windows" : "Количество окон"}</label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={windows}
                                    onChange={(e) => setWindows(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">{isEnglish ? "Window area (m²)" : "Площадь окна (м²)"}</label>
                                <Input
                                    type="number"
                                    placeholder="2"
                                    value={windowArea}
                                    onChange={(e) => setWindowArea(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">{isEnglish ? "Number of doors" : "Количество дверей"}</label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={doors}
                                    onChange={(e) => setDoors(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground">{isEnglish ? "Door area (m²)" : "Площадь двери (м²)"}</label>
                                <Input
                                    type="number"
                                    placeholder="2"
                                    value={doorArea}
                                    onChange={(e) => setDoorArea(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Способ укладки и запас */}
                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-4">
                    <label className="text-xs font-medium text-muted-foreground block">
                        {isEnglish ? "Layout method and waste" : "Способ укладки и запас"}
                    </label>
                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">{isEnglish ? "Layout method" : "Способ укладки"}</label>
                        <div className="grid gap-2 md:grid-cols-2">
                            {layoutOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setLayoutType(option.value)}
                                    className={`relative overflow-hidden rounded-xl border-2 p-3 text-left transition-all ${
                                        layoutType === option.value
                                            ? "border-primary/50 bg-primary/10 shadow-sm"
                                            : "border-border/40 bg-card/50 hover:border-primary/30"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs font-medium ${layoutType === option.value ? "text-primary" : "text-muted-foreground"}`}>
                                            {isEnglish ? option.labelEn : option.labelRu}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {option.waste}%
                                        </span>
                                    </div>
                                    {layoutType === option.value && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {isEnglish 
                                                ? "Affects cutting waste amount" 
                                                : "Влияет на количество подрезки"}
                                        </p>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">
                            {isEnglish ? "Additional waste (%)" : "Дополнительный запас (%)"}
                        </label>
                        <div className="flex items-center gap-3">
                            <Input
                                type="number"
                                min="0"
                                max="20"
                                value={additionalWaste}
                                onChange={(e) => setAdditionalWaste(e.target.value)}
                                className="w-20 rounded-xl border-border/60 bg-background/80 text-center font-semibold"
                            />
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={parseInt(additionalWaste || "0", 10)}
                                onChange={(e) => setAdditionalWaste(e.target.value)}
                                className="flex-1 accent-primary"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground/70">
                            {isEnglish 
                                ? "If work experience is low, add 5–10%"
                                : "Если опыт работы низкий, добавьте 5–10%"}
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

                {result !== null && (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-emerald-50/20 p-4 shadow-sm dark:from-card dark:to-emerald-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Grid className="h-3.5 w-3.5 text-primary" /> {isEnglish ? "Tiles needed" : "Плитки нужно"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-foreground">
                                    {result} {isEnglish ? "pcs" : "шт"}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-blue-50/20 p-4 shadow-sm dark:from-card dark:to-blue-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Calculator className="h-3.5 w-3.5 text-blue-500" /> {isEnglish ? "Packs needed" : "Упаковок нужно"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-blue-600">
                                    {packsNeeded} {isEnglish ? "packs" : "уп"}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-amber-50/20 p-4 shadow-sm dark:from-card dark:to-amber-500/10">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                    <Ruler className="h-3.5 w-3.5 text-amber-500" /> {isEnglish ? "Tile area" : "Площадь плитки"}
                                </div>
                                <p className="mt-2 text-lg font-semibold text-amber-600">
                                    {tileArea?.toFixed(2)} {isEnglish ? "m²" : "м²"}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 shadow-md">
                                <div className="flex items-center gap-2 text-xs font-medium uppercase text-primary">
                                    <Calculator className="h-3.5 w-3.5" /> {isEnglish ? "Adhesive" : "Клей"}
                                </div>
                                <p className="mt-2 text-2xl font-bold text-primary">
                                    {glueAmount} {isEnglish ? "kg" : "кг"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 rounded-2xl border-primary/40 bg-background/80"
                                onClick={handlePrint}
                            >
                                {isEnglish ? "Save result as PDF" : "Сохранить результат в PDF"}
                            </Button>
                        </div>
                        {resultNotes ? <CalculationResultNotes {...resultNotes} /> : null}
                    </>
                )}
            </div>
        </div>
    )
}
