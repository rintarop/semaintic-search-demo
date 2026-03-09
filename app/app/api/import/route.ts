import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import { join } from "path";
import weaviate from "weaviate-client";

const WEAVIATE_URL = process.env.WEAVIATE_URL || "http://localhost:8080";

export async function POST() {
  try {
    // Weaviateに接続
    const client = await weaviate.connectToLocal({
      host: WEAVIATE_URL.replace(/^https?:\/\//, "").split(":")[0],
      port: parseInt(WEAVIATE_URL.split(":")[2] || "8080"),
    });

    // 既存のコレクションを削除して再作成
    const collections = await client.collections.listAll();
    if (collections.some((c) => c.name === "Movie")) {
      await client.collections.delete("Movie");
    }

    // スキーマ作成
    await client.collections.create({
      name: "Movie",
      description: "A movie from TMDB dataset",
      vectorizers: [
        weaviate.configure.vectorizer.text2VecTransformers({
          name: "overview_vector",
          sourceProperties: ["overview"],
        }),
      ],
      properties: [
        { name: "title", dataType: "text", skipVectorization: true },
        { name: "overview", dataType: "text" },
        { name: "genres", dataType: "text", skipVectorization: true },
        { name: "releaseDate", dataType: "text", skipVectorization: true },
        { name: "voteAverage", dataType: "number", skipVectorization: true },
        { name: "popularity", dataType: "number", skipVectorization: true },
      ],
    });

    // CSVファイルを読み込み
    const csvPath = join(process.cwd(), "..", "data", "tmdb_5000_movies.csv");
    const csvContent = readFileSync(csvPath, "utf-8");

    // CSVをパース
    const records: Record<string, string>[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Movieコレクションを取得
    const movieCollection = client.collections.get("Movie");

    // バッチインポート
    const batchSize = 100;
    let imported = 0;

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);

      const objects = batch
        .filter((record) => record.overview?.trim())
        .map((record) => {
          // genresからname部分を抽出
          let genres = "";
          try {
            const genresArray = JSON.parse(
              record.genres.replace(/""/g, '"') || "[]"
            );
            genres = genresArray.map((g: { name: string }) => g.name).join(", ");
          } catch {
            genres = "";
          }

          return {
            title: record.title || "",
            overview: record.overview || "",
            genres,
            releaseDate: record.release_date || "",
            voteAverage: parseFloat(record.vote_average) || 0,
            popularity: parseFloat(record.popularity) || 0,
          };
        });

      if (objects.length > 0) {
        await movieCollection.data.insertMany(objects);
        imported += objects.length;
      }
    }

    await client.close();

    return NextResponse.json({
      success: true,
      message: `Imported ${imported} movies`,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
