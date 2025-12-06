"use client"

import * as React from "react"
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from "next-themes"

/**
 * ThemeProvider — обёртка для next-themes.
 * Только светлая и темная темы.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
}
