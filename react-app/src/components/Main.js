import Server from "./servers/Server";
import ServerNav from "./servers/ServerNav";
import Channel from "./channels/Channel";
import UserNav from "./user-nav/UserNav";
import ChatNav from "./chat/ChatNav";
import ChatBox from "./chat/ChatBox";
import ServerMemberList from "./servers/ServerMemberList";
import { InfoContext } from "../context/infoContext";
import { ChannelContext } from "../context/infoContext";
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { joinServer, chatUpdate, startListeners } from "./utils/Socket";
import * as serverActions from "../store/server";
import * as channelActions from "../store/channels";
import "./Main.css";

function Main() {
  const { serverid, channelid } = useParams();
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.session.user.id).toString();
  console.log("USERID: " + userID);
  const buttonHandler = () => {
    chatUpdate(1, 1);
  };
  const button2Handler = () => {
    startListeners();
    joinServer(userID);
  };

  useEffect(() => {
    dispatch(serverActions.getServerThunk(serverid));
    dispatch(channelActions.getChannel(channelid));
  }, []);

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
