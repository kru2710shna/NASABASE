# ===============================================================
# 🔍 Search Route – NASA Space Biology Knowledge Engine
# ===============================================================
from fastapi import APIRouter, Query
from backend.services.knn_service import knn_search

router = APIRouter()

@router.get("/search")
def search_route(query: str = Query(..., description="Search query")):
    """Perform semantic search using KNN service"""
    return knn_search(query)
