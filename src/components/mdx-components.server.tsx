import * as React from "react"
import Image from "next/image"
import GitHubSlugger from "github-slugger"
import type { MDXComponents } from "mdx/types"
import { PaintCalculator } from "@/components/widgets/paint-calculator"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"
import { Checklist } from "@/components/widgets/checklist"
import { FAQSection } from "@/components/widgets/faq-section"
import { BeforeAfterGallery } from "@/components/widgets/before-after-gallery"
import { ComparisonTable } from "@/components/widgets/comparison-table"

const getTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === "string") return children
    if (typeof children === "number") return children.toString()
    if (!children) return ""

    if (Array.isArray(children)) {
        return children.map(getTextFromChildren).join("")
    }

    if (React.isValidElement(children)) {
        const childProps = children.props as { children?: React.ReactNode }
        if (childProps.children) {
            return getTextFromChildren(childProps.children)
        }
    }

    return ""
}

function MdxImage({ alt, src }: { alt?: string; src: string }) {
    return (
        <figure className="relative mx-auto my-6 max-w-3xl w-full overflow-hidden rounded-xl bg-background">
            <Image
                alt={alt && alt.trim() !== "" ? alt : "Изображение по теме ремонта"}
                src={src}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
            {alt && <figcaption className="mt-2 text-sm text-muted-foreground">{alt}</figcaption>}
        </figure>
    )
}

export function createMdxComponents(): MDXComponents {
    const slugger = new GitHubSlugger()

    return {
        img: MdxImage,
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
        FAQSection: (props: { items?: Array<{ question: string; answer: string }>; title?: string; searchable?: boolean }) => {
            if (!props.items || props.items.length === 0) return null
            return (
                <FAQSection
                    items={props.items}
                    title={props.title}
                    searchable={props.searchable !== false}
                />
            )
        },
        h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
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
        h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
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
                    <div className="leading-7 text-foreground [&:not(:first-child)]:mt-4" {...rest}>
                        {children}
                    </div>
                )
            }

            return (
                <p className="leading-7 text-foreground [&:not(:first-child)]:mt-4" {...props} />
            )
        },
        ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
            <ul className="ml-6 list-disc [&>li]:mt-2 [&>li]:text-foreground" {...props} />
        ),
        ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
            <ol className="ml-6 list-decimal [&>li]:mt-2 [&>li]:text-foreground" {...props} />
        ),
        blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props} />
        ),
    }
}

