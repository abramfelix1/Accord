import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";
import { getMessages, createMessage } from "../../store/message";
import { handleChatUpdates, chatUpdate } from "../utils/Socket";
import "./chat-css/ChatBox.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { dateFormat } from "./ChatHelperFunctions";
import { useRef } from "react";
import logo from "../../images/accord-logo.png";
import ChatFullStyle from "./ChatFullStyle";
import ChatMessageOnlyStyle from "./ChatMessageOnluStyle";


const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  const isLoaded = useSelector((state) => state.current.isLoading);
  const messages = useSelector((state) =>
    Object.values(state.current.messages)
  );
  const { serverid, channelid } = useParams();
  const dispatch = useDispatch();
  const messageRef = useRef(null);
  const [lastMessageUserId, setLastMessageUserId] = useState("")



  // when a message is being typed or is sent, it ill scroll down to
  // last message
  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages]);


  useEffect(() => {
    if (messages) {
      setLastMessageUserId(messages[messages.length - 1]?.user_id)
    }

    // for (let i = 0; i < messages.length; i++) {
    //   console.log(messages[i].user_id === messages[messages.length - 1]?.user_id)
    // }

  }, [messages]);

  useEffect(() => {
    //updates the message state every render
    // dispatch(getMessages(channelid));
    handleChatUpdates((data) => {
      dispatch(getMessages(data));
    });
  }, [dispatch, channelid, serverid, isLoaded]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    dispatch(createMessage(channelid, chatInput));
    //emits send_message event for the backend
    chatUpdate(serverid, channelid);
    socket.emit("send_message", { channel_id: channelid });
    setChatInput("");
  };

  const fullMessageWrapper = () => {
    
  }

  return (
    <>
      {user && !isLoaded && serverid && (
        <div className="main-chat-and-input-container">
          <div className="chat-container">
            {messages.map((message, idx) => ( 
              <div key={`${message.id}${idx}`}>
                {lastMessageUserId === message?.user_id
                  ? <ChatMessageOnlyStyle message={message} />
                  : <ChatFullStyle message={message} /> 
                }
              </div>
            ))}
            {/* <div className="message-ref" ref={messageRef}></div> */}
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
