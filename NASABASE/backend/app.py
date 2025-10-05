# ===============================================================
# 🚀 NASA Space Biology Knowledge Engine Backend (FastAPI)
# ===============================================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.search import router as search_router

app = FastAPI(title="NASA Space Biology Knowledge Engine API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "🚀 NASA API backend running"}
