import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";
import { getMessages, createMessage } from "../../store/message";

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  const messages = useSelector((state) => Object.values(state.messages));
  // const channelID = useSelector((state) => state.channelID)
  const dispatch = useDispatch();

  useEffect(() => {
    //updates the message state every render
    dispatch(getMessages(1));

    //listens for new_message event from the backend and rerender component when state updates
    socket.on("new_message", (message) => {
      dispatch(createMessage(message));
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
    //emits send_message event for the backend
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
        <div>
          {messages.map((message, idx) => (
            <div key={idx}>
              <div>{`${message.username} ${message.updated_at}`}</div>
              <div>${message.message}</div>
            </div>
          ))}
        </div>
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
