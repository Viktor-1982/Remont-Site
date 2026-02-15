import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, XCircle, Shield, Scale, Mail, Home } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/en/terms", {
  title: "Terms of Use | Renohacks",
  description: "Terms and conditions for using Renohacks.com. Information about what you can and cannot do on the site, privacy and liability.",
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
      name: "Terms of Use",
      item: `${baseUrl}/en/terms`,
    },
  ],
}

export default function TermsOfUsePage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-6">
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Terms of Use
        </h1>
        <p className="text-muted-foreground text-lg">Terms and conditions for Renohacks.com</p>
      </div>

      <div className="space-y-8">
        {/* About the Site */}
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 dark:to-primary/10 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">About the Site</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-muted-foreground leading-relaxed text-base">
              <strong className="text-foreground">Renohacks.com</strong> is a blog about renovation, interior design, and DIY projects. 
              We provide practical tips, step-by-step guides, calculators, and inspiration for creating a cozy home.
            </p>
          </CardContent>
        </Card>

        {/* What You Can Do */}
        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-card to-green-500/5 dark:to-green-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">What You Can Do</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">📖</span>
                Content Usage
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Read articles</strong> and guides for personal use</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Use calculators</strong> for renovation planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Save links</strong> to interesting materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Share links</strong> to articles on social media</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Print articles</strong> for personal use</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">💬</span>
                Interaction
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Ask questions</strong> via contact form</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Suggest topics</strong> for new articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Report errors</strong> in calculators or articles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Share experience</strong> (via contacts)</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* What Is Prohibited */}
        <Card className="border-2 border-red-500/20 bg-gradient-to-br from-card to-red-500/5 dark:to-red-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold">What Is Prohibited</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">🚫 Content Copying</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Copy articles</strong> fully or partially without permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Use images</strong> for commercial purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Translate content</strong> without coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Create derivative works</strong> based on our materials</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">🚫 Technical Restrictions</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Hack the site</strong> or attempt unauthorized access</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Use automated tools</strong> to scrape content</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Overload the server</strong> with excessive requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Interfere with site operation</strong> in any way</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5 dark:to-blue-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              We respect your privacy. For detailed information about data collection and use, 
              please see our <Link href="/en/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
            </p>
          </CardContent>
        </Card>

        {/* Liability */}
        <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-card to-orange-500/5 dark:to-orange-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Liability</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important:</strong> The information on the site is provided for informational purposes only. 
              We are not responsible for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Results of applying tips and recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Damage caused by using calculators or guides</span>
          </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Inaccuracies in calculations or measurements</span>
          </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Changes in prices or availability of materials</span>
          </li>
        </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Users are responsible for verifying information and consulting with professionals 
              before making important decisions.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center shadow-lg ring-2 ring-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Contact
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about these Terms of Use, contact us:
            </p>
            <a
              href="mailto:info@renohacks.com"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              <span>info@renohacks.com</span>
            </a>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">📋 Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Allowed:</strong> read, use calculators, share links
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Prohibited:</strong> copy content, use for commercial purposes
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Safe:</strong> we protect your data
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Liability:</strong> user is responsible for applying tips
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Contact:</strong> info@renohacks.com for any questions
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-lg font-medium text-primary mb-2">Thank you for using Renohacks.com! 🏠✨</p>
          <p className="text-sm text-muted-foreground">Last updated: October 28, 2025</p>
        </div>
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
