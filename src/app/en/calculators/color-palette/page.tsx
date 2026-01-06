import { getPageMetadata } from "@/lib/seo"
import { ColorPaletteGenerator } from "@/components/widgets/color-palette-generator"
import { ShareButton } from "@/components/share-button"
import Link from "next/link"
import { Paintbrush, Layers } from "lucide-react"

export const metadata = getPageMetadata("/en/calculators/color-palette", {
    title: "Color Palette Generator for Renovation — Harmonious Color Schemes | Renohacks",
    description:
        "Create a harmonious color palette for your renovation. Color scheme generator with application recommendations. Free tool by Renohacks.",
    cover: "/images/og-default.png",
    type: "website",
})

export default function ColorPalettePageEn() {
    return (
        <main className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-4">Color Palette Generator</h1>
            <p className="text-muted-foreground mb-8">
                Create a harmonious color scheme for your interior. Choose a base color and palette type, 
                get a ready-made palette of 5-6 colors with application recommendations.
            </p>
            <ColorPaletteGenerator />

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">How to Use the Palette Generator</h2>
                    <ol className="list-decimal ml-5 space-y-2 text-sm text-muted-foreground">
                        <li>Choose a base color — one you like or already have in your interior.</li>
                        <li>Select a color scheme type: analogous, complementary, triadic, monochromatic, or split-complementary.</li>
                        <li>Click &quot;Generate Palette&quot; — get a harmonious palette of 5-6 colors.</li>
                        <li>Copy color codes or export the palette as an image.</li>
                        <li>Use application recommendations to create a harmonious interior.</li>
                    </ol>
                </div>
            </section>

            <section className="mt-10 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 px-6 py-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Color Scheme Types</h2>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Analogous Scheme</h3>
                            <p>Adjacent colors on the color wheel. Creates a calm and harmonious atmosphere. Perfect for bedrooms and living rooms.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Complementary Scheme</h3>
                            <p>Opposite colors on the color wheel. Creates a dynamic and energetic interior. Great for modern interiors.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Triadic</h3>
                            <p>Three evenly spaced colors. Bright and balanced palette. Perfect for children&apos;s rooms and creative spaces.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Monochromatic Scheme</h3>
                            <p>Shades of one color. Elegant and refined palette. Perfect for minimalist interiors.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-1">Split-Complementary</h3>
                            <p>Balance between contrast and harmony. Creates an interesting but not overwhelming interior. Great for living rooms.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Additional Tools</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/en/calculators/paint"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/15 to-rose-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-rose-500">
                                <Paintbrush className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Paint Calculator</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Calculate paint needed for your color palette.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="/en/calculators/budget"
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 opacity-0 transition group-hover:opacity-100" />
                        <div className="relative z-10 flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-lg font-semibold shadow-inner text-amber-500">
                                <Layers className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-base font-semibold text-foreground">Budget Planner</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Calculate renovation cost considering your chosen colors.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="mt-12 relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 dark:from-primary/10 dark:via-primary/10 dark:to-accent/10 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Share the Generator</h2>
                    <ShareButton
                        url="https://renohacks.com/en/calculators/color-palette"
                        title="Color Palette Generator for Renovation | Renohacks"
                        description="Create a harmonious color palette for your interior"
                        isEnglish={true}
                    />
                </div>
            </section>
        </main>
    )
}

