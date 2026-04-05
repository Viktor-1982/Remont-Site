import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AboutDictionary, AboutFeature } from "@/dictionaries/about"
import { Calculator, Camera, DollarSign, Home, Palette, ShieldCheck, Target, Wrench } from "lucide-react"
import Link from "next/link"
import Script from "next/script"

const baseUrl = "https://renohacks.com"

const featureIcons = {
    camera: Camera,
    wrench: Wrench,
    calculator: Calculator,
    palette: Palette,
    dollarSign: DollarSign,
} as const

const gradients = [
    "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20",
    "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
    "from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20",
    "from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20",
    "from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/20 dark:to-violet-500/20",
] as const

function getBreadcrumbSchema(dictionary: AboutDictionary) {
    const homePath = dictionary.breadcrumb.pagePath.startsWith("/en") ? "/en" : "/"

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: dictionary.breadcrumb.homeLabel,
                item: `${baseUrl}${homePath}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: dictionary.breadcrumb.pageLabel,
                item: `${baseUrl}${dictionary.breadcrumb.pagePath}`,
            },
        ],
    }
}

function FeatureCard({ feature, index }: { feature: AboutFeature; index: number }) {
    const Icon = featureIcons[feature.icon]

    return (
        <Card className="group relative overflow-hidden border-2 border-border/50 bg-gradient-to-br from-card via-card to-primary/5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl dark:border-border/30 dark:to-primary/10 dark:shadow-lg dark:hover:border-primary/50">
            <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-30 transition-opacity duration-300 group-hover:opacity-50 dark:opacity-0 dark:group-hover:opacity-100`}
            />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-white/10" />

            <CardHeader className="relative z-10">
                <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} opacity-80 shadow-lg ring-2 ring-primary/10 transition-transform duration-300 group-hover:scale-110 dark:opacity-100 dark:ring-primary/20`}
                >
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary/90" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {feature.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90 dark:text-muted-foreground dark:group-hover:text-foreground/80">
                    {feature.description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export function AboutPageTemplate({ dictionary }: { dictionary: AboutDictionary }) {
    const breadcrumbSchema = getBreadcrumbSchema(dictionary)

    return (
        <main className="container mx-auto px-4 py-12 md:py-20">
            <div className="mx-auto mb-16 max-w-4xl text-center">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20">
                    <Home className="h-10 w-10 text-primary" />
                </div>
                <h1 className="mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                    {dictionary.hero.title}
                </h1>
                <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">renohacks.com</strong> — {dictionary.hero.lead}
                </p>
            </div>

            <div className="mx-auto mb-16 max-w-4xl">
                <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl dark:to-primary/10">
                    <div className="absolute -top-1/2 right-0 h-64 w-64 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

                    <CardHeader className="relative z-10">
                        <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-2xl font-bold text-transparent">
                                {dictionary.mission.title}
                            </CardTitle>
                        </div>
                        <CardDescription className="text-base text-lg">
                            {dictionary.mission.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="relative z-10">
                        <p className="text-base leading-relaxed text-muted-foreground">
                            {dictionary.mission.body}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="mx-auto mb-16 max-w-6xl">
                <h2 className="mb-12 text-center text-3xl font-bold">{dictionary.features.title}</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {dictionary.features.items.map((feature, index) => (
                        <FeatureCard key={`${feature.icon}-${feature.title}`} feature={feature} index={index} />
                    ))}
                </div>
            </div>

            <div className="mx-auto mb-16 max-w-4xl">
                <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-card to-secondary/10 shadow-lg dark:to-secondary/20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-2xl font-bold">{dictionary.audience.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-4">
                        <p className="text-base leading-relaxed text-muted-foreground">
                            {dictionary.audience.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {dictionary.audience.badges.map((badge) => (
                                <Badge
                                    key={badge}
                                    variant="secondary"
                                    className="cursor-default transition-all duration-300 hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                                >
                                    {badge}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mx-auto mb-16 max-w-4xl">
                <Card className="relative overflow-hidden border border-border/60 bg-card/95 shadow-sm">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.10),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_38%)]" />
                    <CardHeader className="relative z-10">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-2xl font-bold">{dictionary.standardsCta.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                            {dictionary.standardsCta.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <Link
                            href={dictionary.standardsCta.href}
                            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            {dictionary.standardsCta.buttonLabel}
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </main>
    )
}
