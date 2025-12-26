# Quickstart Guide: Neon Chat History Integration

This guide explains how to set up and run the RAG chatbot with Neon Serverless Postgres for chat history persistence.

## 1. Prerequisites

Ensure you have all the prerequisites from the main `quickstart.md` (`specs/2-integrated-rag-chatbot/quickstart.md`), and additionally:

-   **Neon Account**: A Neon account with a provisioned Postgres database.

## 2. Environment Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd Hackhathon-ai-native-book
    ```

2.  **Create and configure `.env` file**:
    Ensure your `backend/.env` file includes the `NEON_DATABASE_URL`. This should be your Neon connection string.

    ```dotenv
    # ... other existing variables ...

    # Neon Serverless Postgres Database URL
    NEON_DATABASE_URL="postgresql+asyncpg://user:password@host/database_name?sslmode=require"
    ```
    Replace `user`, `password`, `host`, and `database_name` with your Neon database credentials. The `?sslmode=require` is crucial for Neon connections.

## 3. Backend Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Install Python dependencies**:
    Ensure you have `asyncpg` and `SQLAlchemy[asyncio]` installed.
    ```bash
    uv pip install -e .
    ```

3.  **Initialize Database Tables**:
    Run the script to create the `chat_sessions` and `chat_messages` tables in your Neon database.
    ```bash
    python scripts/init_db.py
    ```

4.  **Run the FastAPI backend**:
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

## 5. Using the Chatbot with History

1.  Open your browser to `http://localhost:3000`.
2.  Interact with the chatbot. Your conversations will now be persisted in your Neon database.
3.  Refresh the page or close and reopen the chatbot widget – your past conversation history for the current session should be loaded and displayed.

## Troubleshooting

-   **Neon Connection**: Verify your `NEON_DATABASE_URL` is correct and includes `?sslmode=require`. Ensure your Neon database is running and accessible.
-   **Table Creation**: If tables are not created, check the `backend/scripts/init_db.py` output for errors and ensure your `NEON_DATABASE_URL` has sufficient permissions.
