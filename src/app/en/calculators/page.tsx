import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Online renovation calculators | Renohacks",
    description: "Free renovation calculators: paint, wallpaper, tile. Calculate materials for your home renovation easily.",
    openGraph: {
        title: "Online renovation calculators | Renohacks",
        description: "Calculate paint, wallpaper, and tile for your home renovation with our free online tools.",
        url: "https://renohacks.com/en/calculators",
        siteName: "Renohacks",
        locale: "en_US",
        type: "website",
    },
}

const calculators = [
    {
        href: "/en/calculators/paint",
        icon: "🎨",
        title: "Paint calculator",
        desc: "Estimate how many liters of paint you need for your room.",
    },
    {
        href: "/en/calculators/wallpaper",
        icon: "🪟",
        title: "Wallpaper calculator",
        desc: "Find out how many rolls of wallpaper are required for your walls.",
    },
    {
        href: "/en/calculators/tile",
        icon: "🧱",
        title: "Tile calculator",
        desc: "Calculate how many tiles you’ll need for your floor or walls.",
    },
]

export default function CalculatorsIndexPage() {
    return (
        <main className="container py-12">
            <h1 className="text-3xl font-bold mb-6">Renovation calculators</h1>
            <p className="mb-8 text-muted-foreground">
                Choose a calculator and quickly estimate how much material you need for your project:
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {calculators.map((calc) => (
                    <Card key={calc.href} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <span>{calc.icon}</span> {calc.title}
                            </CardTitle>
                            <CardDescription>{calc.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow" />
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={calc.href}>Open</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    )
}
