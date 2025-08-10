'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/header'
import SideNav from '@/components/sideNav'
import MainContent from '@/components/mainContent'
import NewsPanel from '@/components/newsPanel'
import { useInfiniteNews } from '@/hooks/useInfiniteNews'

export default function HomePage() {
  const [sideOpen, setSideOpen] = useState(false)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteNews()

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchNextPage()
      }
    })

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const allArticles = data?.pages.flatMap(page => page.articles) ?? []

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header onMenuClick={() => setSideOpen(!sideOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <SideNav open={sideOpen} onClose={() => setSideOpen(false)} />

        <main className="flex-1 p-6 overflow-y-auto bg-[#f5f5f5] dark:bg-[#2f2f2f]">
          <MainContent />
        </main>

        <aside className="w-34 sm:w-55 md:w-75 md:p-4 sm:p-3 p-1 bg-[#f5f5f5] dark:bg-[#2f2f2f] border-none overflow-y-auto">
          {isLoading && 
          <p className="text-sm text-center mt-15 transform transition-all">Загрузка...🔄</p>}
          {isError && <p className="text-sm text-center mt-15 text-red-600">Ошибка: {(error as Error).message}⚠️</p>}
          {!isLoading && !isError && (
            <NewsPanel articles={allArticles} observerRef={observerRef} />
          )}
        </aside>
      </div>
    </div>
  )
}
