# ===============================================================
# 🚀 NASA Space Biology Knowledge Engine Backend (FastAPI)
# ===============================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.search import router as search_router
from backend.routes.audio import router as audio_router

from backend.routes.summarize import router as summarize_router
app = FastAPI(title="NASA Space Biology Knowledge Engine API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router, prefix="/api")
<<<<<<< HEAD
app.include_router(audio_router)

=======
app.include_router(summarize_router, prefix="/api")  
>>>>>>> 01bb5fc (WIP: backend summarize route + ChromaDB updates)
@app.get("/")
def root():
    return {"message": "🚀 NASA API backend running"}
