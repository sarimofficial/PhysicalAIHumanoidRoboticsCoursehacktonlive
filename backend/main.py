from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import Qdrant
from langchain_core.documents import Document
from openai import OpenAI
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
import os
import glob
import jwt  # For auth tokens

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path)

# Get environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
NEON_URL = os.getenv("NEON_URL")
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

EMBED_MODEL = "embed-english-v3.0"

# Database Setup
engine = create_engine(NEON_URL)
Base = declarative_base()   

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)  # Hashed in prod
    software_bg = Column(String)
    hardware_bg = Column(String)

# Create tables (commented out to prevent errors if DB not connected)
# Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# AI Setup
embeddings = OpenAIEmbeddings()
qdrant = Qdrant.from_existing_collection(
    embedding=embeddings,
    collection_name="textbook_content",
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)

try:
    qdrant = Qdrant.from_existing_collection(
        embedding=embeddings,
        collection_name="textbook_content",
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY
    )
except Exception as e:
    print(f"Failed to connect to Qdrant: {e}")
    qdrant = None

client = OpenAI()

class AuthModel(BaseModel):
    email: str
    password: str
    software_bg: str = None
    hardware_bg: str = None

# Auth endpoints (simple, use better-auth patterns)
@app.post("/api/auth/signup")
async def signup(data: AuthModel):
    session = Session()
    user = User(email=data.email, password=data.password, software_bg=data.software_bg, hardware_bg=data.hardware_bg)
    session.add(user)
    session.commit()
    token = jwt.encode({"email": data.email}, "secret", algorithm="HS256")
    return {"token": token}

@app.post("/api/auth/signin")
async def signin(data: AuthModel):
    # Validate creds (Placeholder)
    token = jwt.encode({"email": data.email}, "secret", algorithm="HS256")
    return {"token": token}

# Index textbook
@app.post("/index")
async def index_textbook():
    docs = []
    # Adjusted path to point to the textbook/docs directory relative to backend/
    search_path = "../textbook/docs/*.md"
    files = glob.glob(search_path)
    print(f"Found {len(files)} files to index in {search_path}")
    
    for md_file in files:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
            chunks = [content[i:i+1000] for i in range(0, len(content), 1000)]
            for chunk in chunks:
                docs.append(Document(page_content=chunk, metadata={"source": md_file}))
    
    if docs:
        Qdrant.from_documents(
            docs,
            embeddings,
            url=QDRANT_URL,
            api_key=QDRANT_API_KEY,
            collection_name="textbook_content"
        )
        return {"status": "indexed", "count": len(docs)}
    return {"status": "no documents found"}

# RAG query
@app.post("/query")
async def query_rag(request: Request):
    data = await request.json()
    question = data["question"]
    selected_text = data.get("selected_text", "")
    
    context = ""
    if selected_text:
        context += f"Selected Text (Priority):\n{selected_text}\n\n"
    
    if qdrant:
        try:
            retrieved = qdrant.as_retriever().invoke(question)
            rag_context = "\n".join([doc.page_content for doc in retrieved])
            context += f"Textbook Context:\n{rag_context}"
        except Exception as e:
            print(f"RAG retrieval failed: {e}")
            if not context:
                context = "No context available."
    else:
        if not context:
            context = "RAG system not initialized."
    
    assistant = client.beta.assistants.create(
        name="Textbook Assistant",
        instructions="Answer based on textbook context.",
        model="gpt-4o"
    )
    thread = client.beta.threads.create()
    client.beta.threads.messages.create(thread_id=thread.id, role="user", content=f"Context: {context}\nQuestion: {question}")
    run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=assistant.id)
    
    # Polling for completion (simplified)
    import time
    while run.status != "completed":
        time.sleep(1)
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        
    messages = client.beta.threads.messages.list(thread_id=thread.id)
    return {"answer": messages.data[0].content[0].text.value}

# Personalize
@app.post("/api/personalize")
async def personalize(request: Request):
    data = await request.json()
    chapter = data.get("chapter", "intro") # Default to intro if not specified
    token = request.headers.get("Authorization")
    
    # Mock user data if token is missing or invalid for demo purposes
    bg = "Software: Beginner, Hardware: None"
    if token:
        try:
            user_email = jwt.decode(token, "secret", algorithms=["HS256"])["email"]
            session = Session()
            user = session.query(User).filter_by(email=user_email).first()
            if user:
                bg = f"Software: {user.software_bg}, Hardware: {user.hardware_bg}"
        except:
            pass
            
    # Adjusted path
    file_path = f"../textbook/docs/{chapter}.md"
    if not os.path.exists(file_path):
        # Try finding it recursively or just fail gracefully
        return {"personalized": f"Chapter {chapter} not found."}

    with open(file_path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": f"Personalize this content for user with background: {bg}. Make it more accessible."},
                  {"role": "user", "content": original}]
    )
    return {"personalized": response.choices[0].message.content}

# Translate to Urdu
@app.post("/api/translate")
async def translate(request: Request):
    data = await request.json()
    chapter = data.get("chapter", "intro")
    
    file_path = f"../textbook/docs/{chapter}.md"
    if not os.path.exists(file_path):
        return {"translated": f"Chapter {chapter} not found."}

    with open(file_path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": "Translate to Urdu, preserving Markdown."},
                  {"role": "user", "content": original}]
    )
    return {"translated": response.choices[0].message.content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
