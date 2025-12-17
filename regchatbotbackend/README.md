# Integrated RAG Chatbot for Book Content Querying

This is a production-grade Retrieval-Augmented Generation (RAG) chatbot API that allows users to query book content with strict grounding in the book's text. The system supports two modes: full-book querying and selected-text-only querying with hard isolation.

## Features

- Query book content with strict grounding in provided text
- Dual-mode querying: Full-book or selected-text only
- Proper citations and source attribution
- Zero hallucination rule enforced
- Embeddable in book interfaces

## Prerequisites

- Python 3.11+
- pip package manager
- Git
- Access to the following APIs:
  - Groq API (for LLM inference)
  - Cohere API (for embeddings)
  - Qdrant Cloud (for vector storage)
  - Neon Postgres (for metadata)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project root with your API keys (see `.env.example` for reference)

5. Run the application:
   ```bash
   uvicorn src.api.main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000`

API documentation will be available at `http://localhost:8000/docs`

## Usage

### 1. Ingest a Book

Upload and process a book into the system:

```bash
curl -X POST "http://localhost:8000/ingest" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path/to/your/book.pdf" \
  -F "title=Your Book Title" \
  -F "author=Author Name"
```

### 2. Query Book Content (Full Mode)

Ask questions about the entire book:

```bash
curl -X POST "http://localhost:8000/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the main theme of this book?",
    "selected_text": null
  }'
```

### 3. Query User-Selected Text (Selected Text Mode)

Ask questions about specific text:

```bash
curl -X POST "http://localhost:8000/query" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain this concept in simpler terms",
    "selected_text": "This is the specific text that I want to ask about..."
  }'
```

## Architecture

- **Backend**: FastAPI for HTTP interfaces
- **Vector Storage**: Qdrant Cloud (Free Tier)
- **Metadata Storage**: Neon Serverless Postgres
- **LLM Inference**: Groq API
- **Embeddings**: Cohere API

## API Endpoints

- `GET /health` - Health check
- `POST /ingest` - Upload and process book content
- `POST /query` - Query book content with optional selected_text parameter
- `GET /books/{book_id}/status` - Check processing status of a book

## Testing

Run the tests using pytest:

```bash
pytest
```

For coverage report:

```bash
pytest --cov=src tests/
```

## Development

This project follows specification-driven development using Spec-Kit Plus. All features originate from formal specifications.