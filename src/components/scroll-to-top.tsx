"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import navDataJson from "@/components/messages/nav.json"

type Locale = "ru" | "en"

interface ScrollToTopDict {
    ariaLabel: string
}

type NavData = Record<Locale, { scrollToTop: ScrollToTopDict }>

const navData: NavData = navDataJson as NavData

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const pathname = usePathname()
    const locale: Locale = pathname.startsWith("/en") ? "en" : "ru"
    const t = navData[locale].scrollToTop

    useEffect(() => {
        let ticking = false
        let rafId: number | null = null

        const toggleVisibility = () => {
            // Показываем кнопку после прокрутки на 300px
            const scrollY = window.scrollY
            if (scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
            ticking = false
        }

        const handleScroll = () => {
            if (!ticking) {
                rafId = window.requestAnimationFrame(toggleVisibility)
                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId)
            }
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    if (!isVisible) return null

    return (
        <button
            onClick={scrollToTop}
            aria-label={t.ariaLabel}
            className={cn(
                // Позиционирование: на мобильных выше repair-assistant (bottom-4 + h-14 = ~72px)
                // repair-assistant: bottom-4 (16px) + h-14 (56px) = 72px от низа
                // Наша кнопка: bottom-20 (80px) - достаточно высоко, чтобы не перекрывать
                // На десктопе можно выше, так как repair-assistant может не быть
                "fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50",
                // Размеры: минимум 44x44px для touch (стандарт Apple/Google)
                "bg-primary text-primary-foreground",
                "rounded-full p-3 sm:p-4",
                "w-11 h-11 sm:w-14 sm:h-14",
                "flex items-center justify-center",
                "shadow-lg hover:shadow-xl",
                "backdrop-blur-sm",
                "transition-all duration-300",
                "hover:scale-110 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "dark:focus:ring-offset-background",
                "animate-in fade-in slide-in-from-bottom-4",
                "border border-primary/20 dark:border-primary/30",
                // Улучшенная видимость и отзывчивость на мобильных
                "touch-manipulation" // Улучшает отзывчивость на touch устройствах
            )}
            style={{ WebkitTapHighlightColor: "transparent" }} // Убирает синий highlight на iOS
        >
            <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
    )
}

