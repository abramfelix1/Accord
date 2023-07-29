import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  // const messages = useSelector((state) => state.message)
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("new_message", (message) => {
      // dispatch() thunk for setting new messages;
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("send_message", {
      user_id: user.id,
      channel_id: 1, //set to state of channel id once its available
      username: user.username,
      message: chatInput,
    });
    setChatInput("");
  };

  return (
    user && (
      <div>
        {/* <div>
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.user}: ${message.msg}`}</div>
          ))}
        </div> */}
        <ChatInputField
          sendChat={sendChat}
          chatInput={chatInput}
          updateChatInput={updateChatInput}
        />
      </div>
    )
  );
};

export default Chat;
