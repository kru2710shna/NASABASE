import React from "react";
import "../styles/SearchSection.css";
import SearchBar from "./SearchBar";
import ResultCard from "./ResultCard";
import Pagination from "./Pagination";

interface Props {
  results: any[];
  onSearch: (q: string) => void;
  onSummarize: (paper: any) => void;
}

const SearchSection: React.FC<Props> = ({ results, onSearch, onSummarize }) => {
  return (
    <section className="search-section">
      <div className="search-wrap">
        <SearchBar onSearch={onSearch} placeholder="Search the cosmos..." />
      </div>

      <div className="results-container">
        {results.map((r, i) => (
          <ResultCard key={i} result={r} onSummarize={onSummarize} />
        ))}
      </div>

      {results.length > 0 && <Pagination />}
    </section>
  );
};

export default SearchSection;
