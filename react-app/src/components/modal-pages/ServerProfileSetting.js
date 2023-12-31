import "../../components/servers/server-css/ServerSetting.css";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidTrash } from "react-icons/bi";
import "./modal-css/ServerProfileSetting.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteServerThunk, getAllServersThunk } from "../../store/server";
import {
  updateServerNicknameThunk,
  getSingleMemberThunk,
  getServerMembersThunk,
} from "../../store/members";
import { memberUpdate } from "../utils/Socket";

function ServerProfileSetting() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { serverSettingModal, setType, deleteServerConfirmationModal } =
    useContext(ModalContext);
  const { server } = useContext(InfoContext);
  const [nickname, setNickname] = useState("");
  const [currentNickname, setCurrentNickname] = useState("");
  const { serverid, channelid } = useParams();

  useEffect(() => {
    (async (e) => {
      const member = await dispatch(getSingleMemberThunk(serverid));

      if (member && member.nickname) {
        setCurrentNickname(member.nickname);
        setNickname(member.nickname);
      }
    })();
  }, []);

  const updateNicknameHandleSubmit = async (e) => {
    e.preventDefault();

    const member = await dispatch(
      updateServerNicknameThunk(server.id, nickname)
    );
    memberUpdate({
      server_id: serverid,
      member_id: member.id,
      action_type: "EDIT",
      member: member,
    });
    // await dispatch(getServerMembersThunk(server.id));
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
          {server.owner_id === user.id && (
            <div>
              <div className="setting-separator"></div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p
                  className="setting-navigation-section-name delete-server"
                  onClick={(e) => deleteServerConfirmationModal()}
                >
                  Delete Server <BiSolidTrash style={{ marginLeft: "7px" }} />
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="server-profile-inner-2">
          <form
            className="server-profile-form"
            onSubmit={updateNicknameHandleSubmit}
          >
            <h3 className="server-profile-header">
              Server Profile{" "}
              <IoCloseOutline
                className="exit-server-profile"
                onClick={(e) => setType(null)}
              />
            </h3>

            <div className="server-setting-form-main">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
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
                  placeholder={nickname}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                ></input>
              </div>
            </div>
            {nickname !== currentNickname && (
              <div className="server-profile-save-delete-button server-profile-save">
                <button type="submit" className="server-save-button">
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServerProfileSetting;
