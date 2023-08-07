import { NavLink } from "react-router-dom";
import ServerCard from "./ServerCard";
import logo from "../../images/accord-logo.png";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/user";
import * as channelActions from "../../store/channels";
import { resetCurrent } from "../../store/current";
import { resetServers } from "../../store/servers";
import { InfoContext } from "../../context/infoContext";
import { ModalContext } from "../../context/modalContext";
import { ChannelContext } from "../../context/channelContext";
import { useContext } from "react";
import { useParams } from "react-router-dom/";
import Tooltip from "../utils/tooltip";

function ServerList() {
  const dispatch = useDispatch();
  const { setServer } = useContext(InfoContext);
  const { setChannel } = useContext(ChannelContext);
  const { createServerModal, isModalOpen } = useContext(ModalContext);
  const { setIsLoaded } = useContext(InfoContext);

  // selecting the users state to get users servers
  const userServers = Object.values(useSelector((state) => state.user));

  // calls the dispatch function to set the state up for users servers
  useEffect(() => {
    (async () => {
      await dispatch(userActions.getUserServersThunk());
    })();
  }, [dispatch]);

  const handleActiveButton = (event, server) => {
    // event.preventDefault();
    event.stopPropagation();
    //comment out for more speed!!
    // if (event.target.id !== "active-server") dispatch(resetCurrent());
    if (event.target.id !== "active-server") setIsLoaded(false);

    setServer(server);
    if (server) {
      setChannel(server.firstChannel);
    }
    // gets the tag with the current button that is pressed to see the server
    const current = document.getElementById("active-server");
    // gets the img tag with the server logo
    const serverLogo = document.getElementsByClassName("server-logo")[0];
    // gets the div tag wrapped around the server logo
    let serverFriendButton = document.getElementsByClassName(
      "servers-friend-button"
    )[0];
    // gets the current tag and sets the id to nothing
    if (current) {
      current.id = "";
    }
    // compares the server logo to the current event clicked
    if (serverLogo === event.target) {
      // sets the outer div wrapped around the server logo to proper css styling
      serverFriendButton.id = "active-server";
    } else {
      // sets the new targeted server to show that it is on that server
      event.target.id = "active-server";
    }
  };

  return (
    <div className="server-list-container">
      <div style={{ color: "white", marginTop: "4px", fontSize: "13px" }}>
        Accord
      </div>
      <div className="server-top-layer">
        {/* not sure what to url for direct messages list is yet */}
        <Tooltip text={"Direct Messages"}>
          <NavLink
            to="/app"
            id="active-server"
            className="servers servers-friend-button"
            onClick={(e) => handleActiveButton(e)}
          >
            <img className="server-logo" src={logo} alt="logo" />
          </NavLink>
        </Tooltip>
        {/* <div className="servers" onClick={e => handleActiveButton(e)}>Private Call</div> */}
      </div>
      <div className="border-between-layer"></div>
      <ul className="server-bottom-layer">
        {userServers.map((server) => (
          <Tooltip key={server.id} text={server.name}>
            <li key={server.id} className="server-list-wrapper">
              {/* need to set proper link to where to navigate too */}
              <ServerCard
                serverInfo={server}
                handleActiveButton={handleActiveButton}
              />
            </li>
          </Tooltip>
        ))}
        <Tooltip text={"Create Server"}>
          <li
            id={isModalOpen ? "active-plus" : ""}
            className={`plus`}
            onClick={(e) => {
              createServerModal();
            }}
          >
            +
          </li>
        </Tooltip>
      </ul>
    </div>
  );
}

export default ServerList;
