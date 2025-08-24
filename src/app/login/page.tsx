'use client'

import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50">

        <main className='flex-1 h-screen overflow-y-auto'>
          <LoginForm />
        </main>
    </div>
  )
}