import Server from "./servers/Server";
import ServerNav from "./servers/ServerNav";
import Channel from "./channels/Channel";
import UserNav from "./user-nav/UserNav";
import ChatNav from "./chat/ChatNav";
import ChatBox from "./chat/ChatBox";
import ServerMemberList from "./servers/ServerMemberList";
import { InfoContext } from "../context/infoContext";
import { ChannelContext } from "../context/channelContext";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Main.css";
import { useParams } from "react-router-dom";
import { getChannels } from "../store/channels";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useContext } from "react";

function Main() {
  const { server, setServer } = useContext(InfoContext);
  const { channel, setChannel } = useContext(ChannelContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const channels = useSelector((state) =>
    Object.values(state.channels.channels)
  );

  useEffect(() => {
    if (!server) {
      return history.push("/app");
    }
    if (!channel) {
      return history.push("/app");
    }
  }, []);

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
