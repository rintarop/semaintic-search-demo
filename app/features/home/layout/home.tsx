import { Movie } from "@/lib/weaviate"
import { SearchForm } from "../components/search-form"
import { ErrorCard } from "../components/error-card"
import { MovieTable } from "../components/movie-tablel"


type Props = {
  movies: Movie[]
  initialQuery?: string
  loading?: boolean
  errorMsg?: string
}

export const HomeLayout = ({ movies, initialQuery, loading, errorMsg }: Props) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <SearchForm initialQuery={initialQuery} loading={loading} />

        {errorMsg && (
          <ErrorCard errorMsg={errorMsg} />
        )}

        <MovieTable movies={movies} />
      </div>
    </div>
  )
}