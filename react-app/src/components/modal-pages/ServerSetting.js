import "../../components/servers/server-css/ServerSetting.css";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { BiSolidTrash } from "react-icons/bi";

function ServerSetting() {
  const { serverProfileSettingModal } = useContext(ModalContext);

  return (
    <div className="server-setting-container">
      <div className="server-inner">
        <div className="settings-navigation">
          <p className="setting-navigation-title">name</p>
          <div>
            <div>
              <p className="setting-navigation-section-name">Server Settings</p>
            </div>
            <div onClick={(e) => serverProfileSettingModal()}>
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

        <div className="server-inner-2">
          <form onSubmit={""} className="server-setting-form">
            <h3 className="server-setting-header">Server Overview</h3>

            <div className="server-setting-form-main">
              <div className="server-setting-image-container">
                <img className="server-setting-image" />
                <button className="remove-server-image">Remove</button>
              </div>
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
                  Server Name
                </label>
                <input
                  type="text"
                  className="server-setting-input-field"
                  style={{ marginBottom: "10px" }}
                ></input>
                <label
                  style={{
                    color: "#99aab5",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  Image Url
                </label>
                <input
                  type="url"
                  className="server-setting-input-field"
                  style={{ marginBottom: "38px" }}
                ></input>
              </div>
            </div>
            <div className="server-setting-save-delete-button">
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

export default ServerSetting;
