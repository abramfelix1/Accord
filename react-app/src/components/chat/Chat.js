import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";
import { getMessages, createMessage } from "../../store/message";
import { handleChatUpdates, chatUpdate } from "../utils/Socket";
import "./chat-css/ChatBox.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { dateFormat, isItANewDay } from "./ChatHelperFunctions";
import logo from "../../images/accord-logo.png";
import MessageCard from "./MessageCard";
import MessageOnlyCard from "./MessageOnlyCard";
import ChatLoading from "../loading/ChatLoading";
import { InfoContext } from "../../context/infoContext";
import MessageEditField from "./MessageEditField";
import MessageContainer from "./MessageContainer";

const Chat = () => {
  const [showEditField, setShowEditField] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [chatInput, setChatInput] = useState("");
  // const isLoaded = useSelector((state) => state.current.isLoading);
  const { isLoaded } = useContext(InfoContext);
  const { serverid, channelid } = useParams();
  // const messages = useSelector((state) =>
  //   Object.values(state.current.messages)
  // );
  const messages = useSelector((state) => {
    if (
      state.servers[serverid] &&
      state.servers[serverid].channels[channelid]
    ) {
      return Object.values(
        state.servers[serverid].channels[channelid].messages
      );
    } else {
      return [];
    }
  });

  const dispatch = useDispatch();

  // Function to reverse a given array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  };

  useEffect(() => {
    //updates the message state every render
    const callback = (data) => {
      dispatch(getMessages(data));
    };

    handleChatUpdates(callback, channelid);

    return () => {
      socket.off("chat_update_response", callback);
    };
  }, [dispatch, channelid]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    dispatch(createMessage(channelid, chatInput));
    //emits send_message event for the backend
    chatUpdate(serverid, channelid);
    setChatInput("");
  };

  return (
    <>
      {!isLoaded ? (
        <ChatLoading />
      ) : (
        <div className="main-chat-and-input-container">
          <div className="chat-container">
            {messages &&
              reverseArray([...messages]).map((message, idx) => {
                const tempIndex = messages.length - idx - 1;
                const isSameUser =
                  tempIndex === 0
                    ? false
                    : messages[tempIndex].user_id ===
                      messages[tempIndex - 1].user_id;
                return (
                  <div key={`${Math.random()}${idx}${message.id}`}>
                    {isSameUser ? (
                      <MessageContainer
                        message={message}
                        setShowEditField={setShowEditField}
                      >
                        <MessageOnlyCard message={message} />
                      </MessageContainer>
                    ) : (
                      <MessageCard message={message} />
                    )}
                  </div>
                );
              })}
          </div>
          <ChatInputField
            sendChat={sendChat}
            chatInput={chatInput}
            updateChatInput={updateChatInput}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
