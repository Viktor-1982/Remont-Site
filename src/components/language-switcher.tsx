"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Locale = {
    code: string
    label: string
    basePath: string
    active: boolean
}

const locales: Locale[] = [
    { code: "en", label: "EN", basePath: "/en", active: true },
    { code: "ru", label: "RU", basePath: "/", active: true },
]

export function LanguageSwitcher() {
    const pathname = usePathname() || "/"
    const [targetUrls, setTargetUrls] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        let mounted = true
        setLoading(true)

        fetch(`/api/switch-target?path=${encodeURIComponent(pathname)}`, {
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((data) => {
                if (!mounted) return
                const targets = data?.targets ?? data ?? {}
                setTargetUrls(targets)
            })
            .catch(() => {
                if (!mounted) return
                const fallback: Record<string, string> = {}
                locales.forEach((l) => (fallback[l.code] = l.basePath))
                setTargetUrls(fallback)
            })
            .finally(() => mounted && setLoading(false))

        return () => {
            mounted = false
            controller.abort()
        }
    }, [pathname])

    if (loading) {
        return <div className="w-[120px] h-[36px] animate-pulse bg-muted/50 rounded-full" />
    }

    const currentIsEnglish = /^\/en(\/|$)/.test(pathname)

    return (
        <div
            className={cn(
                "flex items-center gap-1 rounded-full border border-border/40 bg-muted/30 backdrop-blur-lg p-1 sm:p-[6px]",
                "shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-2px_-2px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.15)]"
            )}
        >
            {locales.map((locale) => {
                const isActive = currentIsEnglish
                    ? locale.code === "en"
                    : locale.code === "ru"
                const href = isActive
                    ? pathname
                    : targetUrls?.[locale.code] ?? locale.basePath

                return (
                    <Link
                        key={locale.code}
                        href={href}
                        className={cn(
                            "px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200",
                            isActive
                                ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow scale-[1.05]"
                                : "text-muted-foreground hover:text-primary hover:bg-white/30 hover:scale-[1.03]"
                        )}
                    >
                        {locale.label}
                    </Link>
                )
            })}
        </div>
    )
}
