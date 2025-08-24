'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export const useUpdatePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Пароль должен быть не менее 8 символов')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createSupabaseBrowserClient(false)
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      })

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => router.push('/'), 2000)
     } catch (err: unknown) {
      setError((err as Error).message || 'Ошибка при обновлении пароля')
      setTimeout(() => setError(''), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    error,
    success,
    handleUpdatePassword
  }
}