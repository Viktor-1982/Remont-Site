"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Clock, X } from "lucide-react"
import { getViewHistoryByLocale, removeFromViewHistory, clearViewHistory, type ViewHistoryItem } from "@/lib/view-history"
import { cn } from "@/lib/utils"
import navDataJson from "@/components/messages/nav.json"

type Locale = "ru" | "en"

interface ViewHistoryDict {
    title: string
    empty: string
    clearAll: string
    remove: string
}

type NavData = Record<Locale, { viewHistory: ViewHistoryDict }>

const navData: NavData = navDataJson as NavData

interface ViewHistoryCarouselProps {
    locale: "ru" | "en"
    limit?: number
}

export function ViewHistoryCarousel({ locale, limit = 10 }: ViewHistoryCarouselProps) {
    const [history, setHistory] = useState<ViewHistoryItem[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showClearConfirm, setShowClearConfirm] = useState(false)
    const [itemsPerView, setItemsPerView] = useState(3)

    useEffect(() => {
        const loadHistory = () => {
            const items = getViewHistoryByLocale(locale)
            setHistory(items.slice(0, limit))
        }

        loadHistory()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "renohacks-view-history") {
                loadHistory()
            }
        }

        window.addEventListener("storage", handleStorageChange)
        window.addEventListener("focus", loadHistory)

        return () => {
            window.removeEventListener("storage", handleStorageChange)
            window.removeEventListener("focus", loadHistory)
        }
    }, [locale, limit])

    useEffect(() => {
        const updateItemsPerView = () => {
            if (typeof window !== "undefined") {
                setItemsPerView(
                    window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2
                )
            }
        }

        updateItemsPerView()
        window.addEventListener("resize", updateItemsPerView)
        return () => window.removeEventListener("resize", updateItemsPerView)
    }, [])

    const handleRemove = (slug: string, itemLocale: "ru" | "en") => {
        removeFromViewHistory(slug, itemLocale)
        setHistory((prev) => prev.filter((item) => !(item.slug === slug && item.locale === itemLocale)))
    }

    const handleClearAll = () => {
        clearViewHistory()
        setHistory([])
        setShowClearConfirm(false)
    }

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, history.length - 1)))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < history.length - 1 ? prev + 1 : 0))
    }

    const formatTimeAgo = (timestamp: number): string => {
        const now = Date.now()
        const diff = now - timestamp
        const minutes = Math.floor(diff / (1000 * 60))
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (locale === "en") {
            if (minutes < 1) return "Just now"
            if (minutes < 60) return `${minutes}m`
            if (hours < 24) return `${hours}h`
            return `${days}d`
        } else {
            if (minutes < 1) return "Только что"
            if (minutes < 60) return `${minutes}м`
            if (hours < 24) return `${hours}ч`
            return `${days}д`
        }
    }

    if (history.length === 0) return null

    const t = navData[locale].viewHistory
    const basePath = locale === "en" ? "/en" : ""

    const maxIndex = Math.max(0, history.length - itemsPerView)

    return (
        <section className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border/50">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">{t.title}</h3>
                    <span className="text-xs text-muted-foreground">({history.length})</span>
                </div>
                <div className="flex items-center gap-2">
                    {showClearConfirm ? (
                        <>
                            <button
                                onClick={handleClearAll}
                                className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors"
                            >
                                {t.clearAll}
                            </button>
                            <button
                                onClick={() => setShowClearConfirm(false)}
                                className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors"
                            >
                                {locale === "en" ? "Cancel" : "Отмена"}
                            </button>
                        </>
                    ) : (
                        <>
                            {history.length > itemsPerView && (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentIndex === 0}
                                        className="p-1.5 rounded-lg border border-border/40 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label={locale === "en" ? "Previous" : "Назад"}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentIndex >= maxIndex}
                                        className="p-1.5 rounded-lg border border-border/40 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label={locale === "en" ? "Next" : "Вперед"}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => setShowClearConfirm(true)}
                                className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors"
                                title={t.clearAll}
                                aria-label={t.clearAll}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="flex gap-3 sm:gap-4 transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(calc(-${currentIndex} * (100% / ${itemsPerView})))`,
                    }}
                >
                    {history.map((item) => (
                        <Link
                            key={`${item.slug}-${item.locale}`}
                            href={`${basePath}/posts/${item.slug}`}
                            className={cn(
                                "group flex-shrink-0 relative rounded-lg border border-border/40 hover:border-primary/50 dark:hover:border-primary/40",
                                "bg-card/50 dark:bg-card/80 hover:bg-card dark:hover:bg-card",
                                "hover:shadow-md transition-all duration-300 overflow-hidden",
                                "w-[calc((100%-12px)/2)] sm:w-[calc((100%-24px)/3)] lg:w-[calc((100%-36px)/4)]"
                            )}
                            prefetch={true}
                        >
                            {item.cover && (
                                <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
                                    <Image
                                        src={item.cover}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                                <h4 className="text-xs sm:text-sm font-semibold text-white line-clamp-2 mb-1 [text-shadow:_0_1px_3px_rgba(0,0,0,0.8)]">
                                    {item.title}
                                </h4>
                                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/90 [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
                                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    <span>{formatTimeAgo(item.viewedAt)}</span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleRemove(item.slug, item.locale)
                                }}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white backdrop-blur-sm"
                                title={t.remove}
                                aria-label={t.remove}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

