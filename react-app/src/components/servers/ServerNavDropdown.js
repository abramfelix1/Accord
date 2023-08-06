import { useRef, useEffect, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import "./server-css/ServerNav.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";

function ServerNavDropDown(props) {
  let isLoading = useSelector((state) => state.current.isLoading);
  const { serverid, channelid } = useParams();
  const dropdownRef = useRef(null);
  const { openDropdown, toggleDropdown, setToggleDropdown, navRef } = props;
  const { serverSettingModal, createChannelModal, leaveServerModal, serverProfileSettingModal } =
    useContext(ModalContext);
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.current.server);

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
  }, [openDropdown, toggleDropdown, serverid, server]);

  return (
    <>
      {!isLoading && server && serverid && (
        <div className="inner-server-nav">
          <div className="server-nav-title">
            <div className="server-name-nav-bar">
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
                  onClick={(e) => {
                    serverSettingModal();
                    toggleDropdown();
                  }}
                >
                  <p>Server Setting</p>
                </div>
                <div
                  className="server-dropdown-options"
                  onClick={() => {
                    serverProfileSettingModal()
                    toggleDropdown();
                  }}
                >
                  <p>Edit Server Profile</p>
                </div>
                {user.id === server.owner_id && (
                  <div
                    className="server-dropdown-options"
                    onClick={() => {
                      createChannelModal();
                      toggleDropdown();
                    }}
                  >
                    <p>Create Channel</p>
                  </div>
                )}

              </div>
              {user.id !== server.owner_id && (
                <div className="server-nav-seperator"></div>
              )}
              {user.id !== server.owner_id && (
                <div
                  className="server-dropdown-settings"
                  onClick={() => {
                    leaveServerModal();
                    toggleDropdown();
                  }}
                >
                  <div className="server-dropdown-leave">
                    <p>Leave Server</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ServerNavDropDown;
