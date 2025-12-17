---

description: "Task list for implementing the Integrated RAG Chatbot for Book Content Querying"
---

# Tasks: Integrated RAG Chatbot for Book Content Querying

**Input**: Design documents from `/specs/1-book-content-rag/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

### Tests for this feature (OPTIONAL - included per testing strategy in research.md) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T001 [P] Contract test for health endpoint in backend/tests/contract/test_health.py
- [X] T002 [P] Contract test for ingest endpoint in backend/tests/contract/test_ingest.py
- [X] T003 [P] Contract test for query endpoint in backend/tests/contract/test_query.py

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T004 Create project structure per implementation plan in backend/
- [X] T005 Initialize Python project with FastAPI dependencies in backend/requirements.txt
- [ ] T006 [P] Configure linting and formatting tools (pylint, black, mypy) in backend/.pylintrc
- [X] T007 Create .env file with credential placeholders in backend/.env
- [X] T008 Create README.md with setup instructions from quickstart.md in backend/README.md
- [X] T009 Create main.py entry point in backend/main.py
- [X] T010 Setup testing framework (pytest) with 80%+ coverage target in backend/pyproject.toml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T011 Setup database schema and migrations framework using Neon Postgres in backend/src/models/
- [X] T012 [P] Create database connection utilities in backend/src/utils/database.py
- [X] T013 [P] Setup Qdrant vector database integration in backend/src/utils/vector_db.py
- [X] T014 [P] Create API key authentication framework in backend/src/api/middleware/auth.py
- [X] T015 Create base models/entities that all stories depend on in backend/src/models/
- [X] T016 Configure error handling and logging infrastructure in backend/src/api/middleware/error_handler.py
- [X] T017 Setup environment configuration management in backend/src/config/settings.py
- [X] T018 Create API rate limiting middleware in backend/src/api/middleware/rate_limiter.py
- [X] T019 Create input sanitization utilities in backend/src/utils/sanitizer.py
- [ ] T020 Setup dependency injection container in backend/src/dependency_injection/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Query Book Content (Priority: P1) 🎯 MVP

**Goal**: Enable readers to ask questions about book content and get accurate answers based on the book's text with proper citations

**Independent Test**: Can be fully tested by uploading a sample book, asking questions about its content, and verifying the answers are accurate and grounded in the book text.

### Tests for User Story 1 (OPTIONAL - included per testing strategy) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T021 [P] [US1] Integration test for full-book querying flow in backend/tests/integration/test_full_book_query.py
- [X] T022 [P] [US1] Unit test for Groq API integration in backend/tests/unit/test_generation_service.py

### Implementation for User Story 1

- [X] T023 [P] [US1] Create Book model in backend/src/models/book.py
- [X] T024 [P] [US1] Create ContentChunk model in backend/src/models/content_chunk.py
- [X] T025 [P] [US1] Create Response model in backend/src/models/response.py
- [X] T026 [P] [US1] Create QuerySession model in backend/src/models/query_session.py
- [X] T027 [US1] Implement IngestionService in backend/src/services/ingestion_service.py
- [X] T028 [US1] Implement EmbeddingService with Cohere integration in backend/src/services/embedding_service.py
- [X] T029 [US1] Implement RetrievalService with Qdrant integration in backend/src/services/retrieval_service.py
- [X] T030 [US1] Implement GenerationService with Groq integration in backend/src/services/generation_service.py
- [X] T031 [US1] Implement POST /ingest endpoint in backend/src/api/routes/ingest.py
- [X] T032 [US1] Implement POST /query endpoint in backend/src/api/routes/query.py
- [ ] T033 [US1] Add dual-mode querying logic (full-book vs selected-text) in backend/src/services/query_service.py
- [ ] T034 [US1] Add response attribution/citations in backend/src/services/response_service.py
- [X] T035 [US1] Add zero hallucination rule enforcement in backend/src/services/generation_service.py
- [X] T036 [US1] Add validation and error handling for US1 endpoints
- [ ] T037 [US1] Add logging for user story 1 operations

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Query User-Selected Text (Priority: P2)

**Goal**: Allow users to select specific text from a book and ask questions only about that selected text, ensuring focused answers without interference from the rest of the book

**Independent Test**: Can be tested by selecting a portion of text in a book, asking questions about that specific selection, and verifying answers only come from the selected text.

### Tests for User Story 2 (OPTIONAL - included per testing strategy) ⚠️

- [X] T038 [P] [US2] Integration test for selected-text querying flow in backend/tests/integration/test_selected_text_query.py
- [X] T039 [P] [US2] Unit test for dual-mode isolation verification in backend/tests/unit/test_query_isolation.py

### Implementation for User Story 2

- [X] T040 [P] [US2] Create TextSelection model in backend/src/models/text_selection.py
- [ ] T041 [US2] Implement selected-text only mode in backend/src/services/query_service.py
- [ ] T042 [US2] Ensure complete bypass of Qdrant when selected_text provided in backend/src/services/retrieval_service.py
- [X] T043 [US2] Update POST /query endpoint to handle selected_text parameter in backend/src/api/routes/query.py
- [ ] T044 [US2] Add validation to ensure selected-text mode bypasses book content in backend/src/services/query_service.py
- [ ] T045 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Embed Chatbot in Book Interface (Priority: P3)

**Goal**: Enable content creators to embed the chatbot in their published book so that readers can interact with it seamlessly without leaving the reading experience

**Independent Test**: Can be tested by embedding the chatbot in a sample book interface and verifying the interaction is smooth and intuitive for readers.

### Tests for User Story 3 (OPTIONAL - included per testing strategy) ⚠️

- [X] T046 [P] [US3] Integration test for embedding scenario in backend/tests/integration/test_embeddability.py
- [X] T047 [P] [US3] API endpoint test for embedding widget in backend/tests/contract/test_embed_api.py

### Implementation for User Story 3

- [X] T048 [P] [US3] Create embedding utilities in backend/src/utils/embedding_generator.py
- [X] T049 [US3] Implement session management for embedding contexts in backend/src/services/session_service.py
- [X] T050 [US3] Implement GET /books/{book_id}/status endpoint in backend/src/api/routes/status.py
- [X] T051 [US3] Add API documentation for embedding usage in backend/src/api/main.py
- [X] T052 [US3] Create response formatting for embedding scenarios in backend/src/services/response_formatter.py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T053 [P] Documentation updates in backend/docs/
- [ ] T054 Code cleanup and refactoring
- [ ] T055 Performance optimization across all stories to meet <500ms retrieval requirement
- [ ] T056 [P] Additional unit tests to achieve 80%+ coverage in backend/tests/unit/
- [ ] T057 Security hardening based on constitution requirements
- [X] T058 Run quickstart.md validation in backend/
- [ ] T059 Setup deployment configuration for Render/Railway/Fly.io in backend/
- [X] T060 Create comprehensive API documentation in backend/docs/api.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for health endpoint in backend/tests/contract/test_health.py"
Task: "Contract test for ingest endpoint in backend/tests/contract/test_ingest.py"

# Launch all models for User Story 1 together:
Task: "Create Book model in backend/src/models/book.py"
Task: "Create ContentChunk model in backend/src/models/content_chunk.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence