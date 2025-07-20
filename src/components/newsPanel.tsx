'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

async function fetchNews({ pageParam = 1 }) {
  const res = await fetch(`/api/news?page=${pageParam}`)
  const data = await res.json()
  return { articles: data.articles, nextPage: pageParam + 1 }
}

export default function NewsPanel() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.articles.length < 10 ? undefined : lastPage.nextPage
    }
  })

  const allArticles = data?.pages.flatMap(page => page.articles) ?? []

  const observerRef = useRef<HTMLDivElement | null>(null)

  // Автоподгрузка при скролле внизу
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
  
  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка загрузки новостей.</p>
  
  return (
    <div className="p-6 bg-[#f5f5f5] dark:bg-[#2f2f2f] shadow-md rounded-2xl md:h-[calc(100vh-7rem)] sm:h-[calc(100vh-6rem)] h-[calc(100vh-4.3rem)] overflow-y-auto">
      <h2 className="md:text-2xl sm:text-[18px] text-[11px] font-bold sm:mb-6 mb-2 sm:ml-0 -ml-2 text-red-900 dark:text-blue-600">Экономические новости 📢</h2>
      <ul className="md:space-y-6 sm:space-y-4 space-y-1 ">
        {allArticles.map((article, idx) => (
          <li
            key={idx}
            className="md:p-4 sm:p-3 p-1 md:mr-0 -mr-4 md:ml-0 -ml-4 bg-[#f5f5f5] dark:bg-[#404040] rounded-lg shadow hover:shadow-md transition-shadow duration-300"
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" md:text-[15px] sm:text-[13px] text-[9px] font-semibold text-red-700 dark:text-blue-500 hover:underline"
            >
              {article.title}
            </a>
            <p className="sm:mt-2 mt-1 md:text-sm sm:text-[12px] text-[8px] text-gray-600 dark:text-gray-400 italic">{article.source?.name}</p>
          </li>
        ))}
      </ul>
      <div ref={observerRef} className="h-10" />
    </div>
  )
}
