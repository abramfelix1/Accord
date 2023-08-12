import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import MessageContainer from "./MessageContainer";
import { ChannelContext } from "../../context/channelContext";

function ChatBox() {
  const { channel } = useContext(ChannelContext);
  // let isLoading = useSelector((state) => state.channels.isLoading);

  return (
    <div
      style={{
        backgroundColor: "#323338",
        color: "white",
        height: "100vh",
        flex: "1 1 auto",
      }}
    >
      {
        <>
          <MessageContainer />
          {channel && <Chat />}
        </>
      }
    </div>
  );
}

export default ChatBox;
