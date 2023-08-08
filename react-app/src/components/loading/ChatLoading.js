import React, { useState, useEffect } from "react";
import ChatInputField from "../chat/ChatInputField";
import "../chat/chat-css/ChatBox.css";
import "./ChatLoading.css";

const randomWidth = () => {
  return Math.floor(Math.random() * (200 - 30 + 1) + 30) + "px";
};

const randomWidthName = () => {
  return Math.floor(Math.random() * (250 - 100 + 1) + 150) + "px";
};

const randomLength = () => Math.floor(Math.random() * 4) + 1;

const MessageBlock = ({ numMessages }) => {
  let messages = [];
  for (let i = 0; i < numMessages; i++) {
    messages.push(
      <p className="loading-message" style={{ width: randomWidth() }}>
        msg
      </p>
    );
  }

  return <div className="message-block">{messages}</div>;
};

const MessageWrapperBlock = ({ numWrappers }) => {
  let wrappers = [];
  const arr = new Array(randomLength()).fill(null);
  for (let i = 0; i < numWrappers; i++) {
    wrappers.push(
      <div className="message-wrapper">
        <div className="loading-logo">
          <div className="loading-img"></div>
        </div>
        <div className="loading-message-info-container">
          <div className="chat-box-name-date-wrapper">
            <span className="loading-name" style={{ width: randomWidthName() }}>
              name
            </span>
          </div>
          {arr.map((el, idx) => (
            <div key={idx}>
              <MessageBlock numMessages={randomLength()} />
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
