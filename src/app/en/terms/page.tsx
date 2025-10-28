import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | Renohacks",
  description: "Terms and conditions for using Renohacks.com. Information about what you can and cannot do on the site, privacy and responsibility.",
  openGraph: {
    title: "Terms of Use | Renohacks",
    description: "Terms and conditions for using Renohacks.com",
    type: "website",
  },
}

export default function TermsOfUsePage() {
  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🏠 About the Site</h2>
          <p>
            <strong>Renohacks.com</strong> is a blog about home renovation, interior design, and DIY projects. 
            We provide practical advice, step-by-step guides, calculators, and inspiration for creating a cozy home.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">✅ What You Can Do</h2>
          
          <h3 className="text-xl font-medium mb-3">📖 Content Usage</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Read articles</strong> and guides for personal use</li>
            <li><strong>Use calculators</strong> for renovation planning</li>
            <li><strong>Save links</strong> to interesting materials</li>
            <li><strong>Share links</strong> to articles on social media</li>
            <li><strong>Print articles</strong> for personal use</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">💬 Interaction</h3>
          <ul className="list-disc pl-6">
            <li><strong>Ask questions</strong> through the contact form</li>
            <li><strong>Suggest topics</strong> for new articles</li>
            <li><strong>Report errors</strong> in calculators or articles</li>
            <li><strong>Share experience</strong> (through contacts)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">❌ What&apos;s Prohibited</h2>
          
          <h3 className="text-xl font-medium mb-3">🚫 Content Copying</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Copy articles</strong> completely or partially without permission</li>
            <li><strong>Use images</strong> for commercial purposes</li>
            <li><strong>Translate content</strong> without coordination</li>
            <li><strong>Create derivative works</strong> based on our materials</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🚫 Technical Restrictions</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Hack the site</strong> or attempt unauthorized access</li>
            <li><strong>Use automated scripts</strong> for data collection</li>
            <li><strong>Overload the server</strong> with multiple requests</li>
            <li><strong>Distribute malware</strong> through our site</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🚫 Inappropriate Behavior</h3>
          <ul className="list-disc pl-6">
            <li><strong>Send spam</strong> through contact forms</li>
            <li><strong>Use offensive language</strong> in messages</li>
            <li><strong>Violate copyright</strong> of third parties</li>
            <li><strong>Spread false information</strong> about our site</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔒 Privacy</h2>
          
          <h3 className="text-xl font-medium mb-3">📊 Data Collection</h3>
          <p className="mb-4">We collect only necessary data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Visit analytics</strong> (anonymous statistics)</li>
            <li><strong>Contact information</strong> (only when contacting)</li>
            <li><strong>Cookies</strong> to improve site functionality</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🛡️ Data Protection</h3>
          <ul className="list-disc pl-6">
            <li><strong>Don&apos;t share data</strong> with third parties without consent</li>
            <li><strong>Use secure connections</strong> (HTTPS)</li>
            <li><strong>Comply with GDPR</strong> and applicable laws</li>
            <li><strong>Allow data deletion</strong> upon request</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">⚖️ Responsibility</h2>
          
          <h3 className="text-xl font-medium mb-3">🏗️ Renovation Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Advice is advisory</strong> in nature</li>
            <li><strong>User is responsible</strong> for their actions</li>
            <li><strong>We recommend consulting</strong> with professionals</li>
            <li><strong>We are not responsible</strong> for damage from applying advice</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🔧 Calculators</h3>
          <ul className="list-disc pl-6">
            <li><strong>Results are approximate</strong> and for planning</li>
            <li><strong>Actual prices may differ</strong></li>
            <li><strong>Consider regional features</strong></li>
            <li><strong>Check price relevance</strong> independently</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">📞 Contacts</h2>
          
          <h3 className="text-xl font-medium mb-3">💌 Contact Us</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Email:</strong> info@renohacks.com</li>
            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/reno.hacks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@reno.hacks</a></li>
            <li><strong>Pinterest:</strong> <a href="https://www.pinterest.com/RenoHacks/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RenoHacks</a></li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🆘 Support</h3>
          <ul className="list-disc pl-6">
            <li><strong>Technical questions:</strong> info@renohacks.com</li>
            <li><strong>Content suggestions:</strong> info@renohacks.com</li>
            <li><strong>Error reports:</strong> info@renohacks.com</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🌟 Our Principles</h2>
          
          <h3 className="text-xl font-medium mb-3">💡 Mission</h3>
          <p className="mb-4">
            We help people create cozy and functional homes by providing practical advice and inspiration for renovation and design.
          </p>

          <h3 className="text-xl font-medium mb-3">🤝 Values</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Practicality</strong> — only proven advice</li>
            <li><strong>Accessibility</strong> — clear instructions for everyone</li>
            <li><strong>Quality</strong> — carefully selected content</li>
            <li><strong>Honesty</strong> — transparency in recommendations</li>
          </ul>
        </section>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold mb-3">📋 Quick Reference</h3>
          <ul className="space-y-2">
            <li>✅ <strong>Allowed:</strong> read, use calculators, share links</li>
            <li>❌ <strong>Prohibited:</strong> copy content, use for commercial purposes</li>
            <li>🔒 <strong>Safe:</strong> we protect your data</li>
            <li>⚖️ <strong>Responsibility:</strong> user is responsible for applying advice</li>
            <li>📞 <strong>Contact:</strong> info@renohacks.com for any questions</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg font-medium text-primary">Thank you for using Renohacks.com! 🏠✨</p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: October 28, 2025</p>
        </div>
      </div>
    </div>
  )
}
