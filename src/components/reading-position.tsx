"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { BookOpen, X } from "lucide-react"
import { cn } from "@/lib/utils"
import navDataJson from "@/components/messages/nav.json"

type Locale = "ru" | "en"

interface ReadingPositionDict {
    continueReading: string
    continueButton: string
    dismiss: string
    ariaLabel: string
}

type NavData = Record<Locale, { readingPosition: ReadingPositionDict }>

const navData: NavData = navDataJson as NavData

interface ReadingPositionProps {
    slug: string
    locale: "ru" | "en"
}

export function ReadingPosition({ slug, locale }: ReadingPositionProps) {
    const [savedPosition, setSavedPosition] = useState<number | null>(null)
    const [showBanner, setShowBanner] = useState(false)
    const [hasRestored, setHasRestored] = useState(false)
    const t = navData[locale].readingPosition
    const storageKey = `reading-position-${slug}-${locale}`
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Загружаем сохраненную позицию при монтировании
    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            const saved = localStorage.getItem(storageKey)
            if (saved) {
                const { position, timestamp } = JSON.parse(saved)
                // Показываем баннер только если позиция сохранена недавно (в течение 30 дней)
                const daysSinceSave = (Date.now() - timestamp) / (1000 * 60 * 60 * 24)
                if (daysSinceSave < 30 && position > 500) {
                    // Показываем только если прокрутили достаточно далеко (больше 500px)
                    setSavedPosition(position)
                    setShowBanner(true)
                }
            }
        } catch (_e) {
            // Игнорируем ошибки парсинга
        }
    }, [storageKey])

    // Сохраняем позицию при прокрутке (с debounce)
    useEffect(() => {
        const handleScroll = () => {
            // Очищаем предыдущий таймер
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current)
            }

            // Сохраняем позицию через 1 секунду после последнего скролла
            saveTimeoutRef.current = setTimeout(() => {
                const article = document.querySelector("article")
                if (!article) return

                const articleTop = article.offsetTop
                const scrollTop = window.scrollY
                const position = scrollTop - articleTop

                // Сохраняем только если прокрутили достаточно далеко (больше 300px)
                if (position > 300) {
                    try {
                        localStorage.setItem(
                            storageKey,
                            JSON.stringify({
                                position,
                                timestamp: Date.now(),
                            })
                        )
                    } catch (_e) {
                        // Игнорируем ошибки localStorage (например, если переполнен)
                    }
                }
            }, 1000)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current)
            }
        }
    }, [storageKey])

    // Восстанавливаем позицию при клике на кнопку
    const handleContinueReading = () => {
        if (savedPosition === null) return

        const article = document.querySelector("article")
        if (!article) return

        const articleTop = article.offsetTop
        const targetPosition = articleTop + savedPosition

        window.scrollTo({
            top: targetPosition - 100, // Немного выше, чтобы показать контекст
            behavior: "smooth",
        })

        setShowBanner(false)
        setHasRestored(true)
    }

    // Закрываем баннер
    const handleDismiss = () => {
        setShowBanner(false)
        // Удаляем сохраненную позицию при закрытии
        try {
            localStorage.removeItem(storageKey)
        } catch (e) {
            // Игнорируем ошибки
        }
    }

    // Автоматически скрываем баннер через 10 секунд
    useEffect(() => {
        if (showBanner) {
            const timer = setTimeout(() => {
                setShowBanner(false)
            }, 10000)

            return () => clearTimeout(timer)
        }
    }, [showBanner])

    if (!showBanner || hasRestored) return null

    return (
        <div
            className={cn(
                "fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-40",
                "bg-card/95 dark:bg-card/95 backdrop-blur-md",
                "border border-border dark:border-border/50",
                "rounded-lg shadow-lg dark:shadow-xl",
                "px-3 py-2.5 sm:px-4 sm:py-3",
                "max-w-md w-[calc(100%-1rem)] sm:w-full",
                "animate-in fade-in slide-in-from-top-4",
                "flex items-center gap-2 sm:gap-3",
                "mx-2 sm:mx-0"
            )}
            role="alert"
            aria-label={t.ariaLabel}
        >
            <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-foreground mb-1">
                    {t.continueReading}
                </p>
                <button
                    onClick={handleContinueReading}
                    className="text-xs sm:text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                    {t.continueButton} →
                </button>
            </div>
            <button
                onClick={handleDismiss}
                aria-label={t.dismiss}
                className="flex-shrink-0 p-1 hover:bg-muted rounded transition-colors"
            >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </button>
        </div>
    )
}

