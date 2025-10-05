import React, { useEffect, useMemo, useState } from "react";
import "../App.css";

type Props = {
  onSearch: (q: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ onSearch, placeholder }) => {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  let recognition: any;

  // 🔊 Voice setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setValue(transcript);
        onSearch(transcript);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);
    } else {
      alert("Voice recognition not supported in this browser 😕");
    }
  };

  // Debounce text search
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

  return (
    <div className="search-container">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? "Search the cosmos..."}
        className="search-input"
        autoComplete="off"
      />
      <button
        onClick={startListening}
        className="mic-btn"
        aria-label="Voice Search"
      >
        {listening ? "🎙️" : "🎤"}
      </button>
    </div>
  );
};

export default SearchBar;
