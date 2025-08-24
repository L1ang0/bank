'use client'

import Image from 'next/image'
import { useProfilePage } from '@/hooks/profile/useProfilePage'
import { useState, useEffect } from 'react'
import { useUserActivity } from '@/hooks/useUserActivity'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const {
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
    updateFormData,
  } = useProfilePage()

  const {
    userStatus,
    updateActivity
  } = useUserActivity()

  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-indigo-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Загрузка профиля...</p>
        </div>
      </div>
    )
  }

  const getStatusColor = () => {
    switch (userStatus) {
      case 'online': return 'bg-green-500 dark:bg-emerald-400'
      case 'idle': return 'bg-yellow-500 dark:bg-amber-400'
      case 'offline': return 'bg-gray-500 dark:bg-gray-400'
      default: return 'bg-green-500 dark:bg-emerald-400'
    }
  }

  const getStatusText = () => {
    switch (userStatus) {
      case 'online': return 'В сети'
      case 'idle': return 'Не активен'
      case 'offline': return 'Не в сети'
      default: return 'В сети'
    }
  }
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8"
      onClick={updateActivity}
      onMouseMove={updateActivity}
      onKeyPress={updateActivity}
      onScroll={updateActivity}
      onTouchStart={updateActivity}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая панель - аватар и действия */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 h-full">
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                    <Image
                      src={avatarUrl}
                      alt="Profile Avatar"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjZmOSIgLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0jOTk5Pjx0c3BhbiBkeT0iMC4zNWVtIj5ObyBpbWFnZTwvdHNwYW4+PC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      
                    </div>
                    {uploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Кнопка смены аватара поверх изображения */}
                  <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadAvatar}
                      className="hidden"
                    />
                  </label>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                  {user.user_metadata?.name || 'Пользователь'}
                </h1>
                
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-center flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Участник с {new Date(user.created_at || '').toLocaleDateString('ru-RU')}
                </p>

                <div className="w-full mt-8 space-y-4">
                  <button
                    onClick={editing ? saveProfile : startEditing}
                    disabled={uploading}
                    className="w-full px-6 py-3 cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editing ? "M5 13l4 4L19 7" : "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"} />
                    </svg>
                    {editing ? 'Сохранить изменения' : 'Редактировать профиль'}
                  </button>
                  
                  {!editing ? (
                    <button
                      onClick={handleLogout}
                      className="w-full px-6 py-3 cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Выйти из аккаунта
                    </button>
                  ) : (
                    <button
                      onClick={cancelEditing}
                      className="w-full px-6 py-3 cursor-pointer bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Отменить редактирование
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Правая панель - информация и детали */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                Информация профиля
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-900 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Основная информация
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Имя</p>
                      {editing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          placeholder="Ваше имя"
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all mt-1"
                        />
                      ) : (
                        <p className="text-gray-800 dark:text-white font-medium">{user.user_metadata?.name || 'Не указано'}</p>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-800 dark:text-white font-medium flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-900 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Контактная информация
                  </h3>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Телефон</p>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="Ваш телефон"
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all mt-1"
                      />
                    ) : (
                      <p className="text-gray-800 dark:text-white font-medium flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {user.user_metadata?.phone || 'Не указан'}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-900 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Дополнительная информация
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                  <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Статус активности</p>
                      <div className="text-gray-800 dark:text-white font-medium flex items-center">
                        <div className="relative w-3 h-3 mr-2">
                          {userStatus === 'online' && (
                            <motion.span
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 0]
                              }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                              className="absolute inset-0 rounded-full bg-green-500 dark:bg-emerald-400"
                            />
                          )}
                          {userStatus === 'idle' && (
                            <motion.span
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="absolute inset-0 rounded-full bg-yellow-500 dark:bg-amber-400"
                            />
                          )}
                          <motion.span 
                            className={`absolute inset-0 rounded-full ${getStatusColor()}`}
                          />
                        </div>
                        {getStatusText()}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Подтверждение email</p>
                      <p className="text-gray-800 dark:text-white font-medium">
                        {user.email_confirmed_at ? 'Подтвержден' : 'Не подтвержден'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Последнее обновление</p>
                      <p className="text-gray-800 dark:text-white font-medium">
                        {new Date(user.updated_at || '').toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}