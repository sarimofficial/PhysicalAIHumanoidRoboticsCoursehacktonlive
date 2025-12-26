# Research: Integrated RAG Chatbot

**Date**: 2025-12-16
**Author**: Gemini

This document outlines the key technology decisions for the Integrated RAG Chatbot feature, as mandated by the project requirements.

## 1. LLM and AI Stack

### Decision: Google Gemini, Cohere Embeddings, OpenAI Agent SDK

- **Primary LLM**: Google Gemini will be used for generating answers.
- **Embeddings**: Cohere's embedding models will be used to generate vector representations of the book's content.
- **Agent/Orchestration**: The OpenAI Agent SDK will be used to manage the RAG pipeline, including tool usage, retrieval, and grounding.

**Rationale**: This stack was mandated by the feature requirements. It provides a robust and scalable architecture for building the RAG chatbot. Gemini is a powerful LLM, Cohere provides high-quality embeddings, and the OpenAI Agent SDK offers a flexible framework for building agents.

**Alternatives Considered**: The prompt locked the technology stack, so no alternatives were evaluated.

## 2. Backend and Database

### Decision: FastAPI and Neon Serverless Postgres

- **Backend Framework**: FastAPI will be used to build the backend API.
- **Database**: Neon Serverless Postgres will be used for storing chat sessions, history, and metadata.

**Rationale**: This stack was mandated by the feature requirements. FastAPI is a high-performance Python web framework that is well-suited for building APIs. Neon is a serverless Postgres provider that offers a flexible and scalable database solution.

**Alternatives Considered**: The prompt locked the technology stack, so no alternatives were evaluated.

## 3. Vector Database

### Decision: Qdrant Cloud (Free Tier)

- **Vector Database**: Qdrant Cloud (Free Tier) will be used to store and search the Cohere-generated embeddings.

**Rationale**: This was mandated by the feature requirements. Qdrant is a high-performance vector database that is well-suited for similarity search tasks. The free tier is sufficient for the initial implementation of this feature.

**Alternatives Considered**: The prompt locked the technology stack, so no alternatives were evaluated.
