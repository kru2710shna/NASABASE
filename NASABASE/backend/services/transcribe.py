import os
import tempfile
from typing import Optional, List, Dict, Any
from fastapi import UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# pip install faster-whisper fastapi uvicorn pydantic
# Make sure ffmpeg is installed on your system (faster-whisper uses it under the hood).

from faster_whisper import WhisperModel
# Load model once at startup

MODEL_SIZE = os.getenv("WHISPER_MODEL_SIZE", "base")  # e.g., tiny, base, small, medium, large-v3
COMPUTE_TYPE = os.getenv("WHISPER_COMPUTE_TYPE", "auto")  # auto, int8, float16, float32
model = WhisperModel(MODEL_SIZE, compute_type=COMPUTE_TYPE)

async def transcribe(
    audio: UploadFile = File(...),
    language: Optional[str] = Form(default="en"),
    translate: Optional[bool] = Form(default=False),
    beam_size: Optional[int] = Form(default=5),
    vad_filter: Optional[bool] = Form(default=True),
):
    """
    Accepts short audio (webm/ogg/mp3/wav/m4a).
    Returns: { text, segments: [{start,end,text}], info: {language, duration, ...} }
    """
    # Persist to a temp file so faster-whisper/ffmpeg can read it
    suffix = os.path.splitext(audio.filename or "")[-1] or ".webm"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        data = await audio.read()
        tmp.write(data)
        tmp_path = tmp.name
        print(f"Saved to {tmp_path}")
    try:
        segments, info = model.transcribe(
            tmp_path,
            language=language if language else None,
            task="translate" if translate else "transcribe",
            beam_size=beam_size,
            vad_filter=vad_filter,
        )
        print("hi")
        out_segments: List[Dict[str, Any]] = []
        text_parts = []
        for seg in segments:
            out_segments.append({
                "id": seg.id,
                "start": seg.start,
                "end": seg.end,
                "text": seg.text,
                "avg_logprob": seg.avg_logprob,
                "no_speech_prob": seg.no_speech_prob,
                "compression_ratio": seg.compression_ratio,
            })
            text_parts.append(seg.text)

        result = {
            "text": " ".join(part.strip() for part in text_parts).strip(),
            "segments": out_segments,
            "info": {
                "language": info.language,
                "language_probability": info.language_probability,
                "duration": info.duration,
            },
        }
        print(f"Transcription result: {result['text'][:100]}...")
        return JSONResponse(result)

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
