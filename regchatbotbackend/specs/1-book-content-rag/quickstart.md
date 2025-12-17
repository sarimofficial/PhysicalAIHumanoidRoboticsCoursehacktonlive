# Quickstart Guide: Integrated RAG Chatbot for Book Content Querying

**Feature**: 1-book-content-rag
**Date**: 2025-12-16

## Overview

This guide provides instructions to quickly set up and run the RAG chatbot backend for book content querying. The system enables users to ask questions about book content with strict grounding in the provided text.

## Prerequisites

- Python 3.11+
- pip package manager
- Git (for cloning the repository)
- Access to the following APIs:
  - Groq API (for LLM inference)
  - Cohere API (for embeddings)
  - Qdrant Cloud (for vector storage)
  - Neon Postgres (for metadata)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Environment Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the project root with your API keys:

   ```env
   GROQ_API_KEY=your_groq_api_key_here
   COHERE_API_KEY=JMDi1HWiUcW3eIe0U6OQrYS9Euzlq2iME9prvPEb
   QDRANT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwiZXhwIjoxNzY1OTYwMTA5fQ.b_4bU7KLhvnuHjf9TLnKww23gGBTA843naMsJMXqJVU
   QDRANT_URL=https://76bb6a02-560a-4755-ab29-dc37e3eb4ce8.us-east4-0.gcp.cloud.qdrant.io
   DATABASE_URL=postgresql://neondb_owner:npg_N4FRapDnOV3A@ep-soft-night-ah19a7q5-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```

### 3. Run the Application

1. Start the backend server:
   ```bash
   uvicorn src.api.main:app --reload --port 8000
   ```

2. The API will be available at `http://localhost:8000`

3. API documentation will be available at `http://localhost:8000/docs`

## Basic Usage

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

### 4. Health Check

Verify the system is running:

```bash
curl -X GET "http://localhost:8000/health"
```

## Dual-Mode Querying

The system supports two distinct querying modes:

1. **Full Book Mode**: When `selected_text` is null or not provided, the system:
   - Embeds the query using Cohere
   - Searches Qdrant vector database for relevant book chunks
   - Passes retrieved chunks as context to Groq LLM
   - Responds based on book content

2. **Selected Text Mode**: When `selected_text` is provided, the system:
   - Completely bypasses Qdrant vector database
   - Completely bypasses book metadata
   - Uses only the provided `selected_text` as context for the LLM
   - Responds based solely on the selected text

## Troubleshooting

### Common Issues

1. **API Keys Not Working**:
   - Verify all keys in `.env` file are correct
   - Restart the server after updating `.env` file
   - Ensure `.env` file is in the correct location

2. **Qdrant Connection Errors**:
   - Verify QDRANT_URL and QDRANT_API_KEY in `.env` file
   - Check if Qdrant Cloud is accessible from your network

3. **Database Connection Issues**:
   - Verify DATABASE_URL in `.env` file
   - Ensure Neon Postgres instance is active

4. **Embedding/Query Errors**:
   - Check if Cohere API key is valid
   - Verify Groq API key is valid
   - Ensure you're staying within API rate limits

## Next Steps

1. Integrate the API into your book application
2. Set up proper authentication if needed for your use case
3. Configure production-ready logging and monitoring
4. Implement caching for improved performance