import './globals.css'

export const metadata = {
  title: 'БГБ Банк',
  description: 'Надёжный онлайн-банк',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-100 text-gray-900">
        <div className="flex">
          {/* children — контент текущей страницы (page.tsx) */}
          {children}
        </div>
      </body>
    </html>
  )
}
