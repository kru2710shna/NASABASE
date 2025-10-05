import React from "react";
import "../styles/SummaryModal.css";

interface Props {
  summary: string | null;
  loading: boolean;
  onClose: () => void;
}

const SummaryModal: React.FC<Props> = ({ summary, loading, onClose }) => {
  if (!summary) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Research Overview</h2>
        {loading ? (
          <p>⏳ Generating summary...</p>
        ) : (
          <pre className="summary-text">{summary}</pre>
        )}
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default SummaryModal;
