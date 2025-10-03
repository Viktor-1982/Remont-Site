// src/components/language-switcher.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function LanguageSwitcher({ label }: { label?: string }) {
    const pathname = usePathname() || "/";
    const [targetUrl, setTargetUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetch(`/api/switch-target?path=${encodeURIComponent(pathname)}`)
            .then((r) => r.json())
            .then((data) => {
                if (!mounted) return;
                setTargetUrl(data?.targetUrl || (pathname.startsWith("/en") ? "/" : "/en"));
            })
            .catch(() => {
                setTargetUrl(pathname.startsWith("/en") ? "/" : "/en");
            })
            .finally(() => mounted && setLoading(false));

        return () => {
            mounted = false;
        };
    }, [pathname]);

    const fallbackHref = pathname.startsWith("/en") ? "/" : "/en";

    // Simple small UI: show text (можно заменить на иконку/флаг)
    return (
        <>
            {loading ? (
                <a aria-busy="true" className="px-2 py-1 text-sm opacity-60">...</a>
            ) : (
                <Link href={targetUrl || fallbackHref} className="px-2 py-1 text-sm hover:underline">
                    {label ?? (pathname.startsWith("/en") ? "Русский" : "English")}
                </Link>
            )}
        </>
    );
}

export default LanguageSwitcher;
