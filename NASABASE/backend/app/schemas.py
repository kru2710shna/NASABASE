from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: str
    k: int = 10

class SearchHit(BaseModel):
    title: str
    link: str
    keywords: str
    distance: float
    similarity: float  # normalized: 1/(1+distance)

class SearchResponse(BaseModel):
    query: str
    count: int
    results: List[SearchHit]
