import { useState } from "react";
import "./tooltip.css"

function Tooltip({ text, children }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e) => {
      const tooltipRef = document.getElementById("tooltip");
      const tooltipWidth = tooltipRef?.offsetWidth || 0;
      const tooltipHeight = tooltipRef?.offsetHeight || 0;
      
      setPosition({ x: e.clientX - tooltipWidth / 2 + 3, y: e.clientY });
    };
  
    return (
      <div
        className="tooltip"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      >
        {children}
        {position.x !== 0 && position.y !== 0 && (
          <div
            id="tooltip"
            className="tooltiptext"
            style={{ left: 110, top: position.y -10}}
            // style={{ left: position.x + 100, top: position.y -10}}
          >
            {text}
          </div>
        )}
      </div>
    );
  };


export default Tooltip