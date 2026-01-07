"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, ArrowRight, CheckCircle2, Home } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
    id: string
    question: string
    options: Array<{
        text: string
        scores: Record<string, number> // Стиль -> баллы
    }>
}

interface StyleResult {
    id: string
    name: string
    description: string
    characteristics: string[]
    colorPalette: string[]
    materials: string[]
    articleTags?: string[]
}

const questionsRu: Question[] = [
    {
        id: "q1",
        question: "Какой цвет вам ближе?",
        options: [
            { text: "Белый, бежевый, серый — нейтральные тона", scores: { minimalism: 3, scandinavian: 2 } },
            { text: "Тёплые землистые: терракота, карамель, песок", scores: { warm: 3, biophilic: 2 } },
            { text: "Насыщенные: глубокий синий, винный, тёмно-зелёный", scores: { modern: 2, eclectic: 3 } },
            { text: "Природные зелёные: шалфей, эвкалипт, оливковый", scores: { biophilic: 3, warm: 2 } },
        ],
    },
    {
        id: "q2",
        question: "Что важнее в интерьере?",
        options: [
            { text: "Порядок и чистота линий", scores: { minimalism: 3, scandinavian: 2 } },
            { text: "Уют и тепло", scores: { warm: 3, scandinavian: 2 } },
            { text: "Индивидуальность и самовыражение", scores: { eclectic: 3, modern: 2 } },
            { text: "Связь с природой", scores: { biophilic: 3, warm: 1 } },
        ],
    },
    {
        id: "q3",
        question: "Как вы относитесь к декору?",
        options: [
            { text: "Минимум деталей, только необходимое", scores: { minimalism: 3, scandinavian: 1 } },
            { text: "Текстиль, ковры, растения — для уюта", scores: { warm: 3, biophilic: 2 } },
            { text: "Арт-объекты, винтаж, смелые акценты", scores: { eclectic: 3, modern: 2 } },
            { text: "Живые растения и натуральные материалы", scores: { biophilic: 3, warm: 1 } },
        ],
    },
    {
        id: "q4",
        question: "Какие материалы вам нравятся?",
        options: [
            { text: "Гладкие поверхности, металл, стекло", scores: { minimalism: 3, modern: 2 } },
            { text: "Дерево, камень, натуральные ткани", scores: { warm: 3, biophilic: 2, scandinavian: 2 } },
            { text: "Смешение: дерево + металл + текстиль", scores: { eclectic: 3, modern: 2 } },
            { text: "Только натуральные, экологичные", scores: { biophilic: 3, warm: 2 } },
        ],
    },
    {
        id: "q5",
        question: "Как вы предпочитаете освещение?",
        options: [
            { text: "Много естественного света, скрытая подсветка", scores: { minimalism: 2, scandinavian: 3 } },
            { text: "Тёплый уютный свет, торшеры, бра", scores: { warm: 3, scandinavian: 1 } },
            { text: "Современные светильники как акценты", scores: { modern: 3, eclectic: 2 } },
            { text: "Максимум естественного света, растения у окон", scores: { biophilic: 3, scandinavian: 2 } },
        ],
    },
    {
        id: "q6",
        question: "Ваш идеальный вечер дома?",
        options: [
            { text: "В чистом, организованном пространстве", scores: { minimalism: 3, scandinavian: 1 } },
            { text: "В уютной обстановке с мягким светом", scores: { warm: 3, scandinavian: 2 } },
            { text: "В интерьере, который отражает мою личность", scores: { eclectic: 3, modern: 1 } },
            { text: "В окружении растений и природных материалов", scores: { biophilic: 3, warm: 1 } },
        ],
    },
]

const questionsEn: Question[] = [
    {
        id: "q1",
        question: "Which color appeals to you most?",
        options: [
            { text: "White, beige, gray — neutral tones", scores: { minimalism: 3, scandinavian: 2 } },
            { text: "Warm earthy: terracotta, caramel, sand", scores: { warm: 3, biophilic: 2 } },
            { text: "Rich: deep blue, burgundy, dark green", scores: { modern: 2, eclectic: 3 } },
            { text: "Natural greens: sage, eucalyptus, olive", scores: { biophilic: 3, warm: 2 } },
        ],
    },
    {
        id: "q2",
        question: "What matters most in your interior?",
        options: [
            { text: "Order and clean lines", scores: { minimalism: 3, scandinavian: 2 } },
            { text: "Cozy and warmth", scores: { warm: 3, scandinavian: 2 } },
            { text: "Individuality and self-expression", scores: { eclectic: 3, modern: 2 } },
            { text: "Connection with nature", scores: { biophilic: 3, warm: 1 } },
        ],
    },
    {
        id: "q3",
        question: "How do you feel about decor?",
        options: [
            { text: "Minimal details, only essentials", scores: { minimalism: 3, scandinavian: 1 } },
            { text: "Textiles, rugs, plants — for coziness", scores: { warm: 3, biophilic: 2 } },
            { text: "Art objects, vintage, bold accents", scores: { eclectic: 3, modern: 2 } },
            { text: "Living plants and natural materials", scores: { biophilic: 3, warm: 1 } },
        ],
    },
    {
        id: "q4",
        question: "Which materials do you like?",
        options: [
            { text: "Smooth surfaces, metal, glass", scores: { minimalism: 3, modern: 2 } },
            { text: "Wood, stone, natural fabrics", scores: { warm: 3, biophilic: 2, scandinavian: 2 } },
            { text: "Mix: wood + metal + textiles", scores: { eclectic: 3, modern: 2 } },
            { text: "Only natural, eco-friendly", scores: { biophilic: 3, warm: 2 } },
        ],
    },
    {
        id: "q5",
        question: "How do you prefer lighting?",
        options: [
            { text: "Lots of natural light, hidden lighting", scores: { minimalism: 2, scandinavian: 3 } },
            { text: "Warm cozy light, floor lamps, sconces", scores: { warm: 3, scandinavian: 1 } },
            { text: "Modern fixtures as accents", scores: { modern: 3, eclectic: 2 } },
            { text: "Maximum natural light, plants by windows", scores: { biophilic: 3, scandinavian: 2 } },
        ],
    },
    {
        id: "q6",
        question: "Your ideal evening at home?",
        options: [
            { text: "In a clean, organized space", scores: { minimalism: 3, scandinavian: 1 } },
            { text: "In a cozy setting with soft light", scores: { warm: 3, scandinavian: 2 } },
            { text: "In an interior that reflects my personality", scores: { eclectic: 3, modern: 1 } },
            { text: "Surrounded by plants and natural materials", scores: { biophilic: 3, warm: 1 } },
        ],
    },
]

const resultsRu: Record<string, StyleResult> = {
    minimalism: {
        id: "minimalism",
        name: "Тёплый минимализм",
        description: "Элегантный и утончённый стиль с акцентом на порядок, чистые линии и функциональность. Минимализм 2026 года — это не стерильность, а кураторское спокойствие.",
        characteristics: [
            "Чистые линии и простые формы",
            "Нейтральная цветовая палитра",
            "Скрытые системы хранения",
            "Много естественного света",
            "Функциональная мебель",
        ],
        colorPalette: ["Тёплый белый", "Бежевый", "Серый", "Натуральное дерево"],
        materials: ["Дерево с матовой текстурой", "Натуральный камень", "Металл", "Стекло"],
        articleTags: ["минимализм", "дизайн интерьера", "современный ремонт"],
    },
    warm: {
        id: "warm",
        name: "Тёплый уютный стиль",
        description: "Интерьер, наполненный теплом и комфортом. Землистые тона, натуральные материалы и тактильные текстуры создают атмосферу уюта и спокойствия.",
        characteristics: [
            "Тёплые землистые цвета",
            "Натуральные материалы",
            "Много текстиля и ковров",
            "Мягкое освещение",
            "Уютная атмосфера",
        ],
        colorPalette: ["Терракота", "Карамель", "Песок", "Беж", "Молочный шоколад"],
        materials: ["Дерево", "Камень", "Натуральные ткани", "Керамика"],
        articleTags: ["уютный интерьер", "тёплые тона", "дизайн интерьера"],
    },
    biophilic: {
        id: "biophilic",
        name: "Биофильный дизайн",
        description: "Интерьер, вдохновлённый природой. Живые растения, натуральные материалы и естественное освещение создают связь с природой и поддерживают эмоциональное благополучие.",
        characteristics: [
            "Живые растения и зелень",
            "Натуральные материалы",
            "Максимум естественного света",
            "Экологичные решения",
            "Связь с природой",
        ],
        colorPalette: ["Шалфей", "Эвкалипт", "Оливковый", "Землистые коричневые"],
        materials: ["Дерево", "Камень", "Натуральные ткани", "Экологичные краски"],
        articleTags: ["биофильный дизайн", "экодизайн", "растения в интерьере"],
    },
    scandinavian: {
        id: "scandinavian",
        name: "Скандинавский стиль",
        description: "Светлый, просторный интерьер с акцентом на функциональность и естественное освещение. Минимализм с уютом и практичностью.",
        characteristics: [
            "Светлые тона",
            "Много естественного света",
            "Функциональная мебель",
            "Натуральные материалы",
            "Простота и практичность",
        ],
        colorPalette: ["Белый", "Светло-серый", "Бежевый", "Светлое дерево"],
        materials: ["Светлое дерево", "Белая краска", "Натуральные ткани", "Керамика"],
        articleTags: ["скандинавский стиль", "светлый интерьер", "дизайн интерьера"],
    },
    modern: {
        id: "modern",
        name: "Современный стиль",
        description: "Динамичный интерьер с акцентными цветами и современными материалами. Технологии и индивидуальность в гармоничном сочетании.",
        characteristics: [
            "Современные материалы",
            "Акцентные цвета",
            "Технологии",
            "Смелые решения",
            "Индивидуальность",
        ],
        colorPalette: ["Глубокий синий", "Винный", "Тёмно-зелёный", "Нейтральные базы"],
        materials: ["Металл", "Стекло", "Современные композиты", "Текстиль"],
        articleTags: ["современный интерьер", "тренды 2026", "дизайн интерьера"],
    },
    eclectic: {
        id: "eclectic",
        name: "Эклектичный стиль",
        description: "Интерьер, отражающий вашу индивидуальность. Смешение стилей, винтаж, арт-объекты и смелые акценты создают уникальное пространство.",
        characteristics: [
            "Смешение стилей",
            "Винтаж и антиквариат",
            "Арт-объекты",
            "Смелые акценты",
            "Индивидуальность",
        ],
        colorPalette: ["Насыщенные цвета", "Нейтральные базы", "Акцентные оттенки"],
        materials: ["Разнообразие материалов", "Винтаж", "Современные акценты"],
        articleTags: ["эклектичный стиль", "индивидуальный интерьер", "винтаж"],
    },
}

const resultsEn: Record<string, StyleResult> = {
    minimalism: {
        id: "minimalism",
        name: "Warm Minimalism",
        description: "Elegant and refined style with emphasis on order, clean lines, and functionality. 2026 minimalism is not sterility, but curated calm.",
        characteristics: [
            "Clean lines and simple forms",
            "Neutral color palette",
            "Hidden storage systems",
            "Lots of natural light",
            "Functional furniture",
        ],
        colorPalette: ["Warm white", "Beige", "Gray", "Natural wood"],
        materials: ["Wood with matte texture", "Natural stone", "Metal", "Glass"],
        articleTags: ["minimalism", "interior design", "modern renovation"],
    },
    warm: {
        id: "warm",
        name: "Warm Cozy Style",
        description: "Interior filled with warmth and comfort. Earthy tones, natural materials, and tactile textures create an atmosphere of coziness and calm.",
        characteristics: [
            "Warm earthy colors",
            "Natural materials",
            "Lots of textiles and rugs",
            "Soft lighting",
            "Cozy atmosphere",
        ],
        colorPalette: ["Terracotta", "Caramel", "Sand", "Beige", "Milk chocolate"],
        materials: ["Wood", "Stone", "Natural fabrics", "Ceramics"],
        articleTags: ["cozy interior", "warm tones", "interior design"],
    },
    biophilic: {
        id: "biophilic",
        name: "Biophilic Design",
        description: "Interior inspired by nature. Living plants, natural materials, and natural lighting create a connection with nature and support emotional well-being.",
        characteristics: [
            "Living plants and greenery",
            "Natural materials",
            "Maximum natural light",
            "Eco-friendly solutions",
            "Connection with nature",
        ],
        colorPalette: ["Sage", "Eucalyptus", "Olive", "Earthy browns"],
        materials: ["Wood", "Stone", "Natural fabrics", "Eco-friendly paints"],
        articleTags: ["biophilic design", "eco design", "plants in interior"],
    },
    scandinavian: {
        id: "scandinavian",
        name: "Scandinavian Style",
        description: "Light, spacious interior with emphasis on functionality and natural lighting. Minimalism with coziness and practicality.",
        characteristics: [
            "Light tones",
            "Lots of natural light",
            "Functional furniture",
            "Natural materials",
            "Simplicity and practicality",
        ],
        colorPalette: ["White", "Light gray", "Beige", "Light wood"],
        materials: ["Light wood", "White paint", "Natural fabrics", "Ceramics"],
        articleTags: ["scandinavian style", "light interior", "interior design"],
    },
    modern: {
        id: "modern",
        name: "Modern Style",
        description: "Dynamic interior with accent colors and modern materials. Technology and individuality in harmonious combination.",
        characteristics: [
            "Modern materials",
            "Accent colors",
            "Technology",
            "Bold solutions",
            "Individuality",
        ],
        colorPalette: ["Deep blue", "Burgundy", "Dark green", "Neutral bases"],
        materials: ["Metal", "Glass", "Modern composites", "Textiles"],
        articleTags: ["modern interior", "trends 2026", "interior design"],
    },
    eclectic: {
        id: "eclectic",
        name: "Eclectic Style",
        description: "Interior that reflects your personality. Mix of styles, vintage, art objects, and bold accents create a unique space.",
        characteristics: [
            "Mix of styles",
            "Vintage and antiques",
            "Art objects",
            "Bold accents",
            "Individuality",
        ],
        colorPalette: ["Rich colors", "Neutral bases", "Accent shades"],
        materials: ["Variety of materials", "Vintage", "Modern accents"],
        articleTags: ["eclectic style", "individual interior", "vintage"],
    },
}

export function InteriorStyleQuiz({ isEnglish = false }: { isEnglish?: boolean }) {
    const questions = isEnglish ? questionsEn : questionsRu
    const results = isEnglish ? resultsEn : resultsRu
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [result, setResult] = useState<StyleResult | null>(null)
    const [showResult, setShowResult] = useState(false)

    const progress = ((currentQuestion + 1) / questions.length) * 100

    const handleAnswer = (questionId: string, scores: Record<string, number>) => {
        const newAnswers = { ...answers }
        Object.entries(scores).forEach(([style, points]) => {
            newAnswers[style] = (newAnswers[style] || 0) + points
        })
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            calculateResult(newAnswers)
        }
    }

    const calculateResult = (finalAnswers: Record<string, number>) => {
        let maxScore = 0
        let winningStyle = "minimalism"

        Object.entries(finalAnswers).forEach(([style, score]) => {
            if (score > maxScore) {
                maxScore = score
                winningStyle = style
            }
        })

        setResult(results[winningStyle] || results.minimalism)
        setShowResult(true)
    }

    const resetQuiz = () => {
        setCurrentQuestion(0)
        setAnswers({})
        setResult(null)
        setShowResult(false)
    }

    if (showResult && result) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <Card className="border-2 border-primary/20">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl mb-2">{result.name}</CardTitle>
                        <CardDescription className="text-base">{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">
                                {isEnglish ? "Key Characteristics" : "Ключевые особенности"}
                            </h3>
                            <ul className="space-y-2">
                                {result.characteristics.map((char, index) => (
                                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{char}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-lg">
                                {isEnglish ? "Color Palette" : "Цветовая палитра"}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {result.colorPalette.map((color, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                                    >
                                        {color}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3 text-lg">
                                {isEnglish ? "Recommended Materials" : "Рекомендуемые материалы"}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {result.materials.map((material, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 rounded-full bg-accent/10 text-foreground text-sm border border-accent/20"
                                    >
                                        {material}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button onClick={resetQuiz} variant="outline" className="flex-1">
                                <Sparkles className="w-4 h-4 mr-2" />
                                {isEnglish ? "Retake Quiz" : "Пройти заново"}
                            </Button>
                            <Button asChild className="flex-1">
                                <Link href={isEnglish ? "/en/calculators/color-palette" : "/calculators/color-palette"}>
                                    {isEnglish ? "Generate Color Palette" : "Создать цветовую палитру"}
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        )
    }

    const currentQ = questions[currentQuestion]

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-2xl">
                            {isEnglish ? "Find Your Interior Style" : "Найдите свой стиль интерьера"}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground">
                            {currentQuestion + 1} / {questions.length}
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </CardHeader>
                <CardContent>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>
                            <div className="space-y-3">
                                {currentQ.options.map((option, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="w-full justify-start h-auto p-4 text-left hover:bg-primary/10 hover:border-primary/50 transition-all"
                                        onClick={() => handleAnswer(currentQ.id, option.scores)}
                                    >
                                        <span className="flex-1">{option.text}</span>
                                        <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
                                    </Button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    )
}

