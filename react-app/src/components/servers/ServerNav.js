import { useState, useEffect, useRef } from "react";

import ServerNavDropDown from "./ServerNavDropdown";
import "./server-css/ServerNav.css";

function ServerNav({ server }) {
  const [openDropdown, setToggleDropdown] = useState(false);
  const navRef = useRef();

  const toggleDropdown = () => {
    setToggleDropdown(!openDropdown);
  };

  useEffect(() => {}, [openDropdown]);

  const navActive = openDropdown ? 'server-nav-active' : ''

  return (
    <div
      id={navActive}
      className="server-nav-container"
      onClick={(e) => {
        toggleDropdown();
      }}
      ref={navRef}
    >
      <ServerNavDropDown
        openDropdown={openDropdown}
        toggleDropdown={toggleDropdown}
        setToggleDropdown={setToggleDropdown}
        navRef={navRef}
        server={server}
      />
    </div>
  );
}

export default ServerNav;
