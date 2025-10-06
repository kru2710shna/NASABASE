
# 🚀 NASA Space Biology Knowledge Engine
**_Intelligent Context-Based Research Discovery Platform_**

---

## 1. What We Did
We built an **AI-powered NASA context-based search repository** and **intelligent discovery dashboard** that:

- Indexes and embeds **49K+ NASA bioscience research papers** and datasets.  
- Enables **semantic search** using **embedding similarity** (not keyword matching).  
- Provides **smart AI-generated summaries** of scientific findings.  
- Supports **voice-based query input** (speech-to-text via Whisper/Vosk).  
- Integrates **multilingual translation** for global accessibility.  
- Allows users to **export results** in **PDF, CSV, Excel, or TXT** formats.  
- Displays an **interactive 3D globe dashboard** in React.  

> This project demonstrates how context-based AI tools can accelerate discovery within NASA’s vast bioscience datasets by bridging the gap between disconnected knowledge sources.
> Link to the project: https://nasabase-frontend.onrender.com

---

## 2. The Problem
Scientific data is often:
- **Fragmented & Context-Disconnected** – scattered across multiple sources.  
- **Lacking Intelligent Search** – keyword tools fail to capture semantic meaning.  
- **Slow for Insight Generation** – researchers spend more time finding data than interpreting it.  

---

## 3. Our Approach
We designed an **end-to-end system** combining **LLM-powered embeddings**, **semantic search**, and **modular backend APIs**.

**Key design principles:**
- Vectorize all abstracts & metadata into embeddings using **OpenAI `text-embedding-3-small`**.  
- Store vectors in **ChromaDB** for scalable **KNN (cosine) search**.  
- Serve queries through **FastAPI** backend (Python).  
- Visualize results in a **React + TypeScript** frontend.  
- Integrate **Whisper / Vosk** for speech-to-text transcription.  

---

## 4. Key Features

| Feature | Description |
|----------|--------------|
| **AI-Powered Semantic Search** | Finds contextually relevant studies using embedding similarity — understands meaning beyond keywords. |
| **Voice Input** | Natural voice search via Whisper/Vosk. |
| **Smart Summaries** | Auto-generates concise research overviews using LLMs. |
| **Multilingual Support** | Automatically translates non-English queries before embedding. |
| **Direct Paper Links** | One-click access to original NASA documents. |
| **Export Tools** | Export results to PDF, CSV, Excel, TXT formats. |

---

## 5. Repository Structure

```
NASABASE/
├── backend/
│   ├── app.py                  # FastAPI entry
│   ├── routes/                 # API endpoints
│   │   ├── search.py           # Semantic search
│   │   ├── summarize.py        # Summarization
│   │   └── audio.py            # Speech-to-text
│   ├── services/               # Core services
│   │   ├── chroma_service.py   # ChromaDB integration
│   │   ├── knn_service.py      # KNN retrieval
│   │   └── transcribe.py       # Whisper/Vosk audio
│   ├── src/core/               # Core backend logic
│   ├── src/schemas.py          # Pydantic models
│   ├── src/server.py           # Server init
│   └── requirements.txt
│
├── Resources/                  # Helper scripts
│   ├── audio/                  # Voice test & whisper
│   ├── embeddings/             # Embedding generation
│   └── search/                 # Chroma setup tools
│
├── data/
│   ├── raw/                    # Original NASA JSONs
│   ├── processed/              # Cleaned JSONs
│   ├── embeddings/             # Final vectors
│   └── chroma_storage/         # Vector DB persistence
│
├── web/
│   ├── src/
│   │   ├── components/         # React UI (Search, Voice)
│   │   ├── api/                # Frontend API wrapper
│   │   ├── utils/              # Export utilities
│   │   ├── styles/             # CSS modules
│   │   └── App.tsx             # Root app
│   └── public/                 # NASA logo + index.html
│
├── notebooks/                  # Experiments
├── docs/                       # Documentation
├── view.py                     # Visualization hooks
├── README.md
└── requirements.txt
```

---

## 6. Dataset & Embeddings

| Category | Details |
|-----------|----------|
| **NASA Papers Embedded** | 49,000+ |
| **Vector Dimensions** | 1,536 |
| **Embedding Model** | `text-embedding-3-small` |
| **Storage** | ChromaDB (persistent) |
| **Similarity Metric** | Cosine Similarity |
| **Search Results** | Top-K nearest papers (configurable) |

**Sources:**  
- NASA Space Biology Dataset  
- NASA Life Sciences Dataset  
- Processed metadata (titles, abstracts, keywords)

---

## 7. Technical Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React + TypeScript + Webpack |
| **Backend** | FastAPI (Python 3.11) |
| **Database** | ChromaDB (Vector DB) |
| **AI Models** | OpenAI Embeddings, Whisper, Vosk |
| **Exports** | jsPDF, XLSX, CSV utilities |
| **Styling** | NASA dark-glass aesthetic |

---

## 8. Features in Detail

### 1. Semantic Search
`query → embedding → vector similarity → top-K results`

- KNN search via `chroma_service.py` and `knn_service.py`

### 2. Summarization
- Summarizes paper abstracts and metadata  
- Uses OpenAI’s summarization endpoint  

### 3. Voice Search
- Microphone input → Whisper/Vosk → text → semantic search  

### 4. Export Module
- `web/src/utils/exportUtils.ts`
- Export results as **PDF, CSV, Excel, TXT**
- NASA-branded layout and styling  

---

## 9. Future Additions

| Planned Feature | Description |
|------------------|-------------|
| **Topic Clustering** | Auto-group papers via k-means or HDBSCAN |
| **Research Graph** | Visual knowledge map of studies and authors |
| **User Profiles** | Saved bookmarks, history, insights |
| **API Gateway** | Public integration with research tools |
| **Fine-Tuned Summarization** | Domain-specific training on NASA datasets |

---

## 10. Learnings

- Embedding-based semantic search **vastly outperforms keyword search**.  
- Persistent vector DBs like **ChromaDB** need efficient I/O optimization.  
- Voice-based search introduces **multi-modal discovery**.  
- Export pipelines improve **researcher productivity**.  
- Collaboration between **frontend (React)** and **backend (FastAPI)** creates scalable modular design.

---

## 11. Conclusion
NASA’s bioscience data holds **transformative potential** — yet remains **underutilized** due to fragmentation and limited discovery tools.  
Our platform bridges this gap using **AI-driven embeddings**, **multilingual support**, and **voice-enabled interaction**, transforming data into **accessible, contextual insights**.

> This prototype lays the groundwork for the future of intelligent research navigation — enabling scientists to find, understand, and act on knowledge faster than ever before.

---

## 🛰️ Appendix: Project File Structure Screenshot
![File Structure](./abb2d08d-3d76-48dc-ba75-1192e307d9f0.png)
