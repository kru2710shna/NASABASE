import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/App.css";

type Props = {
  onSearch: (q: string) => void;
  placeholder?: string;
  apiBase?: string; // optional, default http://localhost:8000
};

const SearchBar: React.FC<Props> = ({ onSearch, placeholder, apiBase = "http://localhost:8000" }) => {
  const [value, setValue] = useState("");
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // --- Debounce typed search (unchanged) ---
  const debounced = useMemo(() => {
    let t: number | undefined;
    return (v: string) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => onSearch(v), 350);
    };
  }, [onSearch]);

  useEffect(() => {
    debounced(value);
  }, [value, debounced]);

  // --- Clean up stream on unmount ---
  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop?.();
      streamRef.current?.getTracks()?.forEach((t) => t.stop());
      mediaRecorderRef.current = null;
      streamRef.current = null;
    };
  }, []);

  // --- Start recording with MediaRecorder ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mr = new MediaRecorder(stream, {
        mimeType: getSupportedMimeType(),
        audioBitsPerSecond: 128000,
      });

      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = handleStop;
      mr.start(); // start collecting data
      mediaRecorderRef.current = mr;
      setRecording(true);
    } catch (err) {
      console.error(err);
      alert("Could not access microphone. Check browser permissions.");
    }
  };

  // --- Stop recording (triggers upload) ---
  const stopRecording = () => {
    try {
      mediaRecorderRef.current?.stop();
      setRecording(false);
      // stop tracks
      streamRef.current?.getTracks()?.forEach((t) => t.stop());
      streamRef.current = null;
    } catch (e) {
      console.error(e);
    }
  };

  // --- After stop: build Blob and upload to Python backend ---
  const handleStop = async () => {
    const mime = mediaRecorderRef.current?.mimeType || "audio/webm";
    const blob = new Blob(chunksRef.current, { type: mime });
    chunksRef.current = [];

    if (!blob || blob.size === 0) return;

    setUploading(true);
    try {
      const fileName = `audio${mime.includes("ogg") ? ".ogg" : ".webm"}`;
      const form = new FormData();
      form.append("audio", blob, fileName);
      form.append("language", "en");      // optional
      form.append("translate", "false");  // optional

      const res = await fetch(`${apiBase}/transcribe`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `Transcription failed (${res.status})`);
      }

      const json = await res.json();
      const transcript: string = json?.text ?? "";

      if (transcript) {
        setValue(transcript);
        onSearch(transcript);
      } else {
        alert("No speech detected.");
      }
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Upload/transcription error.");
    } finally {
      setUploading(false);
    }
  };

  // --- Helper: pick a mime type that this browser supports ---
  function getSupportedMimeType() {
    const preferred = [
      "audio/webm;codecs=opus",
      "audio/ogg;codecs=opus",
      "audio/webm",
      "audio/ogg",
    ];
    for (const mt of preferred) {
      if ((window as any).MediaRecorder && MediaRecorder.isTypeSupported(mt)) return mt;
    }
    return "audio/webm";
  }

  const onMicClick = () => {
    if (uploading) return; // prevent interaction during upload
    if (!recording) startRecording();
    else stopRecording();
  };

  const micLabel = uploading ? "⏫" : recording ? "⏺️" : "🎤";

  return (
    <div className="search-container">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? "Search the cosmos..."}
        className="search-input"
        autoComplete="off"
        disabled={uploading}
      />
      <button
        onClick={onMicClick}
        className="mic-btn"
        aria-label={recording ? "Stop recording" : "Start voice search"}
        disabled={uploading}
        title={recording ? "Stop recording" : "Start voice search"}
      >
        {micLabel}
      </button>
    </div>
  );
};

export default SearchBar;
