import { Metadata } from "next"
import { InteriorStyleQuiz } from "@/components/interior-style-quiz"

export const metadata: Metadata = {
    title: "Какой стиль интерьера вам подходит? | Renohacks",
    description: "Пройдите тест и узнайте, какой стиль интерьера лучше всего подходит вашему вкусу и образу жизни. Получите персональные рекомендации по цветам, материалам и дизайну.",
    openGraph: {
        title: "Какой стиль интерьера вам подходит?",
        description: "Пройдите тест и узнайте свой стиль интерьера",
        type: "website",
    },
}

export default function InteriorStyleQuizPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Какой стиль интерьера вам подходит?
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Ответьте на несколько вопросов, и мы подберём идеальный стиль интерьера для вашего дома
                    </p>
                </div>
                <InteriorStyleQuiz />
            </div>
        </div>
    )
}

