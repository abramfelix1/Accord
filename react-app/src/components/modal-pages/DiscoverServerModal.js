import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from "../../store/server";
import { joinServerThunk } from "../../store/members";
import "./modal-css/DiscoverServer.css";
import { ModalContext } from "../../context/modalContext";

function DiscoverServerModal() {
  const dispatch = useDispatch();
  const { setType } = useContext(ModalContext);

  const servers = Object.values(useSelector((state) => state.server));

  useEffect(() => {
    (async () => {
      await dispatch(serverActions.getAllServersThunk());
    })();
  }, [dispatch]);

  const joinServerHandler = async (server_id) => {
    await dispatch(joinServerThunk(server_id));
    setType(null);
  };

  //   const initials = (serverName) => {
  //     let res = "";
  //     const serverNameArr = serverName.include(' ') ? serverName.split(" ") : serverName;

  //     for (let i = 0; i < serverNameArr.length; i++) {
  //       let word = serverNameArr[i];
  //       res += word[0].toUpperCase();
  //     }
  //     if (res.length >= 3) return res.slice(0, 3);
  //     return res;
  //   };

  return (
    servers && (
      <div className="discover-server">
        <div className="discover-communities-wrapper">
          <h1 className="discover-communities">Discover Communities</h1>
          <p className="discover-description">
            Join communities of similar interests, hobbies, and professions!
          </p>
        </div>
        {!servers && <h2>No Available Servers</h2>}
        <div className="discover-server-list-wrapper">
          {servers.map((server) => {
            return (
              <li
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
                      1,034,947 Members
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
