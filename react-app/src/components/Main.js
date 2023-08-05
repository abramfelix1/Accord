import Server from "./servers/Server";
import ServerNav from "./servers/ServerNav";
import Channel from "./channels/Channel";
import UserNav from "./user-nav/UserNav";
import ChatNav from "./chat/ChatNav";
import ChatBox from "./chat/ChatBox";
import ServerMemberList from "./servers/ServerMemberList";
import { InfoContext } from "../context/infoContext";
import { ChannelContext } from "../context/infoContext";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { joinServer, chatUpdate, startListeners } from "./utils/Socket";
import * as serverActions from "../store/server";
import * as channelActions from "../store/channels";
import * as currentActions from "../store/current";
import * as messageActions from "../store/message";
import * as memberActions from "../store/members";
import "./Main.css";
import { getChannels } from "../store/channels";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useContext } from "react";

function Main() {
  const history = useHistory();
  const { serverid, channelid } = useParams();
  const [showDash, setShowDash] = useState(true);
  const dispatch = useDispatch();
  const { channel, setChannel } = useContext(ChannelContext);
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
    (async () => {
      if (serverid) {
        try {
          let a = dispatch(serverActions.getServerThunk(serverid));
          let b = dispatch(channelActions.getChannel(channelid));
          let c = dispatch(messageActions.getMessages(channelid));
          let d = dispatch(memberActions.getServerMembersThunk(serverid));
          setServer(a);
          if (!a) {
            return history.push(`/app`);
          }
        } catch (err) {
          return history.push(`/app`);
        }
      }
    })();
  }, [serverid, channelid, dispatch, history]);

  const { server, setServer } = useContext(InfoContext);
  console.log(server);
  return (
    <div className="main-container">
      {/* <button onClick={(e) => button2Handler()}>START LISTENERS</button>
      <button onClick={(e) => buttonHandler()}>TEST SOCKET</button> */}
      {/* Server Section */}
      <section className="main-section-1">
        <Server />
      </section>
      {/* Channel Section */}
      {showDash && (
        <>
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
        </>
      )}
    </div>
  );
}

export default Main;
