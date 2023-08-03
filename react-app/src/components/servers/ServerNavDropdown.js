import { useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import "./server-css/ServerNav.css";
import { useParams } from "react-router-dom";

function ServerNavDropDown(props) {
  let isLoading = useSelector((state) => state.channels.isLoading);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const dropdownRef = useRef(null);
  const { openDropdown, toggleDropdown, setToggleDropdown, navRef, server } =
    props;

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
    <>
      {isLoading === false && (
        <div className="inner-server-nav">
          <div className="server-nav-title">
            <div style={{ alignItems: "center", display: "flex" }}>
              {server.name}
            </div>
            {!openDropdown ? (
              <IoIosArrowDown className="server-nav-icons" />
            ) : (
              <RxCross2 className="server-nav-icons" />
            )}
          </div>
          {!openDropdown ? null : (
            <div
              id="server-nav-dropdown"
              className="server-nav-dropdown"
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="server-dropdown-settings">
                <div
                  className="server-dropdown-options"
                  onClick={() => toggleDropdown()}
                >
                  <p>Server Setting</p>
                </div>
                <div
                  className="server-dropdown-options"
                  onClick={() => toggleDropdown()}
                >
                  <p>Create Channel</p>
                </div>
                <div
                  className="server-dropdown-options"
                  onClick={() => toggleDropdown()}
                >
                  <p>Edit Server Profile</p>
                </div>
              </div>

              <div className="server-nav-seperator"></div>

              <div
                className="server-dropdown-settings"
                onClick={() => toggleDropdown()}
              >
                <div className="server-dropdown-leave">
                  <p>Leave Server</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ServerNavDropDown;
