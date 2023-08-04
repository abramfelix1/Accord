import { useContext } from "react";
import { ChannelContext } from "../../context/channelContext";
import "./chat-css/ChatInputField.css"
import { FaGift } from 'react-icons/fa';
import { HiGif } from 'react-icons/hi2';
import { LuSticker } from 'react-icons/lu';
import { BsFillEmojiSmileFill } from 'react-icons/bs';



function ChatInputField({ sendChat, chatInput, updateChatInput }) {
  
  const { channel } = useContext(ChannelContext);

  return (
    <form id="chat-form-input-container" onSubmit={sendChat}>
      <textarea
        id="chat-input" 
        placeholder={`Message #${channel.name}`} 
        value={chatInput} 
        onChange={updateChatInput} 
      ></textarea>
      <FaGift className="chat-gift-icon"/>
      <HiGif className="chat-gif-icon"/>
      <LuSticker className="chat-sticker-icon"/>
      <BsFillEmojiSmileFill className="chat-emoji-icon"/>
      {/* <button type="submit">Send</button> */}
    </form>
  );
}

export default ChatInputField;
