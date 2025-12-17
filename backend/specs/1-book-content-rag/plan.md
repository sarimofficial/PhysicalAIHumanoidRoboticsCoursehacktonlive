# Implementation Plan: Integrated RAG Chatbot for Book Content Querying

**Branch**: `1-book-content-rag` | **Date**: 2025-12-16 | **Spec**: [Link to spec](spec.md)
**Input**: Feature specification from `/specs/1-book-content-rag/spec.md`

## Summary

Build a production-grade Retrieval-Augmented Generation (RAG) chatbot API that allows users to query book content with strict grounding in the book's text. The system supports two modes: full-book querying and selected-text-only querying with hard isolation. The backend API will be built with FastAPI and integrate with Qdrant Cloud for vector storage, Neon Serverless Postgres for metadata, and Groq API for LLM inference while using Cohere for embeddings.

## Technical Context

**Language/Version**: Python 3.11
**Primary Dependencies**: FastAPI, uvicorn, qdrant-client, cohere, groq, psycopg2-binary, python-dotenv, pydantic
**Storage**: Qdrant Cloud (vector storage), Neon Serverless Postgres (metadata)
**Testing**: pytest with 80%+ coverage
**Target Platform**: Linux server (deployable on Render, Railway, or Fly.io)
**Project Type**: Single project backend API
**Performance Goals**: <500ms retrieval latency, <2s end-to-end response time
**Constraints**: Stay within free-tier limits (Qdrant 1GB, Neon 0.5GB), handle books up to 500 pages, support user-selected text up to 1MB
**Scale/Scope**: Support up to 10 concurrent users (as specified in feature spec)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Constitution Compliance Verification:
- ✅ Specification-Driven Development: All system behavior originates from formal specs defined with Spec-Kit Plus
- ✅ AI-Assisted Engineering: Qwen CLI used for code generation, refactoring, debugging, and test creation
- ✅ Grounded Accuracy: Zero hallucination rule enforced - responses derived exclusively from retrieved book chunks or user-selected text
- ✅ Vendor Independence: Using Groq API only (no OpenAI), with Cohere for embeddings as allowed
- ✅ User-Centric Embedding: API designed for easy embedding in book interfaces with dual-mode querying support

### Gates:
- All constitutional principles must pass before implementation
- Prohibited actions (OpenAI usage, hallucinated answers) must be strictly avoided
- Technology stack must comply with standards (Groq API, FastAPI, Qdrant Cloud, Neon Postgres)

## Project Structure

### Documentation (this feature)

```text
specs/1-book-content-rag/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/
│   │   ├── book.py
│   │   ├── query_session.py
│   │   ├── text_selection.py
│   │   ├── response.py
│   │   └── embedding.py
│   ├── services/
│   │   ├── ingestion_service.py
│   │   ├── retrieval_service.py
│   │   ├── generation_service.py
│   │   └── embedding_service.py
│   ├── api/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── ingest.py
│   │   │   └── query.py
│   │   └── middleware/
│   │       └── security.py
│   └── utils/
│       ├── chunker.py
│       └── sanitizer.py
├── tests/
│   ├── unit/
│   ├── integration/
│   └── contract/
├── .env
├── requirements.txt
├── README.md
└── main.py
```

**Structure Decision**: Backend-only API implementation to support later embedding in Docusaurus-based books. This follows the "Single project" structure but organized as a backend service. The API will be designed for easy embedding with JavaScript widgets or iframe integration.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitutional violations identified. All requirements align with project constitution.