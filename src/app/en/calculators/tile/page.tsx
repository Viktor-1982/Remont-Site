import { getPageMetadata } from "@/lib/seo"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import Script from "next/script"

export const metadata = getPageMetadata("/en/calculators/tile", {
    title: "Tile Calculator Online — Calculate Tiles for Floor & Walls | Renohacks",
    description:
        "Free tile calculator: calculate exact tile quantity for floors and walls. Accounts for area, tile size, windows, doors, and waste. Online calculation in 30 seconds.",
    cover: "/images/og-default.png",
    type: "website",
    keywords: [
        "tile calculator",
        "tile calculation",
        "how many tiles do I need",
        "bathroom tile calculator",
        "kitchen tile calculator",
        "calculate tiles for floor",
        "calculate tiles for walls",
        "online tile calculator",
    ],
})

export default function TileCalculatorPageEn() {
    const baseUrl = "https://renohacks.com"
    
    const tileCalculatorSchema = {
        "@context": "https://schema.org",
        "@type": ["SoftwareApplication", "WebApplication"],
        "name": "Tile Calculator Online",
        "alternateName": "Tile Quantity Calculator",
        "operatingSystem": "All",
        "applicationCategory": ["UtilityApplication", "BusinessApplication"],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
        },
        "description": "Free online calculator to estimate tile quantity for floors and walls. Accounts for area, tile size, waste, and extra for repairs.",
        "url": `${baseUrl}/en/calculators/tile`,
        "image": `${baseUrl}/images/og-default.png`,
        "creator": {
            "@type": "Organization",
            "name": "Renohacks",
            "url": baseUrl,
        },
        "potentialAction": {
            "@type": "UseAction",
            "target": `${baseUrl}/en/calculators/tile`,
            "name": "Calculate tile quantity",
        },
        "featureList": [
            "Calculate tiles for floor",
            "Calculate tiles for walls",
            "Account for windows and doors",
            "Waste percentage for cutting",
            "Mobile responsive"
        ],
        "keywords": "tile calculator, tile calculation, how many tiles needed, tile installation",
        "inLanguage": "en",
        "isAccessibleForFree": true,
    }
    
    return (
        <main className="max-w-2xl mx-auto py-10 px-4">
            <Script
                id="tile-calculator-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tileCalculatorSchema) }}
            />
            
            <h1 className="text-3xl font-bold mb-4">Tile Calculator</h1>
            <p className="text-muted-foreground mb-8">
                Calculate the amount of tiles needed for floors or walls. 
                Accounts for area, tile size, waste from cutting, and extra for repairs.
            </p>
            <TileCalculator />
            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h2 className="font-semibold mb-2">💡 How to Use the Calculator</h2>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                    <li>Enter installation area and tile dimensions</li>
                    <li>Specify window/door sizes (for walls)</li>
                    <li>Choose waste percentage (usually 5–10%)</li>
                    <li>Get accurate tile count needed</li>
                </ol>
            </div>
        </main>
    )
}
