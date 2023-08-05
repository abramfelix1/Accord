import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";
import { getMessages, createMessage } from "../../store/message";
import { handleNewMessages } from "../utils/Socket";
import { useContext } from "react";
import { ChannelContext } from "../../context/channelContext";
import "./chat-css/ChatBox.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  const isLoaded = useSelector((state) => state.messages.isLoading);
  const messages = useSelector((state) =>
    Object.values(state.messages.messages)
  );
  // const channelID = useSelector((state) => state.channelID)
  const channel = useContext(ChannelContext);
  const { channelid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    //updates the message state every render
    dispatch(getMessages(channelid));

    //listens for new_message event from the backend and rerender component when state updates
    handleNewMessages((channel_id) => {
      dispatch(getMessages(channel_id));
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [dispatch, channelid]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    dispatch(createMessage(channelid, chatInput));
    //emits send_message event for the backend
    socket.emit("send_message", { channel_id: channelid });
    setChatInput("");
  };

  return (
    user &&
    !isLoaded && (
      <div className="main-chat-and-input-container">
        <div className="chat-container">
          {messages.map((message, idx) => (
            <div key={idx}>
              <div>{`${message.username} ${message.updated_at}`}</div>
              <div>{message.message}</div>
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
