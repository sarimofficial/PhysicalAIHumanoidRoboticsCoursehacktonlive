# Quickstart Guide: Integrated RAG Chatbot

This guide explains how to set up and run the RAG chatbot locally.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

-   **Python 3.11+**
-   **uv** (can be installed via `pip install uv`)
-   **Docker** (for running Qdrant locally, or you can use Qdrant Cloud)
-   **Node.js and npm/yarn** (for the Docusaurus frontend)

## 2. Environment Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd Hackhathon-ai-native-book
    ```

2.  **Create and configure `.env` file**:
    Create a `.env` file in the `backend/` directory based on `backend/.env.example` (if it exists, otherwise create it with the following content):

    ```dotenv
    COHERE_API_KEY="your_cohere_api_key"
    QDRANT_HOST="localhost" # or your Qdrant Cloud URL
    QDRANT_API_KEY="your_qdrant_api_key" # only if using Qdrant Cloud
    OPENAI_BASE_URL="http://localhost:11434/v1" # or your OpenAI-compatible API base URL
    OPENAI_API_KEY="sk-no-key-required" # Not strictly needed for local Ollama, but good practice
    ```

    -   **COHERE_API_KEY**: Obtain this from the Cohere website. This is used for generating embeddings.
    -   **QDRANT_HOST**: If running Qdrant locally via Docker, this will be `localhost`. If using Qdrant Cloud, provide your cloud URL.
    -   **QDRANT_API_KEY**: Only required if using Qdrant Cloud.
    -   **OPENAI_BASE_URL**: If using Ollama locally, this will typically be `http://localhost:11434/v1`. If using a different OpenAI-compatible local LLM, adjust accordingly.
    -   **OPENAI_API_KEY**: For local setups, this often isn't strictly checked, but some clients require its presence. You can use a placeholder.

## 3. Backend Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Install Python dependencies**:
    ```bash
    uv pip install -e .
    ```

3.  **Run Qdrant (local via Docker)**:
    If you're using Qdrant locally, start it using Docker:
    ```bash
    docker run -p 6333:6333 -p 6334:6334 \
        -v $(pwd)/qdrant_storage:/qdrant/storage \
        qdrant/qdrant
    ```
    *(Note: For Windows, `$(pwd)` might need to be replaced with `%cd%` or a full path.)*

4.  **Ingest book content**:
    Before running the chatbot, you need to ingest the book's content into Qdrant. Make sure your `book.txt` file is in `backend/data/`.
    ```bash
    python scripts/ingest.py --file_path data/book.txt
    ```

5.  **Run the FastAPI backend**:
    ```bash
    uvicorn src.main:app --reload
    ```
    The backend API will be available at `http://127.0.0.1:8000`.

## 4. Frontend Setup (Docusaurus)

1.  **Navigate to the book directory**:
    ```bash
    cd ../book
    ```

2.  **Install Node.js dependencies**:
    ```bash
    npm install
    # or yarn install
    ```

3.  **Start the Docusaurus development server**:
    ```bash
    npm run start
    # or yarn start
    ```
    The Docusaurus site will be available at `http://localhost:3000`.

## 5. Using the Chatbot

1.  Open your browser to `http://localhost:3000`.
2.  You should see a chatbot widget icon (typically at the bottom right). Click it to open the chat window.
3.  You can now ask questions about the book's content.
4.  To test the "selected text" feature, highlight any text on the page. The chatbot widget should automatically detect the selection and allow you to ask a question specifically about that text.

## Troubleshooting

-   **API Keys**: Double-check your `COHERE_API_KEY` and `QDRANT_API_KEY` (if applicable) in the `.env` file.
-   **Qdrant Connection**: Ensure your Qdrant instance (local or cloud) is running and accessible from the backend.
-   **Ollama/LLM**: Verify that your local LLM (e.g., Ollama) is running and accessible at the specified `OPENAI_BASE_URL`. You can test this by `curl http://localhost:11434/v1/models`.
-   **CORS Issues**: If you encounter CORS errors, you might need to configure CORS in your FastAPI application. (This guide assumes a direct setup where Docusaurus proxying or direct access prevents this).

---
