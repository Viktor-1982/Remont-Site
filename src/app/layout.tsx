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
    title: "Renohacks.com вЂ” Р±Р»РѕРі Рѕ СЂРµРјРѕРЅС‚Рµ, РґРёР·Р°Р№РЅРµ Рё DIY",
    description: "Р¤РѕС‚Рѕ-РіР°Р№РґС‹ РїРѕ СЂРµРјРѕРЅС‚Сѓ СЃРІРѕРёРјРё СЂСѓРєР°РјРё, DIY Р»Р°Р№С„С…Р°РєРё, Р±РµСЃРїР»Р°С‚РЅС‹Рµ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂС‹ Рё РѕР±Р·РѕСЂС‹ РјР°С‚РµСЂРёР°Р»РѕРІ РґР»СЏ РєР°С‡РµСЃС‚РІРµРЅРЅРѕРіРѕ СЂРµРјРѕРЅС‚Р°.",
    metadataBase: new URL("https://renohacks.com"),
    icons: {
        icon: [
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Renohacks.com вЂ” Р±Р»РѕРі Рѕ СЂРµРјРѕРЅС‚Рµ, РґРёР·Р°Р№РЅРµ Рё DIY",
        description: "Р¤РѕС‚Рѕ-РіР°Р№РґС‹ РїРѕ СЂРµРјРѕРЅС‚Сѓ СЃРІРѕРёРјРё СЂСѓРєР°РјРё, DIY Р»Р°Р№С„С…Р°РєРё, Р±РµСЃРїР»Р°С‚РЅС‹Рµ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂС‹ Рё РѕР±Р·РѕСЂС‹ РјР°С‚РµСЂРёР°Р»РѕРІ РґР»СЏ РєР°С‡РµСЃС‚РІРµРЅРЅРѕРіРѕ СЂРµРјРѕРЅС‚Р°.",
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
    const pathname =
        hdrs.get("x-invoke-path") ||
        hdrs.get("next-url") ||
        hdrs.get("x-matched-path") ||
        hdrs.get("x-pathname") ||
        ""
    const lang = pathname.startsWith("/en") ? "en" : pathname ? "ru" : undefined

    return (
        <html
            lang={lang}
            suppressHydrationWarning
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
        <head>
            {/* Favicon Рё РёРєРѕРЅРєРё */}
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            <link rel="manifest" href="/manifest.json" />
            
            {/* вњ… Font Display: swap РґР»СЏ РЅРµРјРµРґР»РµРЅРЅРѕРіРѕ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ С‚РµРєСЃС‚Р° */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            <link rel="dns-prefetch" href="//mc.yandex.ru" />
            <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
            
            {/* вњ… Pinterest Domain Verification */}
            <meta
                name="p:domain_verify"
                content="c5936504ab784c7854df0c0807478575"
            />

            {/* вњ… Google Consent Mode - РёРЅРёС†РёР°Р»РёР·Р°С†РёСЏ Р”Рћ AdSense */}
            <Script id="google-consent-default" strategy="beforeInteractive">{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('consent', 'default', {
                        'ad_storage': 'denied',
                        'ad_user_data': 'denied',
                        'ad_personalization': 'denied',
                        'analytics_storage': 'denied'
                    });
                `}</Script>

            {/* вњ… Р—Р°РіСЂСѓР¶Р°РµРј GTM/Yandex/AdSense С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ consent=accepted */}
            <Script id="consented-third-party-loaders" strategy="afterInteractive">{`
                    (function () {
                        if (typeof window === 'undefined') return;
                        try {
                            if (localStorage.getItem('cookie-consent') !== 'accepted') return;

                            function injectScript(id, src, crossOrigin) {
                                if (document.getElementById(id)) return null;
                                var script = document.createElement('script');
                                script.id = id;
                                script.async = true;
                                script.src = src;
                                if (crossOrigin) script.crossOrigin = crossOrigin;
                                document.head.appendChild(script);
                                return script;
                            }

                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
                            injectScript('gtm-script-runtime', 'https://www.googletagmanager.com/gtm.js?id=GTM-N2Z2CSMS');

                            window.ym = window.ym || function(){ (window.ym.a = window.ym.a || []).push(arguments); };
                            window.ym.l = Date.now();
                            injectScript('yandex-metrika-runtime', 'https://mc.yandex.ru/metrika/tag.js?id=104537151');
                            window.ym(104537151, 'init', {
                                ssr: true,
                                webvisor: true,
                                clickmap: true,
                                accurateTrackBounce: true,
                                trackLinks: true
                            });

                            injectScript(
                                'google-adsense-runtime',
                                'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6574921684224364',
                                'anonymous'
                            );
                        } catch (_) {}
                    })();
                `}</Script>
            
            {/* вњ… Service Worker РґР»СЏ PWA */}
            <Script id="pwa-service-worker" strategy="afterInteractive">{`
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
                `}</Script>

            {/* вњ… JSON-LD: Organization + WebSite */}
            <Script
                id="site-schema"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://renohacks.com/#organization",
                                name: "Renohacks",
                                url: "https://renohacks.com/",
                                logo: {
                                    "@type": "ImageObject",
                                    url: "https://renohacks.com/icon.svg",
                                },
                            },
                            {
                                "@type": "WebSite",
                                "@id": "https://renohacks.com/#website",
                                url: "https://renohacks.com/",
                                name: "Renohacks",
                                publisher: { "@id": "https://renohacks.com/#organization" },
                                potentialAction: {
                                    "@type": "SearchAction",
                                    target: [
                                        "https://renohacks.com/search?q={search_term_string}",
                                        "https://renohacks.com/en/search?q={search_term_string}",
                                    ],
                                    "query-input": "required name=search_term_string",
                                }
                            },
                        ],
                    }),
                }}
            />
        </head>

        <body className="min-h-screen bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
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

