# ===============================================================
# 🧠 ChromaDB Setup – NASA Space Biology Knowledge Engine
# Compatible with Chroma >= 0.5
# ===============================================================

import os
import json
import chromadb

# === Paths ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "../../data/embeddings/nasa_space_bio_embeddings.json")
CHROMA_PATH = os.path.join(BASE_DIR, "../../data/chroma_storage")

# === Ensure directory exists ===
os.makedirs(CHROMA_PATH, exist_ok=True)

# === Initialize Persistent Client (New API) ===
# The new API uses chromadb.PersistentClient instead of Settings
client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = client.get_or_create_collection(name="nasa_bio")

# === Load Embeddings JSON ===
with open(DATA_PATH, "r") as f:
    nasa_data = json.load(f)

print(f"✅ Loaded {len(nasa_data)} documents for ChromaDB setup.")

# === Add to Database ===
added = 0
for i, doc in enumerate(nasa_data):
    try:
        collection.add(
            ids=[str(i)],
            embeddings=[doc["embedding"]],
            documents=[doc["title"]],
            metadatas=[{
                "title": doc["title"],
                "link": doc["link"],
                "keywords": ", ".join(doc["keywords"])
            }]
        )
        added += 1
    except Exception as e:
        print(f"⚠️ Skipped '{doc['title'][:40]}' due to {e}")

print(f"✅ Successfully added {added}/{len(nasa_data)} documents.")
print(f"📂 Storage location: {CHROMA_PATH}")

# === Verify ===
print(f"🧾 Total docs stored: {collection.count()}")
