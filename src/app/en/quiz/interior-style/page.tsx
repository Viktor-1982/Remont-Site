import { Metadata } from "next"
import { InteriorStyleQuiz } from "@/components/interior-style-quiz"

export const metadata: Metadata = {
    title: "What Interior Style Suits You? | Renohacks",
    description: "Take a quiz to discover which interior style best matches your taste and lifestyle. Get personalized recommendations for colors, materials, and design.",
    openGraph: {
        title: "What Interior Style Suits You?",
        description: "Take a quiz to discover your interior style",
        type: "website",
    },
}

export default function InteriorStyleQuizPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        What Interior Style Suits You?
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Answer a few questions and we&apos;ll find the perfect interior style for your home
                    </p>
                </div>
                <InteriorStyleQuiz isEnglish={true} />
            </div>
        </div>
    )
}

