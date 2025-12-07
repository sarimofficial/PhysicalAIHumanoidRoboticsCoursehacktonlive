## Quickstart Guide for Physical AI & Humanoid Robotics Textbook with RAG Chatbot

This guide will provide quick steps to set up and run the project locally.

### 1. Prerequisites

- Node.js (for Docusaurus)
- Python 3.9+ (for FastAPI)
- Docker (for local development/deployment)
- Access to OpenAI API, Neon Serverless Postgres, Qdrant Cloud.

### 2. Setup Docusaurus Frontend

```bash
# Navigate to frontend directory
cd frontend
# Install dependencies
npm install
# Start Docusaurus development server
npm run start
```

### 3. Setup FastAPI Backend

```bash
# Navigate to backend directory
cd backend
# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run FastAPI server
uvicorn main:app --reload
```

### 4. Chatbot and Authentication Configuration

-   Set up environment variables for OpenAI API key, Neon Postgres connection string, Qdrant API key.
-   Configure Better Auth credentials.

### 5. Deployment

-   Deploy Docusaurus to GitHub Pages.
-   Containerize FastAPI backend and deploy to a cloud provider.
