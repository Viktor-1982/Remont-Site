"use client"

import { useRef, useState, useEffect } from "react"
import type { Post } from ".contentlayer/generated"
import { ArticleCard } from "@/components/article-card"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface LatestArticlesCarouselProps {
    posts: Post[]
    isEnglish?: boolean
}

export function LatestArticlesCarousel({ posts, isEnglish = false }: LatestArticlesCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [showLeftBtn, setShowLeftBtn] = useState(false)
    const [showRightBtn, setShowRightBtn] = useState(true)

    // Отобрать 6 последних постов
    const latestPosts = posts
        .filter((p) => !p.draft)
        .slice(0, 6)

    // Функция проверки видимости кнопок прокрутки
    const checkScrollButtons = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
            setShowLeftBtn(scrollLeft > 10)
            setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener("scroll", checkScrollButtons)
            // Первичная проверка после монтирования
            checkScrollButtons()
            // Проверка при ресайзе
            window.addEventListener("resize", checkScrollButtons)
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", checkScrollButtons)
            }
            window.removeEventListener("resize", checkScrollButtons)
        }
    }, [latestPosts])

    const handleScroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const { scrollLeft, clientWidth } = containerRef.current
            // Шаг прокрутки равен ширине одной карточки (около 380px) + gap (24px)
            const scrollStep = window.innerWidth < 640 ? clientWidth * 0.85 : 404
            const targetScroll = direction === "left" ? scrollLeft - scrollStep : scrollLeft + scrollStep

            containerRef.current.scrollTo({
                left: targetScroll,
                behavior: "smooth",
            })
        }
    }

    if (latestPosts.length === 0) return null

    return (
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative space-y-6"
        >
            {/* 🏷️ Заголовок секции */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isEnglish ? "New on the site" : "Новое на сайте"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                        {isEnglish ? "Latest Articles" : "Свежие публикации"}
                    </h2>
                </div>
            </div>

            {/* 📦 Обертка карусели */}
            <div className="group relative">
                {/* ⬅️ Левая кнопка навигации */}
                {showLeftBtn && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleScroll("left")}
                        className="hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full 
                        bg-background/95 hover:bg-background border border-border shadow-md 
                        backdrop-blur-md transition-smooth hover:scale-105 active:scale-95"
                        aria-label="Previous posts"
                    >
                        <ChevronLeft className="h-6 w-6 text-foreground" />
                    </Button>
                )}

                {/* ➡️ Правая кнопка навигации */}
                {showRightBtn && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleScroll("right")}
                        className="hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full 
                        bg-background/95 hover:bg-background border border-border shadow-md 
                        backdrop-blur-md transition-smooth hover:scale-105 active:scale-95"
                        aria-label="Next posts"
                    >
                        <ChevronRight className="h-6 w-6 text-foreground" />
                    </Button>
                )}

                {/* 🛝 Прокручиваемый контейнер */}
                <div
                    ref={containerRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none pb-6 px-1"
                >
                    {latestPosts.map((post) => (
                        <div
                            key={post._id}
                            className="w-[85vw] sm:w-[380px] flex-shrink-0 snap-start transition-smooth"
                        >
                            <ArticleCard post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}
