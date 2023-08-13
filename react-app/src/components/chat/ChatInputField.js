import { useContext } from "react";
import { ChannelContext } from "../../context/channelContext";
import "./chat-css/ChatInputField.css";
import { FaGift } from "react-icons/fa";
import { HiGif } from "react-icons/hi2";
import { LuSticker } from "react-icons/lu";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ChatInputField({ sendChat, chatInput, updateChatInput }) {
  
  const { serverid, channelid } = useParams();
  const channel = useSelector((state) => {
    if (
      state.servers[serverid] &&
      state.servers[serverid].channels &&
      state.servers[serverid].channels[channelid]
    ) {
      return state.servers[serverid].channels[channelid];
    } else {
      return [];
    }
  });



  return (
    <form id="chat-form-input-container" onSubmit={sendChat}>
      <input
        id="chat-input"
        placeholder={`Message #${channel.name ? channel.name : ""}`}
        value={chatInput}
        onChange={updateChatInput}
        autoComplete="off"
        maxLength={2000}
      ></input>
      {/* <FaGift className="chat-gift-icon" />
      <HiGif className="chat-gif-icon" />
      <LuSticker className="chat-sticker-icon" />
      <BsFillEmojiSmileFill className="chat-emoji-icon" /> */}
      {/* <button type="submit">Send</button> */}
    </form>
  );
}

export default ChatInputField;
