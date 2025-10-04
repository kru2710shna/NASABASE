import React, { useEffect, useMemo, useState } from "react";
import "../App.css";

type Props = {
  onSearch: (q: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ onSearch, placeholder }) => {
  const [value, setValue] = useState("");

  // 250ms debounce to avoid spamming on each keystroke
  const debounced = useMemo(() => {
    let t: number | undefined;
    return (v: string) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => onSearch(v), 250);
    };
  }, [onSearch]);

  useEffect(() => {
    debounced(value);
  }, [value, debounced]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <label
        htmlFor="global-search"
        className="sr-only"
        style={{ position: "absolute", left: -9999 }}
      >
        Search
      </label>
      <input
        id="global-search"
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
