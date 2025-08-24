'use client'

import { useState } from 'react'
import Header from '@/components/header'
import SideNav from '@/components/sideNav'
import ProfilePage from '@/components/profiles/profilePage'

export default function Profile() {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen lg:overflow-hidden">
      <Header onMenuClick={() => setSideOpen(!sideOpen)} />
      <div className="flex flex-col lg:flex-row flex-1 lg:overflow-hidden">
        <SideNav open={sideOpen} onClose={() => setSideOpen(false)} />
        <main className="flex-1 overflow-y-hidden bg-[#f5f5f5] dark:bg-[#2f2f2f]">
          <ProfilePage />
        </main>
      </div>
    </div>
  )
}
