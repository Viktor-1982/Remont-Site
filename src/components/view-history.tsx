"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, X, History } from "lucide-react"
import { getViewHistoryByLocale, removeFromViewHistory, clearViewHistory, type ViewHistoryItem } from "@/lib/view-history"
import { cn } from "@/lib/utils"
import navDataJson from "@/components/messages/nav.json"

type Locale = "ru" | "en"

interface ViewHistoryDict {
    title: string
    empty: string
    emptyDescription: string
    clearAll: string
    clearAllConfirm: string
    clearAllCancel: string
    remove: string
    viewed: string
}

type NavData = Record<Locale, { viewHistory: ViewHistoryDict }>

const navData: NavData = navDataJson as NavData

interface ViewHistoryProps {
    locale: "ru" | "en"
    limit?: number
    showTitle?: boolean
    className?: string
}

export function ViewHistory({ locale, limit = 5, showTitle = true, className }: ViewHistoryProps) {
    const [history, setHistory] = useState<ViewHistoryItem[]>([])
    const [showClearConfirm, setShowClearConfirm] = useState(false)

    useEffect(() => {
        // Загружаем историю из localStorage
        const loadHistory = () => {
            const items = getViewHistoryByLocale(locale)
            setHistory(items.slice(0, limit))
        }

        loadHistory()

        // Слушаем изменения в localStorage (если история обновляется в другой вкладке)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "renohacks-view-history") {
                loadHistory()
            }
        }

        window.addEventListener("storage", handleStorageChange)
        
        // Также обновляем при фокусе окна
        window.addEventListener("focus", loadHistory)

        return () => {
            window.removeEventListener("storage", handleStorageChange)
            window.removeEventListener("focus", loadHistory)
        }
    }, [locale, limit])

    const handleRemove = (slug: string, itemLocale: "ru" | "en") => {
        removeFromViewHistory(slug, itemLocale)
        setHistory((prev) => prev.filter((item) => !(item.slug === slug && item.locale === itemLocale)))
    }

    const handleClearAll = () => {
        clearViewHistory()
        setHistory([])
        setShowClearConfirm(false)
    }

    const t = navData[locale].viewHistory
    const basePath = locale === "en" ? "/en" : ""

    if (history.length === 0) {
        if (!showTitle) return null
        
        return (
            <div className={cn("p-4 sm:p-6 bg-card/50 dark:bg-card/80 rounded-xl border border-border/50", className)}>
                {showTitle && (
                    <div className="flex items-center gap-2 mb-4">
                        <History className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">{t.title}</h3>
                    </div>
                )}
                <p className="text-sm text-muted-foreground">{t.emptyDescription}</p>
            </div>
        )
    }

    const formatTimeAgo = (timestamp: number): string => {
        const now = Date.now()
        const diff = now - timestamp
        const minutes = Math.floor(diff / (1000 * 60))
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (locale === "en") {
            if (minutes < 1) return "Just now"
            if (minutes < 60) return `${minutes} min ago`
            if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
            return `${days} ${days === 1 ? "day" : "days"} ago`
        } else {
            if (minutes < 1) return "Только что"
            if (minutes < 60) return `${minutes} мин назад`
            if (hours < 24) return `${hours} ${hours === 1 ? "час" : hours < 5 ? "часа" : "часов"} назад`
            return `${days} ${days === 1 ? "день" : days < 5 ? "дня" : "дней"} назад`
        }
    }

    return (
        <div className={cn("p-3 sm:p-4 bg-card/50 dark:bg-card/80 rounded-xl border border-border/50", className)}>
            {showTitle && (
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <History className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <h3 className="text-sm sm:text-base font-semibold text-foreground">{t.title}</h3>
                    </div>
                    {history.length > 0 && (
                        <div className="flex items-center gap-2">
                            {showClearConfirm ? (
                                <>
                                    <button
                                        onClick={handleClearAll}
                                        className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded hover:bg-destructive/20 transition-colors"
                                    >
                                        {t.clearAllConfirm}
                                    </button>
                                    <button
                                        onClick={() => setShowClearConfirm(false)}
                                        className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors"
                                    >
                                        {t.clearAllCancel}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setShowClearConfirm(true)}
                                    className="text-xs px-1.5 py-1 bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors"
                                    title={t.clearAll}
                                    aria-label={t.clearAll}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-2">
                {history.map((item) => (
                    <Link
                        key={`${item.slug}-${item.locale}`}
                        href={`${basePath}/posts/${item.slug}`}
                        className="group flex items-start gap-2 p-2 rounded-lg border border-border/40 hover:border-primary/50 dark:hover:border-primary/40 bg-background/50 hover:bg-background dark:bg-background/30 dark:hover:bg-background/50 transition-all"
                        prefetch={true}
                    >
                        {item.cover && (
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-muted">
                                <Image
                                    src={item.cover}
                                    alt={item.title}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                    sizes="48px"
                                />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-0.5">
                                <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1 leading-tight">
                                    {item.title}
                                </h4>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleRemove(item.slug, item.locale)
                                    }}
                                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive"
                                    title={t.remove}
                                    aria-label={t.remove}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                <span>{formatTimeAgo(item.viewedAt)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

