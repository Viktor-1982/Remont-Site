"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BeforeAfterImage {
    before: string
    after: string
    label?: string
    description?: string
}

interface BeforeAfterGalleryProps {
    images: BeforeAfterImage[]
    isEnglish?: boolean
}

export function BeforeAfterGallery({ images, isEnglish = false }: BeforeAfterGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const currentImage = images[currentIndex]

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = (x / rect.width) * 100
        setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const touch = e.touches[0]
        const x = touch.clientX - rect.left
        const percentage = (x / rect.width) * 100
        setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
        setSliderPosition(50)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        setSliderPosition(50)
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
            
            if (e.key === "ArrowLeft") {
                e.preventDefault()
                prevImage()
            } else if (e.key === "ArrowRight") {
                e.preventDefault()
                nextImage()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    if (!currentImage) return null

    return (
        <div className="my-8 rounded-xl border bg-card p-4 shadow-soft">
            {/* Заголовок и навигация */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    {currentImage.label && (
                        <h3 className="text-lg font-semibold">{currentImage.label}</h3>
                    )}
                    {currentImage.description && (
                        <p className="text-sm text-muted-foreground mt-1">{currentImage.description}</p>
                    )}
                </div>
                {images.length > 1 && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevImage}
                            aria-label={isEnglish ? "Previous" : "Предыдущее"}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground px-2">
                            {currentIndex + 1} / {images.length}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextImage}
                            aria-label={isEnglish ? "Next" : "Следующее"}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Галерея До/После */}
            <div
                ref={containerRef}
                className="relative w-full aspect-video rounded-lg overflow-hidden border cursor-col-resize select-none bg-muted"
                onMouseMove={handleMouseMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
            >
                {/* Изображение "До" */}
                <div className="absolute inset-0">
                    <Image
                        src={currentImage.before}
                        alt={isEnglish ? "Before" : "До"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>

                {/* Изображение "После" с клипом */}
                <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <Image
                        src={currentImage.after}
                        alt={isEnglish ? "After" : "После"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>

                {/* Ползунок */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                    style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-primary shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                </div>

                {/* Подписи */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm backdrop-blur-sm">
                    {isEnglish ? "Before" : "До"}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm backdrop-blur-sm">
                    {isEnglish ? "After" : "После"}
                </div>

                {/* Инструкция */}
                {!isDragging && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-xs backdrop-blur-sm animate-pulse">
                        {isEnglish ? "← Drag to compare →" : "← Перетащите для сравнения →"}
                    </div>
                )}
            </div>
        </div>
    )
}

