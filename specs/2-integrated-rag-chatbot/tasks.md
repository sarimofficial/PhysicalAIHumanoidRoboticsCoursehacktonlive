# Tasks: Integrated RAG Chatbot

**Input**: Design documents from `specs/2-integrated-rag-chatbot/`
**Prerequisites**: plan.md, spec.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the backend.

- [X] T001 Create backend project structure in `backend/` directory.
- [x] T002 Initialize Python project with a `uv init` in `backend/`.
- [X] T003 [P] Add FastAPI, uvicorn, and other core dependencies to `backend/pyproject.toml` using `uv add`.
- [X] T004 [P] Create initial FastAPI app in `backend/src/main.py`.
- [X] T005-A [P] Create `.env` file documenting all required environment variables.
- [X] T005 [P] Configure environment variable loading from `.env` in `backend/src/core/config.py` using a typed settings class.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core services and data ingestion pipeline that both user stories depend on.

- [X] T006 [P] Implement Qdrant service for vector DB interactions in `backend/src/services/qdrant_service.py`.
- [X] T007 [P] Implement schemas for API requests/responses in `backend/src/models/schemas.py`.
- [X] T008 Implement the book ingestion service in `backend/src/services/ingestion_service.py`. This includes chunking and embedding logic.
- [X] T009 Create a script to run the ingestion service (e.g., in `backend/scripts/ingest.py`).

---

## Phase 3: User Story 1 - Core RAG Chatbot (Priority: P1) 🎯 MVP

**Goal**: Implement the core chatbot functionality for answering questions based on the entire book.

**Independent Test**: A user can ask a question in the chat interface and receive a relevant answer sourced from the book's content.

### Implementation for User Story 1

- [X] T010 [US1] Implement the agent service in `backend/src/services/agent_service.py` to handle the OpenAI Agent SDK logic.
- [X] T011 [US1] Create the chat API endpoint in `backend/src/api/chat.py` to handle `POST /api/chat` requests for full-book queries.
- [X] T012 [US1] Integrate the agent service and Qdrant service within the chat endpoint.
- [X] T013 [P] [US1] Create the basic `ChatbotWidget.jsx` component in `book/src/components/ChatbotWidget.jsx`.
- [X] T014 [US1] Integrate the `ChatbotWidget.jsx` with the Docusaurus layout to render it on book pages.
- [X] T015 [US1] Implement the frontend logic in `ChatbotWidget.jsx` to call the backend API and display the response.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Selected-Text Chat (Priority: P2)

**Goal**: Allow users to ask questions about a specific passage of selected text.

**Independent Test**: A user can select text, ask a question about it, and receive an answer based only on that selection.

### Implementation for User Story 2

- [X] T016 [US2] Implement the frontend mechanism to capture selected text and trigger the contextual chat UI in `book/src/theme/Layout/index.js` or a similar global component.
- [X] T017 [US2] Update `ChatbotWidget.jsx` to handle the "selected text" mode and send the selected text to the backend.
- [X] T018 [US2] Extend the `POST /api/chat` endpoint in `backend/src/api/chat.py` to accept and process the `selected_text`.
- [X] T019 [US2] Modify the agent service in `backend/src/services/agent_service.py` to prioritize the selected text as context when it's provided.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect the overall feature.

- [X] T020 [P] Implement comprehensive error handling and logging across the backend.
- [X] T021 [P] Enhance the `ChatbotWidget.jsx` with loading, empty, and error states.
- [X] T022 [P] Write a `quickstart.md` document explaining how to set up and run the chatbot locally.
- [X] T023 [P] Add API documentation for the `/api/chat` endpoint.

---

## Dependencies & Execution Order

- **Setup (Phase 1)** must be completed before anything else.
- **Foundational (Phase 2)** depends on Setup. It blocks all user story implementation.
- **User Story 1 (Phase 3)** depends on the Foundational phase.
- **User Story 2 (Phase 4)** depends on the Foundational phase. It can be worked on in parallel with User Story 1, but it has a clear UI dependency on the widget from US1.
- **Polish (Phase 5)** can be done after the core user stories are complete.

## Implementation Strategy

1.  **MVP First**: Complete Phases 1, 2, and 3 to deliver the core full-book chatbot.
2.  **Incremental Delivery**: After the MVP is validated, complete Phase 4 to add the selected-text feature.
3.  **Polish**: Finalize the feature by completing Phase 5.
