import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";
import {
  getMessages,
  createMessage,
  deleteMessage,
  addMessage,
  getMessage,
  updateMessage,
} from "../../store/message";
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
  const channels = useSelector((state) => {
    if (
      state.servers[serverid] &&
      state.servers[serverid].channels[channelid]
    ) {
      return Object.values(state.servers[serverid].channels);
    } else {
      return [];
    }
  });

  const dispatch = useDispatch();

  // anytime a channel id is changed or a server id is changed. it will
  // reset the chat input value to empty
  useEffect(() => {
    setChatInput("");
  }, [serverid, channelid]);

  // Function to reverse a given array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  };

  useEffect(() => {
    const callbacks = {
      CREATE: (data) => dispatch(addMessage(data)),
      DELETE: (data) => dispatch(deleteMessage(data)),
      EDIT: (data) => dispatch(updateMessage(data)),
    };

    handleChatUpdates(callbacks, channelid);

    return () => {
      socket.off("chat_update_response");
    };
  }, [dispatch, channelid]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();
    const message = await dispatch(
      createMessage(serverid, channelid, chatInput)
    );
    //emits send_message event for the backend
    chatUpdate({
      server_id: serverid,
      channel_id: channelid,
      action_type: "CREATE",
      message: message,
    });
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

                let isWithinThreeMin = false;
                if (isSameUser) {
                  isWithinThreeMin = 
                  Math.abs(new Date(messages[tempIndex].created_at).getMinutes() -
                  new Date(messages[tempIndex - 1].created_at).getMinutes())
                  >= 2
                }
                return (
                  <div key={`${Math.random()}${idx}${message.id}`}>
                    {isSameUser ? isWithinThreeMin 
                      ? <MessageCard message={message} /> : (
                      <MessageOnlyCard message={message} />
                    ) : (
                      <MessageCard message={message} />
                    )}
                  </div>
                );
              })}
          </div>
          {channels.length ? (
            <ChatInputField
              sendChat={sendChat}
              chatInput={chatInput}
              updateChatInput={updateChatInput}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
