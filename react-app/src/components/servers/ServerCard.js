


function ServerCard({ server, handleActiveButton }){

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
            <div>
                <img className="servers-img" 
                    src={server.image_url} 
                    alt="serverimage"
                    onClick={e => handleActiveButton(e)}
                />
            </div>
            :   
            <div className="servers"
                onClick={e => handleActiveButton(e)}
            >
                {initals(server.name)}
            </div>}
        </>
    )
}


export default ServerCard