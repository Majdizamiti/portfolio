import os
from dotenv import load_dotenv
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings
from app.knowledge import load_knowledge_context

load_dotenv()

embeddings = NVIDIAEmbeddings(
    model=os.environ.get("EMBED_MODEL", "nvidia/nemotron-3.5-embed-8b"),
    api_key=os.environ.get("NVIDIA_API_KEY"),
    truncate="END",
)

def get_portfolio_context() -> str:
    return load_knowledge_context()

def get_embeddings_client():
    return embeddings
