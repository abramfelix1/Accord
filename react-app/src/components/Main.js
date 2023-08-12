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
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as serverActions from "../store/server";
import * as channelActions from "../store/channels";
import * as messageActions from "../store/message";
import * as memberActions from "../store/members";
import "./Main.css";
import { useHistory } from "react-router-dom/";

function Main() {
  const history = useHistory();
  const { serverid, channelid } = useParams();
  const dispatch = useDispatch();
  const { channel, setChannel } = useContext(ChannelContext);
  const { server, setServer, setIsLoaded } = useContext(InfoContext);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (serverid) {
        try {
          setIsLoaded(false);

          let a = dispatch(memberActions.getServerMembersThunk(serverid));
          let b = await dispatch(channelActions.getChannels(serverid));
          let c = dispatch(messageActions.getMessages(channelid));

          if (isMounted) {
            setIsLoaded(true);
            setChannel(b);
          }
          // if (!a) {
          //   return history.push(`/app`);
          // }
        } catch (err) {
          if (isMounted) {
            return history.push(`/app`);
          }
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [serverid, channelid, dispatch, history]);

  if (!user) return <Redirect to="/login" />;

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
