// src/app/layout.tsx
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

import { ClientLayout } from "@/components/client-layout"

import Script from "next/script"
import { headers } from "next/headers"

export const metadata: Metadata = {
    title: "Renohacks.com — блог о ремонте, дизайне и DIY",
    description: "Фото-гайды по ремонту своими руками, DIY лайфхаки, бесплатные калькуляторы и обзоры материалов для качественного ремонта.",
    metadataBase: new URL("https://renohacks.com"),
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
            for (var j=0;j<document.scripts.length;j++){
              if(document.scripts[j].src===r){return;}
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],
            k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');

          ym(104537151,'init',{
            ssr:true,
            webvisor:true,
            clickmap:true,
            ecommerce:"dataLayer",
            accurateTrackBounce:true,
            trackLinks:true
          });`}
            </Script>
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

        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    )
}
