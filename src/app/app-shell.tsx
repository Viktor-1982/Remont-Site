import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
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

const fontClasses = `${GeistSans.variable} ${GeistMono.variable}`

const siteSchema = {
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
            sameAs: [
                "https://www.pinterest.com/RenoHacks/"
            ]
        },
        {
            "@type": "WebSite",
            "@id": "https://renohacks.com/#website",
            url: "https://renohacks.com/",
            name: "Renohacks",
            // Tells search engines and AI bots that this site has bilingual content
            inLanguage: ["en", "ru"],
            publisher: { "@id": "https://renohacks.com/#organization" },
            potentialAction: {
                "@type": "SearchAction",
                target: [
                    "https://renohacks.com/search?q={search_term_string}",
                    "https://renohacks.com/ru/search?q={search_term_string}",
                ],
                "query-input": "required name=search_term_string",
            },
        },
    ],
}

export function AppShell({
    children,
    lang,
}: {
    children: React.ReactNode
    lang: "ru" | "en"
}) {
    return (
        <html lang={lang} suppressHydrationWarning className={fontClasses}>
            <head>
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="manifest" href="/manifest.json" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />

                <link rel="dns-prefetch" href="//www.googletagmanager.com" />
                <link rel="dns-prefetch" href="//mc.yandex.ru" />

                <meta
                    name="p:domain_verify"
                    content="c5936504ab784c7854df0c0807478575"
                />

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
                        } catch (_) {}
                    })();
                `}</Script>

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

                <Script
                    id="site-schema"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(siteSchema),
                    }}
                />
            </head>
            <body
                className="min-h-screen bg-background text-foreground font-sans antialiased"
                suppressHydrationWarning
            >
                <ThemeProvider>
                    <BackgroundAnimation />
                    <SiteHeader />
                    <main className="w-full py-6 sm:py-8">{children}</main>
                    <SiteFooter />
                    <CookieConsent />
                    <KeyboardShortcuts />
                    <ScrollToTop />
                    <Toaster position="top-center" richColors />
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
