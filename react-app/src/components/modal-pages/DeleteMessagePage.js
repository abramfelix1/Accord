import React, { useContext, useEffect } from "react";
import socket from "../utils/Socket";
import { handleChatUpdates, chatUpdate } from "../utils/Socket";
import { InfoContext } from "../../context/infoContext";
import { dateFormat } from "../chat/ChatHelperFunctions";
import logo from "../../images/accord-logo.png";
import "./modal-css/DeleteMessagePage.css";
import "../chat/chat-css/ChatBox.css";
import { ModalContext } from "../../context/modalContext";
import { useDispatch } from "react-redux";
import { getMessages, removeMessage } from "../../store/message";
import { ChannelContext } from "../../context/channelContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function DeleteMessagePage() {
  const { serverid, channelid } = useParams();
  const { message, setMessage } = useContext(InfoContext);
  const { channel } = useContext(ChannelContext);
  const { setType } = useContext(ModalContext);
  const dispatch = useDispatch();

  const handleDeleteButton = (channel, message) => {
    (async () => {
      if (message) {
        await dispatch(
          removeMessage(message.server_id, message.channel_id, message.id)
        );
        chatUpdate({
          server_id: serverid,
          channel_id: channelid,
          action_type: "DELETE",
          message_id: message.id,
        });
        setType(null);
      }
    })();
  };

  return (
    message && (
      <div className="delete-message-container">
        <div className="delete-message-header">
          <p>Delete Message</p>
        </div>
        <div className="delete-message-top-container">
          <div className="delete-message-sub-header">
            <p>Are you sure you want to delete this message?</p>
          </div>
          <div className="delete-message-info-container">
            <div className="message-wrapper delete">
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
                  <span className="chat-box-name" style={{ color: "white" }}>
                    {message.display_name
                      ? message.display_name
                      : message.username}
                  </span>
                  <span className="chat-box-date">
                    {dateFormat(message.created_at)}
                  </span>
                </div>
                <div className="delete-message-container">
                  <p
                    className="chat-box-message delete-message"
                    style={{ color: "#dbdee1" }}
                  >
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="delete-message-footer">
          <div className="delete-buttons-container">
            <button
              className="delete-message-button"
              onClick={() => {
                handleDeleteButton(channel, message);
              }}
            >
              <p>Delete</p>
            </button>
            <button className="cancel-message-button">
              <p
                onClick={() => {
                  setType(null);
                }}
              >
                Cancel
              </p>
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteMessagePage;
