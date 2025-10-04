import os
import json
import numpy as np
from tqdm import tqdm
from openai import OpenAI
from dotenv import load_dotenv

# === Load Environment ===
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# === Paths ===
INPUT_JSON = "../../data/processed/nasa_space_bio_keywords.json"
OUTPUT_JSON = "../../data/embeddings/nasa_space_bio_embeddings.json"

# Ensure output folder exists
os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)

# === Load JSON ===
with open(INPUT_JSON, "r") as f:
    nasa_data = json.load(f)

# === Generate Embeddings ===
embeddings_data = []
for entry in tqdm(nasa_data, desc="Generating Embeddings"):
    text = f"{entry['title']} | {' '.join(entry['keywords'])}"
    try:
        response = client.embeddings.create(
            input=text,
            model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
    except Exception as e:
        print(f"⚠️ Skipped {entry['title']} due to error: {e}")
        continue

    embeddings_data.append({
        "title": entry["title"],
        "link": entry["link"],
        "keywords": entry["keywords"],
        "embedding": embedding
    })

# === Save to JSON ===
with open(OUTPUT_JSON, "w") as f:
    json.dump(embeddings_data, f, indent=2)

print("✅ Embeddings saved successfully at:", OUTPUT_JSON)
