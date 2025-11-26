"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Home, Ruler, Plus, Trash2, Square } from "lucide-react"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, WallpaperCalcDict, ButtonsDict } from "@/types/calc"
import { computeWallpaper } from "@/lib/calculations"

const calcData = calcDataJson as CalcData

interface Window {
    id: number
    width: string
    height: string
}

interface Door {
    id: number
    width: string
    height: string
}

export function WallpaperCalculator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en") || pathname.endsWith("-en")
    const locale: Locale = isEnglish ? "en" : "ru"

    const t: WallpaperCalcDict = calcData[locale].calc.wallpaper
    const b: ButtonsDict = calcData[locale].calc.buttons

    const [calculationType, setCalculationType] = useState<"room" | "walls">("room")
    
    // Размеры комнаты
    const [roomWidth, setRoomWidth] = useState("")
    const [roomLength, setRoomLength] = useState("")
    const [roomHeight, setRoomHeight] = useState("2.7")
    
    // Размеры стены (для режима "стены")
    const [wallLength, setWallLength] = useState("")
    const [wallHeight, setWallHeight] = useState("2.7")
    
    // Окна и двери
    const [windows, setWindows] = useState<Window[]>([{ id: 1, width: "", height: "" }])
    const [doors, setDoors] = useState<Door[]>([{ id: 1, width: "", height: "" }])
    const [nextWindowId, setNextWindowId] = useState(2)
    const [nextDoorId, setNextDoorId] = useState(2)
    
    // Размеры обоев
    const [rollWidth, setRollWidth] = useState("53") // см
    const [rollLength, setRollLength] = useState("10") // м
    const [patternRepeat, setPatternRepeat] = useState("0") // см
    const [patternOffset, setPatternOffset] = useState(false)
    
    const [result, setResult] = useState<number | null>(null)
    const [wallArea, setWallArea] = useState<number | null>(null)

    const addWindow = () => {
        setWindows([...windows, { id: nextWindowId, width: "", height: "" }])
        setNextWindowId(nextWindowId + 1)
    }

    const removeWindow = (id: number) => {
        if (windows.length > 1) {
            setWindows(windows.filter(w => w.id !== id))
        }
    }

    const updateWindow = (id: number, field: "width" | "height", value: string) => {
        setWindows(windows.map(w => w.id === id ? { ...w, [field]: value } : w))
    }

    const addDoor = () => {
        setDoors([...doors, { id: nextDoorId, width: "", height: "" }])
        setNextDoorId(nextDoorId + 1)
    }

    const removeDoor = (id: number) => {
        if (doors.length > 1) {
            setDoors(doors.filter(d => d.id !== id))
        }
    }

    const updateDoor = (id: number, field: "width" | "height", value: string) => {
        setDoors(doors.map(d => d.id === id ? { ...d, [field]: value } : d))
    }

    const calculate = () => {
        const roomWidthNum = parseFloat(roomWidth.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const roomLengthNum = parseFloat(roomLength.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const roomHeightNum = parseFloat(roomHeight.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const wallLengthNum = parseFloat(wallLength.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const wallHeightNum = parseFloat(wallHeight.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const rollWidthNum = parseFloat(rollWidth.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const rollLengthNum = parseFloat(rollLength.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const patternRepeatNum = parseFloat(patternRepeat.replace(",", ".").replace(/[^0-9.-]/g, ""))

        if (
            [rollWidthNum, rollLengthNum].some((v) => isNaN(v) || !isFinite(v)) ||
            (calculationType === "room" &&
                [roomWidthNum, roomLengthNum, roomHeightNum].some((v) => isNaN(v) || !isFinite(v))) ||
            (calculationType === "walls" &&
                [wallLengthNum, wallHeightNum].some((v) => isNaN(v) || !isFinite(v)))
        ) {
            return
        }

        const numericWindows = windows.map((w) => ({
            width: parseFloat(w.width.replace(",", ".").replace(/[^0-9.-]/g, "") || "0"),
            height: parseFloat(w.height.replace(",", ".").replace(/[^0-9.-]/g, "") || "0"),
        }))

        const numericDoors = doors.map((d) => ({
            width: parseFloat(d.width.replace(",", ".").replace(/[^0-9.-]/g, "") || "0"),
            height: parseFloat(d.height.replace(",", ".").replace(/[^0-9.-]/g, "") || "0"),
        }))

        const res = computeWallpaper({
            calculationType,
            roomWidth: roomWidthNum || 0,
            roomLength: roomLengthNum || 0,
            roomHeight: roomHeightNum || 0,
            wallLength: wallLengthNum || 0,
            wallHeight: wallHeightNum || 0,
            windows: numericWindows,
            doors: numericDoors,
            rollWidthCm: rollWidthNum,
            rollLengthM: rollLengthNum,
            patternRepeatCm: patternRepeatNum || 0,
            patternOffset,
        })

        if (!res) return

        setWallArea(res.wallArea)
        setResult(res.rollsNeeded)
    }

    const buildSummary = () => {
        const lines: string[] = []

        if (isEnglish) {
            lines.push("Wallpaper Calculator — result")
        } else {
            lines.push("Калькулятор обоев — результат")
        }

        lines.push("")

        if (calculationType === "room") {
            if (roomWidth || roomLength || roomHeight) {
                lines.push(
                    isEnglish
                        ? `Room size: width ${roomWidth || "-"} m, length ${roomLength || "-"} m, height ${roomHeight || "-"} m.`
                        : `Размер комнаты: ширина ${roomWidth || "-"} м, длина ${roomLength || "-"} м, высота ${roomHeight || "-"} м.`,
                )
            }
        } else {
            if (wallLength || wallHeight) {
                lines.push(
                    isEnglish
                        ? `Wall size: length ${wallLength || "-"} m, height ${wallHeight || "-"} m.`
                        : `Размер стены: длина ${wallLength || "-"} м, высота ${wallHeight || "-"} м.`,
                )
            }
        }

        if (windows.length || doors.length) {
            lines.push(
                isEnglish
                    ? `Openings: windows ${windows.length}, doors ${doors.length}.`
                    : `Проёмы: окон ${windows.length}, дверей ${doors.length}.`,
            )
        }

        lines.push(
            isEnglish
                ? `Wallpaper roll: width ${rollWidth || "-"} cm, length ${rollLength || "-"} m.`
                : `Рулон обоев: ширина ${rollWidth || "-"} см, длина ${rollLength || "-"} м.`,
        )

        if (patternRepeat && patternRepeat !== "0") {
            lines.push(
                isEnglish
                    ? `Pattern repeat: ${patternRepeat} cm${patternOffset ? " with offset" : ""}.`
                    : `Раппорт рисунка: ${patternRepeat} см${patternOffset ? " со смещением" : ""}.`,
            )
        }

        if (wallArea !== null) {
            lines.push(
                isEnglish
                    ? `Net wall area: ${wallArea.toFixed(2)} m².`
                    : `Чистая площадь стен: ${wallArea.toFixed(2)} м².`,
            )
        }

        if (result !== null) {
            lines.push("")
            lines.push(
                isEnglish
                    ? `Wallpaper rolls needed: ${result} rolls.`
                    : `Необходимое количество рулонов обоев: ${result} рулонов.`,
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
    <title>${isEnglish ? "Wallpaper result — renohacks.com" : "Результат расчёта обоев — renohacks.com"}</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 24px; color: #111827; }
      h1 { font-size: 20px; margin-bottom: 12px; }
      pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
    </style>
  </head>
  <body>
    <h1>${isEnglish ? "Wallpaper calculator result" : "Результат калькулятора обоев"}</h1>
    <pre>`)
        doc.write(summaryText)
        doc.write(`</pre>
  </body>
</html>`)
        doc.close()
        printWindow.focus()
        printWindow.print()
    }

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
                            ? "Calculate the number of wallpaper rolls needed for your room, accounting for wall area, pattern repeat, and waste."
                            : "Рассчитайте количество рулонов обоев с учетом площади стен, раппорта рисунка и запаса."}
                    </p>
                </div>

                {/* Выбор типа расчета */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setCalculationType("room")}
                        className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all ${
                            calculationType === "room"
                                ? "border-primary/50 bg-primary/10 shadow-md"
                                : "border-border/40 bg-card/50 hover:border-primary/30"
                        }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Home className={`h-6 w-6 ${calculationType === "room" ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`text-sm font-medium ${calculationType === "room" ? "text-primary" : "text-muted-foreground"}`}>
                                {isEnglish ? "Room dimensions" : "Размеры комнаты"}
                            </span>
                        </div>
                    </button>
                    <button
                        onClick={() => setCalculationType("walls")}
                        className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all ${
                            calculationType === "walls"
                                ? "border-primary/50 bg-primary/10 shadow-md"
                                : "border-border/40 bg-card/50 hover:border-primary/30"
                        }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <Square className={`h-6 w-6 ${calculationType === "walls" ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`text-sm font-medium ${calculationType === "walls" ? "text-primary" : "text-muted-foreground"}`}>
                                {isEnglish ? "Wall dimensions" : "Размеры стены"}
                            </span>
                        </div>
                    </button>
                </div>

                {/* Размеры комнаты */}
                {calculationType === "room" && (
                    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-4">
                        <label className="text-xs font-medium text-muted-foreground block">
                            {isEnglish ? "Room dimensions" : "Размеры комнаты"}
                        </label>
                        <div className="grid gap-3 md:grid-cols-3">
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground flex items-center gap-2">
                                    <Ruler className="h-3.5 w-3.5" />
                                    {isEnglish ? "Width (m)" : "Ширина (м)"}
                                </label>
                                <Input
                                    type="number"
                                    placeholder="4"
                                    value={roomWidth}
                                    onChange={(e) => setRoomWidth(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground flex items-center gap-2">
                                    <Ruler className="h-3.5 w-3.5" />
                                    {isEnglish ? "Length (m)" : "Длина (м)"}
                                </label>
                                <Input
                                    type="number"
                                    placeholder="4"
                                    value={roomLength}
                                    onChange={(e) => setRoomLength(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground flex items-center gap-2">
                                    <Ruler className="h-3.5 w-3.5" />
                                    {isEnglish ? "Height (m)" : "Высота (м)"}
                                </label>
                                <Input
                                    type="number"
                                    placeholder="2.7"
                                    value={roomHeight}
                                    onChange={(e) => setRoomHeight(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Размеры стены */}
                {calculationType === "walls" && (
                    <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-4">
                        <label className="text-xs font-medium text-muted-foreground block">
                            {isEnglish ? "Wall dimensions" : "Размеры стены"}
                        </label>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground flex items-center gap-2">
                                    <Ruler className="h-3.5 w-3.5" />
                                    {isEnglish ? "Length (m)" : "Длина (м)"}
                                </label>
                                <Input
                                    type="number"
                                    placeholder="4"
                                    value={wallLength}
                                    onChange={(e) => setWallLength(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-muted-foreground flex items-center gap-2">
                                    <Ruler className="h-3.5 w-3.5" />
                                    {isEnglish ? "Height (m)" : "Высота (м)"}
                                </label>
                                <Input
                                    type="number"
                                    placeholder="2.7"
                                    value={wallHeight}
                                    onChange={(e) => setWallHeight(e.target.value)}
                                    className="rounded-xl border-border/60 bg-background/80"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Окна */}
                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground">
                            {isEnglish ? "Windows" : "Окна"}
                        </label>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={addWindow}
                            className="h-7 text-xs"
                        >
                            <Plus className="h-3 w-3 mr-1" />
                            {isEnglish ? "Add window" : "Добавить окно"}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {windows.map((window, index) => (
                            <div key={window.id} className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground w-8">{index + 1}</span>
                                <Input
                                    type="number"
                                    placeholder={isEnglish ? "Width (m)" : "Ширина (м)"}
                                    value={window.width}
                                    onChange={(e) => updateWindow(window.id, "width", e.target.value)}
                                    className="flex-1 rounded-xl border-border/60 bg-background/80 text-sm"
                                />
                                <Input
                                    type="number"
                                    placeholder={isEnglish ? "Height (m)" : "Высота (м)"}
                                    value={window.height}
                                    onChange={(e) => updateWindow(window.id, "height", e.target.value)}
                                    className="flex-1 rounded-xl border-border/60 bg-background/80 text-sm"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeWindow(window.id)}
                                    disabled={windows.length === 1}
                                    className="h-8 w-8"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Двери */}
                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground">
                            {isEnglish ? "Doors" : "Двери"}
                        </label>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={addDoor}
                            className="h-7 text-xs"
                        >
                            <Plus className="h-3 w-3 mr-1" />
                            {isEnglish ? "Add door" : "Добавить дверь"}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {doors.map((door, index) => (
                            <div key={door.id} className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground w-8">{index + 1}</span>
                                <Input
                                    type="number"
                                    placeholder={isEnglish ? "Width (m)" : "Ширина (м)"}
                                    value={door.width}
                                    onChange={(e) => updateDoor(door.id, "width", e.target.value)}
                                    className="flex-1 rounded-xl border-border/60 bg-background/80 text-sm"
                                />
                                <Input
                                    type="number"
                                    placeholder={isEnglish ? "Height (m)" : "Высота (м)"}
                                    value={door.height}
                                    onChange={(e) => updateDoor(door.id, "height", e.target.value)}
                                    className="flex-1 rounded-xl border-border/60 bg-background/80 text-sm"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeDoor(door.id)}
                                    disabled={doors.length === 1}
                                    className="h-8 w-8"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Размеры обоев */}
                <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm space-y-4">
                    <label className="text-xs font-medium text-muted-foreground block">
                        {isEnglish ? "Wallpaper dimensions" : "Размеры обоев"}
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">{isEnglish ? "Roll width (cm)" : "Ширина рулона (см)"}</label>
                            <Input
                                type="number"
                                placeholder="53"
                                value={rollWidth}
                                onChange={(e) => setRollWidth(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">{isEnglish ? "Roll length (m)" : "Длина рулона (м)"}</label>
                            <Input
                                type="number"
                                placeholder="10"
                                value={rollLength}
                                onChange={(e) => setRollLength(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">{isEnglish ? "Pattern repeat (cm)" : "Повтор рисунка (раппорт) (см)"}</label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={patternRepeat}
                                onChange={(e) => setPatternRepeat(e.target.value)}
                                className="rounded-xl border-border/60 bg-background/80"
                            />
                        </div>
                        {parseFloat(patternRepeat || "0") > 0 && (
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={patternOffset}
                                    onChange={(e) => setPatternOffset(e.target.checked)}
                                    className="rounded border-border"
                                />
                                <span className="text-xs text-muted-foreground">
                                    {isEnglish ? "With offset" : "Со смещением"}
                                </span>
                            </label>
                        )}
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
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-emerald-50/20 p-4 shadow-sm dark:from-card dark:to-emerald-500/10">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Calculator className="h-3.5 w-3.5 text-primary" /> {isEnglish ? "Rolls needed" : "Рулонов нужно"}
                            </div>
                            <p className="mt-2 text-2xl font-bold text-primary">
                                {result} {isEnglish ? "rolls" : "рулонов"}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-amber-50/20 p-4 shadow-sm dark:from-card dark:to-amber-500/10">
                            <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                                <Ruler className="h-3.5 w-3.5 text-amber-500" /> {isEnglish ? "Wall area" : "Площадь стен"}
                            </div>
                            <p className="mt-2 text-lg font-semibold text-amber-600">
                                {wallArea?.toFixed(2)} м²
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
                </>
            )}
            </div>
        </div>
    )
}
