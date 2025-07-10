'use client'

import { useState } from 'react'
import Header from '@/components/header'
import SideNav from '@/components/sideNav'
import MainContent from '@/components/mainContent'
import NewsPanel from '@/components/newsPanel'

export default function HomePage() {
  const [sideOpen, setSideOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header onMenuClick={() => setSideOpen(!sideOpen)}/>

      <div className="flex flex-1 overflow-hidden">
        <SideNav open={sideOpen} onClose={() => setSideOpen(false)} />
        
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <MainContent/>
        </main>

        <aside className="w-75 p-4 bg-white border-none overflow-y-auto">
          <NewsPanel />
        </aside>
      </div>
    </div>
  )
}
