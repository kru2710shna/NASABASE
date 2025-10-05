import React from "react";
import "../styles/Pagination.css";

const Pagination: React.FC = () => {
  return (
    <div className="pagination">
      <button>&laquo; Prev</button>
      <span>Page 1 of 5</span>
      <button>Next &raquo;</button>
    </div>
  );
};

export default Pagination;
