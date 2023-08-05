import "../../components/servers/server-css/ServerSetting.css";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidTrash } from "react-icons/bi";
import { InfoContext } from "../../context/infoContext";
import {
  updateServerThunk,
  getAllServersThunk,
  deleteServerThunk,
} from "../../store/server";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function ServerSetting() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverid } = useParams()
  const { serverProfileSettingModal, setType } = useContext(ModalContext);
  const { server, setServer } = useContext(InfoContext);

  const [serverName, setServerName] = useState(server.name);
  const [serverImage, setServerImage] = useState("");

  const initials = (serverName) => {
    let res = "";
    const serverNameArr = serverName.split(" ");

    for (let i = 0; i < serverNameArr.length; i++) {
      let word = serverNameArr[i];
      res += word[0].toUpperCase();
    }
    return res;
  };

  const updateServerHandleSubmit = async (e) => {
    await dispatch(updateServerThunk(server.id, serverName, serverImage));
    await dispatch(getAllServersThunk());

    return setServer(server);
  };

  const deleteServerHandleSubmit = async () => {
    await dispatch(deleteServerThunk(server.id));
    await dispatch(getAllServersThunk());
    setType(null);
    return history.push("/app");
  };

  return (
    <div className="server-setting-container">
      <div className="server-inner">
        <div className="settings-navigation">
          <p className="setting-navigation-title">{server.name}</p>
          <div>
            <div>
              <p className="setting-navigation-section-name highlight-server-setting">
                Server Settings
              </p>
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
            <p
              className="setting-navigation-section-name delete-server"
              onClick={(e) => deleteServerHandleSubmit()}
            >
              Delete Server <BiSolidTrash style={{ marginLeft: "7px" }} />
            </p>
          </div>
        </div>

        <div className="server-inner-2">
          <form
            onSubmit={(e) => updateServerHandleSubmit()}
            className="server-setting-form"
          >
            <h3 className="server-setting-header">Server Overview <IoCloseOutline className="exit-server-profile" onClick={e => setType(null)}/></h3>
            <div className="server-setting-form-main">
              <div className="server-setting-image-container">
                {server.image_url ? (
                  <img
                    className="server-setting-image"
                    src={server.image_url}
                  />
                ) : (
                  <div className="server-setting-image-initials">
                    {initials(server.name)}
                  </div>
                )}
                {server.image_url && (
                  <button className="remove-server-image">Remove</button>
                )}
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
                  placeholder={server.name}
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
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
                  value={serverImage}
                  onChange={(e) => setServerImage(e.target.value)}
                ></input>
              </div>
            </div>
            {(server.name !== serverName || serverImage) &&
            <div className="server-setting-save-delete-button">
              <button type="submit" className="server-save-button">
                Save Changes
              </button>
            </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServerSetting;
