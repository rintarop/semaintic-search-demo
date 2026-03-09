import { HomeLayoutContainer } from "@/features/home/layout/home.container";

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { query } = await searchParams;
  const initialQuery = query || '';
  return <HomeLayoutContainer query={initialQuery} />;
}
