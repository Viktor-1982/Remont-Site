import { getPageMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Cookie, BarChart3, Megaphone, Lock, Mail } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/en/privacy", {
    title: "Privacy Policy | Renohacks",
    description:
        "Renohacks.com Privacy Policy. Information about data collection and use, cookies, and newsletter subscription data.",
    cover: "/images/og-default.png",
    type: "article",
})

const baseUrl = "https://renohacks.com"

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${baseUrl}/en`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Privacy Policy",
            item: `${baseUrl}/en/privacy`,
        },
    ],
}

export default function PrivacyPage() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
            <div className="mb-12 text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20">
                    <Shield className="h-8 w-8 text-primary" />
                </div>
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">Privacy Policy</h1>
                <p className="text-muted-foreground">
                    Last updated:{" "}
                    {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">1. Introduction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            This Privacy Policy describes how <strong>renohacks.com</strong> (the
                            &quot;Site&quot;, &quot;we&quot;, &quot;us&quot;) collects, uses, and
                            protects information from visitors.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                            By using the Site, you agree to the terms of this Privacy Policy.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Lock className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl">2. Personal Data Collection</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            We collect minimal personal data only for newsletter subscriptions:
                        </p>
                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                            <li>
                                <strong>Email address</strong> - collected only when you voluntarily
                                subscribe through the subscription form
                            </li>
                            <li>
                                <strong>Newsletter track</strong> - used to send you the segment you
                                selected: planning and budget, ideas and trends, or mistakes and guides
                            </li>
                            <li>
                                <strong>Interface language</strong> (ru/en) - used to send emails in
                                the correct language
                            </li>
                            <li>
                                <strong>Subscription date</strong> - used for subscription management
                            </li>
                        </ul>
                        <p className="leading-relaxed text-muted-foreground">
                            We do not collect payment details, postal addresses, or user profile data
                            through the Site.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                            Newsletter email addresses are stored in Supabase and used only for
                            subscription-related emails. You can unsubscribe at any time using the
                            link in the email or by contacting us at{" "}
                            <a
                        href="mailto:vles8878@gmail.com"
                                className="text-primary hover:underline"
                            >
                        vles8878@gmail.com
                            </a>
                            .
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Cookie className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl">3. Use of Cookies</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            The Site uses cookies and local storage for the following purposes:
                        </p>

                        <div className="mt-4 space-y-4">
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Analytics and Metrics</h3>
                                </div>
                                <ul className="ml-7 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Yandex.Metrika</strong> - visit statistics, user
                                        behavior, and technical metrics
                                    </li>
                                    <li>
                                        <strong>Google Analytics</strong> (via Google Tag Manager) -
                                        traffic and content effectiveness analysis
                                    </li>
                                </ul>
                                <p className="ml-7 mt-2 text-sm text-muted-foreground">
                                    These services collect aggregated or partially anonymized data such
                                    as device type, browser, visited pages, and time on site.
                                </p>
                            </div>

                            <div className="rounded-lg border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Megaphone className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Advertising</h3>
                                </div>
                                <ul className="ml-7 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Google AdSense</strong> - relevant advertising display
                                    </li>
                                </ul>
                                <p className="ml-7 mt-2 text-sm text-muted-foreground">
                                    AdSense uses cookies to personalize ads and measure ad
                                    effectiveness. We use Google Consent Mode to respect consent
                                    choices.
                                </p>
                            </div>

                            <div className="rounded-lg border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">Email Subscription</h3>
                                </div>
                                <ul className="ml-7 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                                    <li>
                                        <strong>Functional storage</strong> - language preference,
                                        selected newsletter track, subscription status, and duplicate
                                        subscription prevention
                                    </li>
                                </ul>
                                <p className="ml-7 mt-2 text-sm text-muted-foreground">
                                    These items are required for subscription-related functionality and
                                    are not used for advertising.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                <strong>Cookie Management:</strong> On your first visit, the consent
                                banner lets you accept or reject analytics and advertising cookies.
                                To change that choice later, clear this site&apos;s data in your browser
                                and reload the page.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">4. Third-Party Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            The Site uses the following third-party services:
                        </p>
                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                            <li>
                                <strong>Yandex.Metrika</strong> -{" "}
                                <a
                                    href="https://yandex.com/legal/confidential/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Yandex Privacy Policy
                                </a>
                            </li>
                            <li>
                                <strong>Google Analytics / Google Tag Manager</strong> -{" "}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Google Privacy Policy
                                </a>
                            </li>
                            <li>
                                <strong>Google AdSense</strong> -{" "}
                                <a
                                    href="https://policies.google.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Google Privacy Policy
                                </a>
                            </li>
                            <li>
                                <strong>Resend</strong> - newsletter delivery service (
                                <a
                                    href="https://resend.com/legal/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Resend Privacy Policy
                                </a>
                                )
                            </li>
                            <li>
                                <strong>Supabase</strong> - secure subscription data storage (
                                <a
                                    href="https://supabase.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Supabase Privacy Policy
                                </a>
                                )
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">5. Data Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            We store newsletter email addresses and related subscription metadata only
                            as needed to operate the subscription feature.
                        </p>
                        <p className="leading-relaxed text-muted-foreground">
                            We use standard technical and organizational measures to reduce the risk
                            of unauthorized access to stored data.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">6. Your Rights (GDPR/CCPA)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            Depending on your jurisdiction, you may have the right to:
                        </p>
                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                            <li>Accept or reject analytics and advertising cookies on your first visit</li>
                            <li>
                                Change that choice later by clearing this site&apos;s data in your
                                browser and reloading the page
                            </li>
                            <li>
                                Request removal of your newsletter subscription data by using the
                                unsubscribe link or contacting us
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">7. Changes to This Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="leading-relaxed text-muted-foreground">
                            We may update this Privacy Policy from time to time. The date of the last
                            update appears at the top of this page.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Mail className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl">8. Contact</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-muted-foreground">
                            If you have questions about this Privacy Policy, contact us:
                        </p>
                        <a
                            href="mailto:vles8878@gmail.com"
                            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
                        >
                            <Mail className="h-4 w-4" />
                            vles8878@gmail.com
                        </a>
                    </CardContent>
                </Card>
            </div>

            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </main>
    )
}
