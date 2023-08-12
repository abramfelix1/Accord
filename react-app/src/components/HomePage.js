import Server from "./servers/Server";
import ServerNav from "./servers/ServerNav";
import Channel from "./channels/Channel";
import UserNav from "./user-nav/UserNav";
import ChatNav from "./chat/ChatNav";
import MainChatNavCopy from "./instructions/MainChatNavCopy";
import ChatBox from "./chat/ChatBox";
import ServerMemberList from "./servers/ServerMemberList";
import Instructions from "./instructions/Instructions";
import Modal from "./utils/Modal";
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

function HomePage() {
    const history = useHistory();
    const { serverid, channelid } = useParams();
    const dispatch = useDispatch();
    const { channel, setChannel } = useContext(ChannelContext);
    const { server, setServer, setIsLoaded } = useContext(InfoContext);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (user) {
        //
        startListeners();
        joinServer(user.id);
        }
        // return () => {
        //   disconnectSockets();
        // };
    }, []);

    useEffect(() => {
        (async () => {
        if (serverid) {
            setIsLoaded(false);
            try {
            let d = dispatch(memberActions.getServerMembersThunk(serverid));
            let a = await dispatch(serverActions.getServerThunk(serverid));
            let b = await dispatch(channelActions.getChannel(channelid));
            let c = dispatch(messageActions.getMessages(channelid));
            setServer(a);
            setChannel(b);
            setIsLoaded(true);
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

    return (
        <>
        <Modal />
        <div className="main-container">
            <section className="main-section-1">
                <Server />
            </section>
            {/* Channel Section */}
            <>
            {/* Chatbox, ChatNav, and Members List */}
            <section className="main-section-3" style={{backgroundColor: "rgb(50,51,56)"}}>
                <MainChatNavCopy />
                {/* <div className="chatbox-member-container"> */}
                <Instructions />
                {/* </div> */}
            </section>
            </>
        </div>
        </>
    );
}

export default HomePage;
