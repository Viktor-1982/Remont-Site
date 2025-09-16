import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroBanner() {
    return (
        <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] h-[400px] md:h-[300px] overflow-hidden rounded-b-2xl">
            {/* Фон */}
            <div className="absolute inset-0">
                <Image
                    src="/images/pokraska/header.png" // 👉 картинка из /public/images/pokraska/
                    alt="Фон блога о ремонте"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Контент */}
            <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom duration-700">
                        PRO ремонт
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                        Фото-гайды, лайфхаки и обзоры материалов для дома и ремонта
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-400">
                        <Button
                            asChild
                            size="lg"
                            className="transform transition-transform hover:scale-105"
                        >
                            <Link href="/tags/novinki">Новинки</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="transform transition-transform hover:scale-105"
                        >
                            <Link href="/tags/diy">DIY проекты</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
