"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function WallpaperCalculator() {
    const [length, setLength] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")
    const [roll, setRoll] = useState("")
    const [result, setResult] = useState<number | null>(null)

    const handleCalc = () => {
        const l = parseFloat(length)
        const w = parseFloat(width)
        const h = parseFloat(height)
        const r = parseFloat(roll)

        if (!isNaN(l) && !isNaN(w) && !isNaN(h) && !isNaN(r) && r > 0) {
            const perimeter = 2 * (l + w)
            const wallArea = perimeter * h
            setResult(Math.ceil(wallArea / r * 1.1)) // +10% запас
        }
    }

    return (
        <div className="space-y-4 border p-4 rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold">Калькулятор обоев</h2>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="length">Длина комнаты (м)</Label>
                    <Input
                        id="length"
                        type="number"
                        placeholder="Например 5"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="width">Ширина комнаты (м)</Label>
                    <Input
                        id="width"
                        type="number"
                        placeholder="Например 3"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="height">Высота потолка (м)</Label>
                    <Input
                        id="height"
                        type="number"
                        placeholder="Например 2.7"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="roll">Площадь одного рулона (м²)</Label>
                    <Input
                        id="roll"
                        type="number"
                        placeholder="Например 5.3"
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                    />
                </div>
            </div>

            <Button onClick={handleCalc} className="w-full">Рассчитать</Button>

            {result !== null && (
                <div className="mt-4 p-3 rounded-lg bg-muted">
                    <p className="text-lg font-semibold">
                        Нужно примерно {result} рулонов 🪟
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Учтён запас 10% на подгонку рисунка и подрезку
                    </p>
                </div>
            )}
        </div>
    )
}
