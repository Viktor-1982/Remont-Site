import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bath, Lightbulb, Sparkles } from "lucide-react"
import { getTopicHubsDictionary, type TopicHubsLocale } from "@/dictionaries/topic-hubs"
import { cn } from "@/lib/utils"

const topicHubIcons = {
    bath: Bath,
    lightbulb: Lightbulb,
} as const

export function TopicHubsShowcase({ isEnglish = false }: { isEnglish?: boolean }) {
    const locale: TopicHubsLocale = isEnglish ? "en" : "ru"
    const dictionary = getTopicHubsDictionary(locale)

    return (
        <section aria-labelledby="topic-hubs-title">
            <div className="mb-8 flex flex-col gap-3 sm:mb-10">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/85">
                    <Sparkles className="h-3.5 w-3.5" />
                    {dictionary.sectionEyebrow}
                </div>
                <div className="max-w-3xl">
                    <h2
                        id="topic-hubs-title"
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        {dictionary.sectionTitle}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {dictionary.sectionSubtitle}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {dictionary.items.map((item) => {
                    const Icon = topicHubIcons[item.icon]

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative overflow-hidden rounded-[28px] border border-border/60 bg-card/95 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                        >
                            <div
                                className={cn(
                                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90",
                                    item.accentClass
                                )}
                                aria-hidden
                            />
                            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                                <Image
                                    src={item.cover}
                                    alt={item.desc}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                            </div>

                            <div className="relative p-5 sm:p-6">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/80 shadow-sm">
                                    <Icon className={cn("h-3.5 w-3.5", item.iconClass)} />
                                    {dictionary.hubBadge}
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-foreground">{item.label}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                    {item.desc}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {item.highlights.map((highlight) => (
                                        <span
                                            key={highlight}
                                            className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-foreground/75"
                                        >
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                                    {dictionary.ctaLabel}
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
