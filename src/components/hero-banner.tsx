"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import navDataJson from "@/components/messages/nav.json"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

type Locale = "ru" | "en"

type HeroDict = {
    title: string
    subtitle: string
    ctaTrends: string
    ctaDiy: string
}

type NavData = {
    [key in Locale]: {
        hero: HeroDict
    }
}

const navData = navDataJson as NavData

export function HeroBanner() {
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const isHomePage = pathname === "/" || pathname === "/en"
    const t = navData[isEnglish ? "en" : "ru"].hero

    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })
    // Упрощенный параллакс для производительности
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    const controls = useAnimation()
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v > 0.05) controls.start({ opacity: 0, y: 10 })
            else controls.start({ opacity: 1, y: 0 })
        })
        return () => unsubscribe()
    }, [scrollYProgress, controls])

    const handleScroll = () => {
        const section = document.getElementById("articles")
        if (section) {
            // На мобильных используем instant scroll для лучшей производительности
            const isMobile = window.innerWidth < 768
            section.scrollIntoView({ 
                behavior: isMobile ? "auto" : "smooth", 
                block: "start" 
            })
        }
    }

    return (
        <section
            ref={ref}
            className="
        relative left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw] w-screen
        min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]
        overflow-hidden flex items-center justify-center
        rounded-b-3xl
      "
        >
            {/* 🖼️ Фон */}
            <motion.div style={{ y }} className="absolute inset-0">
                <Image
                    src="/images/hero/hero-banner.png"
                    alt="Renohacks.com — блог о ремонте и строительстве"
                    fill
                    priority
                    className="object-cover object-center brightness-[0.85] saturate-110 will-change-transform"
                    sizes="100vw"
                    quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent dark:from-black/80" />
                {/* Упрощенные декоративные элементы для производительности */}
                <div className="absolute right-[20%] top-[15%] w-[200px] h-[200px] bg-white/10 blur-3xl rounded-full will-change-transform" />
                {/* 🥑 Зеленый цвет авокадо - без анимации для производительности */}
                <div className="absolute left-[10%] bottom-[20%] w-[180px] h-[180px] bg-[#87A96B] dark:bg-[#9CAF88] blur-3xl rounded-full opacity-40 dark:opacity-35" />
                <div className="absolute right-[15%] top-[30%] w-[120px] h-[120px] bg-[#87A96B] dark:bg-[#9CAF88] blur-2xl rounded-full opacity-35 dark:opacity-30" />
            </motion.div>

            {/* ✨ Контент */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    {isHomePage ? (
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white dark:text-white leading-[1.1] mb-6 tracking-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.5),_0_4px_40px_rgba(0,0,0,0.3)]">
                        {t.title}
                    </h1>
                    ) : (
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white dark:text-white leading-[1.1] mb-6 tracking-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.5),_0_4px_40px_rgba(0,0,0,0.3)]">
                        {t.title}
                    </h2>
                    )}

                    <p className="text-lg sm:text-xl md:text-2xl text-white/95 dark:text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed font-medium [text-shadow:_0_2px_15px_rgba(0,0,0,0.4),_0_1px_5px_rgba(0,0,0,0.5)]">
                        {t.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* 🔹 Первая кнопка (Trends) */}
                        <Button
                            asChild
                            size="lg"
                            className="rounded-full px-8 py-4 text-base font-semibold 
              bg-[#87A96B] text-white dark:bg-[#9CAF88] dark:text-gray-900
              hover:bg-[#7A9660] dark:hover:bg-[#8BA078]
              hover:shadow-xl hover:shadow-[#87A96B]/40 hover:scale-105 
              transition-smooth backdrop-blur-sm border border-white/20"
                        >
                            <Link href={isEnglish ? "/en/tags/trends" : "/tags/тренды"} prefetch={true}>
                                {t.ctaTrends} →
                            </Link>
                        </Button>

                        {/* 🔹 Вторая кнопка (DIY) */}
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 py-4 text-base font-semibold 
              border-2 border-white/40 text-white backdrop-blur-md
              bg-white/10 dark:bg-white/5
              hover:bg-white/20 hover:border-white/60 dark:hover:bg-white/15
              hover:shadow-xl hover:shadow-white/20 hover:scale-105 
              transition-smooth"
                        >
                            <Link href={isEnglish ? "/en/tags/diy" : "/tags/diy"} prefetch={true}>
                                {t.ctaDiy}
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* ⬇️ Анимированная стрелка - оптимизированная */}
            <motion.button
                onClick={handleScroll}
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-6 flex flex-col items-center text-white/80 cursor-pointer will-change-transform"
                aria-label="Прокрутить вниз"
            >
                <motion.div animate={controls} initial={{ opacity: 1 }}>
                    <ChevronDown className="w-8 h-8" strokeWidth={1.5} />
                </motion.div>
            </motion.button>
        </section>
    )
}
