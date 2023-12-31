import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/server";
import { joinServerThunk } from "../../store/members";
import "./modal-css/DiscoverServer.css";
import { ModalContext } from "../../context/modalContext";
import { useHistory } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { memberUpdate } from "../utils/Socket";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function DiscoverServerModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setType } = useContext(ModalContext);
  const { serverid, channelid } = useParams();

  const servers = Object.values(useSelector((state) => state.allServers));

  useEffect(() => {
    (async () => {
      await dispatch(serverActions.getAllServersThunk());
    })();
  }, [dispatch]);

  const joinServerHandler = async (server_id) => {
    const server = await dispatch(joinServerThunk(server_id));
    memberUpdate({
      server_id: server.server.server.id,
      member_id: server.id,
      action_type: "CREATE",
      member: server,
    });
    setType(null);
    return history.push(
      `/servers/${server.server_id}/channels/${server.server.server.firstChannel.id}`
    );
  };

  const initials = (serverName) => {
    if (!serverName) return;
    let res = "";
    serverName.trim();
    const serverNameArr = serverName.split(" ");

    for (let i = 0; i < serverNameArr.length; i++) {
      let word = serverNameArr[i];
      if (word && typeof word === "string") {
        res += word[0].toUpperCase();
      }
    }
    if (res.length >= 3) {
      return res.slice(0, 3);
    }
    return res;
  };

  return (
    servers && (
      <div className="discover-server">
        <div className="discover-communities-wrapper">
          <div>
            <h1 className="discover-communities">Discover Communities</h1>
            <IoCloseOutline
              style={{
                position: "absolute",
                height: "40px",
                width: "40px",
                right: "20px",
                top: "20px",
                color: "#dbdee1",
                cursor: "pointer",
              }}
              onClick={(e) => setType(null)}
            />
          </div>
          <p className="discover-description">
            Join communities of similar interests, hobbies, and professions!
          </p>
        </div>
        {!servers && <h2>No Available Servers</h2>}
        <div className="discover-server-list-wrapper">
          {servers.map((server, idx) => {
            return (
              <li
                key={`${server.id}${idx}`}
                className="discover-server-list"
                onClick={(e) => joinServerHandler(server.id)}
              >
                {server.image_url ? (
                  <div style={{ height: "75px", marginBottom: "35px" }}>
                    {server.banner_image ? (
                      <img
                        className="server-banner"
                        src={server.banner_image}
                      />
                    ) : (
                      <div className="server-banner"></div>
                    )}
                    <img
                      src={server.image_url}
                      className="discovery-initial-server-name"
                    />
                  </div>
                ) : (
                  <div style={{ height: "75px", marginBottom: "35px" }}>
                    {server.banner_image ? (
                      <img
                        className="server-banner"
                        src={server.banner_image}
                      />
                    ) : (
                      <div className="server-banner"></div>
                    )}
                    <div className="discovery-initial-server-name">
                      {initials(server?.name)}
                    </div>
                  </div>
                )}
                <div className="server-discovery-content">
                  <div className="server-name-discovery">{server.name}</div>
                  <div className="server-members-discovery-wrapper">
                    <div className="member-tiny-circle"></div>
                    <div className="server-members-discovery">
                      {server.members_count} Members
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      </div>
    )
  );
}

export default DiscoverServerModal;
