"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Copy, Download, RefreshCw, Sparkles } from "lucide-react"
import { toast } from "sonner"

// Типы для цветовых схем
type ColorScheme = "analogous" | "complementary" | "triadic" | "monochromatic" | "split-complementary"

interface ColorPalette {
    base: string
    colors: string[]
    scheme: ColorScheme
}

// Функции для работы с цветом
function hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6
                break
            case g:
                h = ((b - r) / d + 2) / 6
                break
            case b:
                h = ((r - g) / d + 4) / 6
                break
        }
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0")
    }
    return `#${f(0)}${f(8)}${f(4)}`
}

function generatePalette(baseHex: string, scheme: ColorScheme): string[] {
    const [h, s, l] = hexToHsl(baseHex)
    const colors: string[] = [baseHex]

    switch (scheme) {
        case "analogous": {
            // Аналогичная схема: соседние цвета на цветовом круге (±30°)
            colors.push(hslToHex((h + 30) % 360, s, l))
            colors.push(hslToHex((h + 60) % 360, s, l))
            colors.push(hslToHex((h - 30 + 360) % 360, s, l))
            colors.push(hslToHex((h - 60 + 360) % 360, s, l))
            break
        }
        case "complementary": {
            // Дополнительная схема: противоположный цвет (±180°)
            const compH = (h + 180) % 360
            colors.push(hslToHex(compH, s, l))
            colors.push(hslToHex(h, Math.max(0, s - 20), Math.min(100, l + 10)))
            colors.push(hslToHex(h, Math.max(0, s - 20), Math.max(0, l - 10)))
            colors.push(hslToHex(compH, Math.max(0, s - 20), Math.min(100, l + 10)))
            colors.push(hslToHex(compH, Math.max(0, s - 20), Math.max(0, l - 10)))
            break
        }
        case "triadic": {
            // Триада: три равноудаленных цвета (120°)
            colors.push(hslToHex((h + 120) % 360, s, l))
            colors.push(hslToHex((h + 240) % 360, s, l))
            colors.push(hslToHex(h, s, Math.min(100, l + 15)))
            colors.push(hslToHex((h + 120) % 360, s, Math.min(100, l + 15)))
            colors.push(hslToHex((h + 240) % 360, s, Math.min(100, l + 15)))
            break
        }
        case "monochromatic": {
            // Монохромная: оттенки одного цвета
            colors.push(hslToHex(h, s, Math.min(100, l + 20)))
            colors.push(hslToHex(h, s, Math.min(100, l + 10)))
            colors.push(hslToHex(h, s, Math.max(0, l - 10)))
            colors.push(hslToHex(h, s, Math.max(0, l - 20)))
            colors.push(hslToHex(h, Math.max(0, s - 15), l))
            break
        }
        case "split-complementary": {
            // Split-complementary: базовый + два соседних к дополнительному
            const compH = (h + 180) % 360
            colors.push(hslToHex((compH - 30 + 360) % 360, s, l))
            colors.push(hslToHex((compH + 30) % 360, s, l))
            colors.push(hslToHex(h, s, Math.min(100, l + 15)))
            colors.push(hslToHex((compH - 30 + 360) % 360, s, Math.min(100, l + 15)))
            colors.push(hslToHex((compH + 30) % 360, s, Math.min(100, l + 15)))
            break
        }
    }

    return colors
}

// Рекомендации по применению
function getRecommendations(scheme: ColorScheme, isEnglish: boolean): string[] {
    const recommendations: Record<ColorScheme, { ru: string[]; en: string[] }> = {
        analogous: {
            ru: [
                "Идеально для создания спокойной и гармоничной атмосферы",
                "Используйте базовый цвет для стен, светлые оттенки — для мебели",
                "Темные оттенки подойдут для акцентов и текстиля",
                "Отлично работает в спальнях и гостиных",
            ],
            en: [
                "Perfect for creating a calm and harmonious atmosphere",
                "Use the base color for walls, light shades for furniture",
                "Dark shades work well for accents and textiles",
                "Great for bedrooms and living rooms",
            ],
        },
        complementary: {
            ru: [
                "Создает динамичный и энергичный интерьер",
                "Базовый цвет — для основных поверхностей, дополнительный — для акцентов",
                "Используйте дополнительный цвет дозированно (10-20% пространства)",
                "Подходит для современных интерьеров и кухонь",
            ],
            en: [
                "Creates a dynamic and energetic interior",
                "Base color for main surfaces, complementary for accents",
                "Use complementary color sparingly (10-20% of space)",
                "Great for modern interiors and kitchens",
            ],
        },
        triadic: {
            ru: [
                "Яркая и сбалансированная палитра",
                "Один цвет — основной (60%), два других — акцентные (по 20%)",
                "Идеально для детских комнат и творческих пространств",
                "Сочетайте с нейтральными материалами (дерево, камень)",
            ],
            en: [
                "Bright and balanced palette",
                "One color as main (60%), two others as accents (20% each)",
                "Perfect for children's rooms and creative spaces",
                "Combine with neutral materials (wood, stone)",
            ],
        },
        monochromatic: {
            ru: [
                "Элегантная и утонченная палитра",
                "Создает ощущение пространства и порядка",
                "Используйте разные оттенки для зонирования",
                "Идеально для минималистичных интерьеров и офисов",
            ],
            en: [
                "Elegant and refined palette",
                "Creates a sense of space and order",
                "Use different shades for zoning",
                "Perfect for minimalist interiors and offices",
            ],
        },
        "split-complementary": {
            ru: [
                "Баланс между контрастом и гармонией",
                "Базовый цвет — для стен, дополнительные — для мебели и акцентов",
                "Создает интересный, но не перегруженный интерьер",
                "Подходит для гостиных и столовых",
            ],
            en: [
                "Balance between contrast and harmony",
                "Base color for walls, additional for furniture and accents",
                "Creates an interesting but not overwhelming interior",
                "Great for living rooms and dining rooms",
            ],
        },
    }

    return isEnglish ? recommendations[scheme].en : recommendations[scheme].ru
}

export function ColorPaletteGenerator() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    
    const [baseColor, setBaseColor] = useState("#87A96B") // Зеленый авокадо из темы
    const [scheme, setScheme] = useState<ColorScheme>("analogous")
    const [palette, setPalette] = useState<ColorPalette | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    // Генерация палитры
    const generatePaletteNow = () => {
        setIsGenerating(true)
        // Небольшая задержка для визуальной обратной связи
        setTimeout(() => {
            const colors = generatePalette(baseColor, scheme)
            const newPalette = {
                base: baseColor,
                colors,
                scheme,
            }
            setPalette(newPalette)
            setIsGenerating(false)
            toast.success(isEnglish ? "Palette generated!" : "Палитра сгенерирована!")
        }, 100)
    }

    // Автогенерация при первой загрузке и при изменении параметров
    useEffect(() => {
        const colors = generatePalette(baseColor, scheme)
        setPalette({
            base: baseColor,
            colors,
            scheme,
        })
    }, [baseColor, scheme])

    const copyColor = (color: string) => {
        navigator.clipboard.writeText(color)
        toast.success(isEnglish ? "Color copied!" : "Цвет скопирован!")
    }

    const copyAllColors = () => {
        if (!palette) return
        const colorsText = palette.colors.join(", ")
        navigator.clipboard.writeText(colorsText)
        toast.success(isEnglish ? "All colors copied!" : "Все цвета скопированы!")
    }

    const exportAsImage = () => {
        if (!palette) return
        
        // Создаем canvas для экспорта
        const canvas = document.createElement("canvas")
        canvas.width = 800
        canvas.height = 200
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const colorWidth = canvas.width / palette.colors.length

        palette.colors.forEach((color, index) => {
            ctx.fillStyle = color
            ctx.fillRect(index * colorWidth, 0, colorWidth, canvas.height)
        })

        // Добавляем HEX коды
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 16px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        palette.colors.forEach((color, index) => {
            const x = index * colorWidth + colorWidth / 2
            const y = canvas.height / 2
            ctx.fillText(color.toUpperCase(), x, y)
        })

        // Скачиваем
        canvas.toBlob((blob) => {
            if (!blob) return
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `color-palette-${scheme}-${Date.now()}.png`
            a.click()
            URL.revokeObjectURL(url)
            toast.success(isEnglish ? "Image downloaded!" : "Изображение скачано!")
        })
    }

    const randomColor = () => {
        const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
        setBaseColor(randomHex)
    }

    const recommendations = palette ? getRecommendations(palette.scheme, isEnglish) : []

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        {isEnglish ? "Color Palette Generator" : "Генератор цветовых палитр"}
                    </CardTitle>
                    <CardDescription>
                        {isEnglish
                            ? "Create harmonious color schemes for your renovation project"
                            : "Создайте гармоничные цветовые схемы для вашего ремонта"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Выбор базового цвета */}
                    <div className="space-y-2">
                        <Label htmlFor="base-color">
                            {isEnglish ? "Base Color" : "Базовый цвет"}
                        </Label>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Input
                                    id="base-color"
                                    type="color"
                                    value={baseColor}
                                    onChange={(e) => setBaseColor(e.target.value)}
                                    className="h-12 w-24 cursor-pointer"
                                />
                            </div>
                            <Input
                                type="text"
                                value={baseColor.toUpperCase()}
                                onChange={(e) => {
                                    const value = e.target.value
                                    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                                        setBaseColor(value.length === 7 ? value : baseColor)
                                    }
                                }}
                                className="font-mono w-32"
                                placeholder="#87A96B"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={randomColor}
                                className="gap-2"
                            >
                                <Sparkles className="h-4 w-4" />
                                {isEnglish ? "Random" : "Случайный"}
                            </Button>
                        </div>
                    </div>

                    {/* Выбор схемы */}
                    <div className="space-y-2">
                        <Label>{isEnglish ? "Color Scheme" : "Цветовая схема"}</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {(
                                [
                                    { value: "analogous", label: isEnglish ? "Analogous" : "Аналогичная" },
                                    { value: "complementary", label: isEnglish ? "Complementary" : "Дополнительная" },
                                    { value: "triadic", label: isEnglish ? "Triadic" : "Триада" },
                                    { value: "monochromatic", label: isEnglish ? "Monochromatic" : "Монохромная" },
                                    { value: "split-complementary", label: isEnglish ? "Split-Complementary" : "Раздельно-дополнительная" },
                                ] as const
                            ).map((s) => (
                                <Button
                                    key={s.value}
                                    variant={scheme === s.value ? "default" : "outline"}
                                    onClick={() => setScheme(s.value as ColorScheme)}
                                    className="text-sm"
                                >
                                    {s.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Кнопка генерации */}
                    <Button 
                        onClick={generatePaletteNow}
                        className="w-full gap-2" 
                        size="lg"
                        disabled={isGenerating}
                    >
                        <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                        {isGenerating 
                            ? (isEnglish ? "Generating..." : "Генерация...") 
                            : (isEnglish ? "Generate Palette" : "Сгенерировать палитру")}
                    </Button>
                </CardContent>
            </Card>

            {/* Результат */}
            {palette && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {isEnglish ? "Generated Palette" : "Сгенерированная палитра"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Визуализация палитры */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {palette.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="group relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105"
                                    style={{ backgroundColor: color }}
                                    onClick={() => copyColor(color)}
                                >
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono">
                                            {color.toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs font-mono p-2 text-center">
                                        {color.toUpperCase()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Действия */}
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" onClick={copyAllColors} className="gap-2">
                                <Copy className="h-4 w-4" />
                                {isEnglish ? "Copy All Colors" : "Копировать все цвета"}
                            </Button>
                            <Button variant="outline" onClick={exportAsImage} className="gap-2">
                                <Download className="h-4 w-4" />
                                {isEnglish ? "Export as Image" : "Экспорт изображения"}
                            </Button>
                        </div>

                        {/* Рекомендации */}
                        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                            <h3 className="font-semibold text-sm">
                                {isEnglish ? "Application Tips" : "Рекомендации по применению"}
                            </h3>
                            <ul className="space-y-1.5 text-sm text-muted-foreground">
                                {recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

