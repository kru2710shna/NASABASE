# ===============================================================
# 🔍 Search Route – NASA Space Biology Knowledge Engine
# ===============================================================
from fastapi import APIRouter, Query
from services.knn_service import knn_search

router = APIRouter()

@router.get("/search")
def search_route(query: str = Query(..., description="Search query"), num_results: int = Query(5, alias="num_results")):
    """Perform semantic search using KNN service"""
    return knn_search(query, n_results=num_results)
