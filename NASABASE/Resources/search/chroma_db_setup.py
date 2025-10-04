# ===============================================================
# 🧠 ChromaDB Appender – NASA Space Biology Knowledge Engine
# Append multiple embedding JSON files to existing ChromaDB collection
# Safe for Chroma >= 0.5
# ===============================================================

import os
import json
import chromadb
import stat

# === Paths ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "../../data/embeddings")
CHROMA_PATH = os.path.join(BASE_DIR, "../../data/chroma_storage")
COLLECTION_NAME = "nasa_bio"

# === Ensure Chroma path exists and is writable ===
os.makedirs(CHROMA_PATH, exist_ok=True)

db_path = os.path.join(CHROMA_PATH, "chroma.sqlite3")
if os.path.exists(db_path):
    try:
        # make sure writable permissions are set (rw for user)
        os.chmod(db_path, stat.S_IRUSR | stat.S_IWUSR)
    except Exception as e:
        print(f"⚠️ Could not modify permissions for {db_path}: {e}")

if not os.access(CHROMA_PATH, os.W_OK):
    raise PermissionError(f"❌ No write permission to {CHROMA_PATH}. Try: chmod -R u+w {CHROMA_PATH}")

# === Initialize Persistent Client ===
print(f"🔌 Connecting to ChromaDB at: {CHROMA_PATH}")
client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = client.get_or_create_collection(name=COLLECTION_NAME)

# === List all JSON embedding files ===
json_files = [f for f in os.listdir(DATA_DIR) if f.endswith(".json")]
if not json_files:
    print(f"⚠️ No JSON files found in {DATA_DIR}")
    exit(0)

print(f"📂 Found {len(json_files)} embedding files in {DATA_DIR}")

total_added = 0
skipped = 0

for json_file in json_files:
    file_path = os.path.join(DATA_DIR, json_file)
    print(f"\n📥 Processing file: {json_file}")

    try:
        with open(file_path, "r") as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Failed to read {json_file}: {e}")
        continue

    print(f"  • Loaded {len(data)} embeddings from {json_file}")

    for i, doc in enumerate(data):
        try:
            # Ensure unique IDs per file
            doc_id = f"{json_file}_{i}"

            # Check duplicate before inserting (by ID)
            existing = collection.get(ids=[doc_id])
            if existing["ids"]:
                skipped += 1
                continue

            collection.add(
                ids=[doc_id],
                embeddings=[doc["embedding"]],
                documents=[doc.get("title", "Untitled")],
                metadatas=[{
                    "title": doc.get("title", "N/A"),
                    "link": doc.get("link", "N/A"),
                    "keywords": ", ".join(doc.get("keywords", [])),
                    "source_file": json_file
                }]
            )
            total_added += 1

        except Exception as e:
            skipped += 1
            print(f"  ⚠️ Skipped '{doc.get('title','')[:50]}' → {e}")

# === Summary ===
print("\n================ Summary ================")
print(f"✅ Added embeddings : {total_added}")
print(f"⚠️ Skipped entries  : {skipped}")
try:
    print(f"🧾 Total docs now   : {collection.count()}")
except Exception as e:
    print(f"❌ Could not fetch count: {e}")
print(f"📦 Stored in        : {os.path.abspath(CHROMA_PATH)}")
print("=========================================")
