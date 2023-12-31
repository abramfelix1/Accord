import Server from "./servers/Server";
import ServerNav from "./servers/ServerNav";
import Channel from "./channels/Channel";
import UserNav from "./user-nav/UserNav";
import ChatNav from "./chat/ChatNav";
import ChatBox from "./chat/ChatBox";
import ServerMemberList from "./servers/ServerMemberList";
import Modal from "./utils/Modal";
import { InfoContext } from "../context/infoContext";
import { ChannelContext } from "../context/channelContext";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as serverActions from "../store/server";
import * as channelActions from "../store/channels";
import * as messageActions from "../store/message";
import * as memberActions from "../store/members";
import "./Main.css";
import { useHistory } from "react-router-dom/";
import { getUserServersThunk } from "../store/user";
import { addServer, joinServer, startListeners } from "./utils/Socket";

function Main() {
  const history = useHistory();
  const { serverid, channelid } = useParams();

  const dispatch = useDispatch();
  const { channel, setChannel } = useContext(ChannelContext);
  const {
    server,
    setServer,
    isLoaded,
    setIsLoaded,
    serversFetched,
    setServersFetched,
  } = useContext(InfoContext);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user) {
      startListeners();
      joinServer(user.id);
    }
    if (!serversFetched) {
      dispatch(getUserServersThunk()).then(() => {
        setServersFetched(true);
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (serverid) {
        try {
          const server = await dispatch(serverActions.getServerThunk(serverid));
          setServer(server);
        } catch (err) {
          return history.push(`/app`);
        }
      }
    })();
    addServer(serverid);
  }, [serverid]);

  useEffect(() => {
    setIsLoaded(false);
    if (!serversFetched) return;
    (async () => {
      if (channelid) {
        try {
          let channel = await dispatch(channelActions.getChannels(serverid));
          batch(() => {
            dispatch(messageActions.getMessages(channelid));
            dispatch(memberActions.getServerMembersThunk(serverid));
            setChannel(channel);
            setIsLoaded(true);
          });
        } catch (err) {
          return history.push(`/app`);
        }
      }
    })();
  }, [serverid, channelid, serversFetched]);

  return (
    <>
      <Modal />
      <div className="main-container">
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
    </>
  );
}

export default Main;
