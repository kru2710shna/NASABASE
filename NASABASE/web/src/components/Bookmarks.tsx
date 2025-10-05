import React from "react";
import "../styles/Bookmarks.css";

interface Props {
  bookmarks: any[];
}

const Bookmarks: React.FC<Props> = ({ bookmarks }) => {
  if (bookmarks.length === 0)
    return (
      <section className="bookmarks-section">
        <h2>No bookmarks yet 🌌</h2>
        <p>Double-click a result to save it for later exploration.</p>
      </section>
    );

  return (
    <section className="bookmarks-section">
      <h2 className="bookmarks-title">Your Bookmarked Papers</h2>
      <div className="bookmarks-container">
        {bookmarks.map((b, i) => (
          <div key={i} className="bookmark-card">
            <h3>{b.title}</h3>
            <p className="keywords">
              <strong>Keywords:</strong> {b.keywords}
            </p>
            <a href={b.link} target="_blank" rel="noopener noreferrer" className="source-link">
              🔗 View Source
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bookmarks;
