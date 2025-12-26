# Data Model: Integrated RAG Chatbot

**Date**: 2025-12-16
**Author**: Gemini

This document defines the data models for the key entities involved in the Integrated RAG Chatbot feature. These models will be implemented using Neon Serverless Postgres.

## 1. ChatSession

Represents a single conversation between a user and the chatbot.

| Field       | Type      | Description                                       |
|-------------|-----------|---------------------------------------------------|
| `id`          | `UUID`    | Primary key for the session.                      |
| `user_id`     | `TEXT`    | An identifier for the user (e.g., a session ID).  |
| `created_at`  | `TIMESTAMPTZ` | Timestamp of when the session was created.        |
| `metadata`    | `JSONB`   | Any additional metadata about the session.        |

## 2. ChatMessage

Represents a single message within a `ChatSession`.

| Field         | Type        | Description                                       |
|---------------|-------------|---------------------------------------------------|
| `id`            | `UUID`      | Primary key for the message.                      |
| `session_id`    | `UUID`      | Foreign key to the `ChatSession`.                 |
| `role`          | `TEXT`      | The role of the message sender (`user` or `assistant`). |
| `content`       | `TEXT`      | The text of the message.                          |
| `created_at`    | `TIMESTAMPTZ` | Timestamp of when the message was created.        |
| `context_text`  | `TEXT`      | (Optional) The user-selected text snippet.        |
| `metadata`      | `JSONB`     | Any additional metadata about the message.        |

## 3. BookContentChunk

Represents a chunk of the book's text used for embeddings. This data is primarily stored and managed in Qdrant, but metadata might be stored in Postgres for reference.

| Field       | Type   | Description                                           |
|-------------|--------|-------------------------------------------------------|
| `id`          | `UUID` | Primary key for the chunk (matches the ID in Qdrant). |
| `book_id`     | `TEXT` | An identifier for the book.                           |
| `chapter_id`  | `TEXT` | An identifier for the chapter.                        |
| `chunk_text`  | `TEXT` | The text content of the chunk.                        |
| `metadata`    | `JSONB`| Any additional metadata (e.g., page number).          |

## Relationships

- A `ChatSession` has many `ChatMessage`s.
- A `ChatMessage` belongs to one `ChatSession`.
