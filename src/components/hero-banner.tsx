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
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

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
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" })
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
                <div className="absolute right-[20%] top-[15%] w-[200px] h-[200px] bg-white/10 blur-3xl rounded-full" />
            </motion.div>

            {/* ✨ Контент */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    {isHomePage ? (
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white dark:text-white leading-tight drop-shadow-[0_6px_12px_rgba(0,0,0,0.55)] mb-6">
                            {t.title}
                        </h1>
                    ) : (
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white dark:text-white leading-tight drop-shadow-[0_6px_12px_rgba(0,0,0,0.55)] mb-6">
                            {t.title}
                        </h2>
                    )}

                    <p className="text-lg sm:text-xl md:text-2xl text-white/90 dark:text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* 🔹 Первая кнопка (Trends) */}
                        <Button
                            asChild
                            size="lg"
                            className="rounded-full px-8 py-3 text-base font-semibold 
              bg-white text-gray-900 dark:bg-white/90 dark:text-black
              hover:bg-gray-100 dark:hover:bg-white 
              hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <Link href={isEnglish ? "/en/tags/trends" : "/tags/тренды"}>
                                {t.ctaTrends} →
                            </Link>
                        </Button>

                        {/* 🔹 Вторая кнопка (DIY) */}
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 py-3 text-base font-semibold 
              border border-gray-200 text-gray-900 
              dark:border-white dark:text-white
              hover:bg-gray-50 dark:hover:bg-white/10 
              hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            <Link href={isEnglish ? "/en/tags/diy" : "/tags/diy"}>
                                {t.ctaDiy}
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* ⬇️ Анимированная стрелка */}
            <motion.button
                onClick={handleScroll}
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-6 flex flex-col items-center text-white/80 cursor-pointer"
                aria-label="Прокрутить вниз"
            >
                <motion.div animate={controls} initial={{ opacity: 1 }}>
                    <ChevronDown className="w-8 h-8" strokeWidth={1.5} />
                </motion.div>
            </motion.button>
        </section>
    )
}
