import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Правила пользования сайтом | Renohacks",
  description: "Правила и условия использования сайта Renohacks.com. Информация о том, что можно и нельзя делать на сайте, конфиденциальность и ответственность.",
  openGraph: {
    title: "Правила пользования сайтом | Renohacks",
    description: "Правила и условия использования сайта Renohacks.com",
    type: "website",
  },
}

export default function TermsOfUsePage() {
  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Правила пользования сайтом</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🏠 О сайте</h2>
          <p>
            <strong>Renohacks.com</strong> — это блог о ремонте, дизайне интерьера и DIY проектах. 
            Мы предоставляем практические советы, пошаговые руководства, калькуляторы и вдохновение для создания уютного дома.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">✅ Что можно делать</h2>
          
          <h3 className="text-xl font-medium mb-3">📖 Использование контента</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Читать статьи</strong> и руководства для личного использования</li>
            <li><strong>Использовать калькуляторы</strong> для планирования ремонта</li>
            <li><strong>Сохранять ссылки</strong> на интересные материалы</li>
            <li><strong>Делиться ссылками</strong> на статьи в социальных сетях</li>
            <li><strong>Печатать статьи</strong> для личного использования</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">💬 Взаимодействие</h3>
          <ul className="list-disc pl-6">
            <li><strong>Задавать вопросы</strong> через контактную форму</li>
            <li><strong>Предлагать темы</strong> для новых статей</li>
            <li><strong>Сообщать об ошибках</strong> в калькуляторах или статьях</li>
            <li><strong>Делиться опытом</strong> ремонта (через контакты)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">❌ Что запрещено</h2>
          
          <h3 className="text-xl font-medium mb-3">🚫 Копирование контента</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Копировать статьи</strong> полностью или частично без разрешения</li>
            <li><strong>Использовать изображения</strong> в коммерческих целях</li>
            <li><strong>Переводить контент</strong> без согласования</li>
            <li><strong>Создавать производные работы</strong> на основе наших материалов</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🚫 Технические ограничения</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Взламывать сайт</strong> или пытаться получить несанкционированный доступ</li>
            <li><strong>Использовать автоматизированные скрипты</strong> для сбора данных</li>
            <li><strong>Перегружать сервер</strong> множественными запросами</li>
            <li><strong>Распространять вредоносное ПО</strong> через наш сайт</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🚫 Неподходящее поведение</h3>
          <ul className="list-disc pl-6">
            <li><strong>Отправлять спам</strong> через контактные формы</li>
            <li><strong>Использовать оскорбительные выражения</strong> в сообщениях</li>
            <li><strong>Нарушать авторские права</strong> третьих лиц</li>
            <li><strong>Распространять ложную информацию</strong> о нашем сайте</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🔒 Конфиденциальность</h2>
          
          <h3 className="text-xl font-medium mb-3">📊 Сбор данных</h3>
          <p className="mb-4">Мы собираем только необходимые данные:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Аналитика посещений</strong> (анонимная статистика)</li>
            <li><strong>Контактная информация</strong> (только при обращении)</li>
            <li><strong>Cookies</strong> для улучшения работы сайта</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🛡️ Защита данных</h3>
          <ul className="list-disc pl-6">
            <li><strong>Не передаем данные</strong> третьим лицам без согласия</li>
            <li><strong>Используем безопасные соединения</strong> (HTTPS)</li>
            <li><strong>Соблюдаем GDPR</strong> и российское законодательство</li>
            <li><strong>Позволяем удалить данные</strong> по запросу</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">⚖️ Ответственность</h2>
          
          <h3 className="text-xl font-medium mb-3">🏗️ Информация о ремонте</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Советы носят рекомендательный характер</strong></li>
            <li><strong>Пользователь несет ответственность</strong> за свои действия</li>
            <li><strong>Рекомендуем консультироваться</strong> с профессионалами</li>
            <li><strong>Мы не несем ответственности</strong> за ущерб от применения советов</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🔧 Калькуляторы</h3>
          <ul className="list-disc pl-6">
            <li><strong>Результаты приблизительные</strong> и для планирования</li>
            <li><strong>Фактические цены могут отличаться</strong></li>
            <li><strong>Учитывайте региональные особенности</strong></li>
            <li><strong>Проверяйте актуальность цен</strong> самостоятельно</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">📞 Контакты</h2>
          
          <h3 className="text-xl font-medium mb-3">💌 Связь с нами</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Email:</strong> info@renohacks.com</li>
            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/reno.hacks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@reno.hacks</a></li>
            <li><strong>Pinterest:</strong> <a href="https://www.pinterest.com/RenoHacks/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RenoHacks</a></li>
          </ul>

          <h3 className="text-xl font-medium mb-3">🆘 Поддержка</h3>
          <ul className="list-disc pl-6">
            <li><strong>Технические вопросы:</strong> info@renohacks.com</li>
            <li><strong>Предложения по контенту:</strong> info@renohacks.com</li>
            <li><strong>Сообщения об ошибках:</strong> info@renohacks.com</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🌟 Наши принципы</h2>
          
          <h3 className="text-xl font-medium mb-3">💡 Миссия</h3>
          <p className="mb-4">
            Мы помогаем людям создавать уютные и функциональные дома, предоставляя практические советы и вдохновение для ремонта и дизайна.
          </p>

          <h3 className="text-xl font-medium mb-3">🤝 Ценности</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Практичность</strong> — только проверенные советы</li>
            <li><strong>Доступность</strong> — понятные инструкции для всех</li>
            <li><strong>Качество</strong> — тщательно отобранный контент</li>
            <li><strong>Честность</strong> — прозрачность в рекомендациях</li>
          </ul>
        </section>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold mb-3">📋 Краткая памятка</h3>
          <ul className="space-y-2">
            <li>✅ <strong>Можно:</strong> читать, использовать калькуляторы, делиться ссылками</li>
            <li>❌ <strong>Нельзя:</strong> копировать контент, использовать в коммерческих целях</li>
            <li>🔒 <strong>Безопасно:</strong> мы защищаем ваши данные</li>
            <li>⚖️ <strong>Ответственность:</strong> пользователь несет ответственность за применение советов</li>
            <li>📞 <strong>Связь:</strong> info@renohacks.com для любых вопросов</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg font-medium text-primary">Спасибо за использование Renohacks.com! 🏠✨</p>
          <p className="text-sm text-muted-foreground mt-2">Последнее обновление: 28 октября 2025 года</p>
        </div>
      </div>
    </div>
  )
}
