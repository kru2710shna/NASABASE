# ===============================================================
# 🔍 KNN Search – NASA Space Biology Knowledge Engine
# ===============================================================

import chromadb
from openai import OpenAI
from dotenv import load_dotenv
import os

# === Initialize Clients ===
client = chromadb.PersistentClient(path="data/chroma_storage")
collection = client.get_collection(name="nasa_bio")

load_dotenv()
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# === Query ===
query = input("\nEnter your query: ").strip()

# === Generate Query Embedding ===
response = openai_client.embeddings.create(
    input=query,
    model="text-embedding-3-small"
)
query_embedding = response.data[0].embedding

# === Perform Semantic Search ===
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
    include=["metadatas", "documents", "distances"]
)

# === Display ===
if results["ids"] and results["ids"][0]:
    print(f"\n🔍 Top 5 Results for: '{query}'")
    print("-" * 60)
    for i, doc in enumerate(results["metadatas"][0]):
        title = doc.get("title", "Unknown Title")
        link = doc.get("link", "")
        keywords = doc.get("keywords", "")
        score = 1 - results["distances"][0][i]  # Convert distance → similarity
        print(f"\n[{i+1}] {title}")
        print(f"   🔗 {link}")
        print(f"   🧩 Keywords: {keywords}")
        print(f"   📈 Similarity: {score:.3f}")
else:
    print(f"⚠️ No results found for: {query}")
