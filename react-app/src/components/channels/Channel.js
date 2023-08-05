import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import * as channelActions from "../../store/channels";
import { IoIosArrowDown } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { BiPlus, BiSolidCog } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";
import { logout } from "../../store/session";

import "./channel-css/Channel.css";

function Channel({ server }) {
  // const {id} = useParams()
  const dispatch = useDispatch();
  const { setChannel } = useContext(ChannelContext);
  const { createChannelModal, channelSettingModal } = useContext(ModalContext);
  const { setChannelCog } = useContext(InfoContext)
  const [activeChannel, setActiveChannel] = useState("");
  const isLoaded = useSelector((state) => state.channels.isLoading);
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const channels = Object.values(
    useSelector((state) => state.channels.channels)
  );

  useEffect(() => {
    if (server) {
      (async () => {
        await dispatch(channelActions.getChannels(server.id || 1));
      })();
    }
  }, [dispatch, server]);

  const logoutHandler = async () => {
    await dispatch(logout());
    return history.push("/login");
  };

  const channelClickHandler = (channel) => {
    setChannel(channel);
  };

  return (
    user &&
    !isLoaded && (
      <div className="channel-container">
        <div>
          <ul className="channel-list">
            <li className="channel-list-title-container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IoIosArrowDown className=".text-channel-drop-down-icon" />
                <p className="channel-list-title">Text Channels</p>
              </div>
              {user.id === server.owner_id && (
                <BiPlus
                  className="text-channel-add-icon create-new-channel-plus"
                  onClick={(e) => createChannelModal()}
                />
              )}
            </li>
            <li>
              {channels.map((channel) => {
                return (
                  <div className="channel-box">
                    <Link
                      key={channel.id}
                      to={`/servers/${server.id}/channels/${channel.id}`}
                      className="channel-flex"
                      onClick={(e) => {
                        channelClickHandler(channel);
                      }}
                    >
                      <FaHashtag style={{ color: "#949ba4" }} />
                      <p className="channel-name">{channel.name}</p>
                    </Link>
                    {user.id === server.owner_id && (
                      <div>
                        <BiSolidCog
                          className="channel-cog-settings"
                          onClick={(e) => {
                            setChannelCog(channel)
                            channelSettingModal();
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </li>
            <button onClick={(e) => logoutHandler()}> logout </button>
          </ul>
        </div>
      </div>
    )
  );
}

export default Channel;
