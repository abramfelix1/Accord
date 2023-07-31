


function ServerCard({ server, handleActiveButton, toolTip, setToolTip }){

    // gets the initals of the server name and return them capitalize
    const initals = (serverName) => {
        let res = "";
        const serverNameArr = serverName.split(" ");

        for (let i = 0; i < serverNameArr.length; i++) {
            let word = serverNameArr[i];
            res += word[0].toUpperCase();
        }
        return res;
    } 

    return (
        <>
            {server.image_url !== null && server.image_url.length >= 1
            ? 
            <div className="tooltip">
                <img className="servers-img" 
                    src={server.image_url} 
                    alt="serverimage"
                    onClick={e => handleActiveButton(e)}
                    // onMouseLeave={() => setToolTip(false)}
                    // onMouseEnter={() => setToolTip(true)}
                />
            </div>
            :   
            <div className="servers tooltip"
                onClick={e => handleActiveButton(e)}
            >
                {initals(server.name)}
            </div>}

            {toolTip && <span className="tooltiptext">{server.name}</span>}
        </>
    )
}


export default ServerCard