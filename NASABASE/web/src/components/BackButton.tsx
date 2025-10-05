import React from "react";
import "../styles/BackButton.css";

interface Props {
  onClick: () => void;
}

const BackButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className="back-btn" onClick={onClick}>
      ⬅ Back to Home
    </button>
  );
};

export default BackButton;
