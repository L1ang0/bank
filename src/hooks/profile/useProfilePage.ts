import { useState, useEffect, useCallback } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

export interface UserProfile {
  created_at: string
  updated_at: string
  email_confirmed_at: string | null
  id: string
  email: string
  user_metadata: {
    name?: string
    phone?: string
    avatar_url?: string
  }
}

export interface FormData {
  name: string
  phone: string
}

export const useProfilePage = () => {
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()
  
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '' })

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user as UserProfile)
          setFormData({
            name: user.user_metadata?.name || '',
            phone: user.user_metadata?.phone || '',
          })
        }
      } catch (error) {
        console.error('Ошибка получения пользователя:', error)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [supabase])

  const uploadAvatar = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        toast.error('Выберите файл!');
        return
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${user?.id}/avatar.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const newUrl = `${data.publicUrl}?t=${Date.now()}`
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: newUrl }
      })
      if (updateError) throw updateError

      setUser(prev => prev ? {
        ...prev,
        user_metadata: { ...prev.user_metadata, avatar_url: newUrl }
      } : null)

    } catch (error) {
      console.error('Ошибка загрузки аватарки:', error)
      toast.error('Ошибка при загрузке файла');
    } finally {
      setUploading(false)
    }
  }, [user, supabase])

  const saveProfile = useCallback(async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
          phone: formData.phone,
        },
      })
      if (error) throw error

      setUser(prev => prev ? {
        ...prev,
        user_metadata: { 
          ...prev.user_metadata,
          name: formData.name,
          phone: formData.phone
        },
      } : null)
      
      setEditing(false)
    } catch (error) {
      console.error('Ошибка обновления профиля:', error)
      toast.error('Ошибка при обновлении профиля')
    }
  }, [formData, supabase])

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }, [supabase, router])

  const startEditing = useCallback(() => setEditing(true), [])
  const cancelEditing = useCallback(() => setEditing(false), [])

  const updateFormData = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const DEFAULT_AVATAR_URL = 'https://vrmuwzkelrwnmsoteluq.supabase.co/storage/v1/object/public/avatars/default.png'
  const avatarUrl = user?.user_metadata?.avatar_url || DEFAULT_AVATAR_URL

  return {
    user,
    loading,
    uploading,
    editing,
    formData,
    avatarUrl,
    uploadAvatar,
    saveProfile,
    handleLogout,
    startEditing,
    cancelEditing,
    updateFormData
  }
}