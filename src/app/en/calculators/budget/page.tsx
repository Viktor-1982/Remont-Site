import Script from "next/script"
import { getPageMetadata } from "@/lib/seo"
import { RenovationBudgetPlannerEn } from "@/components/widgets/renovation-budget-planner-en"

export const metadata = getPageMetadata("/en/calculators/budget", {
    title: "Renovation Budget Planner | Cost Calculator",
    description:
        "Handy renovation budget planner: calculate the total cost of work with a reserve for unexpected expenses. Free tool from Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function BudgetPlannerPageEn() {
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
            "Free online calculator for estimating renovation budget of apartment or house. Helps plan expenses and account for reserve for unexpected costs.",
        url: "https://renohacks.com/en/calculators/budget",
        image: "https://renohacks.com/images/og-default.png",
        screenshot: "https://renohacks.com/images/og-default.png",
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
            "Mobile responsive design"
        ],
        keywords: "renovation calculator, budget planner, renovation cost calculator, home renovation budget",
        inLanguage: "en",
        isAccessibleForFree: true,
        browserRequirements: "Requires JavaScript. Requires HTML5.",
    }

    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="budget-planner-schema-en"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <h1 className="text-3xl font-bold mb-4">Renovation Budget Planner</h1>
            <p className="text-muted-foreground mb-8">
                Calculate the total renovation cost: add expenses by category and get the final amount with a reserve for unexpected expenses.
            </p>
            
            <section aria-label="Interactive renovation budget planner calculator">
                <RenovationBudgetPlannerEn />
            </section>
            
            <aside className="mt-8 p-4 bg-muted rounded-lg" aria-label="Usage instructions">
                <h2 className="font-semibold mb-2">💡 How to use</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Enter the cost of each work category</li>
                    <li>Specify the reserve percentage (20% recommended)</li>
                    <li>Get the total cost including unexpected expenses</li>
                </ol>
                <p className="mt-3 text-sm text-muted-foreground">
                    💰 Renovation usually costs 20–30% more than planned. It&apos;s better to include a reserve from the start!
                </p>
            </aside>
        </main>
    )
}


