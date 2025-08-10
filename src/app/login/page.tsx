'use client'

import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage({ open, onClose }: { open: boolean, onClose: () => void }) {

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50">

        <main className='flex-1 h-screen overflow-y-auto'>
          <LoginForm />
        </main>
    </div>
  )
}