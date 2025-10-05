import React from "react";
import "../styles/ResultCard.css";

interface Props {
  result: any;
  onSummarize: (r: any) => void;
}

const ResultCard: React.FC<Props> = ({ result, onSummarize }) => {
  return (
    <div className="result-card">
      <div className="result-header">
        <h3>{result.title}</h3>
      </div>

      <p className="keywords">
        <strong>Keywords:</strong> {result.keywords}
      </p>

      <div className="result-footer">
        <a href={result.link} target="_blank" rel="noreferrer" className="source-link">
          🔗 View Source
        </a>
        <button className="summarize-btn" onClick={() => onSummarize(result)}>
          Summarize
        </button>
      </div>
       <p className="bookmark-hint">Double-click to add to Bookmarks</p>
    </div>
  );
};

export default ResultCard;
