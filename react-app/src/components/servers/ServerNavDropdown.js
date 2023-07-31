import { useRef, useEffect } from 'react';

import './server-css/ServerNav.css'

function ServerNavDropDown(props) {

    const dropdownRef = useRef(null);
    const { openDropdown, toggleDropdown,setToggleDropdown, navRef } = props;

    const handleClickOutside = (event) => {
        if (navRef.current && navRef.current.contains(event.target)) {
          return;
        }

        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setToggleDropdown(false);
        }
      };

      useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, true);

        };
      }, [openDropdown, toggleDropdown]);

    return (
        <div className="inner-server-nav" >
        <div className="server-nav-title">
          <div>Server Navigation</div>
          {!openDropdown ? <div>V</div> : <div>X</div>}
        </div>
        {!openDropdown ? null : (
          <div id='server-nav-dropdown' className="server-nav-dropdown" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
            <div className="server-dropdown-settings">
              <div className="server-dropdown-options" onClick={() => toggleDropdown()}>
                <p>Server Setting</p>
              </div>
              <div className="server-dropdown-options" onClick={() => toggleDropdown()}>
                <p>Create Channel</p>
              </div>
              <div className="server-dropdown-options" onClick={() => toggleDropdown()}>
                <p>Edit Server Profile</p>
              </div>
            </div>

            <div className="server-nav-seperator"></div>

            <div className="server-dropdown-settings" onClick={() => toggleDropdown()}>
              <div className="server-dropdown-leave">
                <p>Leave Server</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default ServerNavDropDown
