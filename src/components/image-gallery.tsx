"use client"

import { useState, useEffect } from "react"
import * as React from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GalleryImage {
    src: string
    alt?: string
    caption?: string
}

interface ImageGalleryProps {
    images: GalleryImage[]
    initialIndex?: number
    onClose: () => void
    isEnglish?: boolean
}

export function ImageGallery({ images, initialIndex = 0, onClose, isEnglish = false }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const MIN_SCALE = 0.5
    const MAX_SCALE = 5
    const ZOOM_STEP = 0.25

    // Сброс зума при смене изображения
    useEffect(() => {
        setScale(1)
        setPosition({ x: 0, y: 0 })
    }, [currentIndex])

    const handlePrevious = React.useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }, [images.length])

    const handleNext = React.useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, [images.length])

    const handleZoomIn = React.useCallback((e?: React.MouseEvent<Element> | React.KeyboardEvent<Element> | KeyboardEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        setScale((prev) => Math.min(prev + ZOOM_STEP, MAX_SCALE))
    }, [])

    const handleZoomOut = React.useCallback((e?: React.MouseEvent<Element> | React.KeyboardEvent<Element> | KeyboardEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        setScale((prev) => {
            const newScale = Math.max(prev - ZOOM_STEP, MIN_SCALE)
            // Если достигли минимального зума, не делаем ничего больше
            return newScale
        })
    }, [])

    const handleResetZoom = React.useCallback(() => {
        setScale(1)
        setPosition({ x: 0, y: 0 })
    }, [])

    // Обработка колесика мыши для зума
    const handleWheel = React.useCallback((e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            e.stopPropagation()
            const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
            setScale((prev) => {
                const newScale = Math.max(MIN_SCALE, Math.min(prev + delta, MAX_SCALE))
                return newScale
            })
        }
    }, [])

    // Обработка перетаскивания изображения при зуме
    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true)
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
        }
    }, [scale, position])

    const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            })
        }
    }, [isDragging, scale, dragStart])

    const handleMouseUp = React.useCallback(() => {
        setIsDragging(false)
    }, [])

    // Обработка touch для мобильных устройств
    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 1 && scale > 1) {
            setIsDragging(true)
            setDragStart({
                x: e.touches[0].clientX - position.x,
                y: e.touches[0].clientY - position.y,
            })
        }
    }, [scale, position])

    const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 1 && isDragging && scale > 1) {
            setPosition({
                x: e.touches[0].clientX - dragStart.x,
                y: e.touches[0].clientY - dragStart.y,
            })
        }
    }, [isDragging, scale, dragStart])

    const handleTouchEnd = React.useCallback(() => {
        setIsDragging(false)
    }, [])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            } else if (e.key === "ArrowLeft") {
                e.preventDefault()
                handlePrevious()
            } else if (e.key === "ArrowRight") {
                e.preventDefault()
                handleNext()
            } else if (e.key === "+" || e.key === "=") {
                e.preventDefault()
                e.stopPropagation()
                handleZoomIn(e)
            } else if (e.key === "-" || e.key === "_") {
                e.preventDefault()
                e.stopPropagation()
                handleZoomOut(e)
            } else if (e.key === "0") {
                e.preventDefault()
                handleResetZoom()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        // Prevent body scroll when gallery is open
        document.body.style.overflow = "hidden"

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }
    }, [handlePrevious, handleNext, onClose, handleZoomIn, handleZoomOut, handleResetZoom])

    const currentImage = images[currentIndex]

    const handleBackgroundClick = React.useCallback(() => {
        // При клике на фон только сбрасываем зум, если фото увеличено
        // Галерея закрывается только через кнопку закрытия или Escape
        if (scale > 1) {
            handleResetZoom()
        }
    }, [scale, handleResetZoom])

    if (!currentImage) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 dark:bg-black/98 backdrop-blur-sm"
            onClick={handleBackgroundClick}
        >
            {/* Кнопка закрыть */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-50 bg-black/70 dark:bg-black/80 hover:bg-black/90 text-white border border-white/20 dark:border-white/10 backdrop-blur-sm transition-all hover:scale-110 h-8 w-8 md:h-10 md:w-10"
                aria-label={isEnglish ? "Close" : "Закрыть"}
            >
                <X className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Навигация влево */}
            {images.length > 1 && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation()
                        handlePrevious()
                    }}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 bg-black/70 dark:bg-black/80 hover:bg-black/90 text-white border border-white/20 dark:border-white/10 backdrop-blur-sm transition-all hover:scale-110 h-10 w-10 md:h-12 md:w-12"
                    aria-label={isEnglish ? "Previous" : "Предыдущее"}
                >
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
            )}

            {/* Изображение - центрируется по вертикали и горизонтали, с отступом снизу для подписи */}
            <div
                className="absolute inset-0 flex items-center justify-center p-4 pb-24 md:pb-32 overflow-hidden"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
                <div 
                    key={currentIndex}
                    className="relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-500 transition-transform"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: 'center center',
                    }}
                    onClick={(e) => {
                        // Предотвращаем закрытие галереи при клике на само изображение
                        e.stopPropagation()
                    }}
                >
                    {/* Используем обычный img для галереи, чтобы избежать проблем с Next.js Image оптимизацией */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={currentImage.src}
                        alt={currentImage.alt || ""}
                        className="max-w-[90vw] max-h-[calc(90vh-120px)] md:max-h-[calc(90vh-160px)] w-auto h-auto object-contain select-none pointer-events-none"
                        loading="eager"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Кнопки зума */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4 z-50 flex flex-col gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (scale < MAX_SCALE) {
                            handleZoomIn(e)
                        }
                    }}
                    disabled={scale >= MAX_SCALE}
                    className="bg-black/70 dark:bg-black/80 hover:bg-black/90 text-white border border-white/20 dark:border-white/10 backdrop-blur-sm transition-all hover:scale-110 h-8 w-8 md:h-10 md:w-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={isEnglish ? "Zoom in" : "Увеличить"}
                >
                    <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (scale > MIN_SCALE) {
                            handleZoomOut(e)
                        }
                    }}
                    disabled={scale <= MIN_SCALE}
                    className="bg-black/70 dark:bg-black/80 hover:bg-black/90 text-white border border-white/20 dark:border-white/10 backdrop-blur-sm transition-all hover:scale-110 h-8 w-8 md:h-10 md:w-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={isEnglish ? "Zoom out" : "Уменьшить"}
                >
                    <ZoomOut className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                {scale > 1 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleResetZoom()
                        }}
                        className="bg-black/70 dark:bg-black/80 hover:bg-black/90 text-white border border-white/20 dark:border-white/10 backdrop-blur-sm transition-all hover:scale-110 h-8 w-8 md:h-10 md:w-10"
                        aria-label={isEnglish ? "Reset zoom" : "Сбросить масштаб"}
                    >
                        <RotateCcw className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                )}
            </div>

            {/* Подпись и счетчик - абсолютное позиционирование внизу, не перекрывают изображение */}
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 md:gap-3 pointer-events-none w-full px-4">
                {/* Подпись */}
                {(currentImage.caption || currentImage.alt) && (
                    <div className="px-4 py-2 md:px-6 md:py-3 bg-black/70 dark:bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 dark:border-white/10 max-w-[calc(100vw-2rem)] md:max-w-3xl animate-in fade-in slide-in-from-bottom-2 pointer-events-auto">
                        <p className="text-white dark:text-white text-xs md:text-sm lg:text-base text-center break-words">
                            {currentImage.caption || currentImage.alt}
                        </p>
                    </div>
                )}

                {/* Счетчик */}
                {images.length > 1 && (
                    <div className="px-3 py-1.5 md:px-4 md:py-2 bg-black/70 dark:bg-black/80 backdrop-blur-sm rounded-full border border-white/20 dark:border-white/10 animate-in fade-in pointer-events-auto">
                        <p className="text-white dark:text-white text-xs md:text-sm font-medium">
                            {currentIndex + 1} / {images.length}
                        </p>
                    </div>
                )}
            </div>

            {/* Навигация вправо */}
            {images.length > 1 && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleNext()
                    }}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 bg-black/70 dark:bg-black/80 hover:bg-black/90 text-white border border-white/20 dark:border-white/10 backdrop-blur-sm transition-all hover:scale-110 h-10 w-10 md:h-12 md:w-12"
                    aria-label={isEnglish ? "Next" : "Следующее"}
                >
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
            )}

            {/* Индикаторы (точки) - скрыты на мобильных, показываются только на десктопе */}
            {images.length > 1 && (
                <div className="hidden md:flex absolute bottom-20 left-1/2 -translate-x-1/2 z-50 gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation()
                                setCurrentIndex(index)
                            }}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                index === currentIndex
                                    ? "bg-white w-8"
                                    : "bg-white/50 hover:bg-white/75 w-2"
                            )}
                            aria-label={`${isEnglish ? "Go to image" : "Перейти к изображению"} ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

