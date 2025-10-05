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
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const SearchSection: React.FC<Props> = ({
  results,
  onSearch,
  onSummarize,
  onBookmark,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <section className="search-section">
      <div className="search-wrap">
        <SearchBar onSearch={onSearch} placeholder="Search the cosmos..." />
      </div>

      <div className="results-container">
        {results.length === 0 ? (
          <p className="muted">No results yet. Try searching!</p>
        ) : (
          results.map((r, i) => (
            <div key={r.id ?? i} onDoubleClick={() => onBookmark(r)}>
              <ResultCard result={r} onSummarize={onSummarize} />
            </div>
          ))
        )}
      </div>

      {/* Pagination fixed below all result cards */}
      {Boolean(totalPages && onPageChange) && (totalPages as number) > 1 && (
        <div className="pagination-wrap">
          <Pagination
            currentPage={currentPage as number}
            totalPages={totalPages as number}
            onPageChange={onPageChange as (p: number) => void}
          />
        </div>
      )}
    </section>
  );
};

export default SearchSection;
