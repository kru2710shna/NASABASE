import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";
import { searchNASA } from "./api/search";

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (q: string) => {
    const res = await searchNASA(q);
    setResults(res);
  };

  return (
    <div className="App">
      <Header />

      <main className="app-main" role="main">
        <div className="center-stack">
          <div className="search-wrap">
            <SearchBar onSearch={handleSearch} placeholder="Search the cosmos..." />
          </div>
          <Logo />
        </div>

        {results.length > 0 && (
          <div className="results-container">
            {results.map((r, i) => (
              <div key={i} className="result-card">
                <h3>{r.title}</h3>
                <p>{r.keywords}</p>
                <a href={r.link} target="_blank" rel="noopener noreferrer">
                  🔗 View Paper
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      <div className="starfield" aria-hidden />
    </div>
  );
};

export default App;
