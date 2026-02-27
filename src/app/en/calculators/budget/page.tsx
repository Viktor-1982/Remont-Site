import Link from "next/link"
import Script from "next/script"
import { getPageMetadata } from "@/lib/seo"
import { RenovationBudgetPlannerEn } from "@/components/widgets/renovation-budget-planner-en"
import { Paintbrush, Grid, ScrollText, Layers } from "lucide-react"
import { ShareButton } from "@/components/share-button"

export const metadata = getPageMetadata("/en/calculators/budget", {
  title: "Renovation Budget Planner | Cost Calculator",
  description:
    "Free renovation budget planner: calculate the total cost of your home renovation with a reserve for unexpected expenses. A practical tool by Renohacks.",
  cover: "/images/og-budget-en.jpg",
  type: "website",
  alternates: {
    canonical: "https://renohacks.com/en/calculators/budget",
    languages: {
      "ru": "https://renohacks.com/calculators/budget",
      "x-default": "https://renohacks.com/en/calculators/budget",
    },
  },
  openGraph: {
    title: "Free Renovation Budget Calculator | Renohacks",
    description: "Estimate your home renovation costs and plan your budget like a pro.",
    url: "https://renohacks.com/en/calculators/budget",
    images: ["https://renohacks.com/images/og-budget-en.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renovation Budget Calculator | Renohacks",
    description: "Plan your renovation costs with ease and accuracy.",
    images: ["https://renohacks.com/images/og-budget-en.jpg"],
  },
  keywords: [
    "renovation budget planner",
    "home renovation cost calculator",
    "remodeling budget estimator",
    "calculate renovation costs online",
    "budget calculator for renovation",
    "Renohacks renovation tools",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
})

export default function BudgetPlannerPageEn() {
  const faqItems = [
    {
      question: "How accurate is this renovation cost calculator?",
      answer:
        "The calculator provides an approximate cost estimate based on your inputs and includes a reserve for unexpected expenses. It’s ideal for planning, not for exact contractor quotes.",
    },
    {
      question: "Can I use the planner for different currencies?",
      answer:
        "Yes. You can switch currencies instantly and the layout adapts perfectly for both desktop and mobile use.",
    },
    {
      question: "Is this renovation planner free to use?",
      answer:
        "Yes, the renovation budget calculator is completely free. It was created by Renohacks to help homeowners and pros plan renovation budgets confidently.",
    },
    {
      question: "What costs should I include in my renovation budget?",
      answer:
        "Include demolition, materials, labor, finishing work, fixtures, and a contingency reserve. The planner lets you break down every category to avoid missed expenses.",
    },
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "Renovation Budget Planner",
    alternateName: "Renovation Cost Calculator",
    operatingSystem: "All",
    applicationCategory: ["FinanceApplication", "BusinessApplication"],
    applicationSubCategory: "ConstructionBudgetCalculator",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    description:
      "Free online calculator for estimating renovation budget of apartment or house. Helps plan expenses and include a reserve for unexpected costs.",
    url: "https://renohacks.com/en/calculators/budget",
    image: "https://renohacks.com/images/og-budget-en.jpg",
    screenshot: "https://renohacks.com/images/og-budget-en.jpg",
    creator: {
      "@type": "Organization",
      name: "Renohacks",
      url: "https://renohacks.com",
      logo: "https://renohacks.com/favicon.ico",
    },
    publisher: {
      "@type": "Organization",
      name: "Renohacks",
      url: "https://renohacks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://renohacks.com/images/logo.svg",
      },
    },
    potentialAction: {
      "@type": "UseAction",
      target: "https://renohacks.com/en/calculators/budget",
      name: "Calculate renovation budget",
    },
    featureList: [
      "Calculate costs by work categories",
      "Account for unexpected expenses reserve",
      "Support for different currencies",
      "Auto-complete work categories",
      "Mobile responsive design",
      "Export-ready summary of renovation totals",
    ],
    keywords:
      "renovation calculator, renovation cost calculator, home renovation budget, remodeling estimator, renovation planner tool",
    inLanguage: "en",
    isAccessibleForFree: true,
    availableLanguage: ["en", "ru"],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://renohacks.com/en/calculators/budget",
    },
    audience: {
      "@type": "Audience",
      audienceType: ["Homeowners", "Contractors", "DIY Renovators"],
    },
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Renohacks",
        item: "https://renohacks.com/en",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "https://renohacks.com/en/calculators",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Renovation Budget Planner",
        item: "https://renohacks.com/en/calculators/budget",
      },
    ],
  }

  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate a renovation budget with Renohacks",
    description:
      "Step-by-step instructions for using the Renohacks Renovation Budget Planner to estimate remodeling costs with a contingency reserve.",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Room or project measurements",
      },
      {
        "@type": "HowToSupply",
        name: "Estimated costs per work category",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "List renovation categories",
        text: "Select a renovation category from the suggestions or enter your own to cover every part of the project.",
      },
      {
        "@type": "HowToStep",
        name: "Enter estimated costs",
        text: "Type the expected expense for each category. The calculator supports commas and decimal points.",
      },
      {
        "@type": "HowToStep",
        name: "Set a reserve percentage",
        text: "Adjust the reserve slider or input to include a contingency fund for unexpected costs.",
      },
      {
        "@type": "HowToStep",
        name: "Review totals",
        text: "Click calculate to see subtotal, reserve amount, and final renovation budget.",
      },
    ],
    totalTime: "PT3M",
  }

  const featureHighlights = [
    {
      title: "Fast cost structure",
      description:
        "Start with pre-filled renovation categories or add your own to build a detailed cost structure in minutes.",
    },
    {
      title: "Smart contingency planning",
      description:
        "Automatically calculate a reserve percentage so you always include funds for unexpected work or price changes.",
    },
    {
      title: "Currency flexibility",
      description:
        "Switch between USD, EUR and GBP to match your region and keep calculations consistent for international projects.",
    },
    {
      title: "Share-ready summary",
      description:
        "Review a clear total with subtotals, making it easy to share with clients, contractors, or partners.",
    },
  ]

  const resources = [
    {
      href: "/en/calculators/paint",
      title: "Paint calculator",
      description: "Estimate interior and exterior paint coverage by wall or ceiling area.",
      icon: Paintbrush,
      accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
    },
    {
      href: "/en/calculators/tile",
      title: "Tile calculator",
      description: "Plan tile layout, waste percentage, and adhesive volume for every surface.",
      icon: Grid,
      accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
    },
    {
      href: "/en/calculators/wallpaper",
      title: "Wallpaper calculator",
      description: "Figure out how many wallpaper rolls you need for any room or accent wall.",
      icon: ScrollText,
      accent: "from-indigo-500/15 to-indigo-500/5 text-indigo-500",
    },
    {
      href: "/en/calculators",
      title: "All renovation calculators",
      description: "Explore the full Renohacks toolkit for planning materials and renovation costs.",
      icon: Layers,
      accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
    },
  ]

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      {/* Schema.org structured data */}
      <Script
        id="budget-planner-schema-en"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="faq-schema-en"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <Script
        id="breadcrumb-schema-en"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <Script
        id="howto-schema-en"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToData) }}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Renovation Budget Planner &mdash; Accurate Cost Calculator in Minutes
        </h1>
        <p className="text-muted-foreground">
          Build a reliable <strong>home renovation budget</strong>: categorize every expense, add a contingency reserve, and
          export a clear total for clients or contractors. Trusted by DIY renovators and pros planning apartments, houses,
          and remodeling projects of any size.
        </p>
      </header>

      <section aria-label="Interactive renovation budget planner calculator">
        <RenovationBudgetPlannerEn />
      </section>

      <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Why professionals choose this renovation budget calculator</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {featureHighlights.map((feature) => (
            <li key={feature.title}>
              <span className="font-medium text-foreground">{feature.title}.</span> {feature.description}
            </li>
          ))}
        </ul>
        </div>
      </section>

      <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl" aria-label="Step-by-step renovation budgeting guide">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-xl font-semibold mb-3 text-foreground">Step-by-step renovation budgeting guide</h2>
        <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
          <li>List every renovation category: demolition, wiring, plumbing, finishes, fixtures, and cleanup.</li>
          <li>Enter projected costs for each item using supplier quotes or previous project data.</li>
          <li>Adjust the contingency reserve (20&ndash;25% recommended) to cover unforeseen tasks and price changes.</li>
          <li>Review subtotal, reserve amount, and final total; share the result or revisit it during negotiations.</li>
        </ol>
        <p className="mt-3 text-sm text-muted-foreground">
          💡 Tip: Revisit the budget after each contractor update to keep your <strong>remodeling cost plan</strong> on track.
        </p>
        </div>
      </section>

      <section className="mt-10 text-sm leading-relaxed text-muted-foreground space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Plan your renovation budget like a pro</h2>
        <p>
          The Renohacks <strong>renovation budget planner</strong> gives you a structured view of every cost driver&mdash;labor,
          materials, permits, and finishing touches. It mirrors how professional estimators prepare bids, ensuring you do not
          overlook hidden expenses such as debris removal or fixture installation.
        </p>
        <p>
          Use the calculator to compare multiple project scenarios: set different reserves, swap materials, or test room-by-room
          budgets. The dynamic totals update instantly, helping you negotiate confidently with contractors and suppliers.
        </p>
        <p>
          Trusted by the Renohacks community, this <strong>home renovation cost calculator</strong> stays free and mobile friendly.
          Bookmark the page and pair it with our other renovation tools to build a full financial strategy before the first wall
          comes down.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Renovation budgeting FAQs</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-lg border bg-card px-4 py-3 open:bg-card/80">
              <summary className="cursor-pointer font-medium text-foreground">
                {item.question}
              </summary>
              <p className="mt-2">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">More renovation planning resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((resource) => {
            const Icon = resource.icon
            const accentText = resource.accent.split(" ").find((cls) => cls.startsWith("text-")) || "text-primary"
            return (
              <Link
                key={resource.title}
                href={resource.href}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${resource.accent} opacity-0 transition group-hover:opacity-100`}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner ${accentText}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-foreground">{resource.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
                <span className="relative z-10 mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Explore
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Share the calculator</h2>
          <ShareButton
            url="/en/calculators/budget"
            title="Free Renovation Budget Planner by Renohacks"
            description="Plan your renovation costs with this free calculator by Renohacks"
            isEnglish={true}
          />
        </div>
      </section>
    </main>
  )
}
