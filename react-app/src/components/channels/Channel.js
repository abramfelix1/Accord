import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import * as channelActions from "../../store/channels";
import { IoIosArrowDown } from "react-icons/io";
import { RiHashtag } from "react-icons/ri";
import { FaHashtag } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { useContext } from "react";
import { InfoContext } from "../../context/infoContext";
import { logout } from "../../store/session";
import { resetChannels } from "../../store/channels";
import { getMessages } from "../../store/message";

import "./channel-css/Channel.css";
import { resetMessages } from "../../store/message";

function Channel({ server }) {
  // const {id} = useParams()
  const dispatch = useDispatch();
  const { setChannel } = useContext(ChannelContext);
  const user = useSelector((state) => state.session.user);
  const isLoaded = useSelector((state) => state.channels.isLoading);
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
  };

  const channelClickHandler = (channel) => {
    setChannel(channel);
    // dispatch(resetMessages());
    // dispatch(getMessages(channel.id));
  };

  return (
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
                <BiPlus className="text-channel-add-icon" />
              )}
            </li>
            <li>
              <div>
                {/* <Link className="channel-flex" to="/app">
                  <FaHashtag />
                  <div className="channel-name">general</div>
                </Link> */}
                {channels.map((channel) => {
                  return (
                    <NavLink
                      key={channel.id}
                      className="channel-flex"
                      to={`/servers/${server.id}/channels/${channel.id}`}
                      onClick={(e) => {
                        channelClickHandler(channel);
                      }}
                    >
                      <FaHashtag />
                      <div className="channel-name">{channel.name}</div>
                    </NavLink>
                  );
                })}
              </div>
            </li>
            <button onClick={(e) => logoutHandler()}> logout </button>
          </ul>
        </div>
      </div>
    )
  );
}

export default Channel;
