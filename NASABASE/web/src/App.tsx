import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q: string) => {
    if (!q) return;
    const res = await fetch(`http://127.0.0.1:8000/api/search?query=${encodeURIComponent(q)}`);
    const data = await res.json();
    setResults(data.results || []);
  };

  const handleSummarize = async (paper: any) => {
    setLoading(true);
    setSummary(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: paper.title,
          keywords: paper.keywords,
          link: paper.link,
        }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (e) {
      setSummary("⚠️ Could not generate summary. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <div className="center-stack">
          <div className="search-wrap">
            <SearchBar onSearch={handleSearch} placeholder="Search the cosmos..." />
          </div>
          <Logo />

          {results.length > 0 && (
            <div className="results-container">
              {results.map((r, idx) => (
                <div key={idx} className="result-card">
                  <div className="result-header">
                    <h3>{r.title}</h3>
                    <button className="summarize-btn" onClick={() => handleSummarize(r)}>
                      Summarize
                    </button>
                  </div>
                  <p className="keywords"><strong>Keywords:</strong> {r.keywords}</p>
                  <div className="result-meta">
                    <a href={r.link} target="_blank" rel="noopener noreferrer" className="source-link">
                      🔗 View Source
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {summary && (
        <div className="modal">
          <div className="modal-content">
            <h2>Research Overview</h2>
            {loading ? (
              <p>⏳ Generating summary...</p>
            ) : (
              <pre className="summary-text">{summary}</pre>
            )}
            <button onClick={() => setSummary(null)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
