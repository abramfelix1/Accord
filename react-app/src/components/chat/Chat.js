import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";
import { getMessages, createMessage } from "../../store/message";
import { handleChatUpdates, chatUpdate } from "../utils/Socket";
import "./chat-css/ChatBox.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { dateFormat, isItANewDay } from "./ChatHelperFunctions";
import { useRef } from "react";
import logo from "../../images/accord-logo.png";
import ChatLoading from "../loading/ChatLoading";
import { InfoContext } from "../../context/infoContext";
import MessageContainer from "./MessageContainer";
import MessageEditField from "./MessageEditField";

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const [showEditField, setShowEditField] = useState("");
  const user = useSelector((state) => state.session.user);
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
  // const messageRef = useRef(null);
  const [prevMessageUserId, setPrevMessageUserId] = useState("");
  // const [secondToLastMessage, setSecondToLastMessage] = useState("")

  // Function to reverse a given array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  };

  // when a message is being typed or is sent, it ill scroll down to
  // last message
  // useEffect(() => {
  //   messageRef.current?.scrollIntoView();
  // }, [messages]);

  useEffect(() => {
    if (messages) {
      setPrevMessageUserId(messages[messages.length - 2]?.user_id);
      // setSecondToLastMessage(messages[messages.length - 2])
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
    }, channelid);
    return () => {
      socket.off("chat_update_response", (data) => {
        dispatch(getMessages(data));
      });
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
    socket.emit("send_message", { channel_id: channelid });
    setChatInput("");
  };

  return (
    <>
      {!isLoaded ? (
        <ChatLoading />
      ) : (
        <div className="main-chat-and-input-container">
          <div className="chat-container">
            {reverseArray([...messages]).map((message, idx) => (
              <div key={`${message.id}${idx}`}>
                <MessageContainer
                  message={message}
                  setShowEditField={setShowEditField}
                >
                  <div className="message-wrapper">
                    {message.image_url !== null &&
                    message.image_url.length >= 1 ? (
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
                    {showEditField && user.id === message.user_id ? (
                      <MessageEditField
                        message={message}
                        setShowEditField={setShowEditField}
                      />
                    ) : (
                      <div className="chat-box-name-date-message-wrapper">
                        <div className="chat-box-name-date-wrapper">
                          <span className="chat-box-name">
                            {message.display_name
                              ? message.display_name
                              : message.username}
                          </span>
                          <span className="chat-box-date">
                            {dateFormat(message.created_at)}
                          </span>
                        </div>
                        <p className="chat-box-message">{message.message}</p>
                      </div>
                    )}
                  </div>
                </MessageContainer>
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

//   return (
//     <>
//       {user && !isLoaded && serverid && (
//         <div className="main-chat-and-input-container">
//           <div className="chat-container">
//             {messages.map((message, idx) => (
//               <div key={`${message.id}${idx}`}>
//                 {prevMessageUserId === message.user_id
//                 ? (<div className="message-wrapper">
//                   {message.image_url !== null && message.image_url.length >= 1
//                     ? (<img
//                       className="chatbox-image"
//                       src={message.image_url}
//                       alt="chatbox-user-img"
//                     />)
//                     : (<div className="chatbox-logo-wrapper">
//                         <img className="chatbox-logo" src={logo} alt="logo" />
//                       </div>)}
//                     <div className="chat-box-name-date-message-wrapper">
//                         <div className="chat-box-name-date-wrapper">
//                           <span className="chat-box-name">
//                               {message.display_name ? message.display_name : message.username}
//                           </span>
//                           <span className="chat-box-date">
//                               {dateFormat(message.created_at)}
//                           </span>
//                         </div>
//                         <p className="chat-box-message">{message.message}</p>
//                     </div>
//                 </div>)
//                 : <p className="chat-box-message-only">{message.message}</p>}
//               </div>
//             ))}
//             {/* <div className="message-ref" ref={messageRef}></div> */}
//           </div>
//           <ChatInputField
//             sendChat={sendChat}
//             chatInput={chatInput}
//             updateChatInput={updateChatInput}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default Chat;
