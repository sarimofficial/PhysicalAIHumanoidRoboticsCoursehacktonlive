from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_qdrant import Qdrant
from langchain_core.documents import Document
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os
import glob
import jwt

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load .env
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)
print("DEBUG: NEON_URL =", os.getenv("NEON_URL"))

# ENV variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
NEON_URL = os.getenv("NEON_URL")

# Configure Gemini
genai.configure(api_key=GOOGLE_API_KEY)

# Database setup
engine = create_engine(NEON_URL)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    software_bg = Column(String)
    hardware_bg = Column(String)

# ✅ THIS LINE FIXES THE ERROR
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)


# Embeddings (Google Free Embeddings)
embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")

# QDRANT RAG setup
try:
    qdrant = Qdrant.from_existing_collection(
        embedding=embeddings,
        collection_name="textbook_content",
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY
    )
except Exception as e:
    print("Failed to connect Qdrant:", e)
    qdrant = None


# Auth Models
class AuthModel(BaseModel):
    email: str
    password: str
    software_bg: str | None = None
    hardware_bg: str | None = None


# Sign Up
@app.post("/api/auth/signup")
async def signup(data: AuthModel):
    session = Session()
    user = User(
        email=data.email,
        password=data.password,
        software_bg=data.software_bg,
        hardware_bg=data.hardware_bg,
    )
    session.add(user)
    session.commit()
    token = jwt.encode({"email": data.email}, "secret", algorithm="HS256")
    return {"token": token}


# Sign In
@app.post("/api/auth/signin")
async def signin(data: AuthModel):
    token = jwt.encode({"email": data.email}, "secret", algorithm="HS256")
    return {"token": token}


# Index textbook files
@app.post("/index")
async def index_textbook():
    docs = []
    search_path = "../textbook/docs/*.md"
    files = glob.glob(search_path)

    for md_file in files:
        with open(md_file, "r", encoding="utf-8") as f:
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


# RAG Query (Gemini)
@app.post("/query")
async def query_rag(request: Request):
    try:
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
                print("RAG retrieval failed:", e)
                context = context or "No context available."

        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(f"Context:\n{context}\n\nQuestion:\n{question}")

        return {"answer": response.text}

    except Exception as e:
        print("QUERY ERROR:", e)
        return {"answer": "AI Error: " + str(e)}

# Personalize content
@app.post("/api/personalize")
async def personalize(request: Request):
    data = await request.json()
    chapter = data.get("chapter", "intro")
    token = request.headers.get("Authorization")

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

    file_path = f"../textbook/docs/{chapter}.md"
    if not os.path.exists(file_path):
        return {"personalized": f"Chapter {chapter} not found."}

    with open(file_path, "r", encoding="utf-8") as f:
        original = f.read()

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        f"Personalize this for a user with background: {bg}.\n\n{original}"
    )

    return {"personalized": response.text}


# Translate to Urdu
@app.post("/api/translate")
async def translate(request: Request):
    data = await request.json()
    chapter = data.get("chapter", "intro")

    file_path = f"../textbook/docs/{chapter}.md"
    if not os.path.exists(file_path):
        return {"translated": f"Chapter {chapter} not found."}

    with open(file_path, "r", encoding="utf-8") as f:
        original = f.read()

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        f"Translate the following text to Urdu (keep Markdown formatting):\n\n{original}"
    )

    return {"translated": response.text}


# Start server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
