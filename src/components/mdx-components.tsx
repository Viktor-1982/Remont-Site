"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { createRoot } from "react-dom/client"
import Image from "next/image"
import GitHubSlugger from "github-slugger"
import type { MDXComponents } from "mdx/types"
import { useMDXComponent } from "next-contentlayer2/hooks"

// Импорты калькуляторов
import { PaintCalculator } from "@/components/widgets/paint-calculator"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"
import { Checklist } from "@/components/widgets/checklist"
import { BeforeAfterGallery } from "@/components/widgets/before-after-gallery"
import { ComparisonTable } from "@/components/widgets/comparison-table"
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
    
    // Определяем язык из URL
    React.useEffect(() => {
        setIsEnglish(window.location.pathname.startsWith("/en"))
    }, [])

    const handleClick = () => {
        // Находим все изображения в статье (только из MDX контента)
        const article = document.querySelector("article")
        if (!article) return

        // Ищем все изображения в prose контейнере
        const proseContainer = article.querySelector(".prose")
        if (!proseContainer) return

        const imageElements = Array.from(proseContainer.querySelectorAll("img"))
        const images = imageElements.map((img) => {
            // Получаем оригинальный src из data-атрибута или srcset
            let imgSrc = img.getAttribute("src") || ""
            const imgAlt = img.getAttribute("alt") || ""
            
            // Если это Next.js оптимизированное изображение, получаем оригинальный путь
            if (imgSrc.includes("/_next/image")) {
                // Извлекаем оригинальный URL из параметра url
                try {
                    // Может быть двойное кодирование, поэтому декодируем несколько раз
                    let decodedUrl = imgSrc
                    const urlMatch = decodedUrl.match(/url=([^&]+)/)
                    if (urlMatch) {
                        decodedUrl = decodeURIComponent(urlMatch[1])
                        // Если все еще содержит /_next/image, декодируем еще раз
                        if (decodedUrl.includes("/_next/image")) {
                            const innerMatch = decodedUrl.match(/url=([^&]+)/)
                            if (innerMatch) {
                                decodedUrl = decodeURIComponent(innerMatch[1])
                            }
                        }
                        imgSrc = decodedUrl
                    }
                } catch (e) {
                    // Если не удалось декодировать, пытаемся получить из data-атрибутов
                    const originalSrc = img.getAttribute("data-original-src") || 
                                      img.getAttribute("data-src")
                    if (originalSrc) {
                        imgSrc = originalSrc
                    }
                }
            }
            
            // Нормализуем путь к изображению
            const normalizedSrc = imgSrc.startsWith("http") || imgSrc.startsWith("/") 
                ? imgSrc 
                : `/${imgSrc}`
                
            return {
                src: normalizedSrc,
                alt: imgAlt || undefined,
                caption: imgAlt || undefined,
            }
        })

        // Находим индекс текущего изображения
        const currentIndex = imageElements.findIndex((img) => {
            let imgSrc = img.getAttribute("src") || ""
            
            // Извлекаем оригинальный путь, если это оптимизированное изображение
            if (imgSrc.includes("/_next/image")) {
                try {
                    const urlMatch = imgSrc.match(/url=([^&]+)/)
                    if (urlMatch) {
                        imgSrc = decodeURIComponent(urlMatch[1])
                    }
                } catch {
                    // Оставляем как есть
                }
            }
            
            const normalizedSrc = imgSrc.startsWith("http") || imgSrc.startsWith("/") 
                ? imgSrc 
                : `/${imgSrc}`
            const normalizedCurrentSrc = src.startsWith("http") || src.startsWith("/") 
                ? src 
                : `/${src}`
            return normalizedSrc === normalizedCurrentSrc || 
                   normalizedSrc.includes(normalizedCurrentSrc.split("/").pop() || "") || 
                   normalizedCurrentSrc.includes(normalizedSrc.split("/").pop() || "")
        })

        if (images.length > 0) {
            // Открываем галерею через событие
            window.dispatchEvent(new CustomEvent("openImageGallery", {
                detail: { 
                    images, 
                    index: currentIndex >= 0 ? currentIndex : 0 
                }
            }))
        }
    }

    const figure = (
        <figure 
            className="relative mx-auto my-6 max-w-3xl w-full overflow-hidden rounded-xl bg-background group cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative w-full overflow-hidden rounded-lg">
                <Image
                    alt={alt && alt.trim() !== "" ? alt : "Изображение по теме ремонта"}
                    src={src}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
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

    // Калькуляторы
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

    // Галерея До/После
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

    // Таблица сравнения
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
    const [faqItems, setFaqItems] = useState<Array<{ question: string; answer: string }>>([])
    const headingRef = React.useRef<HTMLHeadingElement>(null)
    const faqContext = React.useContext(FAQContext)
    
    React.useEffect(() => {
        setIsEnglish(window.location.pathname.startsWith("/en"))
        
        // Используем FAQ из контекста, если доступен
        if (faqContext?.faqItems && faqContext.faqItems.length > 0) {
            setFaqItems(faqContext.faqItems)
            return
        }
        
        // Иначе пытаемся парсить из DOM
        const proseContainer = headingRef.current?.closest('.prose')
        if (!proseContainer) return
        
        // Находим все элементы после заголовка до следующего h2/h3
        let currentElement: Element | null = headingRef.current?.nextElementSibling || null
        const faqContent: string[] = []
        
        while (currentElement) {
            if (currentElement.tagName === "H2" || currentElement.tagName === "H3" || currentElement.tagName === "HR") {
                break
            }
            // Пропускаем уже добавленный FAQSection
            if (currentElement.classList.contains("my-8") && currentElement.querySelector("h2")) {
                break
            }
            faqContent.push(currentElement.textContent || "")
            currentElement = currentElement.nextElementSibling
        }
        
        // Парсим FAQ из собранного контента
        if (faqContent.length > 0) {
            const fullText = faqContent.join('\n')
            const parsed = parseFAQ(`## ${headingText}\n\n${fullText}`)
            if (parsed.length > 0) {
                setFaqItems(parsed)
            }
        }
    }, [headingText, faqContext])
    
    return (
        <>
            <h2
                ref={headingRef}
                id={headingId}
                aria-label={headingText}
                className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold"
                {...props}
            >
                {headingText}
            </h2>
            {faqItems.length > 0 && (
                <div className="my-6">
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

    // Автоматически скрываем оригинальный FAQ контент после рендера
    React.useEffect(() => {
        const proseContainer = document.querySelector(".prose")
        if (!proseContainer) return

        // Ищем заголовки FAQ
        const faqHeadings = Array.from(proseContainer.querySelectorAll("h2, h3")).filter((heading) => {
            const text = heading.textContent || ""
            return /FAQ|часто задаваемые вопросы|частые вопросы|frequently asked questions|common questions/i.test(text)
        })

        faqHeadings.forEach((heading) => {
            // Проверяем, не обработан ли уже
            if (heading.getAttribute("data-faq-processed") === "true") return
            heading.setAttribute("data-faq-processed", "true")

            // Находим следующий контент до следующего заголовка уровня 2 или 3
            let currentElement: Element | null = heading.nextElementSibling
            const faqContent: Element[] = []

            while (currentElement) {
                // Останавливаемся на следующем заголовке уровня 2 или 3
                if (currentElement.tagName === "H2" || currentElement.tagName === "H3") {
                    break
                }
                // Пропускаем горизонтальные разделители
                if (currentElement.tagName === "HR") {
                    break
                }
                // Пропускаем уже добавленный FAQSection компонент
                if (currentElement.classList.contains("faq-section-wrapper") || currentElement.querySelector(".faq-section-wrapper")) {
                    break
                }
                faqContent.push(currentElement)
                currentElement = currentElement.nextElementSibling
            }

            // Скрываем оригинальный контент FAQ (FAQSection уже добавлен через компонент)
            faqContent.forEach((el) => {
                el.setAttribute("style", "display: none;")
            })
        })
    }, [])

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
