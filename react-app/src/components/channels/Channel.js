import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as channelActions from "../../store/channels";
import { IoIosArrowDown } from "react-icons/io";
import { RiHashtag } from "react-icons/ri";
import { FaHashtag } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { useContext } from "react";
import { InfoContext } from "../../context/infoContext";

import "./channel-css/Channel.css";

function Channel({ server }) {
  // const {id} = useParams()
  const dispatch = useDispatch();
  const { setChannel } = useContext(ChannelContext);

  let isLoaded = useSelector((state) => state.channels.isLoading);
  let channels = Object.values(useSelector((state) => state.channels.channels));

  useEffect(() => {
    (async () => {
      await dispatch(channelActions.getChannels(server.id || 1));
    })();
  }, [dispatch, server]);

  useEffect(() => {
    console.log(channels);
    console.log(isLoaded);
  }, [channels, isLoaded]);

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
              <BiPlus className="text-channel-add-icon" />
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
                      to={`/channels/${channel.id}`}
                      onClick={(e) => setChannel(channel)}
                    >
                      <FaHashtag />
                      <div className="channel-name">{channel.name}</div>
                    </NavLink>
                  );
                })}
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  );
}

export default Channel;
