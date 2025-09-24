import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroBanner() {
    return (
        <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] min-h-[420px] md:min-h-[360px] overflow-hidden rounded-b-2xl flex items-center">
            {/* Фон */}
            <div className="absolute inset-0">
                <Image
                    src="/images/pokraska/header.png"
                    alt="Фон блога о ремонте"
                    fill
                    priority
                    className="object-cover"
                />
                {/* overlay с хорошей контрастностью */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Контент */}
            <div className="relative z-10 flex h-full w-full items-center justify-center text-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    {/* Главный заголовок */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Блог о ремонте и строительстве —{" "}
                        <span className="text-primary">renohacks.com</span>
                        <span className="sr-only">
              : фото-гайды, лайфхаки, сметы и калькуляторы для ремонта
            </span>
                    </h1>

                    {/* Подзаголовок */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8">
                        Фото-гайды, лайфхаки и обзоры материалов для дома и ремонта
                    </p>

                    {/* Кнопки */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            <Link href="/tags/novinki">Новинки</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            <Link href="/tags/diy">DIY проекты</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
