import "../../components/servers/server-css/ServerSetting.css";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { BiSolidTrash } from "react-icons/bi";
import { InfoContext } from "../../context/infoContext";
import { getAllServersThunk, deleteServerThunk } from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ServerUpdateFormPage from "./ServerUpdateFormPage";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ServerSetting() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverid, channelid } = useParams();

  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers[serverid]);

  const { serverProfileSettingModal, setType } = useContext(ModalContext);

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
          {server.owner_id === user.id && (
            <div>
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
          )}
        </div>

        <div className="server-inner-2">
          <ServerUpdateFormPage server={server} user={user} setType={setType} />
        </div>
      </div>
    </div>
  );
}

export default ServerSetting;
