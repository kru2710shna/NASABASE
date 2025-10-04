import React from "react";
import "../App.css";

const Header: React.FC = () => {
  return (
    <header className="site-header" role="banner">
      {/* Left: NASA mark */}
      <div className="brand-left">
        <img src="/nasa-logo.svg" alt="NASA" className="brand-img" />
      </div>

      {/* Center: Title */}
      <h2 className="site-title" aria-label="NASA Space Apps Challenge">
        NASA Space Apps Challenge
      </h2>

      {/* Right spacer to keep title perfectly centered */}
      <div className="brand-right" />
    </header>
  );
};

export default Header;
