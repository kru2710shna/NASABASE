# ===============================================================
# 🔍 KNN Search Service – NASA Space Biology Knowledge Engine
# ===============================================================

import os
import chromadb
from openai import OpenAI
from dotenv import load_dotenv

# === Initialize once ===
load_dotenv()
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

CHROMA_PATH = os.path.join(os.path.dirname(__file__), "../../data/chroma_storage")
client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = client.get_collection(name="nasa_bio")


def knn_search(query: str, n_results: int = 5):
    """
    Perform semantic search using ChromaDB + OpenAI embeddings.
    Returns top `n_results` similar documents.
    """
    try:
        # --- Embed query ---
        response = openai_client.embeddings.create(
            input=query,
            model="text-embedding-3-small"
        )
        query_embedding = response.data[0].embedding

        # --- Query Chroma ---
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            include=["metadatas", "documents", "distances"]
        )

        # --- Format output ---
        formatted = []
        if results["ids"] and results["ids"][0]:
            for i, meta in enumerate(results["metadatas"][0]):
                formatted.append({
                    "rank": i + 1,
                    "title": meta.get("title", "Unknown Title"),
                    "link": meta.get("link", ""),
                    "keywords": meta.get("keywords", ""),
                    "similarity": round(1 - results["distances"][0][i], 3)
                })
        else:
            return {"query": query, "results": [], "message": "No results found"}

        return {"query": query, "results": formatted}

    except Exception as e:
        return {"error": str(e)}
