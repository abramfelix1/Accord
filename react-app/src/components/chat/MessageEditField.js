import React, { useState } from "react";
import "./chat-css/ChatBox.css";
import { dateFormat, isItANewDay } from "./ChatHelperFunctions";
import ChatInputField from "./ChatInputField";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import * as messageActions from "../../store/message"

function MessageEditField({ message, setShowEditField }) {
  const [messageValue, setMessageValue] = useState(message.message);
  const dispatch = useDispatch();

  const editMessageHandler = async (e) => {
    e.preventDefault();

    await dispatch(messageActions.editMessage(message.channel_id, message.id, messageValue));
  }
  
  return (
    <div className="message-edit-wrapper">
      <form className="message-edit-form" onSubmit={editMessageHandler}>
        <input 
        className="message-edit-input"
        placeholder={`${message.message}`} 
        value={messageValue}
        onChange={e => setMessageValue(e.target.value)}
        >
        </input>
        {/* <BsFillEmojiSmileFill className="message-edit-chat-emoji-icon" /> */}
        <p className="message-edit-cancel-save">
          escape to <span className="message-edit-cancel" onClick={() => setShowEditField(false)}>cancel</span>{" "}
          • enter to <button type="submit" className="message-edit-save">save</button>
        </p>
      </form>
    </div>
  );
}

export default MessageEditField;




// function MessageEditField({ message, setShowEditField }) {
//   return (
//     <div className="chat-box-name-date-message-wrapper">
//       <div className="chat-box-name-date-wrapper"></div>
//       <form>
//         <input placeholder={`${message.message}`}></input>
//         <p>
//           escape to <span onClick={() => setShowEditField(false)}>cancel</span>{" "}
//           • enter to <button>save</button>
//         </p>
//       </form>
//       {/* <p className="chat-box-message">{message.message}</p> */}
//     </div>
//   );
// }

// export default MessageEditField;
