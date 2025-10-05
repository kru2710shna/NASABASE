# ===============================================================
# 🧠 ChromaDB + OpenAI Search Service
# ===============================================================
import os
import chromadb
from openai import OpenAI
from dotenv import load_dotenv

# === Load API key ===
load_dotenv()
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# === Connect to ChromaDB ===
CHROMA_PATH = os.path.join(os.path.dirname(__file__), "../../data/chroma_storage")
client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = client.get_collection("nasa_bio")

# === Core Search Function ===
def search_nasa(query: str):
    try:
        # Generate embedding for the query
        query_embedding = openai_client.embeddings.create(
            input=query,
            model="text-embedding-3-small"
        ).data[0].embedding

        # Query ChromaDB
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=5,
            include=["metadatas", "distances"]
        )

        # Format clean JSON response
        formatted = []
        for i, meta in enumerate(results["metadatas"][0]):
            formatted.append({
                "rank": i + 1,
                "title": meta.get("title", "Unknown"),
                "link": meta.get("link", ""),
                "keywords": meta.get("keywords", ""),
                "similarity": round(1 - results["distances"][0][i], 3)
            })

        return {"query": query, "results": formatted}

    except Exception as e:
        return {"error": str(e)}
