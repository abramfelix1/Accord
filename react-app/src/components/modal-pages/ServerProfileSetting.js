import "../../components/servers/server-css/ServerSetting.css";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import { BiSolidTrash } from "react-icons/bi";
import './modal-css/ServerProfileSetting.css'


function ServerProfileSetting() {
  const { serverSettingModal } = useContext(ModalContext);

  const [nickname, setNickname] = useState('')


  return (
    <div className="server-setting-container">
      <div className="server-inner">
        <div className="settings-navigation">
          <p className="setting-navigation-title">name</p>
          <div>
            <div onClick={e => serverSettingModal() }>
              <p className="setting-navigation-section-name">Server Settings</p>
            </div>
            <div>
              <p className="setting-navigation-section-name">Server Profile</p>
            </div>
          </div>
          <div className="setting-separator"></div>
          <p className="setting-navigation-title">User Settings</p>
          <div>
            <p className="setting-navigation-section-name">My Account</p>
          </div>
          <div className="setting-separator"></div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="setting-navigation-section-name">Delete Server</p>
            <BiSolidTrash style={{ color: "#ADADAD" }} />
          </div>
        </div>

        <div className="server-profile-inner-2">
          <form onSubmit={""} className="server-setting-form">
            <h3 className="server-setting-header">Server Profile</h3>

            <div className="server-setting-form-main">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <label
                  style={{
                    color: "#99aab5",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  Server Nickname
                </label>
                <input
                  type="text"
                  className="server-setting-input-field"
                  style={{ marginBottom: "10px" }}
                  placeholder=""
                ></input>
              </div>
            </div>
            <div className="server-profile-save-delete-button server-profile-save">
              <button type="submit" className="server-save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServerProfileSetting;
