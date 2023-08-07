import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/Socket";
import ChatInputField from "./ChatInputField";
import { getMessages, createMessage } from "../../store/message";
import { handleChatUpdates, chatUpdate } from "../utils/Socket";
import "./chat-css/ChatBox.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { dateFormat, isItANewDay, isSameUser } from "./ChatHelperFunctions";
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
  const [prevMessage, setPrevMessage] = useState("")
  

    // Function to reverse a given array
  const reverseArray = (array) => {
    let reverseArray = array.reverse();
    return reverseArray;
  }

  useEffect(() => {
    if(messages) {
      setPrevMessage(reverseArray([...messages])[1])
    }
  }, [messages])

  console.log(prevMessage)


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
            {reverseArray([...messages]).map((message, idx) => ( 
              <div key={`${message.id}${idx}`}>
                {prevMessage && isSameUser(prevMessage, message)
                && <p className="chat-box-message-only">{message.message}</p>
              }
              {<MessageCard message={message} />} 
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
//             {reverseArray([...messages]).map((message, idx) => ( 
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
