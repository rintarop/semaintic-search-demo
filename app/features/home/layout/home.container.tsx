import { HomeLayout } from "./home"

type Props = {
  query?: string
}

const API_URL = process.env.API_URL || 'http://localhost:3000'

export const HomeLayoutContainer = async ({ query = '' }: Props) => {
  // queryが空の場合は検索をスキップ
  if (!query.trim()) {
    return <HomeLayout movies={[]} initialQuery={query} />
  }

  try {
    const response = await fetch(`${API_URL}/api/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, limit: 10 }),
      cache: 'no-store',
    })

    const data = await response.json()

    if (data.success) {
      return <HomeLayout movies={data.movies} initialQuery={query} />
    } else {
      return <HomeLayout movies={[]} initialQuery={query} errorMsg={data.error || '検索に失敗しました'} />
    }
  } catch (error) {
    console.error('Search error:', error)
    return <HomeLayout movies={[]} initialQuery={query} errorMsg={'検索中にエラーが発生しました'} />
  }
}