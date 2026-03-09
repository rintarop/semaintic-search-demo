import weaviate from "weaviate-client";

const WEAVIATE_URL = process.env.WEAVIATE_URL || "http://localhost:8080";

export async function getWeaviateClient() {
  const client = await weaviate.connectToLocal({
    host: WEAVIATE_URL.replace(/^https?:\/\//, "").split(":")[0],
    port: parseInt(WEAVIATE_URL.split(":")[2] || "8080"),
  });
  return client;
}

export interface Movie {
  title: string;
  overview: string;
  genres: string;
  releaseDate: string;
  voteAverage: number;
  popularity: number;
}
