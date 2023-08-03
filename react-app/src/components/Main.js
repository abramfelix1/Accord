import Server from "./servers/Server";
import ServerNav from "./servers/ServerNav";
import Channel from "./channels/Channel";
import UserNav from "./user-nav/UserNav";
import ChatNav from "./chat/ChatNav";
import ChatBox from "./chat/ChatBox";
import ServerMemberList from "./servers/ServerMemberList";
import { InfoContext } from "../context/infoContext";
import { useContext } from "react";

import "./Main.css";
// import { useContext } from "react";

function Main() {
  //   const { isServerView, isDMView, toggleView } = useContext(ViewContext);
  //   const { toggleTestModal } = useContext(ModalContext);
  const { server, setServer } = useContext(InfoContext);
  return (
    <div className="main-container">
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
