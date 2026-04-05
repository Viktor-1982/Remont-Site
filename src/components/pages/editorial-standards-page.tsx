import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type {
    EditorialStandardsDictionary,
    StandardsFaqItem,
    StandardsStep,
} from "@/dictionaries/editorial-standards"
import { Calculator, ClipboardCheck, FileText, Home, RefreshCw, ShieldCheck } from "lucide-react"
import Script from "next/script"

const baseUrl = "https://renohacks.com"

const stepIcons = {
    fileText: FileText,
    clipboardCheck: ClipboardCheck,
    calculator: Calculator,
    refreshCw: RefreshCw,
} as const

function getBreadcrumbSchema(dictionary: EditorialStandardsDictionary) {
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

function getFaqSchema(dictionary: EditorialStandardsDictionary) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: dictionary.faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    }
}

function StepCard({ step }: { step: StandardsStep }) {
    const Icon = stepIcons[step.icon]

    return (
        <Card className="relative overflow-hidden border-border/60 bg-card/95 shadow-sm">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_36%)]" />
            <CardHeader className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
                <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {step.points.map((point) => (
                        <li key={point} className="flex gap-3">
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary/80" aria-hidden />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

function FaqCard({ item }: { item: StandardsFaqItem }) {
    return (
        <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg leading-snug">{item.question}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </CardContent>
        </Card>
    )
}

export function EditorialStandardsPageTemplate({
    dictionary,
}: {
    dictionary: EditorialStandardsDictionary
}) {
    const breadcrumbSchema = getBreadcrumbSchema(dictionary)
    const faqSchema = getFaqSchema(dictionary)

    return (
        <main className="container mx-auto px-4 py-12 md:py-20">
            <div className="mx-auto mb-14 max-w-4xl text-center">
                <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-10 w-10" />
                </div>
                <Badge variant="secondary" className="mb-5 border border-primary/15 bg-primary/5 text-primary">
                    {dictionary.hero.eyebrow}
                </Badge>
                <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    {dictionary.hero.title}
                </h1>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                    {dictionary.hero.lead}
                </p>
            </div>

            <div className="mx-auto mb-14 max-w-6xl">
                <div className="mb-8 max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">{dictionary.process.title}</h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {dictionary.process.description}
                    </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                    {dictionary.process.steps.map((step) => (
                        <StepCard key={step.title} step={step} />
                    ))}
                </div>
            </div>

            <div className="mx-auto mb-14 max-w-4xl">
                <Card className="relative overflow-hidden border-border/60 bg-card/95 shadow-sm">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,114,22,0.10),transparent_40%)]" />
                    <CardHeader className="relative z-10">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                            <Home className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-2xl">{dictionary.principles.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {dictionary.principles.items.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary/80" aria-hidden />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="mx-auto max-w-4xl">
                <div className="mb-8 max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">{dictionary.faq.title}</h2>
                </div>
                <div className="grid gap-4">
                    {dictionary.faq.items.map((item) => (
                        <FaqCard key={item.question} item={item} />
                    ))}
                </div>
            </div>

            <Script
                id="editorial-standards-breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="editorial-standards-faq-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </main>
    )
}
