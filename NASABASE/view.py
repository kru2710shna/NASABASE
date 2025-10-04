# view_chroma_embeddings.py
import chromadb

# Load persistent client
client = chromadb.PersistentClient(path="data/chroma_storage")

# Get your collection
collection = client.get_collection("nasa_bio")

# Fetch first 3 documents
results = collection.get(
    include=["embeddings", "metadatas", "documents"],
    limit=3
)

for i, doc in enumerate(results["documents"]):
    print(f"\n📄 Document {i+1}: {doc}")
    print(f"🔑 Metadata: {results['metadatas'][i]}")
    print(f"🧩 Embedding vector length: {len(results['embeddings'][i])}")
    print(f"🧮 First 5 dims: {results['embeddings'][i][:5]}")
