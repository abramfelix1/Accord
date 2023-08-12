import { useSelector } from "react-redux";
import logo from "../../images/accord-logo.png";
import { dateFormat } from "./ChatHelperFunctions";
import MessageContainer from "./MessageContainer";
import MessageEditField from "./MessageEditField";
import { useState } from "react";
import { useContext } from "react";
import { InfoContext } from "../../context/infoContext";


function MessageCard({ message }) {
  const { showEditField, setShowEditField, editMessageId, setEditMessageId } =
    useContext(InfoContext);
  const user = useSelector((state) => state.session.user);

  // console.log(new Date(message.created_at).toString())

  return (
    <MessageContainer
      message={message}
      setShowEditField={setShowEditField}
      setEditMessageId={setEditMessageId}
    >
      <div className="message-wrapper">
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
              {message.display_name ? message.display_name : message.username}
            </span>
            <span className="chat-box-date">
              {dateFormat(new Date(message.created_at).toString())}
            </span>
          </div>
          {showEditField &&
          user.id === message.user_id &&
          editMessageId === message.id ? (
            <MessageEditField
              message={message}
              setShowEditField={setShowEditField}
            />
          ) : (
            <p className="chat-box-message">{message.message}</p>
          )}
        </div>
      </div>
    </MessageContainer>
  );
}

export default MessageCard;
