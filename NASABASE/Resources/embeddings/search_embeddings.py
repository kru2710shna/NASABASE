import os
import json
import numpy as np
from openai import OpenAI
from dotenv import load_dotenv

# === Load Environment ===
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# === Paths ===
EMBEDDINGS_FILE = "data/embeddings/nasa_space_bio_embeddings.json"

# === Load Embeddings ===
with open(EMBEDDINGS_FILE, "r") as f:
    nasa_embeddings = json.load(f)

# === Query ===
query = input("Enter your query: ")

query_emb = client.embeddings.create(
    input=query,
    model="text-embedding-3-small"
).data[0].embedding

# === Cosine Similarity Function ===
def cosine_similarity(a, b):
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# === Compute Similarities ===
results = []
for paper in nasa_embeddings:
    sim = cosine_similarity(query_emb, paper["embedding"])
    results.append((paper["title"], sim, paper["link"]))

# === Sort by Relevance ===
results.sort(key=lambda x: x[1], reverse=True)

# === Display ===
print("\n🔍 Top 5 Relevant Papers:")
for title, score, link in results[:5]:
    print(f"{score:.3f} | {title}\n{link}\n")
