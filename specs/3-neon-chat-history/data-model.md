# Data Model: Neon Chat History

**Date**: 2025-12-16
**Author**: Gemini

This document defines the data models for storing chat history in Neon Serverless Postgres for the Integrated RAG Chatbot feature.

## 1. ChatSession

Represents a unique conversation session between a user and the chatbot.

| Field       | Type        | Description                                       | Constraints      |
|-------------|-------------|---------------------------------------------------|------------------|
| `id`        | `UUID`      | Primary key for the session.                      | PRIMARY KEY, UUID |
| `user_id`   | `TEXT`      | An identifier for the user (e.g., a session ID or anonymous user ID). | NOT NULL       |
| `created_at`| `TIMESTAMPTZ` | Timestamp of when the session was created.        | DEFAULT NOW()    |
| `metadata`  | `JSONB`     | Any additional metadata about the session (e.g., source IP, browser info). | NULLABLE        |

## 2. ChatMessage

Represents a single message within a `ChatSession`, including both user queries and assistant responses.

| Field         | Type        | Description                                       | Constraints      |
|---------------|-------------|---------------------------------------------------|------------------|
| `id`          | `UUID`      | Primary key for the message.                      | PRIMARY KEY, UUID |
| `session_id`  | `UUID`      | Foreign key to the `ChatSession`.                 | FOREIGN KEY (`ChatSession.id`), NOT NULL |
| `role`        | `TEXT`      | The role of the message sender (`user` or `assistant`). | NOT NULL       |
| `content`     | `TEXT`      | The main text content of the message (user query or assistant response). | NOT NULL       |
| `created_at`  | `TIMESTAMPTZ` | Timestamp of when the message was created.        | DEFAULT NOW()    |
| `context_text`| `TEXT`      | (Optional) The user-selected text snippet that accompanied the user's query. | NULLABLE       |
| `metadata`    | `JSONB`     | Any additional metadata about the message (e.g., Qdrant retrieval results). | NULLABLE        |

## Relationships

-   A `ChatSession` has many `ChatMessage`s.
-   A `ChatMessage` belongs to one `ChatSession`.

## Mapping to User's Proposed Tables

The `ChatSession` and `ChatMessage` models described above effectively cover the data storage needs outlined in the user's plan:

*   **`user_queries`**: This data will be stored within `ChatMessage` entries where `role` is `'user'`, `content` is the `user_text`, and `context_text` is the `selected_text`.
*   **`assistant_responses`**: This data will be stored within `ChatMessage` entries where `role` is `'assistant'`, and `content` is the `response_text`.
*   **`conversation_history`**: This is directly represented by the collection of `ChatMessage` entries associated with a `ChatSession`.
