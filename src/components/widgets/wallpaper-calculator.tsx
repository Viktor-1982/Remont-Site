"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Home, Ruler, Plus, Trash2, Square } from "lucide-react"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, WallpaperCalcDict, ButtonsDict } from "@/types/calc"

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
        let totalWallArea = 0
        
        if (calculationType === "room") {
            // Расчет по размерам комнаты
            const width = parseFloat(roomWidth.replace(",", ".").replace(/[^0-9.-]/g, ""))
            const length = parseFloat(roomLength.replace(",", ".").replace(/[^0-9.-]/g, ""))
            const height = parseFloat(roomHeight.replace(",", ".").replace(/[^0-9.-]/g, ""))
            
            if (isNaN(width) || isNaN(length) || isNaN(height) || 
                !isFinite(width) || !isFinite(length) || !isFinite(height) ||
                width <= 0 || length <= 0 || height <= 0 || width > 100 || length > 100 || height > 10) {
                return
            }
            
            // Периметр комнаты * высота = площадь всех стен
            const perimeter = 2 * (width + length)
            totalWallArea = perimeter * height
        } else {
            // Расчет по размерам стены
            const length = parseFloat(wallLength.replace(",", ".").replace(/[^0-9.-]/g, ""))
            const height = parseFloat(wallHeight.replace(",", ".").replace(/[^0-9.-]/g, ""))
            
            if (isNaN(length) || isNaN(height) || 
                !isFinite(length) || !isFinite(height) ||
                length <= 0 || height <= 0 || length > 100 || height > 10) {
                return
            }
            
            totalWallArea = length * height
        }
        
        // Вычитаем окна
        const windowsArea = windows.reduce((sum, window) => {
            const w = parseFloat(window.width.replace(",", ".").replace(/[^0-9.-]/g, "") || "0")
            const h = parseFloat(window.height.replace(",", ".").replace(/[^0-9.-]/g, "") || "0")
            if (w > 0 && h > 0 && isFinite(w) && isFinite(h)) {
                return sum + (w * h)
            }
            return sum
        }, 0)
        
        // Вычитаем двери
        const doorsArea = doors.reduce((sum, door) => {
            const w = parseFloat(door.width.replace(",", ".").replace(/[^0-9.-]/g, "") || "0")
            const h = parseFloat(door.height.replace(",", ".").replace(/[^0-9.-]/g, "") || "0")
            if (w > 0 && h > 0 && isFinite(w) && isFinite(h)) {
                return sum + (w * h)
            }
            return sum
        }, 0)
        
        const netWallArea = Math.max(0, totalWallArea - windowsArea - doorsArea)
        
        // Размеры рулона
        const rollW = parseFloat(rollWidth.replace(",", ".").replace(/[^0-9.-]/g, "")) / 100 // конвертируем см в м
        const rollL = parseFloat(rollLength.replace(",", ".").replace(/[^0-9.-]/g, ""))
        const patternR = parseFloat(patternRepeat.replace(",", ".").replace(/[^0-9.-]/g, "")) / 100 // конвертируем см в м
        
        if (isNaN(rollW) || isNaN(rollL) || !isFinite(rollW) || !isFinite(rollL) ||
            rollW <= 0 || rollL <= 0 || rollW > 5 || rollL > 50) {
            return
        }
        
        // Расчет количества полос из одного рулона
        let stripsPerRoll = Math.floor(rollL / parseFloat(roomHeight || wallHeight || "2.7"))
        
        // Если есть раппорт, учитываем его
        if (patternR > 0) {
            const usableLength = rollL - patternR // Учитываем раппорт
            stripsPerRoll = Math.floor(usableLength / (parseFloat(roomHeight || wallHeight || "2.7") + patternR))
            if (patternOffset) {
                // При смещении раппорта нужно больше материала
                stripsPerRoll = Math.floor(usableLength / (parseFloat(roomHeight || wallHeight || "2.7") + patternR * 0.5))
            }
        }
        
        if (stripsPerRoll <= 0) stripsPerRoll = 1
        
        // Периметр комнаты (для расчета количества полос)
        let perimeter = 0
        if (calculationType === "room") {
            const width = parseFloat(roomWidth.replace(",", ".").replace(/[^0-9.-]/g, ""))
            const length = parseFloat(roomLength.replace(",", ".").replace(/[^0-9.-]/g, ""))
            perimeter = 2 * (width + length)
        } else {
            perimeter = parseFloat(wallLength.replace(",", ".").replace(/[^0-9.-]/g, "")) * 2 // Примерно для одной стены
        }
        
        // Количество полос нужно
        const stripsNeeded = Math.ceil(perimeter / rollW)
        
        // Количество рулонов
        const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll)
        
        // Добавляем запас (1 рулон)
        const finalRolls = rollsNeeded + 1
        
        setResult(finalRolls)
        setWallArea(netWallArea)
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
            )}
            </div>
        </div>
    )
}
