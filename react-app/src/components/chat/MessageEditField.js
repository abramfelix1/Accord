import React from "react";
import "./chat-css/ChatBox.css";
import { dateFormat, isItANewDay } from "./ChatHelperFunctions";
import ChatInputField from "./ChatInputField";

function MessageEditField({ message, setShowEditField }) {
  return (
    <div className="message-edit-wrapper">
      <form>
        <input placeholder={`${message.message}`}></input>
        <p>
          escape to <span onClick={() => setShowEditField(false)}>cancel</span>{" "}
          • enter to <button>save</button>
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
