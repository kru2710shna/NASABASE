# app.py
import os
import tempfile
from typing import Optional, List, Dict, Any
from fastapi import APIRouter
from fastapi import UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from services.transcribe import transcribe
# from fastapi.responses import JSONResponse

# pip install faster-whisper fastapi uvicorn pydantic
# Make sure ffmpeg is installed on your system (faster-whisper uses it under the hood).

# from faster_whisper import WhisperModel


router = APIRouter()

@router.post("/transcribe")
async def route_transcribe(
    audio: UploadFile = File(...),
    language: Optional[str] = Form(default="en"),
    translate: Optional[bool] = Form(default=False),
    beam_size: Optional[int] = Form(default=5),
    vad_filter: Optional[bool] = Form(default=True),
):
    print(f"Received file: {audio.filename}, language={language}, translate={translate}, beam_size={beam_size}, vad_filter={vad_filter}")
    return await transcribe(audio, language, translate, beam_size, vad_filter)

