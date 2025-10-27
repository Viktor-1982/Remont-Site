"use client"

import React from "react"
import { ThemeProvider } from "@/app/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SiteHeader />
            <main className="w-full py-8 px-4">{children}</main>
            <SiteFooter />
        </ThemeProvider>
    )
}
