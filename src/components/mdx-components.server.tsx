import * as React from "react"
import Image from "next/image"
import GitHubSlugger from "github-slugger"
import type { MDXComponents } from "mdx/types"
import { PaintCalculator } from "@/components/widgets/paint-calculator"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"
import { FlooringCalculator } from "@/components/widgets/flooring-calculator"
import { BaseboardCalculator } from "@/components/widgets/baseboard-calculator"
import { ScreedCalculator } from "@/components/widgets/screed-calculator"
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
        FlooringCalculator: () => (
            <div className="my-8">
                <FlooringCalculator />
            </div>
        ),
        BaseboardCalculator: () => (
            <div className="my-8">
                <BaseboardCalculator />
            </div>
        ),
        ScreedCalculator: () => (
            <div className="my-8">
                <ScreedCalculator />
            </div>
        ),
        AffiliateCard: (props: { href: string; title: string; description: string }) => (
            <div className="my-8 p-6 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10">
                <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">🛒</span>
                    <div className="flex-1">
                        <h4 className="font-semibold text-foreground mt-0 mb-1">{props.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 mb-4 leading-relaxed">{props.description}</p>
                        <a
                            href={props.href}
                            target="_blank"
                            rel="sponsored nofollow"
                            style={{ backgroundColor: '#FF9900', color: '#111111' }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold no-underline hover:opacity-90 transition-opacity"
                        >
                            View on Amazon
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    </div>
                </div>
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
        table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
            <div className="my-8 w-full overflow-x-auto rounded-lg border border-border bg-background/70 shadow-sm">
                <table
                    className="w-full min-w-[720px] border-collapse text-left text-sm leading-6"
                    {...props}
                />
            </div>
        ),
        thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
            <thead className="bg-muted/70 text-foreground" {...props} />
        ),
        tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
            <tbody className="divide-y divide-border" {...props} />
        ),
        tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr className="align-top even:bg-muted/20" {...props} />
        ),
        th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
            <th
                className="border-b border-border px-4 py-3 font-semibold text-foreground"
                {...props}
            />
        ),
        td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
            <td className="px-4 py-3 text-foreground/90" {...props} />
        ),
    }
}

