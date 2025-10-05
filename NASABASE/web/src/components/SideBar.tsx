import React, { useState } from "react";
import "../styles/Sidebar.css";
import History from "./History";

interface Props {
  onSelectHistory: (query: string) => void;
  onNavigate: (view: "home" | "bookmarks" | "voice") => void; 
}

const SideBar: React.FC<Props> = ({ onSelectHistory, onNavigate }) => { 
  const [showHistory, setShowHistory] = useState(false);

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Navigation</h2>

      <ul className="sidebar-list">
        <li onClick={() => onNavigate("home")}>Home</li>
        <li onClick={() => setShowHistory(!showHistory)}>History</li>
        <li onClick={() => onNavigate("voice")}>Voice Search</li>
        <li onClick={() => onNavigate("bookmarks")}>Bookmarks</li>
        <li>Settings</li>
        <li>Live Feed</li>
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
