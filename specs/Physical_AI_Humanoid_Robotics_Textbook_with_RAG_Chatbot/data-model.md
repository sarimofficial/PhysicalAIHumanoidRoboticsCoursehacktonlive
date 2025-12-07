## Data Model for Physical AI & Humanoid Robotics Textbook with RAG Chatbot

This document describes the key entities and their relationships for the project.

### Entities:

-   **Textbook Content**: Structured chapters, sections, paragraphs, images, code snippets.
-   **User**: `user_id`, `email`, `password_hash`, `software_experience` (text), `hardware_experience` (text), `personalization_preferences` (JSON/map).
-   **Chatbot Interaction**: `chat_id`, `user_id`, `query_text`, `response_text`, `timestamp`, `selected_text` (optional).
-   **Vector Embedding**: `embedding_id`, `text_segment_id`, `vector_data`, `metadata` (e.g., chapter, section).
-   **Translation**: `original_text_id`, `language`, `translated_text`.
