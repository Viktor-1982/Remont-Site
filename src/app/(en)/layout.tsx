import type { Metadata } from "next"
import "../globals.css"
import { AppShell } from "@/app/app-shell"

export const metadata: Metadata = {
    title: "Renohacks - home renovation & DIY",
    description: "Photo-guides, DIY tips and reviews - English section.",
    metadataBase: new URL("https://renohacks.com"),
    icons: {
        icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    manifest: "/manifest.json",
    alternates: {
        canonical: "https://renohacks.com",
        languages: {
            en:          "https://renohacks.com",
            ru:          "https://renohacks.com/ru",
            "x-default": "https://renohacks.com",
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
        title: "Renohacks - home renovation & DIY",
        description: "Photo-guides, DIY tips and reviews - English section.",
        url: "https://renohacks.com",
        siteName: "Renohacks",
        images: ["/images/og-default.png"],
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        yandex: "6d69da4ae32e6bf3",
    },
}

export default function EnRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <AppShell lang="en">{children}</AppShell>
}
