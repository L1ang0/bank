import './globals.css'

export const metadata = {
  title: 'БГБ Банк',
  description: 'Надёжный онлайн-банк',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-bg text-text">
        <div className="flex">
          {/* children — контент текущей страницы (page.tsx) */}
          {children}
        </div>
      </body>
    </html>
  )
}