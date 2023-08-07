import React, { useState } from "react";
import "./chat-css/message.css";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

function MessageContainer({ children }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div
      className="message-container"
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      {showSettings && (
        <div className="message-settings-container">
          <div className="message-icon-container emoji">
            <BsFillEmojiSmileFill className="message-emoji" />
          </div>
          <div className="message-icon-container edit">
            <MdOutlineModeEditOutline className="message-edit" />
          </div>
          <div className="message-icon-container more">
            <BsThreeDots className="message-more" />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default MessageContainer;
