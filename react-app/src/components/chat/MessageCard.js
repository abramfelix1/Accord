import { useSelector } from "react-redux";
import logo from "../../images/accord-logo.png";
import { dateFormat } from "./ChatHelperFunctions";
import MessageContainer from "./MessageContainer";
import MessageEditField from "./MessageEditField";
import { useState } from "react";

function MessageCard({ message }) {
  const [showEditField, setShowEditField] = useState(false);
  const user = useSelector((state) => state.session.user);

  return (
    <MessageContainer message={(message, setShowEditField)}>
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
              {dateFormat(message.created_at)}
            </span>
          </div>
          <p className="chat-box-message">{message.message}</p>
        </div>
      </div>
    </MessageContainer>
  );
}

export default MessageCard;
