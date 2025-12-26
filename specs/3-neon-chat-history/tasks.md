# Tasks: Neon Chat History Integration

**Input**: Design documents from `specs/3-neon-chat-history/`
**Prerequisites**: plan.md, spec.md, data-model.md

## Format: `- [ ] [TaskID] [P?] [Story?] Description with file path`

## Phase 1: Setup

**Purpose**: Initial project configuration for database integration.

- [X] T001 Add `asyncpg` and `SQLAlchemy[asyncio]` to `backend/pyproject.toml` for async Neon DB interaction.
- [X] T002 Update `backend/src/core/config.py` with Neon DB connection settings (e.g., `NEON_DATABASE_URL`).

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core database setup and ORM models.

- [X] T003 Create `backend/src/models/database.py` for SQLAlchemy ORM setup, engine, session, and base declaration.
- [X] T004 Define `ChatSession` and `ChatMessage` ORM models in `backend/src/models/database.py`.
- [X] T005 Implement a service to initialize the database (create tables) in `backend/src/services/chat_history_service.py`.

## Phase 3: User Story 1 - Persist Chat History (Priority: P1)

**Goal**: Implement saving and retrieving chat conversations to/from Neon DB.

**Independent Test**: A user can initiate a chat, send messages, close and reopen the chat, and see their previous messages.

- [X] T006 [US1] Implement `create_session` function in `backend/src/services/chat_history_service.py` to create a new chat session.
- [X] T007 [US1] Implement `save_message` function in `backend/src/services/chat_history_service.py` to save user and assistant messages.
- [X] T008 [US1] Implement `get_history` function in `backend/src/services/chat_history_service.py` to retrieve chat history for a given session.
- [X] T009 [US1] Update `backend/src/models/schemas.py` to include `session_id` in `ChatRequest` and `ChatResponse`, and modify `ChatResponse` to return full history.
- [X] T010 [US1] Integrate `chat_history_service` into `backend/src/api/chat.py` to handle `session_id`, create sessions, save messages, and retrieve history.
- [X] T011 [US1] Modify `ChatbotWidget.jsx` to pass `session_id` to the backend and display retrieved history on load.

## Phase 4: User Story 2 - Contextual Retrieval from History (Priority: P2)

**Goal**: Enable the chatbot to use past conversation history for more contextual responses.

**Independent Test**: A user can ask a follow-up question that relies on previous context, and the chatbot's response reflects an understanding of that history.

- [X] T012 [US2] Implement `get_contextual_history` function in `backend/src/services/chat_history_service.py` to retrieve relevant past messages for context.
- [X] T013 [US2] Modify `backend/src/services/agent_service.py` to fetch contextual history (if available for a session) and incorporate it into the LLM prompt.

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improve robustness, documentation, and testability.

- [X] T014 [P] Add necessary environment variables (e.g., `NEON_DATABASE_URL`) to `.env.example` and `backend/src/core/config.py`.
- [X] T015 [P] Create a script to run database migrations or a simple table creation script in `backend/scripts/`.
- [X] T016 [P] Update `specs/3-neon-chat-history/quickstart.md` with instructions for Neon DB setup, connection string, and migration.
- [X] T017 [P] Add comprehensive error handling and logging for database operations within `chat_history_service.py`.
- [X] T018 [P] Write integration tests for chat history persistence and retrieval.

## Dependencies & Execution Order

- **Setup (Phase 1)** must be completed first.
- **Foundational (Phase 2)** depends on Setup, and blocks all user story implementation.
- **User Story 1 (Phase 3)** depends on Foundational.
- **User Story 2 (Phase 4)** depends on Foundational and builds upon User Story 1's history persistence.
- **Polish (Phase 5)** can be done after core user stories are complete.

## Implementation Strategy

1.  **MVP First**: Complete Phases 1, 2, and 3 to deliver core chat history persistence and retrieval.
2.  **Incremental Delivery**: After the MVP is validated, complete Phase 4 for contextual history usage.
3.  **Polish**: Finalize the feature by completing Phase 5.
