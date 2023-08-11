import { NavLink } from "react-router-dom";
import ServerCard from "./ServerCard";
import logo from "../../images/accord-logo.png";
import { useEffect, useState } from "react";
import { IoCompassSharp } from "react-icons/io5";

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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ServerList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setServer } = useContext(InfoContext);
  const { setChannel } = useContext(ChannelContext);

  const { createServerModal, isModalOpen, discoverServerModal } =
    useContext(ModalContext);
  const { setIsLoaded } = useContext(InfoContext);
  const { serverid, channelid } = useParams();

  // selecting the users state to get users servers
  // const userServers = Object.values(useSelector((state) => state.user));
  const userServers = Object.values(
    useSelector((state) => state.servers)
  ).slice(0, -1);

  // Function to reverse a given array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  };

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
    if (server?.id == serverid) {
      event.preventDefault(); // Prevent the redirect
      return history.push(`/servers/${serverid}/channels/${channelid}`);
    } else {
      setIsLoaded(false);
    }

    // setServer(server);
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
        {/* <Tooltip text={"Direct Messages Feature Coming Soon"}>
          <div
            className={`servers servers-friend-button ${serverid ? "" : `active-server`}`}
            onClick={(e) => handleActiveButton(e)}
          >
            <img className="server-logo" src={logo} alt="logo" />
          </div>
        </Tooltip> */}
        <Tooltip text={"Get Started"}>
          <NavLink
            to="/app"
            className={`servers servers-friend-button ${
              serverid ? "" : `active-server`
            }`}
            onClick={(e) => handleActiveButton(e)}
          >
            <img className="server-logo" src={logo} alt="logo" />
          </NavLink>
        </Tooltip>
        {/* <div className="servers" onClick={e => handleActiveButton(e)}>Private Call</div> */}
      </div>
      <div className="border-between-layer"></div>
      <ul className="server-bottom-layer">
        {reverseArray([...userServers]).map((server) => (
          <Tooltip key={server.id} text={server.name}>
            <li className="server-list-wrapper">
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
        <Tooltip text={"Discover Servers"}>
          <li
            id={isModalOpen ? "active-plus" : ""}
            className={`compass`}
            onClick={(e) => {
              discoverServerModal();
            }}
          >
            <IoCompassSharp className="compass-icon" />
          </li>
        </Tooltip>
      </ul>
    </div>
  );
}

export default ServerList;
