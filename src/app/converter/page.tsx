'use client'

import { useState } from 'react'
import Header from '@/components/header'
import SideNav from '@/components/sideNav'
import CurrencyConverter from '@/components/CurrencyConverter'

export default function HomePage() {
  const [sideOpen, setSideOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header onMenuClick={() => setSideOpen(!sideOpen)}/>

    <div className="flex flex-1 overflow-hidden">
     <SideNav open={sideOpen} onClose={() => setSideOpen(false)} />
    <main>
      <CurrencyConverter />
    </main>
</div>
</div>
  )
}
