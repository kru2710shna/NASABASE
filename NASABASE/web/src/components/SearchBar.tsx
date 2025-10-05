import React, { useEffect, useMemo, useState } from "react";
import "../styles/App.css";

type Props = {
  onSearch: (q: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ onSearch, placeholder }) => {
  const [value, setValue] = useState("");

  // --- Debounce typed search ---
  const debounced = useMemo(() => {
    let timeoutId: number | undefined;
    return (v: string) => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => onSearch(v), 350);
    };
  }, [onSearch]);

  useEffect(() => {
    debounced(value);
  }, [value, debounced]);

  return (
    <div className="search-container">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? "Search the cosmos..."}
        className="search-input"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
