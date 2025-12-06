"use client"

import { useEffect, useState } from "react"
import { Clock, CheckCircle2 } from "lucide-react"

interface ReadingProgressProps {
    readingTimeMinutes?: number
    isEnglish?: boolean
}

export function ReadingProgress({ readingTimeMinutes, isEnglish = false }: ReadingProgressProps) {
    const [progress, setProgress] = useState(0)
    const [remainingTime, setRemainingTime] = useState<number | null>(null)
    const [showCompletion, setShowCompletion] = useState(false)
    const [hasShownCompletion, setHasShownCompletion] = useState(false)

    useEffect(() => {
        const updateProgress = () => {
            const article = document.querySelector("article")
            if (!article) return

            const articleTop = article.offsetTop
            const articleHeight = article.offsetHeight
            const windowHeight = window.innerHeight
            const scrollTop = window.scrollY

            // Вычисляем прогресс чтения
            const scrollableDistance = articleHeight - windowHeight
            const scrolled = scrollTop - articleTop + windowHeight

            let percentage = 0
            if (scrollableDistance > 0) {
                percentage = Math.min(100, Math.max(0, (scrolled / scrollableDistance) * 100))
            } else {
                percentage = 100 // Если статья короче экрана
            }

            setProgress(percentage)

            // Вычисляем оставшееся время
            if (readingTimeMinutes && percentage > 0 && percentage < 100) {
                const remainingPercentage = (100 - percentage) / 100
                const estimatedRemaining = Math.ceil(readingTimeMinutes * remainingPercentage)
                setRemainingTime(estimatedRemaining)
            } else {
                setRemainingTime(null)
            }

            // Показываем уведомление о завершении
            if (percentage >= 95 && !hasShownCompletion) {
                setShowCompletion(true)
                setHasShownCompletion(true)
                // Скрываем уведомление через 5 секунд
                setTimeout(() => {
                    setShowCompletion(false)
                }, 5000)
            }
        }

        updateProgress()
        window.addEventListener("scroll", updateProgress, { passive: true })
        window.addEventListener("resize", updateProgress, { passive: true })

        return () => {
            window.removeEventListener("scroll", updateProgress)
            window.removeEventListener("resize", updateProgress)
        }
    }, [readingTimeMinutes, hasShownCompletion])

    if (progress === 0) return null

    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-50">
                <div
                    className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-150 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Индикатор оставшегося времени */}
            {remainingTime !== null && remainingTime > 0 && progress < 95 && (
                <div className="fixed top-16 sm:top-20 right-2 sm:right-4 z-40 bg-background/95 dark:bg-background/95 backdrop-blur-md border border-border dark:border-border/50 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 shadow-lg dark:shadow-xl flex items-center gap-1.5 sm:gap-2 animate-in fade-in slide-in-from-top-2 transition-colors">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                        {isEnglish 
                            ? `${remainingTime} min left`
                            : `Осталось ~${remainingTime} мин`}
                    </span>
                </div>
            )}

            {/* Уведомление о завершении чтения */}
            {showCompletion && (
                <div className="fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 bg-background/95 dark:bg-background/95 backdrop-blur-md border border-border dark:border-border/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-lg dark:shadow-xl flex items-center gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-4 max-w-md sm:max-w-md transition-colors">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                        {isEnglish
                            ? "You've finished reading this article!"
                            : "Вы дочитали статью до конца!"}
                    </span>
                </div>
            )}
        </>
    )
}

