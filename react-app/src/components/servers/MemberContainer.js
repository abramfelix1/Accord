import React, { useState, useEffect } from "react";

function MemberContainer({ children, cardPosition }) {
  const viewportHeight = window.innerHeight;
  const profileHeight = 305;

  return (
    <div
      className="member-parent-container"
      style={{
        bottom: cardPosition + profileHeight > viewportHeight ? 0 : "auto",
      }}
    >
      {children}
    </div>
  );
}

export default MemberContainer;
