import React, { useState } from "react";
import "../styles/Sidebar.css";
import History from "./History";

interface Props {
  onSelectHistory: (query: string) => void;
}

const SideBar: React.FC<Props> = ({ onSelectHistory }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Navigation</h2>

      <ul className="sidebar-list">
        <li>🏠 Home</li>
        <li onClick={() => setShowHistory(!showHistory)}>
          🕓 History {showHistory ? "▲" : "▼"}
        </li>
        <li>🎙️ Voice Search</li>
        <li>🔖 Bookmarks</li>
        <li>⚙️ Settings</li>
        <li>🛰️ Live Feed</li>
      </ul>

      {showHistory && (
        <div className="sidebar-history">
          <History onSelect={onSelectHistory} />
        </div>
      )}
    </aside>
  );
};

export default SideBar;
