import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { RiHashtag, RiInboxFill } from "react-icons/ri";
import { AiFillQuestionCircle } from "react-icons/ai";
import "../chat/chat-css/ChatNav.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function MainChatNavCopy() {
    const { channel, setChannel } = useContext(ChannelContext);
    const { serverid, channelid } = useParams();
    const isLoading = useSelector((state) => state.current.isLoading);
  // const channel = useSelector((state) => state.current.channel);

    return (
        <>
        <div className="live-chat-container">
            {(
            <div className="inner-live-chat-container">
                <div style={{ display: "flex", alignItems: "center",justifyContent:"center", fontSize: "30px" }}>
                    {/* <span>{"ACCORD"}</span> */}
                </div>
                {/* <div>
                    <RiInboxFill className="inbox-icon" />
                    <AiFillQuestionCircle className="question-icon " />
                </div> */}
            </div>
            )}
        </div>
        </>
    );
}

export default MainChatNavCopy;
