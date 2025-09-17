"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function PaintCalculator() {
    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [doors, setDoors] = useState("1")
    const [windows, setWindows] = useState("1")
    const [layers, setLayers] = useState("2")
    const [coverage, setCoverage] = useState("10") // м² на литр
    const [result, setResult] = useState<number | null>(null)

    const handleCalc = () => {
        const l = parseFloat(length)
        const w = parseFloat(width)
        const h = parseFloat(height)
        const d = parseInt(doors) || 0
        const win = parseInt(windows) || 0
        const lay = parseInt(layers) || 1
        const cov = parseFloat(coverage)

        if (!isNaN(l) && !isNaN(w) && !isNaN(h) && cov > 0) {
            // площадь стен = периметр * высота
            const wallArea = 2 * (l + w) * h

            // двери (средняя площадь 2 м²), окна (1.5 м²)
            const minusArea = d * 2 + win * 1.5

            const totalArea = Math.max(wallArea - minusArea, 0)
            const liters = (totalArea * lay) / cov

            setResult(liters)
        }
    }

    return (
        <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold">Калькулятор краски</h2>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="length">Длина комнаты (м)</Label>
                    <Input id="length" value={length} onChange={(e) => setLength(e.target.value)} type="number" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="width">Ширина комнаты (м)</Label>
                    <Input id="width" value={width} onChange={(e) => setWidth(e.target.value)} type="number" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="height">Высота потолка (м)</Label>
                    <Input id="height" value={height} onChange={(e) => setHeight(e.target.value)} type="number" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="doors">Количество дверей</Label>
                    <Input id="doors" value={doors} onChange={(e) => setDoors(e.target.value)} type="number" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="windows">Количество окон</Label>
                    <Input id="windows" value={windows} onChange={(e) => setWindows(e.target.value)} type="number" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="layers">Количество слоёв</Label>
                    <Input id="layers" value={layers} onChange={(e) => setLayers(e.target.value)} type="number" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="coverage">Расход (м² на 1 литр)</Label>
                    <Input id="coverage" value={coverage} onChange={(e) => setCoverage(e.target.value)} type="number" />
                </div>
            </div>

            <Button onClick={handleCalc} className="w-full">Рассчитать</Button>

            {result !== null && (
                <div className="mt-4 p-3 rounded-lg bg-muted">
                    <p className="text-lg font-semibold">
                        Нужно примерно {result.toFixed(1)} литров краски 🎨
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Рекомендуем взять с запасом: {Math.ceil(result + 1)} л
                    </p>
                </div>
            )}
        </div>
    )
}
