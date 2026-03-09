import { Movie } from "@/lib/weaviate"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Props = {
  movies: Movie[]
}

export const MovieTable = ({ movies }: Props) => {
  return (
    <div>
      {movies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>検索結果</CardTitle>
            <CardDescription>{movies.length}件の映画が見つかりました</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">タイトル</TableHead>
                  <TableHead>あらすじ</TableHead>
                  <TableHead className="w-[120px]">ジャンル</TableHead>
                  <TableHead className="w-[100px]">公開日</TableHead>
                  <TableHead className="w-[80px] text-right">評価</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movies.map((movie, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{movie.title}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {movie.overview}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">{movie.genres}</TableCell>
                    <TableCell className="text-sm">{movie.releaseDate}</TableCell>
                    <TableCell className="text-right">{movie.voteAverage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}