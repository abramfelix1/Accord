import { NavLink } from "react-router-dom";
import ServerMemberList from "./ServerMemberList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ServerCard({
  server,
  handleActiveButton,
  toolTip,
  setToolTip,
  linkID,
}) {
  const { id } = useParams();
  let firstChannel = Object.values(
    useSelector((state) => state.channels.channels)
  );
  let firstChannelID;
  if (firstChannel.length > 0) {
    console.log(firstChannel[0].id);
  }

  // gets the initals of the server name and return them capitalize
  const initals = (serverName) => {
    let res = "";
    const serverNameArr = serverName.split(" ");

    for (let i = 0; i < serverNameArr.length; i++) {
      let word = serverNameArr[i];
      res += word[0].toUpperCase();
    }
    return res;
  };

  return (
    <>
      {server.image_url !== null && server.image_url.length >= 1 ? (
        <div className="tooltip">
          <img
            className="servers-img"
            src={server.image_url}
            alt="serverimage"
            onClick={(e) => handleActiveButton(e)}
          />
        </div>
      ) : (
        <NavLink
          to={`/channels/${firstChannelID}`}
          className={`servers tooltip server-pointer`}
          onClick={(e) => handleActiveButton(e, server)}
        >
          {initals(server.name)}
        </NavLink>
      )}

      {toolTip && <span className="tooltiptext">{server.name}</span>}
      {/* <ServerMemberList /> */}
    </>
  );
}

export default ServerCard;
