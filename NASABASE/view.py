# ===============================================================
# 📦 ChromaDB Document Counter – NASA Space Biology Knowledge Engine
# ===============================================================

import os
import chromadb

# === Configuration ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR))
CHROMA_PATH = os.path.join(PROJECT_ROOT, "data", "chroma_storage")
COLLECTION_NAME = "nasa_bio"

# === Connect to ChromaDB ===
print(f"🔌 Connecting to ChromaDB at: {CHROMA_PATH}")
client = chromadb.PersistentClient(path=CHROMA_PATH)

# === Get Collection ===
try:
    collection = client.get_collection(name=COLLECTION_NAME)
except Exception as e:
    print(f"❌ Error: Could not find collection '{COLLECTION_NAME}'.")
    print(e)
    exit(1)

# === Get Total Count ===
count = collection.count()
print(f"\n📦 Total number of files/documents in '{COLLECTION_NAME}': {count}")
