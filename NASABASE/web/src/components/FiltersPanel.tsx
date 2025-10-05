// components/FiltersPanel.tsx
import React from "react";
import "../styles/FiltersPanel.css";

type Props = {
  resultsLimit: number;                 // controlled value
  onChangeResultsLimit: (n: number) => void; // setter from parent
};

const FiltersPanel: React.FC<Props> = ({ resultsLimit, onChangeResultsLimit }) => {
  return (
    <aside className="filters">
      <h3 className="filters-title">Filters</h3>

      <div className="filter-group">
        <p>📅 Year Range</p>
        <input type="range" min="2000" max="2025" />
      </div>

      <div className="filter-group">
        <p>🔬 Category</p>
        <select>
          <option>All</option>
          <option>Biology</option>
          <option>Physics</option>
          <option>Space Medicine</option>
        </select>
      </div>

      <div className="filter-group">
        <p>🎯 Similarity Cutoff</p>
        <input type="number" min="0" max="1" step="0.1" defaultValue="0.7" />
      </div>

      <div className="filter-group">
        <p>🧮 Number of results</p>
        <select
          value={resultsLimit}
          onChange={(e) => onChangeResultsLimit(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </aside>
  );
};

export default FiltersPanel;
