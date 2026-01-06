"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    CheckCircle2,
    Circle,
    ShoppingCart,
    Plus,
    Trash2,
    Download,
    FileText,
    Info,
    X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// html2pdf будет загружаться динамически только на клиенте

interface MaterialItem {
    id: string
    name: string
    quantity: string
    unit: string
    notes?: string
    purchased: boolean
    category: string
}

interface MaterialCategory {
    id: string
    name: string
    description: string
    icon: React.ReactNode
    materials: Omit<MaterialItem, "id" | "purchased" | "category">[]
}

const getStorageKey = (isEnglish: boolean) => `materials-checklist-${isEnglish ? "en" : "ru"}`

const categoriesRu: MaterialCategory[] = [
    {
        id: "planning",
        name: "Планирование и проектирование",
        description: "Материалы для подготовки и планирования ремонта",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Рулетка измерительная (5-10 м)", quantity: "1", unit: "шт" },
            { name: "Уровень строительный (пузырьковый)", quantity: "1-2", unit: "шт" },
            { name: "Уровень лазерный", quantity: "1", unit: "шт" },
            { name: "Карандаш строительный", quantity: "2-3", unit: "шт" },
            { name: "Маркер строительный", quantity: "2-3", unit: "шт" },
            { name: "Бумага для эскизов", quantity: "1", unit: "пачка" },
            { name: "Линейка металлическая", quantity: "1", unit: "шт" },
            { name: "Угольник строительный", quantity: "1", unit: "шт" },
        ],
    },
    {
        id: "demolition",
        name: "Демонтажные работы",
        description: "Инструменты и материалы для демонтажа",
        icon: <Trash2 className="w-5 h-5" />,
        materials: [
            { name: "Перчатки рабочие", quantity: "2-3", unit: "пары" },
            { name: "Очки защитные", quantity: "1-2", unit: "шт" },
            { name: "Респиратор", quantity: "1-2", unit: "шт" },
            { name: "Мусорные мешки (120 л)", quantity: "10-20", unit: "шт" },
            { name: "Лом", quantity: "1", unit: "шт" },
            { name: "Молоток", quantity: "1", unit: "шт" },
            { name: "Кувалда", quantity: "1", unit: "шт" },
            { name: "Перфоратор (аренда)", quantity: "1", unit: "шт" },
            { name: "Болгарка (УШМ)", quantity: "1", unit: "шт" },
            { name: "Диски для болгарки", quantity: "5-10", unit: "шт" },
            { name: "Зубило", quantity: "2-3", unit: "шт" },
            { name: "Стамеска", quantity: "2-3", unit: "шт" },
        ],
    },
    {
        id: "electrical",
        name: "Электрика",
        description: "Материалы для электромонтажных работ",
        icon: <Circle className="w-5 h-5" />,
        materials: [
            { name: "Провод электрический ВВГ (сечение по проекту)", quantity: "50-100", unit: "м" },
            { name: "Провод NYM", quantity: "50-100", unit: "м" },
            { name: "Розетки одинарные", quantity: "10-20", unit: "шт" },
            { name: "Розетки двойные", quantity: "3-5", unit: "шт" },
            { name: "Розетки с заземлением", quantity: "10-20", unit: "шт" },
            { name: "Выключатели одноклавишные", quantity: "5-10", unit: "шт" },
            { name: "Выключатели двухклавишные", quantity: "3-5", unit: "шт" },
            { name: "Распределительные коробки", quantity: "5-10", unit: "шт" },
            { name: "Автоматические выключатели", quantity: "1", unit: "набор" },
            { name: "УЗО (устройство защитного отключения)", quantity: "2-3", unit: "шт" },
            { name: "Дифференциальный автомат", quantity: "1-2", unit: "шт" },
            { name: "Кабель-каналы", quantity: "20-30", unit: "м" },
            { name: "Изолента ПВХ", quantity: "2-3", unit: "шт" },
            { name: "Изолента ХБ", quantity: "1-2", unit: "шт" },
            { name: "Клеммники", quantity: "1", unit: "пачка" },
            { name: "Саморезы для крепления проводов", quantity: "50-100", unit: "шт" },
            { name: "Дюбели для крепления", quantity: "50-100", unit: "шт" },
        ],
    },
    {
        id: "plumbing",
        name: "Сантехника",
        description: "Материалы для сантехнических работ",
        icon: <Circle className="w-5 h-5" />,
        materials: [
            { name: "Трубы водопроводные ПВХ", quantity: "20-50", unit: "м" },
            { name: "Трубы металлопластиковые", quantity: "20-50", unit: "м" },
            { name: "Трубы полипропиленовые", quantity: "20-50", unit: "м" },
            { name: "Фитинги для труб (уголки)", quantity: "10-20", unit: "шт" },
            { name: "Фитинги для труб (тройники)", quantity: "5-10", unit: "шт" },
            { name: "Фитинги для труб (муфты)", quantity: "5-10", unit: "шт" },
            { name: "Краны шаровые", quantity: "3-5", unit: "шт" },
            { name: "Смесители для раковины", quantity: "1-2", unit: "шт" },
            { name: "Смесители для ванной", quantity: "1", unit: "шт" },
            { name: "Смеситель для кухни", quantity: "1", unit: "шт" },
            { name: "Унитаз", quantity: "1", unit: "шт" },
            { name: "Раковина", quantity: "1-2", unit: "шт" },
            { name: "Ванна", quantity: "1", unit: "шт" },
            { name: "Душевая кабина", quantity: "1", unit: "шт" },
            { name: "Сифон для раковины", quantity: "1-2", unit: "шт" },
            { name: "Сифон для ванной", quantity: "1", unit: "шт" },
            { name: "Герметик сантехнический", quantity: "2-3", unit: "шт" },
            { name: "Лента ФУМ", quantity: "2-3", unit: "шт" },
            { name: "Пакля сантехническая", quantity: "1-2", unit: "шт" },
            { name: "Крепеж для труб", quantity: "20-30", unit: "шт" },
        ],
    },
    {
        id: "rough",
        name: "Черновая отделка",
        description: "Материалы для выравнивания поверхностей",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Штукатурка гипсовая", quantity: "50-100", unit: "кг" },
            { name: "Штукатурка цементная", quantity: "50-100", unit: "кг" },
            { name: "Шпаклёвка стартовая", quantity: "20-30", unit: "кг" },
            { name: "Шпаклёвка финишная", quantity: "10-20", unit: "кг" },
            { name: "Шпаклёвка универсальная", quantity: "20-30", unit: "кг" },
            { name: "Грунтовка глубокого проникновения", quantity: "10-20", unit: "л" },
            { name: "Грунтовка адгезионная", quantity: "5-10", unit: "л" },
            { name: "Сетка штукатурная", quantity: "10-20", unit: "м²" },
            { name: "Сетка армирующая", quantity: "10-20", unit: "м²" },
            { name: "Маяки для штукатурки", quantity: "10-15", unit: "шт" },
            { name: "Стяжка для пола цементная", quantity: "50-100", unit: "кг" },
            { name: "Стяжка для пола самовыравнивающаяся", quantity: "20-30", unit: "кг" },
            { name: "Гидроизоляция", quantity: "5-10", unit: "кг" },
            { name: "Пенополистирол (утеплитель)", quantity: "5-10", unit: "м²" },
        ],
    },
    {
        id: "finishing",
        name: "Чистовая отделка",
        description: "Материалы для финальной отделки",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Обои бумажные", quantity: "10-20", unit: "рулонов" },
            { name: "Обои виниловые", quantity: "10-20", unit: "рулонов" },
            { name: "Обои флизелиновые", quantity: "10-20", unit: "рулонов" },
            { name: "Обои текстильные", quantity: "10-20", unit: "рулонов" },
            { name: "Клей для обоев", quantity: "5-10", unit: "пачек" },
            { name: "Краска для стен водоэмульсионная", quantity: "10-20", unit: "л" },
            { name: "Краска для стен акриловая", quantity: "10-20", unit: "л" },
            { name: "Краска для потолка", quantity: "5-10", unit: "л" },
            { name: "Краска для потолка матовая", quantity: "5-10", unit: "л" },
            { name: "Валики для покраски (меховые)", quantity: "2-3", unit: "шт" },
            { name: "Валики для покраски (велюровые)", quantity: "1-2", unit: "шт" },
            { name: "Кисти малярные плоские", quantity: "3-5", unit: "шт" },
            { name: "Кисти малярные круглые", quantity: "2-3", unit: "шт" },
            { name: "Ванночка для краски", quantity: "1-2", unit: "шт" },
            { name: "Плитка керамическая для стен", quantity: "10-20", unit: "м²" },
            { name: "Плитка керамическая для пола", quantity: "5-10", unit: "м²" },
            { name: "Плитка керамогранит", quantity: "5-10", unit: "м²" },
            { name: "Клей для плитки", quantity: "20-30", unit: "кг" },
            { name: "Затирка для швов", quantity: "2-3", unit: "кг" },
            { name: "Крестики для плитки", quantity: "1", unit: "пачка" },
            { name: "Средство для очистки плитки", quantity: "1-2", unit: "шт" },
        ],
    },
    {
        id: "flooring",
        name: "Напольные покрытия",
        description: "Материалы для пола",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Ламинат", quantity: "10-30", unit: "м²" },
            { name: "Ламинат влагостойкий", quantity: "5-10", unit: "м²" },
            { name: "Подложка под ламинат (пробковая)", quantity: "10-30", unit: "м²" },
            { name: "Подложка под ламинат (пенополиэтилен)", quantity: "10-30", unit: "м²" },
            { name: "Плинтус напольный МДФ", quantity: "20-40", unit: "м" },
            { name: "Плинтус напольный пластиковый", quantity: "20-40", unit: "м" },
            { name: "Плинтус напольный деревянный", quantity: "20-40", unit: "м" },
            { name: "Крепеж для плинтуса (саморезы)", quantity: "50-100", unit: "шт" },
            { name: "Крепеж для плинтуса (клипсы)", quantity: "50-100", unit: "шт" },
            { name: "Паркет", quantity: "10-30", unit: "м²" },
            { name: "Массивная доска", quantity: "10-30", unit: "м²" },
            { name: "Инженерная доска", quantity: "10-30", unit: "м²" },
            { name: "Линолеум", quantity: "10-30", unit: "м²" },
            { name: "Ковролин", quantity: "10-30", unit: "м²" },
            { name: "Пробковое покрытие", quantity: "10-30", unit: "м²" },
        ],
    },
    {
        id: "doors",
        name: "Двери и окна",
        description: "Двери, окна и фурнитура",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Межкомнатные двери", quantity: "3-5", unit: "шт" },
            { name: "Двери МДФ", quantity: "3-5", unit: "шт" },
            { name: "Двери массив", quantity: "1-2", unit: "шт" },
            { name: "Дверные коробки", quantity: "3-5", unit: "шт" },
            { name: "Наличники дверные", quantity: "6-10", unit: "шт" },
            { name: "Петли дверные", quantity: "6-10", unit: "шт" },
            { name: "Петли скрытые", quantity: "3-5", unit: "шт" },
            { name: "Ручки дверные", quantity: "3-5", unit: "шт" },
            { name: "Замки дверные", quantity: "3-5", unit: "шт" },
            { name: "Защелки дверные", quantity: "3-5", unit: "шт" },
            { name: "Окна ПВХ", quantity: "2-5", unit: "шт" },
            { name: "Окна деревянные", quantity: "2-5", unit: "шт" },
            { name: "Подоконники", quantity: "2-5", unit: "шт" },
            { name: "Откосы для окон", quantity: "2-5", unit: "комплект" },
            { name: "Москитные сетки", quantity: "2-5", unit: "шт" },
        ],
    },
    {
        id: "ceiling",
        name: "Потолки",
        description: "Материалы для отделки потолка",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Натяжной потолок (заказ)", quantity: "1", unit: "заказ" },
            { name: "Потолочная плитка ПВХ", quantity: "10-20", unit: "м²" },
            { name: "Потолочная плитка пенополистирол", quantity: "10-20", unit: "м²" },
            { name: "Потолочный плинтус (галтель)", quantity: "20-40", unit: "м" },
            { name: "Потолочный плинтус полиуретановый", quantity: "20-40", unit: "м" },
            { name: "Клей для потолочной плитки", quantity: "2-3", unit: "шт" },
            { name: "Профиль для гипсокартона", quantity: "20-30", unit: "м" },
            { name: "Гипсокартон для потолка", quantity: "10-20", unit: "м²" },
            { name: "Саморезы для гипсокартона", quantity: "100-200", unit: "шт" },
        ],
    },
    {
        id: "tools",
        name: "Инструменты",
        description: "Необходимые инструменты для ремонта",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Дрель-шуруповерт", quantity: "1", unit: "шт" },
            { name: "Перфоратор", quantity: "1", unit: "шт" },
            { name: "Шлифмашина", quantity: "1", unit: "шт" },
            { name: "Строительный миксер", quantity: "1", unit: "шт" },
            { name: "Шпатели (разные размеры)", quantity: "3-5", unit: "шт" },
            { name: "Шпатель широкий (40-60 см)", quantity: "1-2", unit: "шт" },
            { name: "Шпатель узкий (10-15 см)", quantity: "2-3", unit: "шт" },
            { name: "Правило для штукатурки", quantity: "1-2", unit: "шт" },
            { name: "Отвес", quantity: "1", unit: "шт" },
            { name: "Стремянка", quantity: "1", unit: "шт" },
            { name: "Стул строительный", quantity: "1", unit: "шт" },
            { name: "Нож строительный", quantity: "2-3", unit: "шт" },
            { name: "Ножницы по металлу", quantity: "1", unit: "шт" },
            { name: "Плоскогубцы", quantity: "1-2", unit: "шт" },
            { name: "Отвертки набор", quantity: "1", unit: "набор" },
            { name: "Рулетка 5 м", quantity: "1", unit: "шт" },
            { name: "Рулетка 10 м", quantity: "1", unit: "шт" },
        ],
    },
    {
        id: "other",
        name: "Прочее",
        description: "Дополнительные материалы и расходники",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Скотч малярный", quantity: "2-3", unit: "шт" },
            { name: "Скотч упаковочный", quantity: "1-2", unit: "шт" },
            { name: "Пленка защитная", quantity: "1", unit: "рулон" },
            { name: "Пленка полиэтиленовая", quantity: "1", unit: "рулон" },
            { name: "Перчатки одноразовые", quantity: "1", unit: "пачка" },
            { name: "Ветошь", quantity: "1", unit: "упаковка" },
            { name: "Растворитель", quantity: "1-2", unit: "л" },
            { name: "Уайт-спирит", quantity: "1-2", unit: "л" },
            { name: "Ацетон", quantity: "0.5-1", unit: "л" },
            { name: "Саморезы универсальные", quantity: "100-200", unit: "шт" },
            { name: "Дюбели универсальные", quantity: "50-100", unit: "шт" },
            { name: "Гвозди", quantity: "100-200", unit: "шт" },
            { name: "Шурупы", quantity: "100-200", unit: "шт" },
            { name: "Анкеры", quantity: "20-30", unit: "шт" },
        ],
    },
]

const categoriesEn: MaterialCategory[] = [
    {
        id: "planning",
        name: "Planning and Design",
        description: "Materials for renovation preparation and planning",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Measuring tape (5-10 m)", quantity: "1", unit: "pcs" },
            { name: "Spirit level (bubble)", quantity: "1-2", unit: "pcs" },
            { name: "Laser level", quantity: "1", unit: "pcs" },
            { name: "Construction pencil", quantity: "2-3", unit: "pcs" },
            { name: "Construction marker", quantity: "2-3", unit: "pcs" },
            { name: "Sketch paper", quantity: "1", unit: "pack" },
            { name: "Metal ruler", quantity: "1", unit: "pcs" },
            { name: "Carpenter's square", quantity: "1", unit: "pcs" },
        ],
    },
    {
        id: "demolition",
        name: "Demolition Work",
        description: "Tools and materials for demolition",
        icon: <Trash2 className="w-5 h-5" />,
        materials: [
            { name: "Work gloves", quantity: "2-3", unit: "pairs" },
            { name: "Safety glasses", quantity: "1-2", unit: "pcs" },
            { name: "Respirator", quantity: "1-2", unit: "pcs" },
            { name: "Garbage bags (120 L)", quantity: "10-20", unit: "pcs" },
            { name: "Crowbar", quantity: "1", unit: "pcs" },
            { name: "Hammer", quantity: "1", unit: "pcs" },
            { name: "Sledgehammer", quantity: "1", unit: "pcs" },
            { name: "Hammer drill (rental)", quantity: "1", unit: "pcs" },
            { name: "Angle grinder", quantity: "1", unit: "pcs" },
            { name: "Grinding discs", quantity: "5-10", unit: "pcs" },
            { name: "Chisel", quantity: "2-3", unit: "pcs" },
            { name: "Cold chisel", quantity: "2-3", unit: "pcs" },
        ],
    },
    {
        id: "electrical",
        name: "Electrical",
        description: "Materials for electrical work",
        icon: <Circle className="w-5 h-5" />,
        materials: [
            { name: "Electrical wire VVG (gauge per project)", quantity: "50-100", unit: "m" },
            { name: "NYM wire", quantity: "50-100", unit: "m" },
            { name: "Single outlets", quantity: "10-20", unit: "pcs" },
            { name: "Double outlets", quantity: "3-5", unit: "pcs" },
            { name: "Grounded outlets", quantity: "10-20", unit: "pcs" },
            { name: "Single-pole switches", quantity: "5-10", unit: "pcs" },
            { name: "Double-pole switches", quantity: "3-5", unit: "pcs" },
            { name: "Junction boxes", quantity: "5-10", unit: "pcs" },
            { name: "Circuit breakers", quantity: "1", unit: "set" },
            { name: "RCD (residual current device)", quantity: "2-3", unit: "pcs" },
            { name: "Differential circuit breaker", quantity: "1-2", unit: "pcs" },
            { name: "Cable channels", quantity: "20-30", unit: "m" },
            { name: "PVC electrical tape", quantity: "2-3", unit: "pcs" },
            { name: "Cloth electrical tape", quantity: "1-2", unit: "pcs" },
            { name: "Wire connectors", quantity: "1", unit: "pack" },
            { name: "Screws for wire mounting", quantity: "50-100", unit: "pcs" },
            { name: "Wall anchors", quantity: "50-100", unit: "pcs" },
        ],
    },
    {
        id: "plumbing",
        name: "Plumbing",
        description: "Materials for plumbing work",
        icon: <Circle className="w-5 h-5" />,
        materials: [
            { name: "Water pipes PVC", quantity: "20-50", unit: "m" },
            { name: "Metal-plastic pipes", quantity: "20-50", unit: "m" },
            { name: "Polypropylene pipes", quantity: "20-50", unit: "m" },
            { name: "Pipe fittings (elbows)", quantity: "10-20", unit: "pcs" },
            { name: "Pipe fittings (tees)", quantity: "5-10", unit: "pcs" },
            { name: "Pipe fittings (couplings)", quantity: "5-10", unit: "pcs" },
            { name: "Ball valves", quantity: "3-5", unit: "pcs" },
            { name: "Sink faucets", quantity: "1-2", unit: "pcs" },
            { name: "Bathroom faucets", quantity: "1", unit: "pcs" },
            { name: "Kitchen faucet", quantity: "1", unit: "pcs" },
            { name: "Toilet", quantity: "1", unit: "pcs" },
            { name: "Sink", quantity: "1-2", unit: "pcs" },
            { name: "Bathtub", quantity: "1", unit: "pcs" },
            { name: "Shower cabin", quantity: "1", unit: "pcs" },
            { name: "Sink siphon", quantity: "1-2", unit: "pcs" },
            { name: "Bathroom siphon", quantity: "1", unit: "pcs" },
            { name: "Plumbing sealant", quantity: "2-3", unit: "pcs" },
            { name: "PTFE tape", quantity: "2-3", unit: "pcs" },
            { name: "Plumbing hemp", quantity: "1-2", unit: "pcs" },
            { name: "Pipe fasteners", quantity: "20-30", unit: "pcs" },
        ],
    },
    {
        id: "rough",
        name: "Rough Finishing",
        description: "Materials for surface leveling",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Gypsum plaster", quantity: "50-100", unit: "kg" },
            { name: "Cement plaster", quantity: "50-100", unit: "kg" },
            { name: "Starting putty", quantity: "20-30", unit: "kg" },
            { name: "Finishing putty", quantity: "10-20", unit: "kg" },
            { name: "Universal putty", quantity: "20-30", unit: "kg" },
            { name: "Deep penetration primer", quantity: "10-20", unit: "L" },
            { name: "Adhesion primer", quantity: "5-10", unit: "L" },
            { name: "Plaster mesh", quantity: "10-20", unit: "m²" },
            { name: "Reinforcing mesh", quantity: "10-20", unit: "m²" },
            { name: "Plaster beacons", quantity: "10-15", unit: "pcs" },
            { name: "Cement floor screed", quantity: "50-100", unit: "kg" },
            { name: "Self-leveling floor screed", quantity: "20-30", unit: "kg" },
            { name: "Waterproofing", quantity: "5-10", unit: "kg" },
            { name: "Polystyrene insulation", quantity: "5-10", unit: "m²" },
        ],
    },
    {
        id: "finishing",
        name: "Final Finishing",
        description: "Materials for final finishing",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Paper wallpaper", quantity: "10-20", unit: "rolls" },
            { name: "Vinyl wallpaper", quantity: "10-20", unit: "rolls" },
            { name: "Non-woven wallpaper", quantity: "10-20", unit: "rolls" },
            { name: "Textile wallpaper", quantity: "10-20", unit: "rolls" },
            { name: "Wallpaper adhesive", quantity: "5-10", unit: "packs" },
            { name: "Water-based wall paint", quantity: "10-20", unit: "L" },
            { name: "Acrylic wall paint", quantity: "10-20", unit: "L" },
            { name: "Ceiling paint", quantity: "5-10", unit: "L" },
            { name: "Matte ceiling paint", quantity: "5-10", unit: "L" },
            { name: "Paint rollers (fleece)", quantity: "2-3", unit: "pcs" },
            { name: "Paint rollers (velour)", quantity: "1-2", unit: "pcs" },
            { name: "Flat paint brushes", quantity: "3-5", unit: "pcs" },
            { name: "Round paint brushes", quantity: "2-3", unit: "pcs" },
            { name: "Paint tray", quantity: "1-2", unit: "pcs" },
            { name: "Ceramic wall tile", quantity: "10-20", unit: "m²" },
            { name: "Ceramic floor tile", quantity: "5-10", unit: "m²" },
            { name: "Porcelain tile", quantity: "5-10", unit: "m²" },
            { name: "Tile adhesive", quantity: "20-30", unit: "kg" },
            { name: "Grout", quantity: "2-3", unit: "kg" },
            { name: "Tile spacers", quantity: "1", unit: "pack" },
            { name: "Tile cleaner", quantity: "1-2", unit: "pcs" },
        ],
    },
    {
        id: "flooring",
        name: "Flooring",
        description: "Flooring materials",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Laminate", quantity: "10-30", unit: "m²" },
            { name: "Moisture-resistant laminate", quantity: "5-10", unit: "m²" },
            { name: "Cork underlay for laminate", quantity: "10-30", unit: "m²" },
            { name: "Polyethylene underlay for laminate", quantity: "10-30", unit: "m²" },
            { name: "MDF baseboard", quantity: "20-40", unit: "m" },
            { name: "Plastic baseboard", quantity: "20-40", unit: "m" },
            { name: "Wooden baseboard", quantity: "20-40", unit: "m" },
            { name: "Baseboard fasteners (screws)", quantity: "50-100", unit: "pcs" },
            { name: "Baseboard fasteners (clips)", quantity: "50-100", unit: "pcs" },
            { name: "Parquet", quantity: "10-30", unit: "m²" },
            { name: "Solid wood flooring", quantity: "10-30", unit: "m²" },
            { name: "Engineered wood", quantity: "10-30", unit: "m²" },
            { name: "Linoleum", quantity: "10-30", unit: "m²" },
            { name: "Carpet", quantity: "10-30", unit: "m²" },
            { name: "Cork flooring", quantity: "10-30", unit: "m²" },
        ],
    },
    {
        id: "doors",
        name: "Doors and Windows",
        description: "Doors, windows and hardware",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Interior doors", quantity: "3-5", unit: "pcs" },
            { name: "MDF doors", quantity: "3-5", unit: "pcs" },
            { name: "Solid wood doors", quantity: "1-2", unit: "pcs" },
            { name: "Door frames", quantity: "3-5", unit: "pcs" },
            { name: "Door trims", quantity: "6-10", unit: "pcs" },
            { name: "Door hinges", quantity: "6-10", unit: "pcs" },
            { name: "Concealed hinges", quantity: "3-5", unit: "pcs" },
            { name: "Door handles", quantity: "3-5", unit: "pcs" },
            { name: "Door locks", quantity: "3-5", unit: "pcs" },
            { name: "Door latches", quantity: "3-5", unit: "pcs" },
            { name: "PVC windows", quantity: "2-5", unit: "pcs" },
            { name: "Wooden windows", quantity: "2-5", unit: "pcs" },
            { name: "Window sills", quantity: "2-5", unit: "pcs" },
            { name: "Window reveals", quantity: "2-5", unit: "set" },
            { name: "Mosquito nets", quantity: "2-5", unit: "pcs" },
        ],
    },
    {
        id: "ceiling",
        name: "Ceilings",
        description: "Ceiling finishing materials",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Stretch ceiling (order)", quantity: "1", unit: "order" },
            { name: "PVC ceiling tiles", quantity: "10-20", unit: "m²" },
            { name: "Polystyrene ceiling tiles", quantity: "10-20", unit: "m²" },
            { name: "Ceiling molding", quantity: "20-40", unit: "m" },
            { name: "Polyurethane ceiling molding", quantity: "20-40", unit: "m" },
            { name: "Ceiling tile adhesive", quantity: "2-3", unit: "pcs" },
            { name: "Drywall profile", quantity: "20-30", unit: "m" },
            { name: "Ceiling drywall", quantity: "10-20", unit: "m²" },
            { name: "Drywall screws", quantity: "100-200", unit: "pcs" },
        ],
    },
    {
        id: "tools",
        name: "Tools",
        description: "Essential renovation tools",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Drill-driver", quantity: "1", unit: "pcs" },
            { name: "Hammer drill", quantity: "1", unit: "pcs" },
            { name: "Sander", quantity: "1", unit: "pcs" },
            { name: "Orbital sander", quantity: "1", unit: "pcs" },
            { name: "Random orbital sander", quantity: "1", unit: "pcs" },
            { name: "Construction mixer", quantity: "1", unit: "pcs" },
            { name: "Trowels (different sizes)", quantity: "3-5", unit: "pcs" },
            { name: "Wide trowel (40-60 cm)", quantity: "1-2", unit: "pcs" },
            { name: "Narrow trowel (10-15 cm)", quantity: "2-3", unit: "pcs" },
            { name: "Notched trowel", quantity: "1-2", unit: "pcs" },
            { name: "Plastering rule", quantity: "1-2", unit: "pcs" },
            { name: "Plumb line", quantity: "1", unit: "pcs" },
            { name: "Stepladder", quantity: "1", unit: "pcs" },
            { name: "Transformable ladder", quantity: "1", unit: "pcs" },
            { name: "Utility knife", quantity: "2-3", unit: "pcs" },
            { name: "Metal shears", quantity: "1", unit: "pcs" },
            { name: "Pliers", quantity: "1-2", unit: "pcs" },
            { name: "Screwdriver set", quantity: "1", unit: "set" },
            { name: "Adjustable wrenches", quantity: "1-2", unit: "pcs" },
            { name: "Soldering iron", quantity: "1", unit: "pcs" },
        ],
    },
    {
        id: "other",
        name: "Other",
        description: "Additional materials and consumables",
        icon: <FileText className="w-5 h-5" />,
        materials: [
            { name: "Masking tape", quantity: "2-3", unit: "pcs" },
            { name: "Double-sided tape", quantity: "1-2", unit: "pcs" },
            { name: "Protective film", quantity: "1", unit: "roll" },
            { name: "Polyethylene film", quantity: "1-2", unit: "roll" },
            { name: "Disposable gloves", quantity: "1", unit: "pack" },
            { name: "Rubber gloves", quantity: "1-2", unit: "pairs" },
            { name: "Rags", quantity: "1", unit: "package" },
            { name: "Solvent", quantity: "1-2", unit: "L" },
            { name: "White spirit", quantity: "1-2", unit: "L" },
            { name: "Acetone", quantity: "0.5-1", unit: "L" },
            { name: "Window cleaner", quantity: "1-2", unit: "pcs" },
            { name: "Surface cleaner", quantity: "1-2", unit: "pcs" },
            { name: "Cleaning sponges", quantity: "5-10", unit: "pcs" },
            { name: "Cleaning rags", quantity: "5-10", unit: "pcs" },
        ],
    },
]

export function MaterialsChecklist({ isEnglish = false }: { isEnglish?: boolean }) {
    const categories = isEnglish ? categoriesEn : categoriesRu
    const [materials, setMaterials] = useState<MaterialItem[]>([])
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [isLoaded, setIsLoaded] = useState(false)
    const [prevIsEnglish, setPrevIsEnglish] = useState(isEnglish)
    const [newMaterialName, setNewMaterialName] = useState("")
    const [newMaterialQuantity, setNewMaterialQuantity] = useState("")
    const [newMaterialUnit, setNewMaterialUnit] = useState("")
    const [newMaterialCategory, setNewMaterialCategory] = useState("other")
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [addDialogTab, setAddDialogTab] = useState<"ready" | "custom">("ready")
    const [selectedCategoryForReady, setSelectedCategoryForReady] = useState("other")
    const [materialQuantities, setMaterialQuantities] = useState<Record<string, string>>({})

    // Инициализация материалов из категорий
    useEffect(() => {
        if (materials.length === 0 && !isLoaded) {
            const initialMaterials: MaterialItem[] = []
            categories.forEach((category) => {
                category.materials.forEach((material) => {
                    initialMaterials.push({
                        id: `${category.id}-${material.name}`,
                        ...material,
                        category: category.id,
                        purchased: false,
                    })
                })
            })
            setMaterials(initialMaterials)
        }
    }, [categories, materials.length, isLoaded])

    // Очистка списка при смене языка
    useEffect(() => {
        if (prevIsEnglish !== isEnglish) {
            setMaterials([])
            setExpandedCategories(new Set())
            setMaterialQuantities({})
            setPrevIsEnglish(isEnglish)
        }
    }, [isEnglish, prevIsEnglish])

    // Загрузка из localStorage
    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            const storageKey = getStorageKey(isEnglish)
            const saved = localStorage.getItem(storageKey)
            if (saved) {
                const savedMaterials = JSON.parse(saved) as MaterialItem[]
                setMaterials(savedMaterials)
            }
        } catch (error) {
            console.error("Failed to load checklist:", error)
        } finally {
            setIsLoaded(true)
        }
    }, [isEnglish])

    // Сохранение в localStorage
    useEffect(() => {
        if (!isLoaded || typeof window === "undefined") return

        try {
            const storageKey = getStorageKey(isEnglish)
            localStorage.setItem(storageKey, JSON.stringify(materials))
        } catch (error) {
            console.error("Failed to save checklist:", error)
        }
    }, [materials, isLoaded, isEnglish])

    // Автоматически сворачиваем категории, когда они становятся пустыми
    useEffect(() => {
        const categoryIds = new Set(materials.map((m) => m.category))
        setExpandedCategories((prev) => {
            const next = new Set(prev)
            // Удаляем из развернутых те категории, в которых нет материалов
            categories.forEach((category) => {
                if (!categoryIds.has(category.id)) {
                    next.delete(category.id)
                }
            })
            return next
        })
    }, [materials, categories])

    const togglePurchase = (id: string) => {
        setMaterials((prev) =>
            prev.map((item) => (item.id === id ? { ...item, purchased: !item.purchased } : item))
        )
    }

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev)
            if (next.has(categoryId)) {
                next.delete(categoryId)
            } else {
                next.add(categoryId)
            }
            return next
        })
    }

    const addReadyMaterial = (material: Omit<MaterialItem, "id" | "purchased" | "category">, customQuantity?: string) => {
        const existingId = `${selectedCategoryForReady}-${material.name}`
        const exists = materials.some((m) => m.id === existingId)
        
        if (exists) {
            toast.error(isEnglish ? "Material already in checklist" : "Материал уже в чеклисте")
            return
        }

        const quantity = customQuantity || material.quantity

        const newMaterial: MaterialItem = {
            id: existingId,
            ...material,
            quantity,
            purchased: false,
            category: selectedCategoryForReady,
        }

        setMaterials((prev) => [...prev, newMaterial])
        // Очищаем количество для этого материала
        const materialKey = `${selectedCategoryForReady}-${material.name}`
        setMaterialQuantities((prev) => {
            const next = { ...prev }
            delete next[materialKey]
            return next
        })
        toast.success(isEnglish ? "Material added" : "Материал добавлен")
    }

    const addCustomMaterial = () => {
        if (!newMaterialName.trim()) {
            toast.error(isEnglish ? "Enter material name" : "Введите название материала")
            return
        }

        const newMaterial: MaterialItem = {
            id: `custom-${Date.now()}`,
            name: newMaterialName,
            quantity: newMaterialQuantity || "1",
            unit: newMaterialUnit || (isEnglish ? "pcs" : "шт"),
            purchased: false,
            category: newMaterialCategory,
        }

        setMaterials((prev) => [...prev, newMaterial])
        setNewMaterialName("")
        setNewMaterialQuantity("")
        setNewMaterialUnit("")
        setShowAddDialog(false)
        toast.success(isEnglish ? "Material added" : "Материал добавлен")
    }

    const removeMaterial = (id: string) => {
        setMaterials((prev) => prev.filter((item) => item.id !== id))
        toast.success(isEnglish ? "Material removed" : "Материал удален")
    }

    const removeCategoryMaterials = (categoryId: string) => {
        const categoryName = categories.find((cat) => cat.id === categoryId)?.name || categoryId
        if (confirm(isEnglish 
            ? `Delete all materials from "${categoryName}" category? This action cannot be undone.`
            : `Удалить все материалы из категории "${categoryName}"? Это действие нельзя отменить.`)) {
            setMaterials((prev) => prev.filter((item) => item.category !== categoryId))
            toast.success(isEnglish ? "Category materials removed" : "Материалы категории удалены")
        }
    }

    const exportData = async () => {
        try {
            // Проверяем, что мы в браузере
            if (typeof window === "undefined") {
                toast.error(isEnglish ? "Export is only available in the browser" : "Экспорт доступен только в браузере")
                return
            }

            // Используем jsPDF напрямую, без html2canvas
            const { jsPDF } = await import("jspdf")

            // Функция для рендеринга текста в canvas и получения base64
            const renderTextToImage = (text: string, options: { fontSize: number; fontWeight?: string; color?: string; maxWidth?: number }): string => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")
                if (!ctx) return ""

                ctx.font = `${options.fontWeight || "normal"} ${options.fontSize}px Arial, sans-serif`
                ctx.fillStyle = options.color || "#000000"
                ctx.textBaseline = "top"

                const maxWidth = options.maxWidth || 1000
                const words = text.split(" ")
                const lines: string[] = []
                let currentLine = ""

                words.forEach((word) => {
                    const testLine = currentLine ? `${currentLine} ${word}` : word
                    const metrics = ctx.measureText(testLine)
                    if (metrics.width > maxWidth && currentLine) {
                        lines.push(currentLine)
                        currentLine = word
                        } else {
                        currentLine = testLine
                    }
                })
                if (currentLine) {
                    lines.push(currentLine)
                }

                const lineHeight = options.fontSize * 1.2
                canvas.width = maxWidth
                canvas.height = lines.length * lineHeight + 10

                ctx.font = `${options.fontWeight || "normal"} ${options.fontSize}px Arial, sans-serif`
                ctx.fillStyle = options.color || "#000000"
                ctx.textBaseline = "top"

                lines.forEach((line, index) => {
                    ctx.fillText(line, 5, index * lineHeight + 5)
                })

                return canvas.toDataURL("image/png")
            }

            // Группировка по категориям
            const materialsByCategory = categories.reduce((acc, category) => {
                const categoryMaterials = materials.filter((m) => m.category === category.id)
                if (categoryMaterials.length > 0) {
                    acc[category.id] = {
                        name: category.name,
                        materials: categoryMaterials,
                    }
                }
                return acc
            }, {} as Record<string, { name: string; materials: MaterialItem[] }>)

            // Создаем PDF документ
            const doc = new jsPDF({
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            })

            const pageWidth = doc.internal.pageSize.getWidth()
            const pageHeight = doc.internal.pageSize.getHeight()
            const margin = 20
            let yPos = margin
            const lineHeight = 7
            const fontSize = 12


            // Заголовок
            const title = isEnglish ? "Materials Purchase Checklist" : "Чеклист покупок материалов"
            const titleImg = renderTextToImage(title, { fontSize: 20, fontWeight: "bold", maxWidth: (pageWidth - margin * 2) * 3.78 })
            const titleHeight = 8
            doc.addImage(titleImg, "PNG", margin, yPos, pageWidth - margin * 2, titleHeight)
            yPos += titleHeight + 5

            // Дата
            const date = new Date().toLocaleDateString(isEnglish ? "en-US" : "ru-RU")
            const dateText = `${isEnglish ? "Date" : "Дата"}: ${date}`
            const dateImg = renderTextToImage(dateText, { fontSize: fontSize, maxWidth: (pageWidth - margin * 2) * 3.78 })
            const dateHeight = 5
            doc.addImage(dateImg, "PNG", margin, yPos, pageWidth - margin * 2, dateHeight)
            yPos += dateHeight + 3

            // Статистика
            const statsText = isEnglish
                ? `Progress: ${totalStats.purchased} / ${totalStats.total} purchased`
                : `Прогресс: ${totalStats.purchased} / ${totalStats.total} куплено`
            const statsImg = renderTextToImage(statsText, { fontSize: fontSize, fontWeight: "bold", maxWidth: (pageWidth - margin * 2) * 3.78 })
            const statsHeight = 5
            doc.addImage(statsImg, "PNG", margin, yPos, pageWidth - margin * 2, statsHeight)
            yPos += statsHeight + 5

            // Добавляем материалы по категориям
            Object.entries(materialsByCategory).forEach(([_categoryId, categoryData]) => {
                // Проверяем, нужна ли новая страница
                if (yPos > pageHeight - margin - 30) {
                    doc.addPage()
                    yPos = margin
                }

                // Проверяем, нужна ли новая страница
                if (yPos > pageHeight - margin - 20) {
                    doc.addPage()
                    yPos = margin
                }

                // Название категории
                const categoryImg = renderTextToImage(categoryData.name, { fontSize: 16, fontWeight: "bold", maxWidth: (pageWidth - margin * 2) * 3.78 })
                const categoryHeight = 6
                doc.addImage(categoryImg, "PNG", margin, yPos, pageWidth - margin * 2, categoryHeight)
                yPos += categoryHeight + 3

                // Материалы в категории
                categoryData.materials.forEach((material) => {
                    // Проверяем, нужна ли новая страница
                    if (yPos > pageHeight - margin - 20) {
                        doc.addPage()
                        yPos = margin
                    }

                    const checkmark = material.purchased ? "✓" : "☐"
                    const materialText = `${checkmark} ${material.name} - ${material.quantity} ${material.unit}`

                    // Если куплено, делаем текст серым
                    const materialColor = material.purchased ? "#666666" : "#000000"
                    const materialImg = renderTextToImage(materialText, { 
                        fontSize: fontSize, 
                        color: materialColor,
                        maxWidth: (pageWidth - margin * 2 - 5) * 3.78 
                    })
                    const materialHeight = 5
                    doc.addImage(materialImg, "PNG", margin + 5, yPos, pageWidth - margin * 2 - 5, materialHeight)
                    
                    // Если куплено, рисуем линию через текст (зачеркивание)
                    if (material.purchased) {
                        doc.setDrawColor(102, 102, 102)
                        doc.line(margin + 5, yPos + materialHeight / 2, pageWidth - margin - 5, yPos + materialHeight / 2)
                    }

                    yPos += materialHeight + 2
                })

                yPos += lineHeight * 0.5
            })

            // Сохраняем PDF
            const filename = `materials-checklist-${new Date().toISOString().split("T")[0]}.pdf`
            doc.save(filename)
            toast.success(isEnglish ? "Checklist exported to PDF" : "Чеклист экспортирован в PDF")
        } catch (error) {
            console.error("Export failed:", error)
            toast.error(isEnglish ? "Export failed" : "Ошибка при экспорте")
        }
    }

    const clearPurchased = () => {
        if (confirm(isEnglish ? "Clear all purchased items?" : "Очистить все купленные материалы?")) {
            setMaterials((prev) => prev.map((item) => ({ ...item, purchased: false })))
            toast.success(isEnglish ? "Cleared" : "Очищено")
        }
    }

    const clearAllMaterials = () => {
        if (confirm(isEnglish ? "Delete all materials from the checklist? This action cannot be undone." : "Удалить все материалы из чеклиста? Это действие нельзя отменить.")) {
            setMaterials([])
            toast.success(isEnglish ? "All materials cleared" : "Все материалы удалены")
        }
    }

    const getCategoryMaterials = (categoryId: string) => {
        return materials.filter((item) => item.category === categoryId)
    }

    const getCategoryStats = (categoryId: string) => {
        const categoryMaterials = getCategoryMaterials(categoryId)
        const purchased = categoryMaterials.filter((item) => item.purchased).length
        return { total: categoryMaterials.length, purchased }
    }

    const totalStats = {
        total: materials.length,
        purchased: materials.filter((item) => item.purchased).length,
    }

    return (
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-4 md:px-0">
            {/* Заголовок и статистика */}
            <Card>
                <CardHeader className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                                <span className="break-words">
                                {isEnglish ? "Materials Purchase Checklist" : "Чеклист покупок материалов"}
                                </span>
                            </CardTitle>
                            <CardDescription className="mt-2 text-sm md:text-base">
                                {isEnglish
                                    ? "Track all materials needed for your renovation. Mark items as purchased and never forget anything."
                                    : "Отслеживайте все материалы, необходимые для ремонта. Отмечайте купленное и ничего не забудьте."}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="text-xl md:text-2xl font-bold text-primary">
                                {totalStats.purchased} / {totalStats.total}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground">
                                {isEnglish ? "purchased" : "куплено"}
                            </div>
                        </div>
                        <div className="flex-1 w-full sm:w-auto min-w-0 sm:min-w-[200px]">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{
                                        width: `${totalStats.total > 0 ? (totalStats.purchased / totalStats.total) * 100 : 0}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={exportData} className="gap-2">
                            <Download className="w-4 h-4" />
                            {isEnglish ? "Export" : "Экспорт"}
                        </Button>
                        <Dialog
                            open={showAddDialog}
                            onOpenChange={(open) => {
                                setShowAddDialog(open)
                                if (open) {
                                    setAddDialogTab("ready")
                                    setSelectedCategoryForReady("other")
                                }
                            }}
                        >
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Plus className="w-4 h-4" />
                                    {isEnglish ? "Add Material" : "Добавить материал"}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto w-[95vw] md:w-full">
                                <DialogHeader>
                                    <DialogTitle className="text-lg md:text-xl">
                                        {isEnglish ? "Add Material" : "Добавить материал"}
                                    </DialogTitle>
                                    <DialogDescription className="text-sm md:text-base">
                                        {isEnglish
                                            ? "Choose from ready-made materials or add your own"
                                            : "Выберите из готовых товаров или добавьте свой"}
                                    </DialogDescription>
                                </DialogHeader>
                                
                                {/* Вкладки */}
                                <div className="flex gap-2 border-b">
                                    <button
                                        type="button"
                                        onClick={() => setAddDialogTab("ready")}
                                        className={cn(
                                            "px-3 md:px-4 py-2 text-xs md:text-sm font-medium border-b-2 transition-colors",
                                            addDialogTab === "ready"
                                                ? "border-primary text-primary"
                                                : "border-transparent text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {isEnglish ? "Ready-made" : "Готовые товары"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAddDialogTab("custom")}
                                        className={cn(
                                            "px-3 md:px-4 py-2 text-xs md:text-sm font-medium border-b-2 transition-colors",
                                            addDialogTab === "custom"
                                                ? "border-primary text-primary"
                                                : "border-transparent text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {isEnglish ? "Custom" : "Свой товар"}
                                    </button>
                                </div>

                                {addDialogTab === "ready" ? (
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <Label>{isEnglish ? "Category" : "Категория"}</Label>
                                            <select
                                                value={selectedCategoryForReady}
                                                onChange={(e) => {
                                                    setSelectedCategoryForReady(e.target.value)
                                                    // Очищаем количества при смене категории
                                                    setMaterialQuantities({})
                                                }}
                                                className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id} className="bg-background text-foreground">
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="max-h-[400px] overflow-y-auto space-y-2">
                                            {categories
                                                .find((cat) => cat.id === selectedCategoryForReady)
                                                ?.materials.filter((m) => !materials.some((existing) => existing.id === `${selectedCategoryForReady}-${m.name}`))
                                                .map((material, idx) => {
                                                    const materialKey = `${selectedCategoryForReady}-${material.name}`
                                                    const currentQuantity = materialQuantities[materialKey] ?? ""
                                                    return (
                                                    <div
                                                        key={idx}
                                                            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                                        >
                                                            <div className="flex-1 min-w-0 w-full sm:w-auto">
                                                                <div className="font-medium text-sm md:text-base">{material.name}</div>
                                                                <div className="text-xs md:text-sm text-muted-foreground">
                                                                    {isEnglish ? "Default" : "По умолчанию"}: {material.quantity} {material.unit}
                                                            </div>
                                                        </div>
                                                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                                                <div className="flex-1 sm:flex-initial min-w-[100px] sm:min-w-[80px]">
                                                                    <Label className="text-xs md:text-sm mb-1 block">
                                                                        {isEnglish ? "Quantity" : "Количество"}
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        value={currentQuantity}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value
                                                                            // Разрешаем только цифры, дефисы и точки, включая пустую строку
                                                                            if (value === "" || /^[\d.\-]+$/.test(value)) {
                                                                                setMaterialQuantities((prev) => ({
                                                                                    ...prev,
                                                                                    [materialKey]: value,
                                                                                }))
                                                                            }
                                                                        }}
                                                                        placeholder={material.quantity}
                                                                        className="text-sm h-8 md:h-9"
                                                                    />
                                                                </div>
                                                                <div className="flex items-end">
                                                        <Button
                                                            size="sm"
                                                                        onClick={() => {
                                                                            // Используем введенное значение или значение по умолчанию
                                                                            const quantityToUse = currentQuantity.trim() || material.quantity
                                                                            addReadyMaterial(material, quantityToUse)
                                                                        }}
                                                                        className="h-8 md:h-9 px-3"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            {categories
                                                .find((cat) => cat.id === selectedCategoryForReady)
                                                ?.materials.filter((m) => !materials.some((existing) => existing.id === `${selectedCategoryForReady}-${m.name}`))
                                                .length === 0 && (
                                                <div className="text-center text-muted-foreground py-8">
                                                    {isEnglish
                                                        ? "All materials from this category are already in the checklist"
                                                        : "Все материалы из этой категории уже в чеклисте"}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <Label>{isEnglish ? "Material Name" : "Название материала"}</Label>
                                            <Input
                                                value={newMaterialName}
                                                onChange={(e) => setNewMaterialName(e.target.value)}
                                                placeholder={isEnglish ? "e.g., Screws" : "Например, Саморезы"}
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-sm md:text-base">
                                                    {isEnglish ? "Quantity" : "Количество"}
                                                </Label>
                                                <Input
                                                    type="text"
                                                    value={newMaterialQuantity}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        // Разрешаем только цифры, дефисы и точки
                                                        if (value === "" || /^[\d.\-]+$/.test(value)) {
                                                            setNewMaterialQuantity(value)
                                                        }
                                                    }}
                                                    placeholder="1-2"
                                                    className="text-sm md:text-base"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-sm md:text-base">
                                                    {isEnglish ? "Unit" : "Единица"}
                                                </Label>
                                                <Input
                                                    value={newMaterialUnit}
                                                    onChange={(e) => setNewMaterialUnit(e.target.value)}
                                                    placeholder={isEnglish ? "pcs" : "шт"}
                                                    className="text-sm md:text-base"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>{isEnglish ? "Category" : "Категория"}</Label>
                                            <select
                                                value={newMaterialCategory}
                                                onChange={(e) => setNewMaterialCategory(e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id} className="bg-background text-foreground">
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <Button onClick={addCustomMaterial} className="w-full">
                                            {isEnglish ? "Add" : "Добавить"}
                                        </Button>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                        {totalStats.purchased > 0 && (
                            <Button variant="outline" size="sm" onClick={clearPurchased} className="gap-2">
                                <Trash2 className="w-4 h-4" />
                                {isEnglish ? "Clear Purchased" : "Очистить купленное"}
                            </Button>
                        )}
                        {materials.length > 0 && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={clearAllMaterials} 
                                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="w-4 h-4" />
                                {isEnglish ? "Clear All" : "Очистить всё"}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Инструкция */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                        <Info className="w-4 h-4 md:w-5 md:h-5" />
                        {isEnglish ? "How to Use" : "Как пользоваться"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs md:text-sm text-muted-foreground p-4 md:p-6 pt-0">
                    <p>
                        {isEnglish
                            ? "• Click on any material to mark it as purchased"
                            : "• Нажмите на любой материал, чтобы отметить его как купленный"}
                    </p>
                    <p>
                        {isEnglish
                            ? "• Expand categories to see all materials in that category"
                            : "• Раскрывайте категории, чтобы увидеть все материалы в категории"}
                    </p>
                    <p>
                        {isEnglish
                            ? "• Add your own materials using the 'Add Material' button"
                            : "• Добавляйте свои материалы с помощью кнопки 'Добавить материал'"}
                    </p>
                    <p>
                        {isEnglish
                            ? "• Export your checklist to save it or share with others"
                            : "• Экспортируйте чеклист, чтобы сохранить его или поделиться с другими"}
                    </p>
                    <p>
                        {isEnglish
                            ? "• Quantities are approximate - adjust based on your specific project"
                            : "• Количества указаны приблизительно - корректируйте под свой проект"}
                    </p>
                </CardContent>
            </Card>

            {/* Категории */}
            <div className="space-y-4">
                {categories.map((category) => {
                    const categoryMaterials = getCategoryMaterials(category.id)
                    const stats = getCategoryStats(category.id)
                    const isExpanded = expandedCategories.has(category.id)

                    // Скрываем категорию, если в ней нет материалов
                    if (categoryMaterials.length === 0) {
                        return null
                    }

                    return (
                        <Card key={category.id} className="overflow-hidden">
                            <CardHeader
                                className="cursor-pointer hover:bg-muted/50 transition-colors p-4 md:p-6"
                                onClick={() => toggleCategory(category.id)}
                            >
                                <div className="flex items-center justify-between gap-2 md:gap-4">
                                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                        <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                            {category.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-base md:text-lg break-words">
                                                {category.name}
                                            </CardTitle>
                                            <CardDescription className="mt-1 text-xs md:text-sm line-clamp-2">
                                                {category.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                                        {stats.total > 0 && (
                                            <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                                                {stats.purchased} / {stats.total}
                                            </div>
                                        )}
                                        {stats.total > 0 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeCategoryMaterials(category.id)
                                                }}
                                                className="gap-1 md:gap-2 text-xs md:text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                                                title={isEnglish ? "Delete all materials from this category" : "Удалить все материалы из этой категории"}
                                            >
                                                <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="sm" className="gap-1 md:gap-2 text-xs md:text-sm">
                                            {isExpanded
                                                ? isEnglish
                                                    ? "Collapse"
                                                    : "Свернуть"
                                                : isEnglish
                                                  ? "Expand"
                                                  : "Развернуть"}
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CardContent className="pt-0">
                                            <div className="space-y-2">
                                                {categoryMaterials.map((material) => (
                                                    <div
                                                        key={material.id}
                                                        className={cn(
                                                            "flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg border transition-all cursor-pointer hover:bg-muted/50",
                                                            material.purchased && "bg-primary/5 border-primary/20"
                                                        )}
                                                        onClick={() => togglePurchase(material.id)}
                                                    >
                                                        <div className="mt-0.5 flex-shrink-0">
                                                            {material.purchased ? (
                                                                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                                            ) : (
                                                                <Circle className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <div className="flex-1 min-w-0">
                                                                    <div
                                                                        className={cn(
                                                                            "font-medium text-sm md:text-base break-words",
                                                                            material.purchased && "line-through text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {material.name}
                                                                    </div>
                                                                    <div className="text-xs md:text-sm text-muted-foreground mt-1 break-words">
                                                                        {material.quantity} {material.unit}
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        removeMaterial(material.id)
                                                                    }}
                                                                    className="text-destructive hover:text-destructive flex-shrink-0 p-1 md:p-2"
                                                                >
                                                                    <X className="w-3 h-3 md:w-4 md:h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {categoryMaterials.length === 0 && (
                                                    <div className="text-center py-8 text-muted-foreground">
                                                        {isEnglish
                                                            ? "No materials in this category yet"
                                                            : "В этой категории пока нет материалов"}
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

