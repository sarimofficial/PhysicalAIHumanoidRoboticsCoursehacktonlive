import os
import glob
from openai import OpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import Qdrant
from langchain_core.documents import Document

from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")  
import cohere

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
NEON_URL = os.getenv("NEON_URL")    
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
EMBED_MODEL = os.getenv("EMBED_MODEL")

cohere_client = cohere.Client("JMDi1HWiUcW3eIe0U6OQrYS9Euzlq2iME9prvPEb")

client = OpenAI()
embeddings = OpenAIEmbeddings()

class Subagent:
    def __init__(self, name, skills=[]):
        self.name = name
        self.skills = {skill.name: skill for skill in skills}

    def load_skill(self, skill_name, **kwargs):
        if skill_name in self.skills:
            print(f"[{self.name}] Executing skill: {skill_name}")
            return self.skills[skill_name].execute(**kwargs)
        else:
            return f"Skill '{skill_name}' not found."

class TextbookGenerationSkill:
    name = "textbook_generation"
    
    def execute(self, topic="Introduction to Robotics"):
        # Mock implementation of generating a textbook chapter
        print(f"Generating textbook content for: {topic}...")
        
        prompt = f"Write a comprehensive textbook chapter about {topic}. Use Markdown format."
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )
        content = response.choices[0].message.content
        
        # Save to file
        filename = f"../textbook/docs/{topic.lower().replace(' ', '-')}.md"
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
            
        return f"Textbook chapter '{topic}' generated and saved to {filename}."

class PersonalizationSkill:
    name = "personalization"
    
    def execute(self, chapter, user_bg):
        file_path = f"../textbook/docs/{chapter}.md"
        if not os.path.exists(file_path):
            return f"Chapter {chapter} not found."
            
        with open(file_path, 'r', encoding='utf-8') as f:
            original = f.read()
            
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"Personalize this content for a user with background: {user_bg}. Make it more accessible and relevant to their experience."},
                {"role": "user", "content": original}
            ]
        )
        return response.choices[0].message.content

class TranslationSkill:
    name = "translation"
    
    def execute(self, chapter, target_language="Urdu"):
        file_path = f"../textbook/docs/{chapter}.md"
        if not os.path.exists(file_path):
            return f"Chapter {chapter} not found."
            
        with open(file_path, 'r', encoding='utf-8') as f:
            original = f.read()
            
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"Translate the following text to {target_language}, preserving Markdown formatting."},
                {"role": "user", "content": original}
            ]
        )
        return response.choices[0].message.content

class RAGSetupSkill:
    name = "rag_setup"
    
    def execute(self):
        docs = []
        search_path = "../textbook/docs/*.md"
        files = glob.glob(search_path)
        
        if not files:
            return "No documents found to index."
            
        for md_file in files:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Simple chunking
                chunks = [content[i:i+1000] for i in range(0, len(content), 1000)]
                for chunk in chunks:
                    docs.append(Document(page_content=chunk, metadata={"source": md_file}))
        
        if docs:
            # Note: This requires a running Qdrant instance
            try:
                Qdrant.from_documents(
                    docs,
                    embeddings,
                    url=QDRANT_URL,
                    api_key=QDRANT_API_KEY,
                    collection_name="textbook_content"
                )
                return f"Successfully indexed {len(docs)} chunks."
            except Exception as e:
                return f"Failed to index: {str(e)}"
        return "No content to index."

if __name__ == "__main__":
    # Example Usage
    agent = Subagent("Educator", [
        TextbookGenerationSkill(), 
        PersonalizationSkill(), 
        TranslationSkill(), 
        RAGSetupSkill()
    ])
    
    # Example: Generate a chapter (commented out to avoid accidental usage)
    # print(agent.load_skill("textbook_generation", topic="Robotics History"))
