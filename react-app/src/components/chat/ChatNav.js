import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { RiHashtag, RiInboxFill } from "react-icons/ri";
import { AiFillQuestionCircle } from "react-icons/ai";
import "./chat-css/ChatNav.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import jon from "../../images/jon.png";
import abram from "../../images/abram.jpg";
import randy from "../../images/randy.png";
import { BsLinkedin, BsGithub, BsArrowBarRight } from "react-icons/bs";

function ChatNav() {
  const { serverid, channelid } = useParams();
  const [openDev, setOpenDev] = useState(false);

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
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {!openDev && <span style={{ fontSize: "14px" }}>Devs</span>}
              {!openDev && (
                <AiFillQuestionCircle
                  className="question-icon"
                  onClick={() => setOpenDev(true)}
                />
              )}

              {openDev && (
                <div className="dev-dropdown">
                  <div className="dev-dropdown-content">
                    <div className="dev-contents">
                      <div>Abram Felix</div>
                      <div className="dev-links">
                        <a
                          href="https://www.linkedin.com/in/abram-felix/"
                          target="_blank"
                        >
                          <BsLinkedin />
                        </a>
                        <a href="https://github.com/abramfelix1" target="_blank">
                          <BsGithub />
                        </a>
                      </div>
                    </div>
                    <div className="dev-contents">
                      <div>Randy Hac</div>
                      <div className="dev-links">
                        <a
                          href="https://www.linkedin.com/in/randy-hac-4577a71b0/"
                          target="_blank"
                        >
                          <BsLinkedin />
                        </a>
                        <a href="https://github.com/randydhack" target="_blank">
                          <BsGithub />
                        </a>
                      </div>
                    </div>
                    <div className="dev-contents">
                      <div>Jonathan Ang</div>
                      <div className="dev-links">
                          <a
                            href="https://www.linkedin.com/in/jonathan-ang-b1508b286/"
                            target="_blank"
                          >
                            <BsLinkedin />
                          </a>
                          <a href="https://github.com/jang55" target="_blank">
                          <BsGithub />
                          </a>
                      </div>
                    </div>
                    <BsArrowBarRight
                      onClick={() => setOpenDev(false)}
                      className="close-dev-icon"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default ChatNav;
