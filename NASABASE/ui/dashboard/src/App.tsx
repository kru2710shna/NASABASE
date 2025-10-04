import React from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Logo from "./components/Logo";

const App: React.FC = () => {
  const handleSearch = (q: string) => {
    // Hook to an API later
    // eslint-disable-next-line no-console
    console.log("search:", q);
  };

  return (
    <div className="App">
      {/* Fixed header with top-left logo and top-center title */}
      <Header />

      {/* Main: centered stack; search bar sits above the big NASA wordmark */}
      <main className="app-main" role="main">
        <div className="center-stack">
          <div className="search-wrap">
            <SearchBar onSearch={handleSearch} placeholder="Search the cosmos..." />
          </div>
          <Logo />
        </div>
      </main>

      {/* Decorative background behind everything */}
      <div className="starfield" aria-hidden />
    </div>
  );
};

export default App;
