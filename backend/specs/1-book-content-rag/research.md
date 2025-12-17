# Research Document: Integrated RAG Chatbot for Book Content Querying

**Feature**: 1-book-content-rag
**Date**: 2025-12-16

## Overview

This research document outlines the technical approach and decisions for implementing the RAG chatbot for book content querying, focusing on dual-mode querying (full book vs. user-selected text) with strict isolation.

## Technology Decisions

### LLM Inference: Groq API
- **Decision**: Use Groq API with llama3-70b-8192 model
- **Rationale**: Complies with constitution's vendor independence principle (no OpenAI), provides low-latency inference suitable for real-time Q&A
- **Alternatives considered**: OpenAI GPT models (prohibited by constitution), self-hosted models (higher complexity and infrastructure costs)
- **Reference**: Constitution Section - Technology Standards: LLM Inference

### Vector Database: Qdrant Cloud
- **Decision**: Use Qdrant Cloud (free tier) with cosine similarity and 0.7 relevance threshold
- **Rationale**: Free tier meets storage constraints (1GB), cosine similarity is optimal for semantic search, 0.7 threshold balances precision and recall
- **Reference**: Constitution Section - Technology Standards: Vector Storage

### Embeddings: Cohere
- **Decision**: Use Cohere for embedding generation
- **Rationale**: Works well with RAG pipelines, efficient for book content, compliant with free-tier constraints
- **Reference**: Constitution Section - Technology Standards: Embeddings

### Backend Framework: FastAPI
- **Decision**: Use FastAPI for HTTP interfaces
- **Rationale**: Python-based, excellent async support, automatic API documentation, suitable for API-first design needed for embedding
- **Reference**: Constitution Section - Technology Standards: Backend

### Metadata Storage: Neon Serverless Postgres
- **Decision**: Use Neon Serverless Postgres for metadata storage
- **Rationale**: Serverless PostgreSQL with free tier, suitable for storing document metadata and maintaining relationships
- **Reference**: Constitution Section - Technology Standards: Relational Metadata

## Architecture Considerations

### Dual-Mode Querying Architecture
- **Decision**: Implement hard isolation between full-book and selected-text modes
- **Rationale**: Selected-text mode must completely bypass vector database to ensure no contamination from book content
- **Implementation**: If selected_text is provided, bypass Qdrant and use only the provided text as context for the LLM
- **Reference**: Constitution Section - Retrieval & Answering Rules

### Chunking Strategy
- **Decision**: Chunk text into 500-1000 token segments with 20% overlap to capture context
- **Rationale**: Balances retrieval precision with context availability, optimal for book content
- **Implementation**: Use sentence boundaries to maintain readability, capture page/chapter metadata

### Security Implementation
- **Decision**: Implement rate limiting, input sanitization, and API key protection
- **Rationale**: Meets security requirements from constitution while maintaining performance
- **Implementation**: Middleware for rate limiting and input sanitization
- **Reference**: Constitution Section - Security Requirements

## API Design

### Core Endpoints
1. `POST /ingest` - Upload and process book content
2. `POST /query` - Query book content with optional selected_text parameter
3. `GET /health` - Health check endpoint

### Query Parameters
- `query`: The user's question about the book
- `selected_text` (optional): Specific text to query against, bypassing vector database

## Performance Considerations

- **Goal**: <500ms retrieval latency, <2s end-to-end response time
- **Approach**: Optimize embedding generation, implement efficient vector search, use connection pooling for database
- **Reference**: Constitution Section - Performance Constraints

## Testing Strategy

- **Unit Tests**: 80%+ coverage of core logic (retrieval, generation, ingestion)
- **Integration Tests**: Dual-mode functionality with proper isolation verification
- **Contract Tests**: API endpoint compliance
- **Reference**: Constitution Section - Code Quality & Engineering Standards