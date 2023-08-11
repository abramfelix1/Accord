import React, { useState, useEffect } from "react";
import "./chat-css/ChatBox.css";
import { useDispatch } from "react-redux";
import * as messageActions from "../../store/message";
import { useContext } from "react";
import { InfoContext } from "../../context/infoContext";
import { ModalContext } from "../../context/modalContext";
import { handleChatUpdates, chatUpdate } from "../utils/Socket";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function MessageEditField({ message, setShowEditField }) {
  const { setEditMessageId, setMessage } = useContext(InfoContext);
  const { deleteMessageModal } = useContext(ModalContext);
  const [messageValue, setMessageValue] = useState(message.message);
  const { serverid, channelid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowEditField(false);
        setEditMessageId("");
      }
    };
    const cancelKey = document.getElementById("message-edit-cancel-save");

    cancelKey.addEventListener("keydown", handleEsc);

    return () => {
      cancelKey.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const editMessageHandler = async (e) => {
    e.preventDefault();
    // if empty string is passed in for the message value.
    // pop open a modal for delete confirm

    if (messageValue.length === 0) {
      setMessage(message);
      deleteMessageModal();
      setShowEditField(false);
      setEditMessageId("");
      return;
    }

    const updatedMessage = await dispatch(
      messageActions.editMessage(
        message.server_id,
        message.channel_id,
        message.id,
        messageValue
      )
    );
    setShowEditField(false);
    setEditMessageId("");
    chatUpdate({
      server_id: serverid,
      channel_id: channelid,
      action_type: "EDIT",
      message: updatedMessage,
    });
  };

  return (
    <div className="message-edit-wrapper">
      <form className="message-edit-form" onSubmit={editMessageHandler}>
        <input
          className="message-edit-input"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        ></input>
        {/* <BsFillEmojiSmileFill className="message-edit-chat-emoji-icon" /> */}
        <p className="message-edit-cancel-save" id="message-edit-cancel-save">
          escape to{" "}
          <span
            className="message-edit-cancel"
            onClick={(e) => {
              setShowEditField(false);
              setEditMessageId("");
            }}
          >
            cancel
          </span>{" "}
          • enter to{" "}
          <button type="submit" className="message-edit-save">
            save
          </button>
        </p>
      </form>
    </div>
  );
}

export default MessageEditField;
