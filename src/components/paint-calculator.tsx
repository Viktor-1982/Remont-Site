"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

type SavedState = {
    collapsed: boolean
    length: string
    width: string
    height: string
    windowsDoors: string
    consumption: string
    coats: number
    paintCeiling: boolean
    wastePct: number
    roughWall: boolean
    hasPrimer: boolean
}

const STORAGE_KEY = "paintCalc:v1"

export function PaintCalculator() {
    // UI
    const [collapsed, setCollapsed] = useState(false)

    // Inputs
    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [windowsDoors, setWindowsDoors] = useState("0")
    const [consumption, setConsumption] = useState("10") // м²/л за 1 слой (паспортный)
    const [coats, setCoats] = useState(2)
    const [paintCeiling, setPaintCeiling] = useState(false)
    const [wastePct, setWastePct] = useState(10)
    const [roughWall, setRoughWall] = useState(false)
    const [hasPrimer, setHasPrimer] = useState(false)

    // Result
    const [result, setResult] = useState<{
        wallsAreaPerCoat: number
        ceilingAreaPerCoat: number
        wallsTotalArea: number
        ceilingTotalArea: number
        totalArea: number
        litersWalls: number
        litersCeiling: number
        litersTotal: number
        litersRounded: number
        cans: { "9L": number; "2.7L": number; "0.9L": number; totalLiters: number }
        effectiveConsumption: number
    } | null>(null)

    const resultRef = useRef<HTMLDivElement | null>(null)

    // ---------- Helpers ----------
    const num = (v: string): number => {
        const cleaned = v.replace(",", ".").trim()
        const parsed = Number.parseFloat(cleaned)
        return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0
    }

    const suggestCans = (litersNeeded: number) => {
        const sizes = [9, 2.7, 0.9]
        let remain = litersNeeded
        const res = { "9L": 0, "2.7L": 0, "0.9L": 0, totalLiters: 0 }

        res["9L"] = Math.floor(remain / sizes[0]); remain -= res["9L"] * sizes[0]
        res["2.7L"] = Math.floor(remain / sizes[1]); remain -= res["2.7L"] * sizes[1]
        if (remain > 0) res["0.9L"] = Math.ceil(remain / sizes[2])

        res.totalLiters = res["9L"] * 9 + res["2.7L"] * 2.7 + res["0.9L"] * 0.9
        return res
    }

    const validateDims = () => {
        const l = num(length), w = num(width), h = num(height)
        return !!(l && w && h)
    }

    const calcEffectiveConsumption = () => {
        const base = Math.max(num(consumption), 0.1) // защита от деления на 0
        const roughFactor = roughWall ? 0.85 : 1     // -15% к м²/л
        const primerFactor = hasPrimer ? 1.1 : 1     // +10% к м²/л
        return base * roughFactor * primerFactor
    }

    // ---------- Calculate ----------
    const calculate = () => {
        if (!validateDims()) {
            alert("Введите корректные значения длины, ширины и высоты комнаты (больше 0).")
            return
        }

        const l = num(length), w = num(width), h = num(height)
        const wd = num(windowsDoors)
        const consEff = calcEffectiveConsumption()
        const c = Math.max(coats, 1)
        const waste = Math.max(wastePct, 0)

        const wallAreaFull = 2 * (l + w) * h
        const wallsAreaPerCoat = Math.max(wallAreaFull - wd, 0) // окна/двери вычитаем только из стен
        const ceilingAreaPerCoat = paintCeiling ? l * w : 0

        const wallsTotalArea = wallsAreaPerCoat * c * (1 + waste / 100)
        const ceilingTotalArea = ceilingAreaPerCoat * c * (1 + waste / 100)
        const totalArea = wallsTotalArea + ceilingTotalArea

        const litersWalls = wallsTotalArea / consEff
        const litersCeiling = ceilingTotalArea / consEff
        const litersTotal = litersWalls + litersCeiling

        const litersRounded = Math.round(litersTotal * 10) / 10
        const cans = suggestCans(litersTotal)

        setResult({
            wallsAreaPerCoat,
            ceilingAreaPerCoat,
            wallsTotalArea,
            ceilingTotalArea,
            totalArea,
            litersWalls,
            litersCeiling,
            litersTotal,
            litersRounded,
            cans,
            effectiveConsumption: consEff,
        })
    }

    // ---------- Reset ----------
    const reset = () => {
        setLength(""); setWidth(""); setHeight("")
        setWindowsDoors("0"); setConsumption("10")
        setCoats(2); setPaintCeiling(false); setWastePct(10)
        setRoughWall(false); setHasPrimer(false)
        setResult(null)
        if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY)
    }

    // ---------- Load saved state on mount ----------
    useEffect(() => {
        if (typeof window === "undefined") return
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return
            const s: Partial<SavedState> = JSON.parse(raw)

            if (typeof s.collapsed === "boolean") setCollapsed(s.collapsed)
            if (typeof s.length === "string") setLength(s.length)
            if (typeof s.width === "string") setWidth(s.width)
            if (typeof s.height === "string") setHeight(s.height)
            if (typeof s.windowsDoors === "string") setWindowsDoors(s.windowsDoors)
            if (typeof s.consumption === "string") setConsumption(s.consumption)
            if (typeof s.coats === "number") setCoats(Math.max(1, s.coats))
            if (typeof s.paintCeiling === "boolean") setPaintCeiling(s.paintCeiling)
            if (typeof s.wastePct === "number") setWastePct(Math.max(0, s.wastePct))
            if (typeof s.roughWall === "boolean") setRoughWall(s.roughWall)
            if (typeof s.hasPrimer === "boolean") setHasPrimer(s.hasPrimer)
        } catch { /* ignore corrupted data */ }
    }, [])

    // ---------- Autosave on changes ----------
    useEffect(() => {
        if (typeof window === "undefined") return
        const toSave: SavedState = {
            collapsed,
            length, width, height, windowsDoors, consumption,
            coats, paintCeiling, wastePct, roughWall, hasPrimer,
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
        } catch { /* quota or private mode */ }
    }, [
        collapsed,
        length, width, height, windowsDoors, consumption,
        coats, paintCeiling, wastePct, roughWall, hasPrimer,
    ])

    // ---------- Scroll result into view ----------
    useEffect(() => {
        if (result && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [result])

    const effective = calcEffectiveConsumption()

    return (
        <div className="max-w-lg mx-auto">
            {/* Header with collapse */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-blue-500" />
                    <h2 className="text-xl font-semibold">Калькулятор краски</h2>
                </div>
                <Button
                    size="sm"
                    aria-expanded={!collapsed}
                    aria-controls="paint-calc-body"
                    onClick={() => setCollapsed(v => !v)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                    {collapsed ? "Развернуть" : "Свернуть"}
                </Button>
            </div>

            {/* Body */}
            {!collapsed && (
                <div id="paint-calc-body" className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="space-y-3">
                        {/* Размеры */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                                <label htmlFor="len" className="block text-sm font-medium">Длина (м)</label>
                                <Input id="len" value={length} onChange={(e) => setLength(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label htmlFor="wid" className="block text-sm font-medium">Ширина (м)</label>
                                <Input id="wid" value={width} onChange={(e) => setWidth(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label htmlFor="hei" className="block text-sm font-medium">Высота (м)</label>
                                <Input id="hei" value={height} onChange={(e) => setHeight(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label htmlFor="wd" className="block text-sm font-medium">Площадь окон и дверей (м²)</label>
                                <Input id="wd" value={windowsDoors} onChange={(e) => setWindowsDoors(e.target.value)} inputMode="decimal" />
                            </div>
                        </div>

                        {/* Расход */}
                        <div>
                            <label htmlFor="cons" className="block text-sm font-medium">Расход (м²/л за 1 слой) — паспортный</label>
                            <Input id="cons" value={consumption} onChange={(e) => setConsumption(e.target.value)} inputMode="decimal" />

                            <div className="flex items-center gap-2 mt-1">
                                Быстрый выбор:
                                {["8","10","12"].map(v => (
                                    <button
                                        key={v}
                                        type="button"
                                        onClick={() => setConsumption(v)}
                                        className="rounded-full border px-2 py-0.5 text-xs"
                                        title={`Поставить ${v} м²/л`}
                                    >
                                        {v}
                                    </button>
                                ))}
                                <span className="ml-auto text-xs">
                  Эффективный: <b>{effective.toFixed(2)} м²/л</b>
                </span>
                            </div>

                            {/* Модификаторы */}
                            <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={roughWall} onChange={(e) => setRoughWall(e.target.checked)} />
                                    Шероховатая стена (-15%)
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={hasPrimer} onChange={(e) => setHasPrimer(e.target.checked)} />
                                    Есть грунтовка (+10%)
                                </label>
                            </div>

                            {/* Справка */}
                            <details className="mt-3 border rounded-md p-3">
                                <summary className="cursor-pointer text-sm font-medium">Как узнать расход?</summary>
                                <div className="mt-2 text-sm space-y-2 text-muted-foreground">
                                    <p>На банке могут указывать по-разному. Вот как переводить:</p>
                                    <table className="w-full text-xs border">
                                        <thead>
                                        <tr className="bg-muted">
                                            <th className="border px-2 py-1">Как указано</th>
                                            <th className="border px-2 py-1">Что значит</th>
                                            <th className="border px-2 py-1">В м²/л</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="border px-2 py-1">«Расход: 8–12 м²/л»</td>
                                            <td className="border px-2 py-1">Прямое указание</td>
                                            <td className="border px-2 py-1">8–12 м²/л</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-2 py-1">«2.5 л на 20–25 м²»</td>
                                            <td className="border px-2 py-1">Указана банка и площадь</td>
                                            <td className="border px-2 py-1">20 ÷ 2.5 = 8–10 м²/л</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-2 py-1">«10 л хватает на 80–100 м²»</td>
                                            <td className="border px-2 py-1">То же для большой тары</td>
                                            <td className="border px-2 py-1">8–10 м²/л</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-2 py-1">«Расход: 0.12–0.15 кг/м²»</td>
                                            <td className="border px-2 py-1">В килограммах</td>
                                            <td className="border px-2 py-1">Нужно знать плотность (≈1.2–1.5 кг/л)</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-2 py-1">«Расход: 200 мл/м²»</td>
                                            <td className="border px-2 py-1">В миллилитрах</td>
                                            <td className="border px-2 py-1">1 ÷ 0.2 = 5 м²/л</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <p className="text-xs">
                                        ⚠️ 1 литр краски ≠ 1 килограмм. Плотность зависит от состава (обычно ~1.2–1.5 кг/л) — смотри паспорт.
                                    </p>
                                </div>
                            </details>
                        </div>

                        {/* Слои и потери */}
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                                <label htmlFor="coats" className="block text-sm font-medium">Слоёв</label>
                                <Input
                                    id="coats" type="number" min={1} step={1} value={coats}
                                    onChange={(e) => setCoats(Math.max(1, Number(e.target.value) || 1))}
                                />
                            </div>
                            <div>
                                <label htmlFor="waste" className="block text-sm font-medium">Запас/потери (%)</label>
                                <Input
                                    id="waste" type="number" min={0} max={50} step={1} value={wastePct}
                                    onChange={(e) => setWastePct(Math.max(0, Number(e.target.value) || 0))}
                                />
                            </div>
                        </div>

                        {/* Потолок */}
                        <label className="flex items-center gap-2 text-sm mt-2">
                            <input
                                id="paintCeiling" type="checkbox" checked={paintCeiling}
                                onChange={(e) => setPaintCeiling(e.target.checked)}
                            />
                            Красить потолок
                        </label>

                        {/* Кнопки */}
                        <div className="flex gap-2 mt-3">
                            <Button onClick={calculate}>Рассчитать</Button>
                            <Button variant="outline" onClick={reset}>Сбросить</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Result */}
            {result && (
                <div ref={resultRef} className="mt-4 space-y-3 rounded-xl border bg-card p-4 shadow-sm">
                    <p className="text-lg font-medium">
                        Нужно примерно <b>{result.litersRounded.toFixed(1)}</b> л краски (итого)
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded border p-3">
                            <p className="font-medium mb-1">Стены</p>
                            <p className="text-sm text-muted-foreground">
                                За 1 слой: {result.wallsAreaPerCoat.toFixed(2)} м²<br />
                                С учётом {coats} сл. и запаса: {result.wallsTotalArea.toFixed(2)} м²
                            </p>
                            <p className="mt-1 text-sm">Краска: <b>{result.litersWalls.toFixed(2)} л</b></p>
                        </div>

                        {paintCeiling && (
                            <div className="rounded border p-3">
                                <p className="font-medium mb-1">Потолок</p>
                                <p className="text-sm text-muted-foreground">
                                    За 1 слой: {result.ceilingAreaPerCoat.toFixed(2)} м²<br />
                                    С учётом {coats} сл. и запаса: {result.ceilingTotalArea.toFixed(2)} м²
                                </p>
                                <p className="mt-1 text-sm">Краска: <b>{result.litersCeiling.toFixed(2)} л</b></p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Эффективный расход: {result.effectiveConsumption.toFixed(2)} м²/л
                    </p>

                    <div className="rounded border p-3 text-sm space-y-1">
                        <p className="font-medium">Подсказка по банкам (итого):</p>
                        <p>
                            9 л × <b>{result.cans["9L"]}</b>, 2.7 л × <b>{result.cans["2.7L"]}</b>, 0.9 л × <b>{result.cans["0.9L"]}</b> → всего{" "}
                            <b>{result.cans.totalLiters.toFixed(1)} л</b>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Объёмы ориентировочные (0.9 / 2.7 / 9 л). ⚠️ 1 литр ≠ 1 кг (обычно ~1.2–1.5 кг/л).
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
