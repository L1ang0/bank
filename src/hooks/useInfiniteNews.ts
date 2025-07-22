import { useInfiniteQuery } from '@tanstack/react-query'

type Article = {
  title: string
  url: string
  source: { name: string }
}

type NewsResponse = {
  articles: Article[]
  nextPage: number
}

async function fetchNews({ pageParam = 1 }): Promise<NewsResponse> {
  const res = await fetch(`/api/news?page=${pageParam}`)
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
    getNextPageParam: (lastPage) =>
      lastPage.articles.length < 10 ? undefined : lastPage.nextPage,
  })
}
