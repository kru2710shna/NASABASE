import React from "react";
import "../App.css";

const Logo: React.FC = () => {
  return (
    <h1
      className="nasa-logo"
      aria-label="NASA"
      style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
    >
      NASA
    </h1>
  );
};

export default Logo;
