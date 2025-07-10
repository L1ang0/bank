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
    <div className="p-6 bg-white shadow-md rounded-2xl h-[calc(100vh-7rem)] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-red-900">Экономические новости 📢</h2>
      <ul className="space-y-6">
        {articles.map((article, idx) => (
          <li
            key={idx}
            className="p-4 bg-red-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-red-700 hover:underline"
            >
              {article.title}
            </a>
            <p className="mt-2 text-sm text-gray-600 italic">{article.source?.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
