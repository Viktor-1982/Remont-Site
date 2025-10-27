import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/en/about", {
    title: "About Renohacks | DIY Renovation Blog",
    description:
        "Renohacks — your renovation guide: photo guides, DIY tips, free material calculators. Everything for quality home renovation by yourself.",
    cover: "/images/og-default.png",
    type: "article",
})

export default function AboutPage() {
    return (
        <main className="container py-12 md:py-16 prose dark:prose-invert max-w-3xl">
            <h1>About Renohacks</h1>
            
            <p>
                <strong>renohacks.com</strong> — a renovation and interior design blog where we share practical tips, 
                step-by-step photo guides, and free calculators for home renovation.
            </p>

            <h2>What We Do</h2>
            <p>
                Our goal is to help you renovate your home with quality results and without unnecessary expenses. 
                We publish:
            </p>
            <ul>
                <li>📸 <strong>Photo guides</strong> on painting walls, renovating bathrooms and kitchens</li>
                <li>🔧 <strong>DIY projects</strong> and hacks to save money</li>
                <li>🧮 <strong>Calculators</strong> for paint, wallpaper, and tile calculations</li>
                <li>🎨 <strong>Design ideas</strong> and interior trends 2025–2026</li>
                <li>💰 <strong>Budgets</strong> and real renovation cost estimates</li>
            </ul>

            <h2>Who This Blog Is For</h2>
            <p>
                Our content is helpful for anyone planning a home renovation — from quick cosmetic updates to full apartment remodels. 
                We believe that quality renovation doesn&apos;t have to be expensive. What matters is the right approach and practical advice.
            </p>

            <h2>Contact Us</h2>
            <p>
                Have questions, suggestions, or ideas for articles? 
                Email us at <a href="mailto:info@renohacks.com">info@renohacks.com</a>
            </p>
        </main>
    )
}
