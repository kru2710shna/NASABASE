# ===============================================================
# 🧠 ChromaDB Setup – NASA Space Biology Knowledge Engine
# ===============================================================

import os
import json
import chromadb
from chromadb.config import Settings

# === Resolve Absolute Paths ===
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
DATA_PATH = os.path.join(BASE_DIR, "data/embeddings/nasa_space_bio_embeddings.json")
CHROMA_PATH = os.path.join(BASE_DIR, "data/chroma_storage")

# === Ensure storage directory exists ===
os.makedirs(CHROMA_PATH, exist_ok=True)

# === Initialize Chroma Client ===
client = chromadb.Client(Settings(persist_directory=CHROMA_PATH))
collection = client.get_or_create_collection("nasa_bio")

# === Load Embeddings JSON ===
with open(DATA_PATH, "r") as f:
    nasa_data = json.load(f)

print(f"✅ Loaded {len(nasa_data)} documents for ChromaDB setup.")

# === Insert Documents into Collection ===
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
        print(f"⚠️ Skipped '{doc['title'][:50]}' due to: {e}")

print(f"✅ Successfully added {added}/{len(nasa_data)} documents.")
print(f"📂 Storage location: {CHROMA_PATH}")

# === Verification Step ===
count = collection.count()
print(f"🧾 Total documents in ChromaDB: {count}")
