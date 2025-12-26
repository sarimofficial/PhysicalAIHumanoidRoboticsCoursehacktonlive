# Implementation Plan: Neon Chat History

**Branch**: `3-neon-chat-history` | **Date**: 2025-12-16 | **Spec**: [specs/3-neon-chat-history/spec.md](specs/3-neon-chat-history/spec.md)
**Input**: Feature specification from `specs/3-neon-chat-history/spec.md`

## Summary

This plan outlines the integration of Neon Serverless Postgres into the existing RAG Chatbot system to store and retrieve user queries, selected text references, and chat history. This will ensure conversation continuity and provide more contextually relevant answers by leveraging past interactions.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: FastAPI, Neon-Python-Driver, asyncpg, SQLAlchemy (async)
**Storage**: Neon Serverless Postgres
**Testing**: Pytest
**Target Platform**: Web
**Project Type**: Web Application (Backend)
**Performance Goals**: Average response time for historical retrieval (excluding LLM generation) is less than 500ms.
**Constraints**: Must operate within Neon free tier.
**Scale/Scope**: Chat history for all users of the book.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The plan adheres to the project constitution (Version: 0.1.0).
- **Accuracy**: The use of a robust database like Neon will ensure accurate storage and retrieval of chat history.
- **Clarity**: The plan is structured to maintain clarity in the data flow for chat history.
- **Reproducibility**: The database setup and integration steps will be clearly documented to ensure reproducibility.
- **Rigor**: Utilizing established database practices and async database clients aligns with industry standards.

## Project Structure

### Documentation (this feature)

```text
specs/3-neon-chat-history/
├── plan.md              # This file
├── research.md          # (To be created if needed)
├── data-model.md        # Phase 1 output
├── quickstart.md        # (To be created if needed)
├── contracts/           # (To be created if needed)
└── tasks.md             # (To be created by /sp.tasks)
```

### Source Code (repository root)

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
│   │   ├── qdrant_service.py
│   │   └── chat_history_service.py  # NEW
│   └── models/
│       ├── schemas.py
│       └── database.py              # NEW
└── tests/
```

**Structure Decision**: The existing `backend` directory structure will be extended. A new `chat_history_service.py` will encapsulate interactions with Neon Postgres for chat history. A `database.py` file will manage database connection, session, and ORM models.

## Milestones & Task Breakdown (from User Input)

### 1. Database Setup
- Create a Neon Serverless Postgres database.
- Define tables for:
    a. `user_queries`: id, user_text, selected_text, timestamp
    b. `assistant_responses`: id, query_id, response_text, timestamp
    c. `conversation_history`: id, user_id/session_id, message, role (user/assistant), timestamp

### 2. Backend Integration
- Use FastAPI with async database client (e.g., asyncpg or SQLAlchemy async) to connect to Neon DB.
- Implement functions to:
    a. Save user queries and selected text into Neon DB.
    b. Save assistant responses linked to the corresponding user query.
    c. Optionally, fetch previous queries/responses for context.

### 3. RAG Agent Adjustment
- Keep Qdrant retrieval intact for book content.
- After fetching response from the agent, store both user query and assistant response in Neon DB.

### 4. Frontend
- No major changes needed; frontend already sends selected text or user queries via API.

### 5. Testing
- Test that each user query and AI response is stored correctly in Neon DB.
- Test retrieval from Neon DB for past context if needed.
- Ensure no existing chat or RAG functionality breaks.

### 6. Deployment
- Ensure environment variables for Neon DB connection are set securely.
- Verify RAG chatbot works end-to-end with Neon DB logging enabled.

## Complexity Tracking

No constitution check violations.
