# Semantic Movie Search with Weaviate

A semantic search demonstration using Weaviate vector database and the TMDB 5000 Movies dataset. This project showcases how to build an AI-powered movie search application that understands the meaning behind search queries, not just keywords.

## Features

- **Semantic Search**: Search movies using natural language queries that understand context and meaning
- **Vector Embeddings**: Powered by `sentence-transformers-multi-qa-MiniLM-L6-cos-v1` model (384-dimensional vectors)
- **Modern Stack**: Next.js 16, TypeScript, and Weaviate v1.28.2
- **Docker Setup**: Complete containerized environment for easy deployment
- **TMDB Dataset**: 5,000 movies with metadata including titles, overviews, genres, and ratings

## Architecture

```
┌─────────────────────────────────────────┐
│   Next.js Frontend (TypeScript)         │
│   - Search UI                            │
│   - Results Display                      │
└──────────────┬──────────────────────────┘
               │ HTTP
               ▼
┌─────────────────────────────────────────┐
│   Weaviate Vector Database              │
│   - GraphQL/REST API                     │
│   - HNSW Index                           │
└──────────────┬──────────────────────────┘
               │ gRPC
               ▼
┌─────────────────────────────────────────┐
│   Transformers Inference Service        │
│   - Text Vectorization                   │
│   - MiniLM-L6 Model                      │
└─────────────────────────────────────────┘
```

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- pnpm (package manager)

## Quick Start

### 1. Start Weaviate and Transformers Service

```bash
# Start Docker containers
make up

# Or manually
docker-compose up -d

# Check logs
make logs
```

Wait for the services to be ready (approximately 30-60 seconds for the Transformers model to load).

### 2. Install Dependencies

```bash
cd app
pnpm install
```

### 3. Import Movie Data

```bash
# Navigate to the app directory
cd app

# Run the import script (creates schema and imports TMDB data)
pnpm run dev

# In your browser, visit:
http://localhost:3000/api/import
```

### 4. Start the Application

```bash
# From the app directory
pnpm run dev

# Or from the root directory
make run
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                      # Next.js application
│   ├── app/
│   │   ├── api/
│   │   │   ├── import/      # Data import endpoint
│   │   │   └── search/      # Search API endpoint
│   │   ├── page.tsx         # Main search UI
│   │   └── layout.tsx
│   ├── components/          # React components
│   │   └── ui/              # UI components (button, card, input, table)
│   ├── features/
│   │   └── home/            # Home page features
│   ├── lib/
│   │   ├── weaviate.ts      # Weaviate client configuration
│   │   └── client.ts        # API client
│   └── package.json
├── data/
│   └── tmdb_5000_movies.csv # TMDB movie dataset
├── docker-compose.yaml       # Weaviate + Transformers setup
├── Makefile                  # Convenience commands
└── weaviate_technical_book.re # Technical documentation (Re:VIEW format)
```

## Example Queries

Try these semantic queries to see the power of vector search:

- "space adventure with aliens"
- "romantic comedy set in Paris"
- "mind-bending thriller about reality"
- "animated family movie with talking animals"
- "dystopian future society"

Unlike traditional keyword search, these queries will find movies based on their plot meanings, not just matching words.

## API Endpoints

### Search Movies

```bash
POST /api/search
Content-Type: application/json

{
  "query": "space adventure"
}
```

Response:
```json
{
  "results": [
    {
      "title": "Avatar",
      "overview": "In the 22nd century...",
      "genres": "Action, Adventure, Fantasy, Science Fiction",
      "releaseDate": "2009-12-10",
      "voteAverage": 7.2,
      "popularity": 150.437577,
      "distance": 0.123
    }
  ]
}
```

### Import Data

```bash
GET /api/import
```

## Configuration

### Weaviate Settings

Configured in `docker-compose.yaml`:

- **Vector Index**: HNSW (Hierarchical Navigable Small World)
- **Vectorizer**: text2vec-transformers
- **Model**: sentence-transformers-multi-qa-MiniLM-L6-cos-v1
- **Dimensions**: 384
- **Distance Metric**: Cosine similarity

### Environment Variables

Create `.env.local` in the `app` directory (optional):

```env
NEXT_PUBLIC_WEAVIATE_URL=http://localhost:8080
```

## Development

### Makefile Commands

```bash
make up        # Start Weaviate and Transformers
make down      # Stop all services
make restart   # Restart services
make logs      # View container logs
make run       # Start Next.js dev server
```

### Manual Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Start Next.js dev server
cd app && pnpm run dev
```

## Technical Details

### Vector Embeddings

- **Model**: [sentence-transformers/multi-qa-MiniLM-L6-cos-v1](https://huggingface.co/sentence-transformers/multi-qa-MiniLM-L6-cos-v1)
- **Dimensions**: 384
- **Optimized for**: Question-answering and semantic search tasks
- **Multilingual**: Supports 100+ languages

### Weaviate Schema

```typescript
Collection: Movie
├── title (text, skip vectorization)
├── overview (text, vectorized)
├── genres (text, skip vectorization)
├── releaseDate (text, skip vectorization)
├── voteAverage (number, skip vectorization)
└── popularity (number, skip vectorization)

Vector Index: HNSW
Vectorizer: text2vec-transformers
Source Properties: ["overview"]
```

## Performance

- **Search Speed**: < 5ms for typical queries on 5,000 movies
- **Index Type**: HNSW (optimized for fast approximate nearest neighbor search)
- **Accuracy**: ~98% recall rate with default settings

## Dataset

**TMDB 5000 Movies Dataset**

- Source: [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Size: 5,000 movies
- Fields: title, overview, genres, release date, ratings, popularity
- Location: `data/tmdb_5000_movies.csv`

## Troubleshooting

### Weaviate not starting

```bash
# Check logs
docker-compose logs weaviate

# Ensure ports are not in use
lsof -i :8080
lsof -i :50051

# Increase Docker memory allocation (Docker Desktop)
# Recommended: 4GB minimum
```

### Slow vectorization

The Transformers service uses CPU by default. For faster performance:

1. Enable GPU support by changing `ENABLE_CUDA: '1'` in `docker-compose.yaml`
2. Ensure NVIDIA Docker runtime is installed

### Import fails

```bash
# Check if Weaviate is ready
curl http://localhost:8080/v1/.well-known/ready

# Should return: {"status": "healthy"}
```

## Resources

- [Weaviate Documentation](https://weaviate.io/developers/weaviate)
- [Weaviate TypeScript Client](https://weaviate.io/developers/weaviate/client-libraries/typescript)
- [Sentence Transformers](https://www.sbert.net/)
- [Next.js Documentation](https://nextjs.org/docs)

## License

This project is for educational and demonstration purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Weaviate](https://weaviate.io/) - Open source vector database
- [Sentence Transformers](https://www.sbert.net/) - Text embedding models
- [TMDB](https://www.themoviedb.org/) - Movie dataset
- [Next.js](https://nextjs.org/) - React framework
