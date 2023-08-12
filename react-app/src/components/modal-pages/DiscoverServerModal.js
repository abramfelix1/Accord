import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/server";
import { joinServerThunk } from "../../store/members";
import "./modal-css/DiscoverServer.css";
import { ModalContext } from "../../context/modalContext";
import { useHistory } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

function DiscoverServerModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setType } = useContext(ModalContext);

  const servers = Object.values(useSelector((state) => state.allServers));

  useEffect(() => {
    (async () => {
      await dispatch(serverActions.getAllServersThunk());
    })();
  }, [dispatch]);

  const joinServerHandler = async (server_id) => {
    const server = await dispatch(joinServerThunk(server_id));
    setType(null);
    return history.push(
      `/servers/${server.server_id}/channels/${server.server.server.firstChannel.id}`
    );
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
              onClick={e => setType(null)}
            />
          </div>
          <p className="discover-description">
            Join communities of similar interests, hobbies, and professions!
          </p>
        </div>
        {!servers && <h2>No Available Servers</h2>}
        <div className="discover-server-list-wrapper">
          {servers.map((server) => {
            return (
              <li
                key={server.id}
                className="discover-server-list"
                onClick={(e) => joinServerHandler(server.id)}
              >
                {server.image_url ? (
                  <div>
                    <div className="server-banner"></div>
                    <img
                      src={server.image_url}
                      className="discovery-initial-server-name"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="server-banner"></div>
                    <div className="discovery-initial-server-name">{"WTF"}</div>
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
