import { useInfiniteQuery } from '@tanstack/react-query'

export type Article = {
  title: string
  url: string
  source: { name: string }
}

export type NewsResponse = {
  articles: Article[]
  nextPage: number
}

async function fetchNews({ pageParam = 1 }: { pageParam?: number }): Promise<NewsResponse> {
  const res = await fetch(`/api/news?page=${pageParam}`)
  if (!res.ok) {
    throw new Error('Failed to fetch news')
  }
  const data = await res.json()
  return {
    articles: data.articles,
    nextPage: pageParam + 1
  }
}

export function useInfiniteNews() {
  return useInfiniteQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    initialPageParam: 1,
    getNextPageParam: (lastPage: NewsResponse) =>
      lastPage.articles.length < 10 ? undefined : lastPage.nextPage,
  })
}