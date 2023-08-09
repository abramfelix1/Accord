import MessageContainer from "./MessageContainer";
import MessageEditField from "./MessageEditField";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { InfoContext } from "../../context/infoContext";

function MessageOnlyCard({ message }) {
    const { showEditField, setShowEditField, editMessageId, setEditMessageId } =
        useContext(InfoContext);
    const user = useSelector((state) => state.session.user);

    return (
        <MessageContainer
        message={message}
        setShowEditField={setShowEditField}
        setEditMessageId={setEditMessageId}
        >
        <div className="message-only-wrapper">
            {showEditField &&
            user.id === message.user_id &&
            editMessageId === message.id ? (
            <MessageEditField
                message={message}
                setShowEditField={setShowEditField}
            />
            ) : (
            <p className="chat-box-message-only">{message.message}</p>
            )}
        </div>
        </MessageContainer>
    );
}

export default MessageOnlyCard;
