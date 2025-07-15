'use client'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className="bg-[#f5f5f5] dark:bg-[#2f2f2f] text-[#111111] dark:text-[#f1f5f9] transition-colors duration-300">
        <div className="flex">
          {children}
        </div>
      </body>
    </html>
  )
}

