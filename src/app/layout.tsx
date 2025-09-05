import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

import { ThemeProvider } from "@/app/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
    title: "Ремонт без боли — блог о ремонте",
    description: "Фото-гайды, сметы, лайфхаки и обзоры материалов.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="ru"
            suppressHydrationWarning
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
        <body className="min-h-screen bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeader />
            <main className="w-full py-8 px-4">{children}</main>

            <SiteFooter />
        </ThemeProvider>
        </body>
        </html>
    )
}
