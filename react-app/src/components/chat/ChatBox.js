import React from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import MessageContainer from "./MessageContainer";

function ChatBox() {
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
      {(
        <>
          <MessageContainer />
          <Chat />
        </>
      )}
    </div>
  );
}

export default ChatBox;
