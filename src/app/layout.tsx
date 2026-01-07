// src/app/layout.tsx
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

import { ThemeProvider } from "@/app/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CookieConsent } from "@/components/cookie-consent"
import { BackgroundAnimation } from "@/components/background-animation"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner"
import Script from "next/script"
import { headers } from "next/headers"

export const metadata: Metadata = {
    title: "Renohacks.com — блог о ремонте, дизайне и DIY",
    description: "Фото-гайды по ремонту своими руками, DIY лайфхаки, бесплатные калькуляторы и обзоры материалов для качественного ремонта.",
    metadataBase: new URL("https://renohacks.com"),
    icons: {
        icon: [
            { url: "/icon.svg", type: "image/svg+xml" },
            { url: "/favicon.ico", sizes: "any" },
        ],
        apple: [
            { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Renohacks.com — блог о ремонте, дизайне и DIY",
        description: "Фото-гайды по ремонту своими руками, DIY лайфхаки, бесплатные калькуляторы и обзоры материалов для качественного ремонта.",
        url: "https://renohacks.com/",
        siteName: "Renohacks.com",
        images: ["/images/og-default.png"],
        locale: "ru_RU",
        type: "website",
    },
    alternates: {
        canonical: "https://renohacks.com/",
        languages: {
            ru: "https://renohacks.com/",
            en: "https://renohacks.com/en",
            "x-default": "https://renohacks.com/",
        },
        types: {
            "application/rss+xml": "https://renohacks.com/rss.xml",
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        yandex: "6d69da4ae32e6bf3",
    },
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const hdrs = await headers()
    const pathname = hdrs.get("x-invoke-path") || hdrs.get("next-url") || "/"
    const lang = pathname.startsWith("/en") ? "en" : "ru"

    return (
        <html
            lang={lang}
            suppressHydrationWarning
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
        <head>
            {/* Favicon и иконки */}
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            <link rel="alternate icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            
            {/* Preload critical resources */}
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            <link rel="dns-prefetch" href="//mc.yandex.ru" />
            <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
            
            {/* ✅ Pinterest Domain Verification */}
            <meta
                name="p:domain_verify"
                content="c5936504ab784c7854df0c0807478575"
            />

            {/* ✅ Google Tag Manager */}
            <Script id="gtm-script" strategy="afterInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N2Z2CSMS');`}
            </Script>

            {/* ✅ Yandex.Metrika counter */}
            <Script id="yandex-metrika" strategy="afterInteractive">
                {`(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104537151', 'ym');

          ym(104537151, 'init', {ssr:true, webvisor:true, clickmap:true, accurateTrackBounce:true, trackLinks:true});`}
            </Script>

            {/* ✅ Google Consent Mode - инициализация ДО AdSense */}
            <script
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('consent', 'default', {
                            'ad_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied',
                            'analytics_storage': 'denied'
                        });
                    `,
                }}
            />

            {/* ✅ Google AdSense - используем обычный script для верификации */}
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6574921684224364"
                crossOrigin="anonymous"
            />
            
            {/* ✅ Service Worker для PWA */}
            <script
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: `
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', () => {
                                navigator.serviceWorker.register('/sw.js')
                                    .then((registration) => {
                                        console.log('SW registered:', registration);
                                    })
                                    .catch((error) => {
                                        console.log('SW registration failed:', error);
                                    });
                            });
                        }
                    `,
                }}
            />
        </head>

        <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {/* ✅ GTM noscript */}
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-N2Z2CSMS"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            />
        </noscript>

        {/* ✅ Yandex.Metrika fallback */}
        <noscript>
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://mc.yandex.ru/watch/104537151"
                    style={{ position: "absolute", left: "-9999px" }}
                    alt=""
                />
            </div>
        </noscript>

        <ThemeProvider>
            <BackgroundAnimation />
            <SiteHeader />
            <main className="w-full py-6 sm:py-8">{children}</main>
            <SiteFooter />
            <CookieConsent />
            <KeyboardShortcuts isEnglish={lang === "en"} />
            <ScrollToTop />
            <Toaster position="top-center" richColors />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    )
}
