"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ListOrdered } from "lucide-react"

export type Heading = {
    level: number
    text: string
    slug: string
}

export function TableOfContents({
                                    items,
                                    onLinkClick,
                                }: {
    items: Heading[]
    onLinkClick?: () => void
}) {
    const [activeId, setActiveId] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [showFab, setShowFab] = useState(false)

    // Подсветка активного заголовка
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "-20% 0px -60% 0px" }
        )

        observer.disconnect()
        items.forEach((h) => {
            const el = document.getElementById(h.slug)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [items])

    // Автосворачивание/открытие на мобилке при скролле
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY
            if (currentY > lastScrollY + 10) {
                setIsOpen(false) // вниз
            } else if (currentY < lastScrollY - 10) {
                setIsOpen(true) // вверх
            }
            setShowFab(currentY > 400)
            setLastScrollY(currentY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    if (!items?.length) return null

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const target = document.getElementById(id)
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" })
            history.pushState(null, "", `#${id}`)
            setIsOpen(false)
            if (onLinkClick) onLinkClick() // 👈 закрыть панель TocToggle
        }
    }

    return (
        <>
            {/* 📱 Мобильная версия с аккордеоном */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center justify-between rounded-lg border p-3 font-semibold text-left bg-card"
                >
                    <span>Оглавление</span>
                    <ChevronDown
                        className={cn(
                            "h-5 w-5 transform transition-transform duration-300",
                            isOpen ? "rotate-180" : "rotate-0"
                        )}
                    />
                </button>

                <div
                    className={cn(
                        "transition-all duration-500 ease-in-out overflow-hidden",
                        isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}
                >
                    <ul className="space-y-1 rounded-lg border p-3 bg-card text-sm">
                        {items.map((h) => (
                            <li key={h.slug} className={h.level === 3 ? "ml-4" : "ml-0"}>
                                <a
                                    href={`#${h.slug}`}
                                    onClick={(e) => handleClick(e, h.slug)}
                                    className={cn(
                                        "block transition-colors hover:text-foreground",
                                        activeId === h.slug
                                            ? "text-primary font-semibold"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {h.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 💻 Десктопная версия */}
            <nav className="sticky top-24 hidden lg:block max-h-[70vh] w-64 shrink-0 overflow-auto rounded-xl border p-4 text-sm bg-card">
                <div className="mb-2 font-semibold">Оглавление</div>
                <ul className="space-y-1">
                    {items.map((h) => (
                        <li key={h.slug} className={h.level === 3 ? "ml-4" : "ml-0"}>
                            <a
                                href={`#${h.slug}`}
                                onClick={(e) => handleClick(e, h.slug)}
                                className={cn(
                                    "transition-colors hover:text-foreground",
                                    activeId === h.slug
                                        ? "text-primary font-semibold"
                                        : "text-muted-foreground"
                                )}
                            >
                                {h.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* 📱 Плавающая кнопка (FAB) */}
            {showFab && (
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="lg:hidden fixed bottom-20 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white shadow-lg transition hover:scale-105"
                >
                    <ListOrdered className="h-5 w-5" />
                    <span className="text-sm font-semibold">
            {isOpen ? "Скрыть" : "Оглавление"}
          </span>
                </button>
            )}
        </>
    )
}
