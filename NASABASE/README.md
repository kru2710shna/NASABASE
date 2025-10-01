# 🚀 NASA Space Biology Knowledge Engine

## Overview
The **NASA Space Biology Knowledge Engine (NASABASE)** is a research-driven AI pipeline designed to ingest, process, and analyze bioscience publications from NASA.  
The goal is to transform raw publications into actionable insights for space missions (Moon, Mars, and beyond).

---

## ✨ Features
1. **Data Ingestion (Corpus Building)**  
   - Download NASA bioscience publications (CSV + metadata).  
   - Extract key fields: Title, Authors, Abstract, Results, Conclusion.  
   - Preprocess text for downstream tasks.  

2. **Embeddings + KNN Search**  
   - Generate embeddings using OpenAI Ada / SciBERT / Sentence-BERT.  
   - Store embeddings in JSON/Parquet.  
   - Perform KNN search with cosine similarity for top-k retrieval.  

3. **Keyword + Entity Extraction**  
   - Use spaCy / SciSpacy to extract biomedical + space biology terms.  
   - Normalize synonyms (e.g., “zero gravity” → “microgravity”).  
   - Add metadata for hybrid search.  

4. **Hybrid Search**  
   - Combine embedding similarity with keyword/entity matches.  
   - Weighted scoring to balance precision and recall.  

5. **On-the-Fly Summarization**  
   - Summarize top-k results into **Key Findings, Gaps, and Mission Implications**.  
   - Cache repeated queries.  

6. **Dashboard / UI**  
   - Interactive search bar + card-style results.  
   - Optional graph and timeline views.  

---

## 📂 Project Structure
```
NASABASE/
├── data/
│   ├── raw/            # Raw NASA publications (CSV, JSON, PDF)
│   ├── processed/      # Cleaned & tokenized text
│   └── embeddings/     # Vectorized document embeddings
├── docs/               # Documentation & architecture notes
├── notebooks/          # Jupyter notebooks for prototyping
├── src/                # Core source code
│   ├── data_ingestion/ # Scripts to fetch & load data
│   ├── preprocessing/  # Cleaning & tokenization
│   ├── embeddings/     # Embedding generation
│   ├── search/         # KNN & hybrid search
│   ├── summarization/  # LLM-powered summarization
│   └── utils/          # Helper utilities
├── tests/              # Unit tests
├── ui/                 # Dashboard / UI components
│   ├── dashboard/
│   └── components/
├── README.md
├── requirements.txt
├── setup.py
└── .gitignore
```

---

## 🔍 Example Walkthrough
**User Query:**  
*"How does microgravity affect bone health in astronauts?"*  

**Pipeline:**  
1. **Entity Recognition:** microgravity, bone health, astronauts.  
2. **Embedding Search:** retrieve top-k relevant docs.  
3. **Hybrid Filter:** ensure entity matches.  
4. **Summarization:**  
   - Findings: Microgravity reduces bone density by 1–2% per month.  
   - Gaps: Recovery patterns post-mission unclear.  
   - Mission Implication: Countermeasures (exercise, medication) critical for Mars.  

**UI Output (Card View):**
```
Result #1: Effects of Microgravity on Bone Density in Astronauts
Summary: Bone mineral density loss of ~1–2% per month in weight-bearing bones.  
Tags: [human], [bone density], [microgravity]

Result #2: Calcium Metabolism in Prolonged Spaceflight
Summary: Altered calcium absorption & excretion. Nutritional countermeasures suggested.  
Tags: [calcium], [nutrition], [spaceflight]
```

---

## 🛠️ Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/NASABASE.git
cd NASABASE

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## 📌 Requirements
- Python 3.9+  
- PyTorch / TensorFlow  
- spaCy / SciSpacy  
- FAISS or Scikit-learn for KNN  
- OpenAI API / HuggingFace Transformers  

---

## 🚧 Roadmap
- [x] Project scaffolding  
- [ ] Data ingestion pipeline  
- [ ] Embedding generation & storage  
- [ ] Hybrid search module  
- [ ] Summarization pipeline  
- [ ] Dashboard with search UI  

---

## 🤝 Contributing
Contributions are welcome! Please fork the repo and submit a pull request.

---


