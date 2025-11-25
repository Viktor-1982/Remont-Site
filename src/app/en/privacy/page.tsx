import { getPageMetadata } from "@/lib/seo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Cookie, BarChart3, Megaphone, Lock, Mail } from "lucide-react"

export const metadata = getPageMetadata("/en/privacy", {
    title: "Privacy Policy | Renohacks",
    description:
        "Renohacks.com Privacy Policy. Information about data collection and use, cookies, and personal information protection.",
    cover: "/images/og-default.png",
    type: "article",
})

export default function PrivacyPage() {
    return (
        <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            <div className="mb-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-6">
                    <Shield className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>

            <div className="space-y-8">
                {/* Introduction */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">1. Introduction</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            This Privacy Policy describes how <strong>renohacks.com</strong> (hereinafter — &quot;Site&quot;, &quot;we&quot;, &quot;us&quot;) 
                            collects, uses, and protects information from site visitors.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            By using our site, you agree to the terms of this Privacy Policy.
                        </p>
                    </CardContent>
                </Card>

                {/* Data Collection */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Lock className="w-6 h-6 text-primary" />
                            <CardTitle className="text-2xl">2. Personal Data Collection</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            <strong>Important:</strong> Our site <strong>does not collect personal data</strong> from users.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>The site has <strong>no registration</strong> or account system</li>
                            <li>We <strong>do not request</strong> name, email, phone, or other personal data</li>
                            <li>We <strong>do not store</strong> users&apos; personal information</li>
                            <li>The site has <strong>no admin panel</strong> for users</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed">
                            The only way to contact us is to send an email to <a href="mailto:info@renohacks.com" className="text-primary hover:underline">info@renohacks.com</a>, 
                            but we do not store these messages on the site server.
                        </p>
                    </CardContent>
                </Card>

                {/* Cookies */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Cookie className="w-6 h-6 text-primary" />
                            <CardTitle className="text-2xl">3. Use of Cookies</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Our site uses cookies for the following purposes:
                        </p>

                        <div className="space-y-4 mt-4">
                            <div className="p-4 rounded-lg bg-muted/50 border">
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold">Analytics and Metrics</h3>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                                    <li><strong>Yandex.Metrika</strong> — for collecting visit statistics, user behavior, and technical metrics</li>
                                    <li><strong>Google Analytics</strong> (via Google Tag Manager) — for traffic analysis and content effectiveness</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-2 ml-7">
                                    These services collect anonymous data: IP address (partially), device type, browser, pages visited, time on site.
                                </p>
                            </div>

                            <div className="p-4 rounded-lg bg-muted/50 border">
                                <div className="flex items-center gap-2 mb-2">
                                    <Megaphone className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold">Advertising</h3>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-7">
                                    <li><strong>Google AdSense</strong> — for displaying relevant advertisements</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-2 ml-7">
                                    AdSense uses cookies to personalize ads and measure ad effectiveness. 
                                    We use <strong>Google Consent Mode</strong> to comply with GDPR/EEA requirements.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <strong>Cookie Management:</strong> You can manage cookie settings through the consent banner 
                                that appears on your first visit. You can accept all cookies, reject them, or customize individually.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Third Parties */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">4. Third-Party Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Our site uses the following third-party services:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Yandex.Metrika</strong> — <a href="https://yandex.com/legal/confidential/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Yandex Privacy Policy</a></li>
                            <li><strong>Google Analytics / Google Tag Manager</strong> — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a></li>
                            <li><strong>Google AdSense</strong> — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a></li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed">
                            These services have their own privacy policies and terms of use. We recommend reviewing them.
                        </p>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">5. Data Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Since we do not collect or store users&apos; personal data, 
                            the risks of personal information leakage are minimal.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We use standard security measures to protect the site from unauthorized access.
                        </p>
                    </CardContent>
                </Card>

                {/* User Rights */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">6. Your Rights (GDPR/CCPA)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            In accordance with GDPR (for users from EEA) and CCPA (for users from California), you have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Manage cookie settings through the consent banner</li>
                            <li>Withdraw consent for cookie use at any time</li>
                            <li>Clear cookies through browser settings</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed">
                            Since we do not store personal data, data deletion requests are not applicable.
                        </p>
                    </CardContent>
                </Card>

                {/* Changes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">7. Changes to Privacy Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to update this Privacy Policy. 
                            The date of the last update is indicated at the beginning of the document.
                        </p>
                    </CardContent>
                </Card>

                {/* Contact */}
                <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Mail className="w-6 h-6 text-primary" />
                            <CardTitle className="text-2xl">8. Contact</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            If you have questions about this Privacy Policy, please contact us:
                        </p>
                        <a
                            href="mailto:info@renohacks.com"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            info@renohacks.com
                        </a>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

