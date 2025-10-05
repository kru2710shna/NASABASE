import React from "react";
import "../styles/FiltersPanel.css";

const FiltersPanel: React.FC = () => {
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
    </aside>
  );
};

export default FiltersPanel;
