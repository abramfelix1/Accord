import React, { useState, useEffect } from "react";

function ServerHover({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="server-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`server-line ${isHovered ? "visible" : "hidden"}`} />
      {children}
    </div>
  );
}

export default ServerHover;
