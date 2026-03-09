import { NextRequest, NextResponse } from "next/server";
import weaviate from "weaviate-client";

const WEAVIATE_URL = process.env.WEAVIATE_URL || "http://localhost:8080";

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 10 } = await request.json();

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Query is required" },
        { status: 400 }
      );
    }

    const client = await weaviate.connectToLocal({
      host: WEAVIATE_URL.replace(/^https?:\/\//, "").split(":")[0],
      port: parseInt(WEAVIATE_URL.split(":")[2] || "8080"),
    });

    const movieCollection = client.collections.get("Movie");

    const result = await movieCollection.query.nearText(query, {
      limit,
      returnMetadata: ["distance"],
    });

    await client.close();

    const movies = result.objects.map((obj) => ({
      title: obj.properties.title,
      overview: obj.properties.overview,
      genres: obj.properties.genres,
      releaseDate: obj.properties.releaseDate,
      voteAverage: obj.properties.voteAverage,
      popularity: obj.properties.popularity,
      distance: obj.metadata?.distance,
    }));

    return NextResponse.json({ success: true, movies });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
