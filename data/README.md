# TMDB 5000 Movies Dataset

## Source

This dataset is obtained from Kaggle:
- **Dataset**: [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata)
- **License**: CC0: Public Domain
- **Original Source**: The Movie Database (TMDB)

## Download

To use this project, you need to download the dataset:

1. Visit [Kaggle - TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata)
2. Download `tmdb_5000_movies.csv`
3. Place it in this directory (`data/tmdb_5000_movies.csv`)

## File Structure

```
data/
└── tmdb_5000_movies.csv
```

Expected columns:
- `id` - Movie ID
- `title` - Movie title
- `overview` - Plot synopsis
- `genres` - Movie genres (JSON format)
- `release_date` - Release date
- `vote_average` - Average rating
- `popularity` - Popularity score

## Attribution

This product uses the TMDB dataset obtained from Kaggle:
- Dataset uploaded to Kaggle by TMDB
- Original data from The Movie Database (TMDB)
- TMDB® is a registered trademark of The Movie Database
- This project is not endorsed or certified by TMDB

## License

The dataset is licensed under **CC0: Public Domain**, which allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

However, for commercial applications, please:
1. Review [TMDB Terms of Use](https://www.themoviedb.org/terms-of-use)
2. Consider TMDB API usage if you need real-time data
3. Provide appropriate attribution

## Usage in This Project

This dataset is used for:
- **Educational purposes**: Demonstrating semantic search with vector databases
- **Non-commercial use**: Open source example project
- **Vector embeddings**: Movie overviews are converted to 384-dimensional vectors
- **Semantic search**: Natural language queries to find similar movies

## Data Privacy

This dataset contains only publicly available movie information:
- No personal data
- No user information
- Only movie metadata from TMDB
