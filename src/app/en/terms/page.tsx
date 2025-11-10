import Link from "next/link"
import Script from "next/script"
import { getPageMetadata } from "@/lib/seo"
import CalculatorSection from "./calculator-section"

// 📊 SEO-метаданные
export const metadata = getPageMetadata("/en/calculators/budget", {
  title: "Renovation Budget Planner | Cost Calculator",
  description:
    "Free renovation budget planner: calculate the total cost of your home renovation with a reserve for unexpected expenses. A practical tool by Renohacks.",
  cover: "/images/og-budget-en.jpg",
  type: "website",
  alternates: {
    canonical: "https://renohacks.com/en/calculators/budget",
    languages: {
      ru: "https://renohacks.com/calculators/budget",
    },
  },
  openGraph: {
    title: "Free Renovation Budget Calculator | Renohacks",
    description:
      "Estimate your home renovation costs and plan your budget like a pro.",
    url: "https://renohacks.com/en/calculators/budget",
    images: ["/images/og-budget-en.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renovation Budget Calculator | Renohacks",
    description: "Plan your renovation costs with ease and accuracy.",
    images: ["/images/og-budget-en.jpg"],
  },
})

export default function BudgetPlannerPageEn() {
  // 🎯 JSON-LD (основное приложение)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "Renovation Budget Planner",
    alternateName: "Renovation Cost Calculator",
    operatingSystem: "All",
    applicationCategory: ["FinanceApplication", "BusinessApplication"],
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
    ],
    keywords:
      "renovation calculator, budget planner, renovation cost calculator, home renovation budget, remodeling estimator",
    inLanguage: "en",
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript. Requires HTML5.",
  }

  // ❓ FAQ schema
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How accurate is this renovation cost calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The calculator provides an approximate cost estimate based on your inputs and includes a reserve for unexpected expenses. It’s ideal for planning, not for exact contractor quotes.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use the planner for different currencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can switch currencies easily and the layout adapts perfectly for both desktop and mobile use.",
        },
      },
      {
        "@type": "Question",
        name: "Is this renovation planner free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the renovation budget calculator is completely free, designed to help homeowners plan and control renovation costs effectively.",
        },
      },
    ],
  }

  // 🍞 Breadcrumb schema
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
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
        name: "Budget Calculator",
        item: "https://renohacks.com/en/calculators/budget",
      },
    ],
  }

  // 📈 GTM-событие при расчёте
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      {/* JSON-LD scripts */}
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
        id="breadcrumbs-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <h1 className="text-3xl font-bold mb-4">Renovation Budget Planner</h1>
      <p className="text-muted-foreground mb-8">
        Calculate the total renovation cost: add expenses by category and get
        the final amount with a reserve for unexpected expenses.
      </p>

      <CalculatorSection />

      <aside
        className="mt-8 p-4 bg-muted rounded-lg"
        aria-label="Usage instructions"
      >
        <h2 className="font-semibold mb-2">💡 How to use</h2>
        <ol className="list-decimal ml-5 space-y-1 text-sm">
          <li>Enter the cost of each work category</li>
          <li>Specify the reserve percentage (20% recommended)</li>
          <li>Get the total cost including unexpected expenses</li>
        </ol>
        <p className="mt-3 text-sm text-muted-foreground">
          💰 Renovation usually costs 20–30% more than planned. It&apos;s
          better to include a reserve from the start!
        </p>
      </aside>

      {/* SEO-текст */}
      <section className="mt-10 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold mb-2">
          Plan Your Renovation Budget Like a Pro
        </h2>
        <p>
          This renovation budget planner helps you estimate home improvement
          costs quickly and precisely. Whether you’re remodeling an apartment or
          building a country house, the calculator gives you a clear overview of
          material, labor, and finishing expenses.
        </p>
        <p className="mt-2">
          Simply enter your estimated costs, add a safety reserve, and get the
          total renovation budget. It’s an ideal tool for DIYers, contractors,
          and homeowners who want full cost transparency.
        </p>
        <p className="mt-2">
          Try this <strong>renovation cost calculator</strong> to plan your next
          project efficiently. Designed by renovation experts from{" "}
          <a href="https://renohacks.com" className="underline">
            Renohacks
          </a>
          , it reflects real-world pricing and helps avoid underestimation. The{" "}
          <strong>home renovation budget calculator</strong> is free and works
          on any device.
        </p>
      </section>

      {/* Внутренние ссылки */}
      <section className="mt-12 border-t pt-6 text-sm text-muted-foreground">
        <h2 className="font-semibold mb-3">More free renovation tools</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>
          <Link href="/en/calculators/paint" className="underline hover:text-primary">
            Paint Calculator
          </Link>{" "}
            — estimate paint volume for your walls
          </li>
          <li>
            <Link href="/en/calculators/tile" className="underline hover:text-primary">
              Tile Calculator
            </Link>{" "}
            — plan tile layout and quantity
          </li>
          <li>
            <Link href="/en/posts/budget-renovation-tips" className="underline hover:text-primary">
              Budget renovation tips
            </Link>{" "}
            — save money without losing quality
          </li>
        </ul>
      </section>

      {/* Кнопки шэринга */}
      <div className="mt-6 flex gap-4 text-sm">
        <a
          href="https://pinterest.com/pin/create/button/?url=https://renohacks.com/en/calculators/budget&media=https://renohacks.com/images/og-budget-en.jpg&description=Plan your renovation costs with this free calculator by Renohacks"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          📌 Share on Pinterest
        </a>
        <a
          href="https://twitter.com/intent/tweet?url=https://renohacks.com/en/calculators/budget&text=Free Renovation Budget Planner by Renohacks"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
          🐦 Share on X
        </a>
      </div>
    </main>
  )
}
