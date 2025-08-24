import { useState, useEffect, useCallback } from 'react'

export type UserStatus = 'online' | 'idle' | 'offline'

export const useUserActivity = () => {
  const [userStatus, setUserStatus] = useState<UserStatus>('online')
  const [lastActivity, setLastActivity] = useState<number>(Date.now())

  // Функция для обновления времени последней активности
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now())
    setUserStatus('online')
  }, [])

  // Эффект для отслеживания активности пользователя
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    const handleActivity = () => {
      updateActivity()
    }

    events.forEach(event => {
      window.addEventListener(event, handleActivity)
    })

    // Интервал для проверки статуса
    const statusCheckInterval = setInterval(() => {
      const currentTime = Date.now()
      const inactiveTime = currentTime - lastActivity
      
      if (inactiveTime > 300000) { // 5 минут - offline
        setUserStatus('offline')
      } else if (inactiveTime > 60000) { // 1 минута - idle
        setUserStatus('idle')
      } else {
        setUserStatus('online')
      }
    }, 10000)

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
      clearInterval(statusCheckInterval)
    }
  }, [lastActivity, updateActivity])

  const getStatusColor = useCallback(() => {
    switch (userStatus) {
      case 'online': return 'bg-green-500 dark:bg-emerald-400'
      case 'idle': return 'bg-yellow-500 dark:bg-amber-400'
      case 'offline': return 'bg-gray-500 dark:bg-gray-400'
      default: return 'bg-green-500 dark:bg-emerald-400'
    }
  }, [userStatus])

  const getStatusText = useCallback(() => {
    switch (userStatus) {
      case 'online': return 'В сети'
      case 'idle': return 'Не активен'
      case 'offline': return 'Не в сети'
      default: return 'В сети'
    }
  }, [userStatus])

  return {
    userStatus,
    updateActivity,
    getStatusColor,
    getStatusText
  }
}