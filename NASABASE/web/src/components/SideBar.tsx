import React from "react";
import "../styles/SideBar.css";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Navigation</h3>
      <ul className="sidebar-list">
        <li>Home</li>
        <li>History</li>
        <li>Voice Search</li>
        <li>Bookmarks</li>
        <li>Settings</li>
        <li>Live Feed</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
