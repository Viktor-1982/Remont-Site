"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryProps {
    images: {
        src: string
        alt: string
    }[]
}

export function Gallery({ images }: GalleryProps) {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((prev) => (prev + 1) % images.length)
    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

    return (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index].src}
                        alt={images[index].alt}
                        fill
                        className="object-cover object-center"
                        sizes="100vw"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Навигация */}
            <button
                onClick={prev}
                aria-label="Предыдущее фото"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 transition"
            >
                <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
            </button>

            <button
                onClick={next}
                aria-label="Следующее фото"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 transition"
            >
                <ChevronRight className="w-5 h-5 text-black dark:text-white" />
            </button>

            {/* Индикаторы */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 w-2 rounded-full transition ${
                            i === index ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Перейти к фото ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
