import React, { useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SearchSection from "./components/SearchSection";
import FiltersPanel from "./components/FiltersPanel";
import SummaryModal from "./components/SummaryModal";

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // === Search API + Save to History ===
  const handleSearch = async (q: string) => {
    if (!q) return;

    // Save query to local history
    const item = { query: q, time: new Date().toLocaleTimeString() };
    const prev = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const updated = [item, ...prev.filter((p: any) => p.query !== q)].slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(updated));

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/search?query=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      console.error("Search request failed.");
    }
  };

  // === Summarize API ===
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
    } catch {
      setSummary("⚠️ Could not generate summary. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Header />
      <main className="layout">
        <SideBar onSelectHistory={handleSearch} />
        <SearchSection
          results={results}
          onSearch={handleSearch}
          onSummarize={handleSummarize}
        />
        <FiltersPanel />
      </main>
      <SummaryModal
        summary={summary}
        loading={loading}
        onClose={() => setSummary(null)}
      />
    </div>
  );
};

export default App;
