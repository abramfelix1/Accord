import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";
import { getMessages, createMessage } from "../../store/message";
import { handleChatUpdates, chatUpdate } from "../utils/Socket";
import "./chat-css/ChatBox.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { dateFormat } from "./ChatHelperFunctions";
import { useRef } from "react";
import logo from "../../images/accord-logo.png";

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  const isLoaded = useSelector((state) => state.current.isLoading);
  const messages = useSelector((state) =>
    Object.values(state.current.messages)
  );
  const { serverid, channelid } = useParams();
  const dispatch = useDispatch();
  const messageRef = useRef(null);

  // when a message is being typed or is sent, it ill scroll down to
  // last message
  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    //updates the message state every render
    // dispatch(getMessages(channelid));
    handleChatUpdates((data) => {
      dispatch(getMessages(data));
    });
  }, [dispatch, channelid, serverid, isLoaded]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    dispatch(createMessage(channelid, chatInput));
    //emits send_message event for the backend
    chatUpdate(serverid, channelid);
    socket.emit("send_message", { channel_id: channelid });
    setChatInput("");
  };

  return (
    <>
      {user && !isLoaded && serverid && (
        <div className="main-chat-and-input-container">
          <div className="chat-container">
            {messages.map((message, idx) => (
              <div key={`${message.id}${idx}`} className="message-wrapper">
                {message.image_url !== null && message.image_url.length >= 1 ? (
                  <img
                    className="chatbox-image"
                    src={message.image_url}
                    alt="chatbox-user-img"
                  />
                ) : (
                  <div className="chatbox-logo-wrapper">
                    <img className="chatbox-logo" src={logo} alt="logo" />
                  </div>
                )}
                <div className="chat-box-name-date-message-wrapper">
                  <div className="chat-box-name-date-wrapper">
                    <span className="chat-box-name">
                      {message.display_name
                        ? message.display_name
                        : message.username}
                    </span>
                    <span className="chat-box-date">
                      {dateFormat(message.created_at)}
                    </span>
                  </div>
                  <div className="chat-box-message">{message.message}</div>
                </div>
              </div>
            ))}
            {/* <div className="message-ref" ref={messageRef}></div> */}
          </div>
          <ChatInputField
            sendChat={sendChat}
            chatInput={chatInput}
            updateChatInput={updateChatInput}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
