from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main import app

client = TestClient(app)

def test_read_main():
    # As there is no root endpoint "/" in main.py, checking 404 or adding one would be expected.
    # But let's check a known endpoint or just startup.
    response = client.get("/")
    assert response.status_code == 404

def test_signup():
    with patch("main.Session") as mock_session:
        mock_db_session = MagicMock()
        mock_session.return_value = mock_db_session
        
        response = client.post("/api/auth/signup", json={
            "email": "test@example.com",
            "password": "password123",
            "software_bg": "beginner",
            "hardware_bg": "none"
        })
        assert response.status_code == 200
        assert "token" in response.json()

def test_signin():
    response = client.post("/api/auth/signin", json={
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "token" in response.json()

@patch("main.Qdrant")
@patch("glob.glob")
@patch("builtins.open")
def test_index_textbook(mock_open, mock_glob, mock_qdrant):
    mock_glob.return_value = ["test.md"]
    # Mock file reading
    mock_file = MagicMock()
    mock_file.__enter__.return_value.read.return_value = "Content"
    mock_open.return_value = mock_file
    
    response = client.post("/index")
    assert response.status_code == 200
    assert response.json() == {"status": "indexed", "count": 1}

@patch("main.client")  # OpenAI client
@patch("main.qdrant")
def test_query_rag(mock_qdrant, mock_openai):
    # Mock RAG retrieval
    mock_qdrant.as_retriever.return_value.invoke.return_value = [MagicMock(page_content="Reference text")]
    
    # Mock OpenAI assistant run
    mock_run = MagicMock()
    mock_run.status = "completed"
    
    mock_openai.beta.assistants.create.return_value = MagicMock(id="asst_1")
    mock_openai.beta.threads.create.return_value = MagicMock(id="thread_1")
    mock_openai.beta.threads.runs.create.return_value = mock_run
    mock_openai.beta.threads.runs.retrieve.return_value = mock_run
    
    # Mock messages list
    mock_message = MagicMock()
    mock_message.content = [MagicMock(text=MagicMock(value="Answer"))]
    mock_openai.beta.threads.messages.list.return_value = MagicMock(data=[mock_message])

    response = client.post("/query", json={"question": "What is robotics?"})
    assert response.status_code == 200
    assert response.json()["answer"] == "Answer"
