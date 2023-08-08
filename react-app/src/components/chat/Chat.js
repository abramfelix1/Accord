import React, { useState, useEffect } from "react";
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

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  const isLoaded = useSelector((state) => state.current.isLoading);
  const messages = useSelector((state) =>
    Object.values(state.current.messages)
  );
  const { serverid, channelid } = useParams();
  const dispatch = useDispatch();
  // const [prevMessage, setPrevMessage] = useState("")
  // const [isSameUser, setIsSameUser] = useState(false)

  // Function to reverse a given array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  };

  // useEffect(() => {
  //   if(messages && messages.length >= 2) {
  //     // setPrevMessage(reverseArray([...messages])[1])
  //     if(messages[messages.length - 1].user_id === messages[messages.length - 2].user_id) {
  //       setIsSameUser(true);
  //       return;
  //     } else {
  //       setIsSameUser(false);
  //       return;
  //     }
  //   }
  //   setIsSameUser(false)
  // }, [messages])

  useEffect(() => {
    //updates the message state every render
    // dispatch(getMessages(channelid));
    handleChatUpdates((data) => {
      dispatch(getMessages(data));
    });
  }, [dispatch, serverid]);

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

  return (
    <>
      {user && !isLoaded && serverid && (
        <div className="main-chat-and-input-container">
          <div className="chat-container">
            {messages && reverseArray([...messages]).map((message, idx) => {
              const tempIndex = messages.length - idx - 1;
                    //  3            4             0     
                    //  2            3             1     
                    //  1            2             2     
                    //  0            1             3     
                    //     
                    //     
                    //  curridx: 0 
                    //  tempidx: 3
                    //   
                    //                         |  
                    // normal        [1, 2, 3, 4]
                    // reversed      [4, 3, 2, 1]
                    //                |                
                    //      
                    //      
                    //     
              const isSameUser = tempIndex === 0
                  ? false    //3                                2
                  : messages[tempIndex].user_id === messages[tempIndex - 1].user_id;
              return (
                <div key={`${message.id}${idx}`}>
                  {isSameUser 
                  ? (
                    <p className="chat-box-message-only">{message.message}</p>
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
