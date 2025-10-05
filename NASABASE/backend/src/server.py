# ===============================================================
# 🚀 FastAPI Server – NASA Space Biology Knowledge Engine
# ===============================================================

import sys, os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Make imports work when running via nodemon
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from schemas import SearchRequest, SearchResponse, SearchHit
from search_knn import knn_search

# === Initialize app ===
app = FastAPI(title="NASA Bio Knowledge Engine API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later restrict to localhost:3000 for React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/search", response_model=SearchResponse)
def search(req: SearchRequest):
    try:
        results = knn_search(req.query, req.n_results)
        return SearchResponse(results=[SearchHit(**r) for r in results])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
