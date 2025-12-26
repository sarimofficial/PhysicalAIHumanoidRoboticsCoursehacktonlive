# Implementation Plan: Integrated RAG Chatbot

**Branch**: `2-integrated-rag-chatbot` | **Date**: 2025-12-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/2-integrated-rag-chatbot/spec.md`

## Summary

This plan outlines the implementation of an integrated Retrieval-Augmented Generation (RAG) chatbot within the AI robotics book. The chatbot will leverage a predefined technology stack—including Google Gemini, Cohere embeddings, the OpenAI Agent SDK, FastAPI, Neon Serverless Postgres, and Qdrant Cloud—to answer user questions based on the book's content.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: FastAPI, OpenAI Agent SDK, Cohere, Qdrant-client, Neon-Python-Driver
**Storage**: Neon Serverless Postgres (for chat history/sessions), Qdrant Cloud (for vector embeddings)
**Testing**: Pytest
**Target Platform**: Web (embedded in Docusaurus site)
**Project Type**: Web Application (Backend + Frontend components)
**Performance Goals**: Average response time < 5 seconds.
**Constraints**: Must operate within the free tiers of Qdrant Cloud and Neon.
**Scale/Scope**: The chatbot will serve all readers of the online book.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The plan adheres to the project constitution. All technical choices are justified by the goal of creating a high-quality, interactive learning experience. The implementation will be accurate, clear, and reproducible.

## Project Structure

### Documentation (this feature)

```text
specs/2-integrated-rag-chatbot/
├── plan.md              # This file
├── research.md          # Research on the tech stack
├── data-model.md        # Data models for Postgres
├── quickstart.md        # (To be created)
└── contracts/           # (To be created)
```

### Source Code (repository root)

The project will follow a web application structure with a separate backend and frontend.

```text
backend/
├── src/
│   ├── main.py
│   ├── api/
│   │   └── chat.py
│   ├── core/
│   │   ├── config.py
│   │   └── dependencies.py
│   ├── services/
│   │   ├── agent_service.py
│   │   ├── ingestion_service.py
│   │   └── qdrant_service.py
│   └── models/
│       └── schemas.py
└── tests/

Book/ (This will be integrated into the existing `book` docusaurus project)
├── src/
│   ├── components/
│   │   ├── ChatbotWidget.jsx
│   │   └── ChatbotWidget.module.css
```

**Structure Decision**: A dedicated `backend` directory will contain the FastAPI application, cleanly separating it from the existing Docusaurus frontend (`book` directory). The chatbot's React component will be added to the Docusaurus project.

## Architecture Overview

The architecture is a classic RAG pipeline:

```text
  [Frontend (Docusaurus)]
           |
           v
  [FastAPI Backend] -- (Chat Session/History) --> [Neon Postgres]
           |
           v
  [OpenAI Agent SDK]
           |
           v (Retrieval Request)
  [Qdrant Service] -- (Similarity Search) --> [Qdrant Cloud]
           |
           v (Retrieved Chunks)
  [OpenAI Agent SDK] -- (Grounded Prompt) --> [Google Gemini]
           |
           v (Generated Answer)
  [FastAPI Backend]
           |
           v
  [Frontend (Docusaurus)]
```

## Data Flow & RAG Logic

1.  **Book Ingestion (Offline Process)**:
    *   A script will read the book's content (from sitemap.xml file).
    *   **Chunking Strategy**: Text will be split into chunks of ~512 tokens with an overlap of ~64 tokens.
    *   **Embedding Generation**: Each chunk will be converted into a vector embedding using a Cohere model.
    *   **Storage**: The embeddings and their corresponding text chunks will be stored in a Qdrant collection.
    *   **Qdrant Collection Schema**: Each point in Qdrant will have a vector and a payload containing the `chunk_text`, `book_id`, `chapter_id`, and `page_number`.

2.  **Query Handling (Online Process)**:
    *   **Full-Book Queries**: The user's question is embedded using the same Cohere model. The top-k (e.g., k=5) most similar chunks are retrieved from Qdrant.
    *   **Selected-Text Queries**: The user's question AND the selected text are combined and embedded. The retrieval is performed on this combined query, ensuring the retrieved context is relevant to both the question and the selection. Alternatively, the selected text itself can be used as the primary context, bypassing Qdrant for that specific query. The agent will be instructed to only use the provided text.

## OpenAI Agent SDK Design

-   **Agent Responsibilities**:
    -   Orchestrate the RAG flow.
    -   Receive the user's query from the FastAPI backend.
    -   Use a "retrieval" tool to fetch context from the Qdrant service.
    -   Construct a prompt for Gemini that includes the user's question and the retrieved context.
-   **System Prompt**: "You are a helpful assistant for the book 'Physical AI & Humanoid Robotics'. Answer the user's question based *only* on the provided context. If the answer is not in the context, say that you cannot answer."
-   **Context Injection**: The retrieved text chunks will be formatted and inserted into the prompt as the context.
-   **Grounding**: The system prompt explicitly instructs the agent to use only the provided context.
-   **Fallback**: When the answer is not in the context, the agent will respond with a predefined message.
-   **Gemini Invocation**: The OpenAI Agent SDK will be configured to use a custom gemini llm.

## Backend API Plan (FastAPI)

-   **Endpoint**: `POST /api/chat`
    -   **Purpose**: To handle all chat interactions.
    -   **Request**:
        ```json
        {
          "session_id": "optional-uuid",
          "message": "User's question",
          "context_mode": "full_book" | "selected_text",
          "selected_text": "optional-text"
        }
        ```
    -   **Response**:
        ```json
        {
          "session_id": "uuid",
          "response": "Chatbot's answer"
        }
        ```
-   **Chat Session Handling**: If a `session_id` is provided, the chat history will be loaded from Neon. If not, a new session is created.
-   **Error Handling**: The API will handle errors from the agent, external APIs, and the database, returning appropriate HTTP status codes.

## Frontend Integration Plan

-   **Chat UI States**: The `ChatbotWidget.jsx` component will manage states for `loading`, `empty` (initial state), `error`, and `conversation`.
-   **Selected-Text Capture**: JavaScript will be used to capture the selected text on the page and pass it to the chat widget. A small pop-up or button could appear near the selected text to trigger the contextual chat.
-   **Context Mode Switching**: The chat widget will have a mechanism (e.g., a toggle or a specific button) to switch between full-book and selected-text queries.

## Milestones & Task Breakdown

### P1: Core RAG Chatbot (Entire Book)
1.  Set up FastAPI backend and Neon database.
2.  Implement the book ingestion pipeline (chunking, embedding, storing in Qdrant).
3.  Create the Qdrant service for retrieval.
4.  Implement the core agent logic with the OpenAI SDK.
5.  Build the `POST /api/chat` endpoint for full-book queries.
6.  Develop the basic `ChatbotWidget.jsx` frontend component.

### P2: Selected-Text Contextual RAG
1.  Implement the frontend mechanism to capture selected text.
2.  Update the `ChatbotWidget.jsx` to handle the "selected text" mode.
3.  Extend the `/api/chat` endpoint to accept and process selected text.
4.  Modify the agent's logic to prioritize the selected text as context.

## Risks & Mitigations

-   **Gemini Latency/Quotas**:
    -   **Risk**: High latency or hitting API rate limits.
    -   **Mitigation**: Implement caching for common questions. Optimize prompt size.
-   **Cohere Embedding Limits**:
    -   **Risk**: Hitting free tier limits during the initial bulk ingestion.
    -   **Mitigation**: Process the book in batches.
-   **Qdrant Free-Tier Constraints**:
    -   **Risk**: The free tier may have limitations on storage or concurrent requests.
    -   **Mitigation**: Monitor usage closely. Design the ingestion process to be efficient.
-   **Context Leakage/Hallucination**:
    -   **Risk**: The chatbot might generate answers not strictly based on the provided context.
    -   **Mitigation**: Strict system prompt engineering. Implement a final "grounding check" step to verify the answer against the source chunks.
