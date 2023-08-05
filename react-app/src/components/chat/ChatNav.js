import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { RiHashtag, RiInboxFill } from "react-icons/ri";
import { AiFillQuestionCircle } from "react-icons/ai";
import "./chat-css/ChatNav.css";

function ChatNav() {
  // const { channel, setChannel } = useContext(ChannelContext);
  const isLoading = useSelector((state) => state.channels.isLoading);
  const channel = useSelector((state) => state.current.channel);

  return (
    !isLoading && (
      <div className="live-chat-container">
        <div className="inner-live-chat-container">
          <div style={{ display: "flex", alignItems: "center" }}>
            <RiHashtag
              style={{
                marginRight: "10px",
                color: "#ADADAD",
                fontSize: "26px",
              }}
            />{" "}
            <span>{channel.name}</span>
          </div>
          <div>
            <RiInboxFill className="inbox-icon" />
            <AiFillQuestionCircle className="question-icon " />
          </div>
        </div>
      </div>
    )
  );
}

export default ChatNav;
