'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type Props = {
  initialQuery?: string
  loading?: boolean
  onSubmit?: () => void
}

export const SearchForm = ({ initialQuery = '', loading }: Props) => {
  const router = useRouter()

  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`?query=${encodeURIComponent(query)}`)
    }
  }

  return ( 
    <Card>
      <CardHeader>
        <CardTitle>映画セマンティック検索</CardTitle>
        <CardDescription>
          映画のあらすじを意味的に検索します。キーワードではなく、意味で検索できます。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-4">
          <Input
            type="text"
            placeholder="e.g. space adventure movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "検索中..." : "検索"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}