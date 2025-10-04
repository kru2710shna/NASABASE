import queue
import threading
import numpy as np
import sounddevice as sd
from faster_whisper import WhisperModel
import tkinter as tk
from tkinter import scrolledtext

# Config
MODEL_SIZE = "base"
SAMPLE_RATE = 16000
BLOCK_DUR = 0.2

# Global state
audio_q = queue.Queue()
recording = False
thread = None

# Initialize model
model = WhisperModel(MODEL_SIZE, device="cpu", compute_type="int8")

# GUI setup
root = tk.Tk()
root.title("Real-Time Whisper Transcriber")
root.geometry("700x500")

text_area = scrolledtext.ScrolledText(root, wrap=tk.WORD, font=("Arial", 12))
text_area.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

def audio_callback(indata, frames, time, status):
    if status:
        print(status)
    if recording:
        audio_q.put(indata.copy())

def transcribe_audio():
    global recording
    segments, info = model.transcribe(
        audio_stream_generator(),
        vad_filter=True,
        condition_on_previous_text=False,
        chunk_length=10,
    )
    text_area.insert(tk.END, f"Detected language: {info.language}\n\n")
    for segment in segments:
        if not recording:
            break
        text_area.insert(tk.END, f"[{segment.start:.2f} → {segment.end:.2f}] {segment.text}\n")
        text_area.see(tk.END)

def audio_stream_generator():
    while recording:
        chunk = audio_q.get()
        if chunk.ndim == 2:
            chunk = np.mean(chunk, axis=1)
        yield chunk

def start_transcription():
    global recording, thread, stream
    if recording:
        return
    text_area.insert(tk.END, "🎙️ Recording started...\n")
    recording = True
    stream = sd.InputStream(samplerate=SAMPLE_RATE, channels=1,
                            callback=audio_callback, blocksize=int(SAMPLE_RATE * BLOCK_DUR))
    stream.start()
    thread = threading.Thread(target=transcribe_audio, daemon=True)
    thread.start()

def stop_transcription():
    global recording, stream
    if not recording:
        return
    recording = False
    stream.stop()
    text_area.insert(tk.END, "\n🛑 Recording stopped.\n")

start_btn = tk.Button(root, text="Start", command=start_transcription,
                      bg="green", fg="white", font=("Arial", 12), width=10)
start_btn.pack(pady=5)

stop_btn = tk.Button(root, text="Stop", command=stop_transcription,
                     bg="red", fg="white", font=("Arial", 12), width=10)
stop_btn.pack(pady=5)

root.mainloop()
