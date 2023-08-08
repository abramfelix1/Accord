import React, { useState, useContext } from "react";
import "./chat-css/message.css";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { ModalContext } from "../../context/modalContext";

function MessageContainer({ children, message, setShowEditField }) {
  const [showSettings, setShowSettings] = useState(false);
  const { deleteMessageModal } = useContext(ModalContext);
  const user = useSelector((state) => state.session.user);

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
