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
    <div className="p-4 bg-white shadow rounded-xl h-[calc(100vh-5rem)] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Экономические новости</h2>
      <ul className="space-y-4">
        {articles.map((article, idx) => (
          <li key={idx} className="border-b pb-2">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {article.title}
            </a>
            <p className="text-sm text-gray-600">{article.source?.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
