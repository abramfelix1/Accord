import React, { useState, useEffect } from "react";

function ServerHover({ children }) {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    console.log("IS HOVERED:", isHovered);
  }, [isHovered]);

  return (
    <div
      className="server-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <div className="server-line" />}
      {children}
    </div>
  );
}

export default ServerHover;
