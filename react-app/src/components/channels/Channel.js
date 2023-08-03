import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import * as channelActions from "../../store/channels";
import { IoIosArrowDown } from "react-icons/io";
import { RiHashtag } from "react-icons/ri";
import { FaHashtag } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ChannelContext } from "../../context/channelContext";
import { useContext } from "react"

import { logout } from "../../store/session";

import "./channel-css/Channel.css";


function Channel({ server }) {
  const dispatch = useDispatch();
  const { setChannel } = useContext(ChannelContext)
  const user = useSelector(state => state.session.user)
  const channels = Object.values(useSelector((state) => state.channels));


  useEffect(() => {
    (async () => {
      await dispatch(channelActions.getChannels(server.id || 1));
    })()
  }, [dispatch, server]);

  const logoutHandler = async () => {

    await dispatch(logout())
  }

  console.log(server.owner_id, user.id)
  return (
    channels && (
      <div className="channel-container">
        <div>
          <ul className="channel-list">
            <li className="channel-list-title-container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IoIosArrowDown className=".text-channel-drop-down-icon" />
                <p className="channel-list-title">Text Channels</p>
              </div>
              {user.id === server.owner_id &&
              <BiPlus className="text-channel-add-icon" />
              }
            </li>
            <li>
              <div>
                {/* <Link className="channel-flex" to="/app">
                  <FaHashtag />
                  <div className="channel-name">general</div>
                </Link> */}
                {channels.map((channel) => {
                  return (
                    <Link key={channel.id} className="channel-flex" to={`/app`} onClick={(e => setChannel(channel))}>
                      <FaHashtag />
                      <div className="channel-name">{channel.name}</div>
                    </Link>
                  );
                })}
              </div>
            </li>
            <button onClick={e => logoutHandler()}> logout </button>
          </ul>
        </div>
      </div>
    )
  );
}

export default Channel;
