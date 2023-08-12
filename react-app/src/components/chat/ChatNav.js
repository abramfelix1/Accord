import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { RiHashtag, RiInboxFill } from "react-icons/ri";
import { AiFillQuestionCircle } from "react-icons/ai";
import "./chat-css/ChatNav.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ChatNav() {
  const { serverid, channelid } = useParams();
  const channel = useSelector((state) => {
    if (
      state.servers[serverid] &&
      state.servers[serverid].channels &&
      state.servers[serverid].channels[channelid]
    ) {
      return Object.values(state.servers[serverid].channels[channelid]);
    } else {
      return [];
    }
  });

  return (
    <>
      <div className="live-chat-container">
        {
          <div className="inner-live-chat-container">
            <div style={{ display: "flex", alignItems: "center" }}>
              <RiHashtag
                style={{
                  marginRight: "10px",
                  color: "#ADADAD",
                  fontSize: "26px",
                }}
              />{" "}
              {channel && <span>{channel.name}</span>}
            </div>
            {/* <div>
              <RiInboxFill className="inbox-icon" />
              <AiFillQuestionCircle className="question-icon " />
            </div> */}
          </div>
        }
      </div>
    </>
  );
}

export default ChatNav;
