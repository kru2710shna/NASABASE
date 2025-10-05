# ===============================================================
# 🧠 Enhanced Summarization Route – NASA Space Biology Knowledge Engine
# ===============================================================
from fastapi import APIRouter, HTTPException
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/summarize")
async def summarize_text(payload: dict):
    """
    Summarize a selected research paper in structured format.
    Expects JSON: { "title": str, "keywords": str, "link": str }
    """
    title = payload.get("title", "")
    keywords = payload.get("keywords", "")
    link = payload.get("link", "")

    if not title:
        raise HTTPException(status_code=400, detail="Title is required for summarization")

    try:
        # Generate summary with structured academic tone
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            temperature=0.4,
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert NASA scientific summarizer. Provide detailed yet clear overviews of research papers for academic dashboards."
                },
                {
                    "role": "user",
                    "content": f"""
Summarize this NASA-related research paper in a structured academic format.

Title: {title}
Keywords: {keywords}

Return the summary in the following JSON-like structure (no code block):
Overview: <short 2–3 paragraph readable summary>,
Authors: <list if known or 'Not specified'>,
Year: <year if found or 'Unknown'>,
Key Contributions: <bullet list>,
Application or Relevance: <how it relates to NASA or space biology>,
Source: {link}
"""
                }
            ],
            max_tokens=500
        )

        text = response.choices[0].message.content.strip()
        return {"summary": text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
