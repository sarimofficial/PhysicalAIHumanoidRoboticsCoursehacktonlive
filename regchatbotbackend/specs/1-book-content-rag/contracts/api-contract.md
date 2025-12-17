# API Contract: Integrated RAG Chatbot for Book Content Querying

**Feature**: 1-book-content-rag
**Date**: 2025-12-16
**Version**: 1.0.0

## Overview

This document defines the API contracts for the RAG chatbot backend, specifying endpoints, request/response formats, authentication, and error handling for book content querying.

## Base URL

`https://<your-hosted-domain>/api/v1`

For local development: `http://localhost:8000/api/v1`

## Authentication

This API uses API key authentication via header. Include your API key in all requests:

```
Authorization: Bearer <your-api-key>
```

## Endpoints

### 1. Health Check

**GET** `/health`

#### Description
Check if the service is running and all dependencies are accessible.

#### Parameters
None

#### Request Example
```
GET /api/v1/health
Authorization: Bearer <your-api-key>
```

#### Response
**Success Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-16T10:30:00Z",
  "dependencies": {
    "qdrant": "connected",
    "neon": "connected",
    "groq": "available",
    "cohere": "available"
  }
}
```

### 2. Ingest Book Content

**POST** `/ingest`

#### Description
Upload and process a book file to make it available for querying.

#### Parameters
Form data:
- `file`: File (required) - Book file (PDF, EPUB, HTML, plain text)
- `title`: String (required) - Title of the book
- `author`: String (optional) - Author of the book
- `isbn`: String (optional) - ISBN of the book

#### Request Example
```
POST /api/v1/ingest
Authorization: Bearer <your-api-key>
Content-Type: multipart/form-data

file=@book.pdf&title="Sample Book"&author="Sample Author"
```

#### Response
**Success Response (201 Created):**
```json
{
  "book_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Sample Book",
  "author": "Sample Author",
  "status": "PROCESSING",
  "message": "Book ingestion started successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid file format",
  "message": "Only PDF, EPUB, HTML, and plain text files are supported"
}
```

### 3. Query Book Content

**POST** `/query`

#### Description
Ask questions about book content with dual-mode support (full book or selected text).

#### Request Body
```json
{
  "query": "string (required) - The question about the book content",
  "selected_text": "string or null (optional) - Specific text to use as context instead of full book",
  "book_id": "string (required) - ID of the book to query",
  "session_token": "string (optional) - Session identifier for tracking"
}
```

#### Request Example
```
POST /api/v1/query
Authorization: Bearer <your-api-key>
Content-Type: application/json

{
  "query": "What is the main theme of this book?",
  "selected_text": null,
  "book_id": "550e8400-e29b-41d4-a716-446655440000",
  "session_token": "session-123"
}
```

#### Response
**Success Response (200 OK):**
```json
{
  "response": "The main theme of the book is...",
  "citations": [
    {
      "chunk_id": "chunk-123",
      "page": 42,
      "chapter": "Chapter 5",
      "section": "Introduction",
      "text": "The theme of the book is..."
    }
  ],
  "query_mode": "FULL_BOOK",
  "latency_ms": 1250
}
```

**For selected text mode:**
```json
{
  "response": "Based on the provided text, the concept means...",
  "citations": [],
  "query_mode": "SELECTED_TEXT",
  "latency_ms": 850
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "No relevant content found",
  "message": "The system could not find content relevant to your query in the provided text."
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Book not found",
  "message": "The specified book ID does not exist or is not processed yet."
}
```

### 4. Get Book Status

**GET** `/books/{book_id}/status`

#### Description
Check the processing status of a book after ingestion.

#### Path Parameters
- `book_id`: String (required) - ID of the book to check

#### Request Example
```
GET /api/v1/books/550e8400-e29b-41d4-a716-446655440000/status
Authorization: Bearer <your-api-key>
```

#### Response
**Success Response (200 OK):**
```json
{
  "book_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Sample Book",
  "status": "READY",
  "progress": 100,
  "chunks_count": 45,
  "total_pages": 200
}
```

## Error Handling

The API returns standard HTTP error codes:

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters or body
- `401 Unauthorized` - Missing or invalid authentication
- `404 Not Found` - Resource does not exist
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Rate Limits

- 100 queries per hour per API key
- 10 file uploads per hour per API key

## Data Formats

- Request bodies: `application/json`
- File uploads: `multipart/form-data`
- All timestamps: ISO 8601 format (e.g., "2025-12-16T10:30:00Z")
- All IDs: UUID format
- Text encoding: UTF-8

## Schema Definitions

### Book Object
```json
{
  "id": "string (UUID)",
  "title": "string",
  "author": "string",
  "isbn": "string",
  "status": "enum (PROCESSING, READY, FAILED)",
  "total_pages": "integer",
  "created_at": "string (ISO 8601 timestamp)"
}
```

### Query Response Object
```json
{
  "response": "string - AI-generated response",
  "citations": "array of citation objects",
  "query_mode": "enum (FULL_BOOK, SELECTED_TEXT)",
  "latency_ms": "number - Query processing time in milliseconds"
}
```

### Citation Object
```json
{
  "chunk_id": "string - ID of the content chunk",
  "page": "integer - Page number in the book",
  "chapter": "string - Chapter name",
  "section": "string - Section name",
  "text": "string - Excerpt from the cited content"
}
```