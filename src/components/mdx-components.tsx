"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import GitHubSlugger from "github-slugger"
import type { MDXComponents } from "mdx/types"
import { useMDXComponent } from "next-contentlayer2/hooks"

// Динамические импорты для тяжелых компонентов (оптимизация bundle size)
const PaintCalculator = dynamic(
    () => import("@/components/widgets/paint-calculator").then((m) => ({ default: m.PaintCalculator })),
    { ssr: true, loading: () => <div className="my-8 h-64 bg-muted/50 rounded-lg animate-pulse" /> }
)
const TileCalculator = dynamic(
    () => import("@/components/widgets/tile-calculator").then((m) => ({ default: m.TileCalculator })),
    { ssr: true, loading: () => <div className="my-8 h-64 bg-muted/50 rounded-lg animate-pulse" /> }
)
const WallpaperCalculator = dynamic(
    () => import("@/components/widgets/wallpaper-calculator").then((m) => ({ default: m.WallpaperCalculator })),
    { ssr: true, loading: () => <div className="my-8 h-64 bg-muted/50 rounded-lg animate-pulse" /> }
)
const BeforeAfterGallery = dynamic(
    () => import("@/components/widgets/before-after-gallery").then((m) => ({ default: m.BeforeAfterGallery })),
    { ssr: true, loading: () => <div className="my-8 h-64 bg-muted/50 rounded-lg animate-pulse" /> }
)
const ComparisonTable = dynamic(
    () => import("@/components/widgets/comparison-table").then((m) => ({ default: m.ComparisonTable })),
    { ssr: true, loading: () => <div className="my-8 h-32 bg-muted/50 rounded-lg animate-pulse" /> }
)

// Статические импорты для легких компонентов
import { Checklist } from "@/components/widgets/checklist"
import { FAQSection } from "@/components/widgets/faq-section"
import { ImageGallery } from "@/components/image-gallery"
import { parseFAQ } from "@/lib/parse-faq"

// 🔹 Вспомогательная функция для извлечения текста из children
const getTextFromChildren = (children: React.ReactNode): string => {
    if (children == null) return ""
    if (typeof children === "string") return children
    if (typeof children === "number") return String(children)
    if (typeof children === "boolean") return ""
    if (Array.isArray(children)) {
        return children.map(getTextFromChildren).join("")
    }
    if (React.isValidElement(children)) {
        // Если это React элемент, пытаемся извлечь текст из children
        const props = children.props as { children?: React.ReactNode }
        if (props && props.children !== undefined) {
            return getTextFromChildren(props.children)
        }
    }
    // Последняя попытка - преобразовать в строку
    const text = String(children)
    // Убираем [object Object] и подобные артефакты
    if (text.startsWith("[object")) return ""
    return text
}

// 🔹 Компонент для изображений с поддержкой галереи
function MdxImage({ alt, src }: { alt?: string; src: string }) {
    const [isEnglish, setIsEnglish] = useState(false)
    const imageRef = React.useRef<HTMLDivElement>(null)

    // Определяем язык из URL
    React.useEffect(() => {
        setIsEnglish(window.location.pathname.startsWith("/en"))
    }, [])

    // Определяем, является ли изображение квадратным
    React.useEffect(() => {
        const checkIfSquare = () => {
            if (!imageRef.current) return

            const img = imageRef.current.querySelector('img')
            if (!img) return

            // Находим родительский figure элемент
            const figure = imageRef.current.closest('figure')
            if (!figure) return

            // Ждем загрузки изображения
            const checkAspectRatio = () => {
                const aspectRatio = img.naturalWidth / img.naturalHeight
                // Считаем квадратным, если соотношение сторон от 0.9 до 1.1
                if (aspectRatio >= 0.9 && aspectRatio <= 1.1) {
                    figure.classList.add('mdx-image-square')
                }
            }

            if (img.complete && img.naturalWidth > 0) {
                checkAspectRatio()
            } else {
                img.onload = checkAspectRatio
                // Fallback на случай, если onload не сработает
                setTimeout(checkAspectRatio, 100)
            }
        }

        // Небольшая задержка для того, чтобы DOM обновился
        const timeoutId = setTimeout(checkIfSquare, 50)
        return () => clearTimeout(timeoutId)
    }, [src])

    const handleClick = () => {
        // Забираем картинку в виде объекта
        const imgObj = {
            src: src.startsWith("http") || src.startsWith("/") ? src : `/${src}`,
            alt: alt || undefined,
            caption: alt || undefined,
        }

        // Открываем галерею через событие
        window.dispatchEvent(new CustomEvent("openImageGallery", {
            detail: {
                images: [imgObj],
                index: 0
            }
        }))
    }

    const figure = (
        <figure
            className="relative mx-auto my-6 max-w-3xl w-full overflow-hidden rounded-xl bg-background group cursor-pointer mdx-image-figure"
            onClick={handleClick}
        >
            <div ref={imageRef} className="relative w-full overflow-hidden rounded-lg">
                <Image
                    alt={alt && alt.trim() !== "" ? alt : "Изображение по теме ремонта"}
                    src={src}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 mdx-image"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                {/* Индикатор клика - не блокирует клик благодаря pointer-events-none */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium text-foreground dark:text-white shadow-lg">
                        {isEnglish ? "Click to view" : "Нажмите для просмотра"}
                    </div>
                </div>
            </div>
            {alt && (
                <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {alt}
                </figcaption>
            )}
        </figure>
    )

    return alt ? (
        figure
    ) : (
        <div className="relative mx-auto my-6 max-w-3xl w-full overflow-hidden rounded-xl bg-background">
            {figure}
        </div>
    )
}

// 🔹 Словарь компонентов, доступных в MDX
export const mdxComponents: MDXComponents = {
    // Картинки с поддержкой галереи
    img: MdxImage,

    // Калькуляторы (динамически загружаются)
    PaintCalculator: () => (
        <div className="my-8">
            <PaintCalculator />
        </div>
    ),
    TileCalculator: () => (
        <div className="my-8">
            <TileCalculator />
        </div>
    ),
    WallpaperCalculator: () => (
        <div className="my-8">
            <WallpaperCalculator />
        </div>
    ),

    // Чеклисты
    Checklist: (props: {
        title: string
        items: string[]
        storageKey?: string
        isEnglish?: boolean
    }) => (
        <Checklist
            title={props.title}
            items={props.items}
            storageKey={props.storageKey}
            isEnglish={props.isEnglish}
        />
    ),

    // Галерея До/После (динамически загружается)
    BeforeAfterGallery: (props: {
        images: Array<{
            before: string
            after: string
            label?: string
            description?: string
        }>
        isEnglish?: boolean
    }) => (
        <BeforeAfterGallery images={props.images} isEnglish={props.isEnglish} />
    ),

    // Таблица сравнения (динамически загружается)
    ComparisonTable: (props: {
        title: string
        items: string[]
        rows: Array<{
            feature: string
            values: (string | number | boolean | null)[]
            highlight?: "best" | "worst" | "neutral"
        }>
        filters?: string[]
        isEnglish?: boolean
    }) => (
        <ComparisonTable
            title={props.title}
            items={props.items}
            rows={props.rows}
            filters={props.filters}
            isEnglish={props.isEnglish}
        />
    ),

    // Заголовки
    // H1 в контенте автоматически конвертируется в H2, так как ArticleHero уже предоставляет H1
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const slugger = new GitHubSlugger()
        const text = getTextFromChildren(props.children)
        const id = slugger.slug(text)
        return (
            <h2
                id={id}
                aria-label={text}
                className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold"
                {...props}
            />
        )
    },
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const slugger = new GitHubSlugger()
        const text = getTextFromChildren(props.children)
        const id = slugger.slug(text)

        // Проверяем, является ли это FAQ секцией
        const isFAQ = /FAQ|часто задаваемые вопросы|частые вопросы|frequently asked questions|common questions/i.test(text)

        // Если это FAQ, используем специальный компонент
        if (isFAQ) {
            return <FAQHeadingWrapper headingText={text} headingId={id} {...props} />
        }

        return (
            <h2
                id={id}
                aria-label={text}
                className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold"
                {...props}
            />
        )
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const slugger = new GitHubSlugger()
        const text = getTextFromChildren(props.children)
        const id = slugger.slug(text)
        return (
            <h3
                id={id}
                aria-label={text}
                className="mt-8 scroll-m-20 text-xl font-semibold"
                {...props}
            />
        )
    },

    // Абзацы — фикс чтобы картинки не попадали в <p>
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
        const childrenArray = React.Children.toArray(props.children)
        const containsStandaloneMedia = childrenArray.some((child) => {
            if (!React.isValidElement(child)) return false
            const type = child.type
            if (type === "img" || type === "figure") return true
            if (typeof type === "function" && "displayName" in type && type.displayName === "Image") {
                return true
            }
            const childProps = child.props as Record<string, unknown>
            return "src" in childProps && typeof childProps.src === "string"
        })

        if (containsStandaloneMedia) {
            const { children, ...rest } = props
            return (
                <div
                    className="leading-7 text-foreground [&:not(:first-child)]:mt-4"
                    {...rest}
                >
                    {children}
                </div>
            )
        }

        return (
            <p
                className="leading-7 text-foreground [&:not(:first-child)]:mt-4"
                {...props}
            />
        )
    },

    // Списки
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="ml-6 list-disc [&>li]:mt-2 [&>li]:text-foreground" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="ml-6 list-decimal [&>li]:mt-2 [&>li]:text-foreground" {...props} />
    ),

    // Цитаты
    blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
        <blockquote
            className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
            {...props}
        />
    ),

    // FAQ компонент для использования в MDX
    FAQSection: (props: { items?: Array<{ question: string; answer: string }>; title?: string; searchable?: boolean }) => {
        const [isEnglish, setIsEnglish] = useState(false)

        React.useEffect(() => {
            setIsEnglish(window.location.pathname.startsWith("/en"))
        }, [])

        // Если items не переданы, пытаемся получить из контекста статьи
        if (!props.items || props.items.length === 0) {
            return null
        }

        return (
            <FAQSection
                items={props.items}
                title={props.title}
                isEnglish={isEnglish}
                searchable={props.searchable !== false}
            />
        )
    },
}

// 🔹 Контекст для передачи данных FAQ
const FAQContext = React.createContext<{ code: string; faqItems: Array<{ question: string; answer: string }> } | null>(null)

// 🔹 Компонент-обёртка для FAQ заголовка
function FAQHeadingWrapper({ headingText, headingId, ...props }: { headingText: string; headingId: string } & React.HTMLAttributes<HTMLHeadingElement>) {
    const [isEnglish, setIsEnglish] = useState(false)
    const faqContext = React.useContext(FAQContext)

    React.useEffect(() => {
        setIsEnglish(window.location.pathname.startsWith("/en"))
    }, [])

    // Получаем FAQ элементы только из контекста, который был заранее спаршен во время сборки ContentLayer
    const faqItems = faqContext?.faqItems || []

    return (
        <>
            <h2
                id={headingId}
                aria-label={headingText}
                className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold faq-section-heading"
                {...props}
            >
                {headingText}
            </h2>
            {faqItems.length > 0 && (
                <div className="my-6 faq-section-wrapper">
                    <FAQSection
                        items={faqItems}
                        isEnglish={isEnglish}
                        searchable={true}
                    />
                </div>
            )}
        </>
    )
}

// 🔹 Обёртка для рендера MDX
export function Mdx({ code }: { code: string }) {
    const MDXContent = useMDXComponent(code)
    const [galleryOpen, setGalleryOpen] = useState(false)
    const [galleryImages, setGalleryImages] = useState<Array<{ src: string; alt?: string; caption?: string }>>([])
    const [galleryIndex, setGalleryIndex] = useState(0)
    const [isEnglish, setIsEnglish] = useState(false)
    const proseRef = React.useRef<HTMLDivElement>(null)

    // Парсим FAQ из контента
    const faqItems = React.useMemo(() => parseFAQ(code), [code])

    // Определяем язык
    React.useEffect(() => {
        setIsEnglish(window.location.pathname.startsWith("/en"))
    }, [])

    // Слушаем событие открытия галереи
    React.useEffect(() => {
        const handleOpenGallery = (event: CustomEvent<{ images: Array<{ src: string; alt?: string; caption?: string }>; index: number }>) => {
            setGalleryImages(event.detail.images)
            setGalleryIndex(event.detail.index)
            setGalleryOpen(true)
        }

        window.addEventListener("openImageGallery", handleOpenGallery as EventListener)
        return () => {
            window.removeEventListener("openImageGallery", handleOpenGallery as EventListener)
        }
    }, [])

    // FAQ контент парсится на этапе сборки и доступен через context.
    // Если нам нужно скрыть сырой текст из MDX, лучше всего это сделать 
    // через remark/rehype плагин на этапе сборки, а не через DOM манипуляции.

    return (
        <FAQContext.Provider value={{ code, faqItems }}>
            <div ref={proseRef} className="prose dark:prose-invert max-w-none">
                <MDXContent components={mdxComponents} />
            </div>
            {galleryOpen && galleryImages.length > 0 && (
                <ImageGallery
                    images={galleryImages}
                    initialIndex={galleryIndex}
                    onClose={() => setGalleryOpen(false)}
                    isEnglish={isEnglish}
                />
            )}
        </FAQContext.Provider>
    )
}
