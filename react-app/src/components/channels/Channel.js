import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import * as channelActions from "../../store/channels";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { BiPlus, BiSolidCog } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";
import { logout } from "../../store/session";

import "./channel-css/Channel.css";
import { resetServers } from "../../store/servers";

function Channel() {
  // router doms
  const { serverid, channelid } = useParams();
  const dispatch = useDispatch();

  // useSelectors
  const isLoaded = useSelector((state) => state.current.isLoading);
  const { setIsLoaded } = useContext(InfoContext);
  const server = useSelector((state) => state.current.server);
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => {
    if (state.servers[serverid]) {
      return Object.values(state.servers[serverid].channels);
    } else {
      return [];
    }
  });

  // Contexts
  const { setChannel } = useContext(ChannelContext);
  const { createChannelModal, channelSettingModal } = useContext(ModalContext);
  const { setChannelCog } = useContext(InfoContext);

  // useStates
  const [showTextChannel, setShowTextChannel] = useState(true);

  // useEffects
  useEffect(() => {
    if (Object.values(server).length > 1) {
      (async () => {
        await dispatch(channelActions.getChannels(serverid));
      })();
    }
  }, [dispatch, server, serverid]);

  // Handlers

  const channelClickHandler = (event, channel) => {
    // dispatch(resetServers());
    setChannel(channel);
    if (event.currentTarget.id !== "active-channel") setIsLoaded(false);
    const current = document.getElementById("active-channel");
    if (current) current.id = "";
    event.currentTarget.id = "active-channel";
  };

  return (
    <>
      {user && !isLoaded && server && (
        <div className="channel-container">
          <div>
            <ul className="channel-list">
              <li className="channel-list-title-container">
                <div
                  className="dropdown-text-channel"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {showTextChannel ? (
                    <IoIosArrowDown
                      className=".text-channel-drop-down-icon"
                      onClick={(e) => setShowTextChannel(!showTextChannel)}
                    />
                  ) : (
                    <IoIosArrowForward
                      className=".text-channel-drop-down-icon"
                      onClick={(e) => setShowTextChannel(!showTextChannel)}
                    />
                  )}
                  <p
                    className="channel-list-title"
                    onClick={(e) => {
                      setShowTextChannel(!showTextChannel);
                      e.stopPropagation();
                    }}
                  >
                    Text Channels
                  </p>
                </div>
                {user.id === server.owner_id ? (
                  <BiPlus
                    className="text-channel-add-icon create-new-channel-plus"
                    onClick={(e) => createChannelModal()}
                  />
                ) : (
                  <BiPlus
                    className="text-channel-add-icon create-new-channel-plus hide-plus"
                    onClick={(e) => createChannelModal()}
                  />
                )}
              </li>
              {showTextChannel ? (
                <li>
                  {channels.map((channel, idx) => {
                    return (
                      <div
                        key={`${channel.id}${idx}`}
                        className={
                          channelid == channel.id
                            ? "channel-box-active"
                            : "channel-box"
                        }
                        onClick={(e) => {
                          channelClickHandler(e, channel);
                        }}
                      >
                        <NavLink
                          key={channel.id}
                          to={`/servers/${server.id}/channels/${channel.id}`}
                          className={`channel-flex `}
                        >
                          <FaHashtag style={{ color: "#949ba4" }} />
                          <p
                            className={`channel-name ${
                              channelid == channel.id ? "channel-white" : ""
                            }`}
                          >
                            {channel.name}
                          </p>
                        </NavLink>
                        {user.id === server.owner_id && (
                          <div className="cog-container">
                            <BiSolidCog
                              className="channel-cog-settings"
                              onClick={(e) => {
                                setChannelCog(channel);
                                channelSettingModal();
                                e.stopPropagation();
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Channel;
