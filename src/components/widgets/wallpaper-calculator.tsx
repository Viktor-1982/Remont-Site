"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
        <div className="space-y-4">
            <Input
                type="number"
                placeholder="Длина комнаты (м)"
                value={length}
                onChange={(e) => setLength(e.target.value)}
            />
            <Input
                type="number"
                placeholder="Ширина комнаты (м)"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
            />
            <Input
                type="number"
                placeholder="Высота потолка (м)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <Input
                type="number"
                placeholder="Площадь рулона (м²)"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
            />
            <Button onClick={handleCalc}>Рассчитать</Button>
            {result !== null && (
                <p className="text-lg font-semibold">
                    Нужно примерно {result} рулонов
                </p>
            )}
        </div>
    )
}
