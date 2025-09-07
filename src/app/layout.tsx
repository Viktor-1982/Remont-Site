import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

import { ThemeProvider } from "@/app/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RepairAssistant } from "@/components/repair-assistant" // Виртуальный помощник

export const metadata: Metadata = {
    title: "PRO ремонт — блог о ремонте и строительстве",
    description: "Фото-гайды, лайфхаки и обзоры материалов.",
    verification: {
        // ⚠️ сюда добавляем код из Google Search Console
        google: "OdLk95jAgxGIRILtuubNzlM5qcoo6leKRWka7i_PcEg",
    },
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

            {/* Виртуальный помощник */}
            <RepairAssistant />
        </ThemeProvider>
        </body>
        </html>
    )
}
