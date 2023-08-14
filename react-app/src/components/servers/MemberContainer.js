import React, { useState, useEffect } from "react";

function MemberContainer({ children }) {
  const [width, setWidth] = useState("");

  return <div className="member-parent-container">{children}</div>;
}

export default MemberContainer;
