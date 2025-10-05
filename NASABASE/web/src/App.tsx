import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SearchSection from "./components/SearchSection";
import FiltersPanel from "./components/FiltersPanel";
import SummaryModal from "./components/SummaryModal";
import Bookmarks from "./components/Bookmarks";
import BackButton from "./components/BackButton";
import VoiceSearch from "./components/VoiceSearch";

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<"home" | "bookmarks" | "voice">("home");

  const [resultsLimit, setResultsLimit] = useState<number>(() => {
    const saved = localStorage.getItem("resultsLimit");
    return saved ? Number(saved) : 5;
  });
  useEffect(() => {
    localStorage.setItem("resultsLimit", String(resultsLimit));
  }, [resultsLimit]);

  // === Pagination ===
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 7; // only 7 per page

  // === Load bookmarks ===
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  // === Search API ===
  const handleSearch = async (q: string) => {
    if (!q) return;

    const item = { query: q, time: new Date().toLocaleTimeString() };
    const prev = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const updated = [item, ...prev.filter((p: any) => p.query !== q)].slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(updated));

    try {
      const url = `http://127.0.0.1:8000/api/search?query=${encodeURIComponent(q)}&num_results=${resultsLimit}`;
      const res = await fetch(url);
      const data = await res.json();

      setResults(data.results || []);
      setCurrentPage(1); // reset to page 1
      setActiveView("home");
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

  // === Bookmarks ===
  const handleBookmark = (item: any) => {
    const updated = [item, ...bookmarks.filter((b) => b.title !== item.title)];
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  // === Navigation ===
  const handleNavigate = (view: "home" | "bookmarks" | "voice") => {
    setActiveView(view);
  };

  // === Pagination logic ===
  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentResults = results.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Header />
      <main className="layout">
        <SideBar onSelectHistory={handleSearch} onNavigate={handleNavigate} results={results} />

        {activeView === "home" && (
          <SearchSection
            results={currentResults}
            onSearch={handleSearch}
            onSummarize={handleSummarize}
            onBookmark={handleBookmark}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {activeView === "bookmarks" && <Bookmarks bookmarks={bookmarks} />}
        {activeView === "voice" && <VoiceSearch onSearch={handleSearch} />}

        <FiltersPanel
          resultsLimit={resultsLimit}
          onChangeResultsLimit={setResultsLimit}
        />
      </main>

      {activeView === "bookmarks" && (
        <BackButton onClick={() => handleNavigate("home")} />
      )}

      <SummaryModal
        summary={summary}
        loading={loading}
        onClose={() => setSummary(null)}
      />
    </div>
  );
};

export default App;
