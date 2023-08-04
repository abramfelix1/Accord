import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { InfoContext, InfoProvider } from "../../context/infoContext";
import ServerMemberList from "./ServerMemberList";

function ServerCard({ handleActiveButton, serverInfo, toolTip, setToolTip }) {
  const { id } = useParams();
  const { server } = useContext(InfoContext);

  // gets the initals of the server name and return them capitalize
  const initials = (serverName) => {
    let res = "";
    const serverNameArr = serverName.split(" ");

    for (let i = 0; i < serverNameArr.length; i++) {
      let word = serverNameArr[i];
      res += word[0].toUpperCase();
    }
    return res.slice(0, 3);
  };

  return (
    <NavLink
      to={`/servers/${serverInfo.id}/channels/${serverInfo.firstChannel.id}`}
      className={`servers server-pointer`}
      onClick={(e) => handleActiveButton(e, serverInfo)}
    >
      {serverInfo.image_url !== null && serverInfo.image_url.length >= 3 ? (
        <div>
          <img
            className="servers-img"
            src={server.image_url}
            alt="serverimage"
            onClick={(e) => handleActiveButton(e)}
          />
        </div>
      ) : (
        <div
          className="server-initials"
          onClick={(e) => {
            // e.stopPropagation();
            e.preventDefault();
          }}
        >
          {initials(serverInfo.name)}
        </div>
      )}
    </NavLink>
  );
}
export default ServerCard;
