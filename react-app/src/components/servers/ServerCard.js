import { NavLink } from "react-router-dom";
import ServerMemberList from "./ServerMemberList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { InfoContext, InfoProvider } from "../../context/infoContext";

function ServerCard({
  handleActiveButton,
  serverInfo,
  toolTip,
  setToolTip,
  linkID,
}) {
  const { id } = useParams();
  const { server } = useContext(InfoContext);
  console.log(server);

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
    <NavLink
      to={`/channels/${serverInfo.firstChannel.id}`}
      className={`servers server-pointer`}
      onClick={(e) => handleActiveButton(e, serverInfo)}
    >
      {serverInfo.image_url !== null && serverInfo.image_url.length >= 1 ? (
        <div className="tooltip">
          <img
            className="servers-img"
            src={serverInfo.image_url}
            alt="serverimage"
            onClick={(e) => handleActiveButton(e)}
          />
        </div>
      ) : (
        <p>{initals(serverInfo.name)}</p>
      )}
    </NavLink>
  );
}

export default ServerCard;
