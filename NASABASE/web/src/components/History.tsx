import React, { useEffect, useState } from "react";
import "../styles/History.css";

interface HistoryItem {
  query: string;
  time: string;
}

interface Props {
  onSelect: (query: string) => void;
}

const History: React.FC<Props> = ({ onSelect }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  // Clear all
  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  return (
    <div className="history-panel">
      <h2 className="history-title">Search History</h2>

      {history.length === 0 ? (
        <p className="history-empty">No previous searches</p>
      ) : (
        <ul className="history-list">
          {history.map((item, idx) => (
            <li
              key={idx}
              className="history-item"
              onClick={() => onSelect(item.query)}
            >
              <span className="history-query">{item.query}</span>
              <span className="history-time">{item.time}</span>
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && (
        <button onClick={clearHistory} className="history-clear">
          Clear All
        </button>
      )}
    </div>
  );
};

export default History;
