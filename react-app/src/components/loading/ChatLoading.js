import React, { useState, useEffect } from "react";
import ChatInputField from "../chat/ChatInputField";
import "../chat/chat-css/ChatBox.css";
import "./ChatLoading.css";

const getRandomWidth = () => {
  return Math.floor(Math.random() * (200 - 30 + 1) + 30) + "px";
};
const getRandomLength = () => Math.floor(Math.random() * 4) + 1;

const MessageBlock = ({ numMessages }) => {
  let messages = [];
  for (let i = 0; i < numMessages; i++) {
    messages.push(
      <p className="loading-message" style={{ width: getRandomWidth() }}>
        msg
      </p>
    );
  }

  return <div className="message-block">{messages}</div>;
};

const MessageWrapperBlock = ({ numWrappers }) => {
  let wrappers = [];
  const arr = new Array(getRandomLength()).fill(null);
  for (let i = 0; i < numWrappers; i++) {
    wrappers.push(
      <div className="message-wrapper">
        <div className="loading-logo">
          <div className="loading-img"></div>
        </div>
        <div className="loading-message-info-container">
          <div className="chat-box-name-date-wrapper">
            <span className="loading-name" style={{ width: "150px" }}>
              name
            </span>
          </div>
          {arr.map((el, idx) => (
            <div>
              <MessageBlock numMessages={6} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <>{wrappers}</>;
};

const ChatLoading = () => {
  return (
    <>
      <div className="main-chat-and-input-container">
        <div className="chat-container">
          <div>
            <MessageWrapperBlock numWrappers={10} />
          </div>
        </div>
        <ChatInputField />
      </div>
    </>
  );
};

export default ChatLoading;
