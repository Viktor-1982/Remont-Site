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
import { cn } from "@/lib/utils"
import { AlertCircle, AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react"

function stripAlertPrefix(children: React.ReactNode): React.ReactNode {
    if (typeof children === "string") {
        return children.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, "")
    }
    if (Array.isArray(children)) {
        return children.map((child, index) => {
            if (index === 0) return stripAlertPrefix(child)
            return child
        })
    }
    if (React.isValidElement(children)) {
        const childProps = children.props as { children?: React.ReactNode }
        if (childProps.children) {
            return React.cloneElement(children as React.ReactElement<{ children?: React.ReactNode }>, {
                children: stripAlertPrefix(childProps.children)
            })
        }
    }
    return children
}


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

function MdxImage({ alt, src, isEnglish }: { alt?: string; src: string; isEnglish?: boolean }) {
    const fallbackAlt = isEnglish ? "Renovation photo" : "Изображение по теме ремонта"
    return (
        <figure className="relative mx-auto my-6 max-w-3xl w-full overflow-hidden rounded-xl bg-background">
            <Image
                alt={alt && alt.trim() !== "" ? alt : fallbackAlt}
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

export function createMdxComponents(isEnglish = false): MDXComponents {
    const slugger = new GitHubSlugger()

    return {
        img: (props: { alt?: string; src: string }) => <MdxImage {...props} isEnglish={isEnglish} />,
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
        AffiliateCard: (props: { href: string; title: string; description: string; imgSrc?: string }) => (
            <div className="my-8 p-5 sm:p-6 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 transition-colors hover:border-primary/40">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {props.imgSrc ? (
                        <a href={props.href} target="_blank" rel="sponsored nofollow" className="shrink-0 block w-full sm:w-32 bg-white rounded-lg p-3 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <img src={props.imgSrc} alt={props.title} className="w-full h-auto max-h-40 object-contain mx-auto" loading="lazy" />
                        </a>
                    ) : (
                        <span className="text-3xl sm:mt-1 hidden sm:block">🛒</span>
                    )}
                    <div className="flex-1 text-center sm:text-left w-full">
                        <h4 className="font-semibold text-foreground text-lg mt-0 mb-2 leading-tight">{props.title}</h4>
                        <p className="text-sm text-muted-foreground mt-0 mb-4 leading-relaxed">{props.description}</p>
                        <a
                            href={props.href}
                            target="_blank"
                            rel="sponsored nofollow"
                            style={{ backgroundColor: '#FF9900', color: '#111111' }}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold no-underline hover:brightness-110 transition-all w-full sm:w-auto"
                        >
                            View on Amazon
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
        blockquote: (props: React.HTMLAttributes<HTMLElement>) => {
            const text = getTextFromChildren(props.children).trim()
            const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]([\s\S]*)$/i)
            
            if (match) {
                const type = match[1].toUpperCase()
                
                let Icon = Info
                let title = ""
                let bgClass = ""
                let borderClass = ""
                let textClass = ""
                let iconClass = ""

                if (type === "NOTE") {
                    Icon = Info
                    title = isEnglish ? "Note" : "Примечание"
                    bgClass = "bg-blue-500/5 dark:bg-blue-500/10"
                    borderClass = "border-blue-500/40"
                    textClass = "text-blue-900 dark:text-blue-200"
                    iconClass = "text-blue-600 dark:text-blue-400"
                } else if (type === "TIP") {
                    Icon = Lightbulb
                    title = isEnglish ? "Tip" : "Совет"
                    bgClass = "bg-emerald-500/5 dark:bg-emerald-500/10"
                    borderClass = "border-emerald-500/40"
                    textClass = "text-emerald-900 dark:text-emerald-200"
                    iconClass = "text-emerald-600 dark:text-emerald-400"
                } else if (type === "IMPORTANT") {
                    Icon = AlertCircle
                    title = isEnglish ? "Important" : "Важно"
                    bgClass = "bg-indigo-500/5 dark:bg-indigo-500/10"
                    borderClass = "border-indigo-500/40"
                    textClass = "text-indigo-900 dark:text-indigo-200"
                    iconClass = "text-indigo-600 dark:text-indigo-400"
                } else if (type === "WARNING") {
                    Icon = AlertTriangle
                    title = isEnglish ? "Warning" : "Предупреждение"
                    bgClass = "bg-amber-500/5 dark:bg-amber-500/10"
                    borderClass = "border-amber-500/40"
                    textClass = "text-amber-900 dark:text-amber-200"
                    iconClass = "text-amber-600 dark:text-amber-400"
                } else if (type === "CAUTION") {
                    Icon = ShieldAlert
                    title = isEnglish ? "Caution" : "Осторожно"
                    bgClass = "bg-rose-500/5 dark:bg-rose-500/10"
                    borderClass = "border-rose-500/40"
                    textClass = "text-rose-900 dark:text-rose-200"
                    iconClass = "text-rose-600 dark:text-rose-400"
                }

                // Render beautiful callout box with stripped prefix from children
                return (
                    <div className={cn("my-6 flex gap-3.5 rounded-xl border-l-4 p-4 shadow-sm", bgClass, borderClass)}>
                        <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconClass)} />
                        <div className="flex-1 min-w-0">
                            <h5 className={cn("font-bold text-xs sm:text-sm tracking-wide uppercase mb-1", iconClass)}>
                                {title}
                            </h5>
                            <div className={cn("text-sm sm:text-base leading-relaxed [&>p]:mt-0 font-medium", textClass)}>
                                {stripAlertPrefix(props.children)}
                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props} />
            )
        },
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

