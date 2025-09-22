import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

import { ThemeProvider } from "@/app/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RepairAssistant } from "@/components/repair-assistant"

import Script from "next/script"

export const metadata: Metadata = {
    title: "renohacks.com — блог о ремонте и строительстве",
    description: "Фото-гайды, лайфхаки и обзоры материалов.",
    verification: {
        google: "OdLk95jAgxGIRILtuubNzlM5qcoo6leKRWka7i_PcEg",
        yandex: "989aba303b8eb47e",
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="ru"
            suppressHydrationWarning
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
        <head>
            <Script id="gtm-script" strategy="beforeInteractive">
                {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-N2Z2CSMS');
  `}
            </Script>

        </head>
        <body className="min-h-screen bg-background text-foreground font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-N2Z2CSMS"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            ></iframe>
        </noscript>

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            value={{
                light: "light",
                dark: "dark",
                sepia: "sepia",
                contrast: "contrast",
            }}
        >
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
