import React, { useState, useContext, useEffect } from "react";
import "./chat-css/message.css";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";

function MessageContainer({ children, message, setShowEditField }) {
  const [showSettings, setShowSettings] = useState(false);
  const { deleteMessageModal } = useContext(ModalContext);
  const { setMessage } = useContext(InfoContext);
  const user = useSelector((state) => state.session.user);

  if (message) setMessage(message);

  useEffect(() => {
    if (message) setMessage(message);
  }, [message]);

  return (
    <div
      className="message-container"
      onMouseEnter={() => setShowSettings(true)}
      onMouseLeave={() => setShowSettings(false)}
    >
      <div className="message-edit-field-container"></div>
      {showSettings && (
        <div className="message-settings-container">
          <div className="message-icon-container emoji">
            <BsFillEmojiSmileFill className="message-emoji" />
          </div>
          <div className="message-icon-container edit">
            <MdOutlineModeEditOutline
              className="message-edit"
              onClick={(e) => {
                setShowEditField(true);
              }}
            />
          </div>
          <div className="message-icon-container more">
            <RiDeleteBinLine
              className="message-more"
              onClick={() => {
                setMessage(message);
                deleteMessageModal();
              }}
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default MessageContainer;
