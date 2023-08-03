import ServerMemberList from "./ServerMemberList";

function ServerCard({
  server,
  handleActiveButton,
  handleServerClick,
  toolTip,
  setToolTip,
}) {
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
            // onMouseLeave={() => setToolTip(false)}
            // onMouseEnter={() => setToolTip(true)}
          />
        </div>
      ) : (
        <div
          className="servers tooltip server-pointer"
          onClick={(e) => handleActiveButton(e, server)}
        >
          {initals(server.name)}
        </div>
      )}

      {toolTip && <span className="tooltiptext">{server.name}</span>}
      {/* <ServerMemberList /> */}
    </>
  );
}

export default ServerCard;
