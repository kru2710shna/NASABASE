import React from "react";
import "../styles/SearchSection.css";
import SearchBar from "./SearchBar";
import ResultCard from "./ResultCard";
import Pagination from "./Pagination";

interface Props {
  results: any[];
  onSearch: (q: string) => void;
  onSummarize: (paper: any) => void;
  onBookmark: (paper: any) => void;
}

const SearchSection: React.FC<Props> = ({ results, onSearch, onSummarize, onBookmark }) => {
  return (
    <section className="search-section">
      <div className="search-wrap">
        <SearchBar onSearch={onSearch} placeholder="Search the cosmos..." />
      </div>

      <div className="results-container">
        {results.map((r, i) => (
          <div key={i} onDoubleClick={() => onBookmark(r)}>
            <ResultCard result={r} onSummarize={onSummarize} />
          </div>
        ))}
      </div>

      {results.length > 0 && <Pagination />}
    </section>
  );
};

export default SearchSection;
