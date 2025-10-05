import React, { useState } from "react";
import "../styles/Sidebar.css";
import History from "./History";
import {
  exportToCSV,
  exportToExcel,
  exportToTXT,
  exportToPDF,
} from "../utils/exportUtils";

interface Props {
  onSelectHistory: (query: string) => void;
  onNavigate: (view: "home" | "bookmarks" | "voice") => void;
  results?: any[];
}

const SideBar: React.FC<Props> = ({ onSelectHistory, onNavigate, results = [] }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleExport = (type: string) => {
    if (!results || results.length === 0) {
      alert("No results available to export.");
      return;
    }

    switch (type) {
      case "csv":
        exportToCSV(results);
        break;
      case "excel":
        exportToExcel(results);
        break;
      case "txt":
        exportToTXT(results);
        break;
      case "pdf":
        exportToPDF(results);
        break;
      default:
        alert("Unknown export format.");
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Navigation</h2>
      <ul className="sidebar-list">
        <li onClick={() => onNavigate("home")}>Home</li>
        <li onClick={() => setShowHistory(!showHistory)}>History</li>
        <li onClick={() => onNavigate("voice")}>Voice Search</li>
        <li onClick={() => onNavigate("bookmarks")}>Bookmarks</li>

        <li onClick={() => setShowExport(!showExport)}>Export Results</li>
        {showExport && (
          <ul className="export-list">
            <li onClick={() => handleExport("pdf")}>Export as PDF</li>
            <li onClick={() => handleExport("csv")}>Export as CSV</li>
            <li onClick={() => handleExport("excel")}>Export as Excel</li>
            <li onClick={() => handleExport("txt")}>Export as TXT</li>
          </ul>
        )}

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
