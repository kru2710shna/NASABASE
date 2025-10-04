# ===============================================================
# 🔍 Semantic Search – NASA Bio ChromaDB (Fixed Display Version)
# ===============================================================

import os
import chromadb
from chromadb.config import Settings
from openai import OpenAI
from dotenv import load_dotenv

# === Load API Key ===
load_dotenv()
client_openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# === Chroma Setup ===
CHROMA_PATH = "data/chroma_storage"
chroma_client = chromadb.Client(Settings(persist_directory=CHROMA_PATH))
collection = chroma_client.get_or_create_collection("nasa_bio")

# === Query Function ===
def semantic_search(query: str, k: int = 5):
    response = client_openai.embeddings.create(
        input=query,
        model="text-embedding-3-small"
    )
    query_emb = response.data[0].embedding

    results = collection.query(
        query_embeddings=[query_emb],
        n_results=k,
        include=["metadatas", "documents", "distances"]
    )

    print("\n🧪 DEBUG RESULT:")
    print(results)  # 🧩 Add this line

    if not results or not results.get("documents") or not results["documents"][0]:
        print(f"⚠️ No results found for: {query}")
        return

    docs = results["documents"][0]
    metas = results["metadatas"][0]
    distances = results["distances"][0]

      

# === Example Usage ===
if __name__ == "__main__":
    user_query = input("Enter your query: ")
    semantic_search(user_query)
