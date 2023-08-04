import Server from "./servers/Server";
import ServerNav from "./servers/ServerNav";
import Channel from "./channels/Channel";
import UserNav from "./user-nav/UserNav";
import ChatNav from "./chat/ChatNav";
import ChatBox from "./chat/ChatBox";
import ServerMemberList from "./servers/ServerMemberList";
import { InfoContext } from "../context/infoContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { joinServer, sendMessage, startListeners } from "./utils/Socket";

import "./Main.css";
// import { useContext } from "react";

function Main() {
  const userID = useSelector((state) => state.session.user.id).toString();
  console.log("USERID: " + userID);
  const buttonHandler = () => {
    sendMessage(1, 1);
  };
  const button2Handler = () => {
    startListeners();
    joinServer(userID);
  };
  const { server, setServer } = useContext(InfoContext);
  return (
    <div className="main-container">
      <button onClick={(e) => button2Handler()}>START LISTENERS</button>
      <button onClick={(e) => buttonHandler()}>TEST SOCKET</button>
      {/* Server Section */}
      <section className="main-section-1">
        <Server />
      </section>

      {/* Channel Section */}
      <section className="main-section-2">
        <div>
          <ServerNav server={server} />
          <Channel server={server} />
        </div>
        <UserNav />
      </section>

      {/* Chatbox, ChatNav, and Members List */}
      <section className="main-section-3">
        <ChatNav />
        <div className="chatbox-member-container">
          <ChatBox />
          <ServerMemberList server={server} />
        </div>
      </section>
    </div>
  );
}

export default Main;
