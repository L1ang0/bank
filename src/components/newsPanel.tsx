'use client'

import { useEffect, useState } from 'react'

type Article = {
  title: string
  url: string
  source: {
    name: string
  }
}

export default function NewsPanel() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch('/api/news', { method: 'GET' })
      const data = await res.json()
      setArticles(data.articles || [])
    }
    fetchNews()
  }, [])

  return (
    <div className="p-6 bg-[#f5f5f5] dark:bg-[#2f2f2f] shadow-md rounded-2xl md:h-[calc(100vh-7rem)] sm:h-[calc(100vh-6rem)] h-[calc(100vh-4.3rem)] overflow-y-auto">
      <h2 className="md:text-2xl sm:text-[18px] text-[11px] font-bold sm:mb-6 mb-2 sm:ml-0 -ml-2 text-red-900 dark:text-blue-600">Экономические новости 📢</h2>
      <ul className="md:space-y-6 sm:space-y-4 space-y-1 ">
        {articles.map((article, idx) => (
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
    </div>
  )
}
