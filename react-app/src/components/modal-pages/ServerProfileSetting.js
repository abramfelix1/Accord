import "../../components/servers/server-css/ServerSetting.css";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";
import { BiSolidTrash } from "react-icons/bi";
import "./modal-css/ServerProfileSetting.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteServerThunk, getAllServersThunk } from "../../store/server";
import {
  updateServerNicknameThunk,
  getSingleMemberThunk,
} from "../../store/members";

function ServerProfileSetting() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const user = useSelector(state => state.members)
  const { serverSettingModal, setType } = useContext(ModalContext);
  const { server } = useContext(InfoContext);
  // console.log(user, 'current server members')
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    (async () => {
      const member = await dispatch(getSingleMemberThunk(server.id));
      return setNickname(member.nickname);
    })();
  }, [getSingleMemberThunk, setNickname, nickname]);

  const updateNicknameHandleSubmit = async () => {
    await dispatch(updateServerNicknameThunk(server.id, nickname));
    setType(null);
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
            <div onClick={(e) => serverSettingModal()}>
              <p className="setting-navigation-section-name">Server Settings</p>
            </div>
            <div>
              <p className="setting-navigation-section-name highlight-server-setting">
                Server Profile
              </p>
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

        <div className="server-profile-inner-2">
          <form className="server-setting-form">
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
                  placeholder={""}
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
