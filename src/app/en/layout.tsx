// src/app/en/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Renohacks — home renovation & DIY",
    description: "Photo-guides, DIY tips and reviews — English section.",
    alternates: {
        canonical: "https://renohacks.com/en",
        languages: {
            en: "https://renohacks.com/en",
            ru: "https://renohacks.com/",
        },
        types: {
            "application/rss+xml": [
                {
                    title: "Renohacks RSS (EN)",
                    url: "https://renohacks.com/feed-en.xml",
                },
            ],
        },
    },
    openGraph: {
        title: "Renohacks — home renovation & DIY",
        description: "Photo-guides, DIY tips and reviews — English section.",
        url: "https://renohacks.com/en",
        siteName: "Renohacks",
        images: ["/images/og-default.png"],
        locale: "en_US",
        type: "website",
    },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
