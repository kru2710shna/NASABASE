import React from "react";
import "../styles/SummaryModal.css";

interface Props {
  summary: string | null;
  loading: boolean;
  onClose: () => void;
}

const SummaryModal: React.FC<Props> = ({ summary, loading, onClose }) => {
  if (!summary && !loading) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>🧠 Research Overview</h2>
          <button onClick={onClose} className="close-btn" title="Close">
            ✖
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <p className="loading-text">⏳ Generating summary...</p>
          ) : (
            <pre className="summary-content">{summary}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
