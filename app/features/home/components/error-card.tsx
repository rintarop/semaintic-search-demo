import { Card, CardContent } from '@/components/ui/card'

type Props = {
  errorMsg: string
}

export const ErrorCard = ({ errorMsg }: Props) => {
  return (
    <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
      <CardContent className="pt-6">
        <p className="text-red-600 dark:text-red-400">{errorMsg}</p>
      </CardContent>
    </Card>
  )
}