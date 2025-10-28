import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface ClientLayoutProps {
    children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
    return (
        <>
            <SiteHeader />
            <main className="w-full py-8 px-4">{children}</main>
            <SiteFooter />
        </>
    )
}
