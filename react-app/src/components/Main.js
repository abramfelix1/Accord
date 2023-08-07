import Server from "./servers/Server";
import ServerNav from "./servers/ServerNav";
import Channel from "./channels/Channel";
import UserNav from "./user-nav/UserNav";
import ChatNav from "./chat/ChatNav";
import ChatBox from "./chat/ChatBox";
import ServerMemberList from "./servers/ServerMemberList";
import { InfoContext } from "../context/infoContext";
import { ChannelContext } from "../context/channelContext";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import {
  joinServer,
  chatUpdate,
  startListeners,
  disconnectSockets,
} from "./utils/Socket";
import * as serverActions from "../store/server";
import * as channelActions from "../store/channels";
import * as currentActions from "../store/current";
import * as messageActions from "../store/message";
import * as memberActions from "../store/members";
import "./Main.css";
import { getChannels } from "../store/channels";
import { useHistory } from "react-router-dom/";
// import { useContext } from "react";

function Main() {
  const history = useHistory();
  const { serverid, channelid } = useParams();
  const dispatch = useDispatch();
  const { channel, setChannel } = useContext(ChannelContext);
  const { server, setServer } = useContext(InfoContext);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user) {
      //
      startListeners();
      joinServer(user.id);
    }
    return () => {
      disconnectSockets();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (serverid) {
        try {
          let a = await dispatch(serverActions.getServerThunk(serverid));
          let b = await dispatch(channelActions.getChannel(channelid));
          let c = dispatch(messageActions.getMessages(channelid));
          let d = dispatch(memberActions.getServerMembersThunk(serverid));
          setServer(a);
          setChannel(b);
          if (!a) {
            return history.push(`/app`);
          }
        } catch (err) {
          return history.push(`/app`);
        }
      }
    })();
  }, [serverid, channelid, dispatch, history]);

  if (!user) return <Redirect to="/login" />;

  const buttonHandler = () => {
    chatUpdate(1, 1);
  };
  const button2Handler = () => {
    startListeners();
    joinServer(user.id);
  };

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
    </div>
  );
}

export default Main;
