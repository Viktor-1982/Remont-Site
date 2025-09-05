import Link from "next/link"
import Image from "next/image"

export function HeroBanner() {
    return (
        <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] h-[400px] md:h-[300px] overflow-hidden rounded-b-2xl">
            {/* Фон */}
            <div className="absolute inset-0">
                <Image
                    src="/images/pokraska/header.png" // 👉 картинка шапки (лежит в /public/images/pokraska/)
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
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Ремонт без боли
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-6">
                        Фото-гайды, сметы, лайфхаки и обзоры материалов для дома и ремонта
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/tags/novinki"
                            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition"
                        >
                            Новинки
                        </Link>
                        <Link
                            href="/tags/diy"
                            className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition"
                        >
                            DIY проекты
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
