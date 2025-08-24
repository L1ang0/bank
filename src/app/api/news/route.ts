import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page') || '1'

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=экономика&language=ru&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
  )

  const data = await res.json()
  return NextResponse.json(data)
}