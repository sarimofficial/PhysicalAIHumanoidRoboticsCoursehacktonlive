# Data Model: Integrated RAG Chatbot for Book Content Querying

**Feature**: 1-book-content-rag
**Date**: 2025-12-16

## Entity Models

### Book
Represents a single book with metadata and content chunks

**Fields:**
- `id`: UUID (Primary Key)
- `title`: String (required, max 500 characters)
- `author`: String (optional, max 200 characters)
- `isbn`: String (optional, max 13 characters)
- `total_pages`: Integer (optional)
- `word_count`: Integer (optional)
- `created_at`: DateTime (auto-generated)
- `updated_at`: DateTime (auto-generated)
- `status`: Enum (PROCESSING, READY, FAILED) - indicates ingestion status
- `storage_location`: String (path or URL to original file)

**Relationships:**
- One-to-many with ContentChunk (via book_id foreign key)

### ContentChunk
Represents a chunk of book content with vector embeddings for retrieval

**Fields:**
- `id`: UUID (Primary Key)
- `book_id`: UUID (Foreign Key to Book)
- `chunk_text`: Text (the actual content of the chunk)
- `chunk_metadata`: JSONB (page, chapter, section, etc.)
- `chunk_order`: Integer (order of this chunk in the document)
- `embedding_id`: String (ID in vector database for Qdrant)
- `created_at`: DateTime (auto-generated)

**Relationships:**
- Many-to-one with Book (via book_id foreign key)

### QuerySession
Represents a single interaction session between user and chatbot

**Fields:**
- `id`: UUID (Primary Key)
- `session_token`: String (unique identifier for the session)
- `created_at`: DateTime (auto-generated)
- `expires_at`: DateTime (when this session expires)
- `query_count`: Integer (number of queries in this session)

### TextSelection
Represents user-selected text for focused querying

**Fields:**
- `id`: UUID (Primary Key)
- `session_id`: UUID (Foreign Key to QuerySession)
- `selected_text`: Text (the actual selected text)
- `context_before`: Text (optional, context before selection)
- `context_after`: Text (optional, context after selection)
- `selection_metadata`: JSONB (where in the book the text was selected from)
- `created_at`: DateTime (auto-generated)

**Relationships:**
- Many-to-one with QuerySession (via session_id foreign key)

### Response
Contains the AI-generated answer with citations to source content

**Fields:**
- `id`: UUID (Primary Key)
- `session_id`: UUID (Foreign Key to QuerySession)
- `query_text`: Text (the original query from the user)
- `response_text`: Text (the AI-generated response)
- `source_citations`: JSONB (list of source chunks/locations referenced in the response)
- `query_mode`: Enum (FULL_BOOK, SELECTED_TEXT) - indicates which mode was used
- `query_timestamp`: DateTime (when the query was made)
- `response_tokens`: Integer (number of tokens in the response)
- `query_latency`: Float (time in seconds for the query to complete)

**Relationships:**
- Many-to-one with QuerySession (via session_id foreign key)

### Embedding
Represents the vector representation of content chunks for retrieval

**Note:** This represents the data structure for the vector database (Qdrant) rather than Postgres

**Fields in Qdrant Collection:**
- `id`: String (unique identifier for the vector record)
- `vector`: List[float] (the embedding vector, typically 384-4096 dimensions depending on model)
- `payload`: Object (metadata including book_id, chunk_id, page, chapter, etc.)

## Database Schema (Neon Postgres)

```sql
-- Books table
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    author VARCHAR(200),
    isbn VARCHAR(13),
    total_pages INTEGER,
    word_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'PROCESSING',
    storage_location TEXT
);

-- Content chunks table
CREATE TABLE content_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    chunk_text TEXT NOT NULL,
    chunk_metadata JSONB,
    chunk_order INTEGER NOT NULL,
    embedding_id VARCHAR(255) NOT NULL, -- ID in Qdrant
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Query sessions table
CREATE TABLE query_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    query_count INTEGER DEFAULT 0
);

-- Text selections table
CREATE TABLE text_selections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES query_sessions(id) ON DELETE CASCADE,
    selected_text TEXT NOT NULL,
    context_before TEXT,
    context_after TEXT,
    selection_metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Responses table
CREATE TABLE responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES query_sessions(id) ON DELETE CASCADE,
    query_text TEXT NOT NULL,
    response_text TEXT NOT NULL,
    source_citations JSONB,
    query_mode VARCHAR(15) NOT NULL, -- 'FULL_BOOK' or 'SELECTED_TEXT'
    query_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response_tokens INTEGER,
    query_latency FLOAT
);
```

## Vector Database Schema (Qdrant)

```json
{
  "collection_name": "book_chunks",
  "vector_size": 1536,
  "distance": "Cosine",
  "payload_schema": {
    "book_id": {
      "type": "keyword"
    },
    "chunk_id": {
      "type": "keyword"
    },
    "page_number": {
      "type": "integer"
    },
    "chapter": {
      "type": "keyword"
    },
    "section": {
      "type": "keyword"
    },
    "created_at": {
      "type": "integer"
    }
  }
}
```

## Relationships and Constraints

1. **Book to ContentChunks**: One-to-many (one book has many content chunks)
   - Foreign key: `content_chunks.book_id` references `books.id`
   - Cascade delete: When a book is deleted, all its chunks are deleted

2. **QuerySession to TextSelections**: One-to-many
   - Foreign key: `text_selections.session_id` references `query_sessions.id`
   - Cascade delete: When a session is deleted, all its selections are deleted

3. **QuerySession to Responses**: One-to-many
   - Foreign key: `responses.session_id` references `query_sessions.id`
   - Cascade delete: When a session is deleted, all its responses are deleted

## Indexing Strategy

1. **Books table**:
   - Index on `title` for search operations
   - Index on `status` for filtering by ingestion status

2. **ContentChunks table**:
   - Index on `book_id` for efficient retrieval of chunks by book
   - Index on `chunk_order` for maintaining sequence

3. **QuerySessions table**:
   - Index on `session_token` for quick session lookups
   - Index on `expires_at` for cleanup operations

4. **TextSelections table**:
   - Index on `session_id` for retrieving selections by session

5. **Responses table**:
   - Index on `session_id` for retrieving responses by session
   - Index on `query_mode` for analyzing usage patterns