import './globals.css'
import Providers from './Providers'

export const metadata = {
  title: 'БГБ Банк',
  description: 'Надёжный онлайн-банк',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className="bg-[#f5f5f5] dark:bg-[#2f2f2f] text-[#111111] dark:text-[#f1f5f9] transition-colors duration-300">
        <div className="flex">
        <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}

