<!-- 
Sync Impact Report:
- Version change: N/A (initial creation) -> 1.0.0
- Added principles: All 5 principles added according to specification
- Added sections: Technology Standards, Retrieval & Answering Rules, Code Quality, Security Requirements, Performance Constraints, System Constraints, Prohibited Actions, Success Criteria
- Templates requiring updates: N/A (initial creation)
- Follow-up TODOs: None
-->
# Integrated RAG Chatbot for Book Content Querying Constitution

## Core Principles

### I. Specification-Driven Development
All system behavior, architecture, and implementation must originate from formal specifications defined using Spec-Kit Plus. No feature may exist without a corresponding spec. This ensures deterministic, testable, and maintainable code that aligns with project requirements.

### II. AI-Assisted Engineering
Qwen CLI is the primary tool for code generation, refactoring, debugging, and test creation. Human-written glue code is allowed but must respect generated specifications. This principle leverages AI capabilities to accelerate development while maintaining structured engineering practices.

### III. Grounded Accuracy (Zero Hallucination Rule)
All responses must be derived exclusively from retrieved book chunks, or explicitly user-selected text. If required information is not present, the system must respond that the answer cannot be found in the provided content. This ensures factual accuracy and prevents misleading users with fabricated information.

### IV. Vendor Independence
OpenAI APIs, SDKs, or keys are strictly forbidden. All LLM inference must use Groq API with Groq-compatible open models. This ensures long-term sustainability and reduces dependency on proprietary solutions while maintaining cost effectiveness.

### V. User-Centric Embedding
The chatbot must be easily embeddable into a published book environment with seamless switching between full-context and selected-text modes. This enables flexible deployment options while maintaining consistent user experience.

## Technology Standards

### LLM Inference
- Provider: Groq API only
- Example model: llama3-70b-8192 or equivalent
- All inference must use open models compatible with Groq API

### Backend
- FastAPI for all HTTP interfaces
- Modern Python web framework with excellent async support
- Automatic API documentation with Swagger/OpenAPI

### Vector Storage
- Qdrant Cloud (Free Tier)
- Similarity: cosine
- Minimum relevance threshold: 0.7
- Designed for efficient retrieval with high precision

### Relational Metadata
- Neon Serverless Postgres (Free Tier)
- Scalable cloud PostgreSQL with serverless pricing
- Used for storing document metadata and user information

### Embeddings
- Efficient open-source embedding models
- Optimized for low latency and small-to-medium corpora
- Designed for optimal retrieval on book content

## Retrieval & Answering Rules

- Retrieval must always precede generation
- Retrieved chunks must be passed verbatim to the generation layer
- No external knowledge may be injected
- Selected-text mode must ignore:
  - vector database
  - metadata
  - global book context

Answer generation must:
- quote or faithfully paraphrase retrieved text
- avoid speculative inference
- preserve original meaning
- provide proper citations when possible

## Code Quality & Engineering Standards

- Modular architecture with clear separation of concerns
- Comprehensive docstrings and README documentation
- Minimum 80% test coverage (pytest or equivalent)
- Deterministic behavior preferred over heuristic behavior
- Clean, well-documented code with consistent formatting
- Type hints for all function signatures

## Security Requirements

- All secrets stored in `.env` files
- No API keys committed to version control
- Input sanitization for all user queries
- Rate-limiting on public endpoints
- SQL injection prevention for database queries
- XSS protection for web interfaces

## Performance Constraints

- Average retrieval latency < 500ms
- Must handle user-selected text up to 1MB
- Efficient chunking to avoid context overflow
- Optimized embedding generation for low latency
- Efficient memory usage for large documents

## System Constraints

- No paid services beyond free tiers
- Qdrant storage limit: 1GB
- Neon database limit: 0.5GB
- Optimized for books under 500 pages
- MVP delivery target: 20–40 development hours

## Prohibited Actions

- Use of OpenAI APIs, SDKs, or keys
- Hallucinated answers
- Silent failure or guessing
- Bypassing retrieval logic
- Overriding specifications
- Committing secrets to version control

## Success Criteria

- ≥95% precision on evaluation queries
- Correct dual-mode behavior validated by ≥50 test cases
- Successful embedding in a sample HTML book
- All Spec-Kit Plus specs implemented and validated
- Zero critical defects after Qwen CLI review
- Clear, concise, relevant answers suitable for academic readers

## Governance

This constitution governs all development activities for the Integrated RAG Chatbot for Book Content Querying project. All implementation, architecture, and design decisions must align with these principles. Any conflicts between this constitution and other project documentation must be resolved in favor of this constitution.

Amendment Process:
- Changes to this constitution require explicit approval
- New version numbers follow semantic versioning:
  - MAJOR: Principle removals or redefinitions
  - MINOR: New principles or material expansions
  - PATCH: Clarifications, wording, or typo fixes
- All amendments must include a migration plan for existing implementations

Compliance Review:
- Weekly reviews to verify adherence to constitutional principles
- All pull requests must demonstrate compliance with this constitution
- Technical debt must be justified against constitutional principles

**Version**: 1.0.0 | **Ratified**: 2025-12-16 | **Last Amended**: 2025-12-16