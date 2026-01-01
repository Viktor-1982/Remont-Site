"use client"

import { useEffect, useState } from "react"
import { incrementView, getViewCount } from "@/lib/view-counter"
import { Eye } from "lucide-react"

interface ViewCounterProps {
    slug: string
    locale: "ru" | "en"
    className?: string
}

export function ViewCounter({ slug, locale, className }: ViewCounterProps) {
    const [views, setViews] = useState<number>(0)

    useEffect(() => {
        // Увеличиваем счетчик при загрузке страницы
        const count = incrementView(slug, locale)
        setViews(count)
    }, [slug, locale])

    if (views === 0) return null

    return (
        <div className={`flex items-center gap-1.5 text-xs text-muted-foreground/80 ${className || ""}`}>
            <Eye className="h-3.5 w-3.5 text-primary/70" />
            <span className="font-medium">{views}</span>
        </div>
    )
}

