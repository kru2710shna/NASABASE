# ===============================================================
# 🔍 KNN Search – NASA Space Biology Knowledge Engine (Modular)
# ===============================================================

import os
import chromadb
from openai import OpenAI
from dotenv import load_dotenv

# === Load Environment Variables ===
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("❌ OPENAI_API_KEY not found in environment variables!")

# === Initialize Clients ===
openai_client = OpenAI(api_key=OPENAI_API_KEY)

# Use persistent Chroma storage (so data survives restarts)
CHROMA_PATH = os.path.join("data", "chroma_storage")
client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = client.get_collection(name="nasa_bio")

# ===============================================================
# 🔧 Function: Semantic Search
# ===============================================================
def knn_search(query: str, n_results: int = 5):
    """Perform semantic KNN search using OpenAI embeddings + ChromaDB"""
    if not query.strip():
        return []

    # === Step 1: Generate embedding for query ===
    emb_response = openai_client.embeddings.create(
        input=query,
        model="text-embedding-3-small"
    )
    query_embedding = emb_response.data[0].embedding

    # === Step 2: Search in Chroma ===
    res = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        include=["metadatas", "distances"]
    )

    # === Step 3: Format results ===
    results = []
    if res["ids"] and res["ids"][0]:
        for i, meta in enumerate(res["metadatas"][0]):
            title = meta.get("title", "Unknown Title")
            link = meta.get("link", "")
            keywords = meta.get("keywords", "")
            distance = res["distances"][0][i]
            similarity = 1 - distance  # convert distance → similarity (closer = higher)
            results.append({
                "rank": i + 1,
                "title": title,
                "link": link,
                "keywords": keywords,
                "similarity": round(similarity, 3)
            })

    return results


# ===============================================================
# 🧪 CLI TEST (for standalone testing)
# ===============================================================
if __name__ == "__main__":
    query = input("\nEnter your query: ").strip()
    top_k = 5
    hits = knn_search(query, top_k)

    if hits:
        print(f"\n🔍 Top {top_k} Results for: '{query}'")
        print("-" * 60)
        for h in hits:
            print(f"\n[{h['rank']}] {h['title']}")
            print(f"   🔗 {h['link']}")
            print(f"   🧩 Keywords: {h['keywords']}")
            print(f"   📈 Similarity: {h['similarity']}")
    else:
        print(f"⚠️ No results found for: {query}")
