# ===============================================================
# 🚀 NASA Space Biology Knowledge Engine Backend (FastAPI)
# ===============================================================

import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# === Route Imports ===
from routes.search import router as search_router
from routes.audio import router as audio_router
from routes.summarize import router as summarize_router

# === App Initialization ===
app = FastAPI(title="NASA Space Biology Knowledge Engine API")

# === CORS Middleware ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Register Routes ===
app.include_router(search_router, prefix="/api", tags=["Search"])
app.include_router(audio_router, prefix="/api", tags=["Audio"])
app.include_router(summarize_router, prefix="/api", tags=["Summarize"])

# === Health Check / Root ===
@app.get("/")
def root():
    return {"status": "online", "message": "🚀 NASA API backend running"}


# === Uvicorn Entrypoint ===
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
