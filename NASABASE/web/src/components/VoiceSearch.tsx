import React, { useState, useRef, useEffect } from "react";
import GlobeWrapper from "./GlobeWrapper";
import "../styles/VoiceSearch.css";

interface Props {
  onSearch: (query: string) => void;
}

const VoiceSearch: React.FC<Props> = ({ onSearch }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const recognitionRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  // ✅ Load globe only in browser
  useEffect(() => setIsClient(typeof window !== "undefined"), []);

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
      setMessage("🎙️ Listening... speak your query clearly.");
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setQuery(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (query.trim()) {
        setMessage("🚀 Processing query and navigating home for results...");
        onSearch(query.trim()); // Pass query to App.tsx → triggers handleSearch
      } else {
        setMessage("⚠️ No speech detected. Please try again.");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    setMessage("🛑 Recording stopped.");
  };

  return (
    <section className="voice-section">
      <h1 className="voice-title">Voice Search Interface</h1>
      <p className="voice-subtitle">
        Speak your query — our AI will automatically bring your NASA data results home.
      </p>

      <div className={`voice-globe-container ${isRecording ? "active" : ""}`}>
        {isClient && (
          <GlobeWrapper
            height={480}
            width={480}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            atmosphereColor="#00ffff"
            atmosphereAltitude={0.3}
          />
        )}
      </div>

      <div className="voice-controls">
        <input
          className="voice-input"
          value={query}
          placeholder="Your spoken query will appear here..."
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="voice-buttons">
          {!isRecording ? (
            <button className="start-btn" onClick={startRecording}>
              🎙️ Start Listening
            </button>
          ) : (
            <button className="stop-btn" onClick={stopRecording}>
              ⏹ Stop Recording
            </button>
          )}
        </div>

        {message && <p className="voice-message">{message}</p>}
      </div>
    </section>
  );
};

export default VoiceSearch;
