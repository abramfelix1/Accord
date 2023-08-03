import "./model-pages-css/CreateServer.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { BiSolidCamera } from "react-icons/bi";


function CreateServerPage() {
    const [serverName, setServerName] = useState("")
    const user = useSelector(state => state.session.user)
    
    useEffect(() => {
        if(user) {
            setServerName(`${user.username}'s server`)
        }
    }, [user])

    // HiMiniCamera
    return(
        <form className="create-server-container">
            <div className="c-server-top-wrap">
                <h1 className="c-server-header">Customize your server</h1>
                <p className="c-server-description">
                    Give your new server a personality with a name and
                    an icon. You can always change it later.
                </p>
                <div className="c-server-image-outer-wrapper">
                    <div className="c-server-image-wrapper">
                        <BiSolidCamera className="c-server-camera"/>
                        <p className="c-server-upload-text">UPLOAD</p>
                    </div>
                </div>
                <div className="c-server-name">
                    <label>SERVER NAME</label>
                    <input type="text" value={serverName}></input>
                </div>
                <p className="c-server-agreement">By creating a server, you agree to Accord's Community Guidelines</p>
            </div>
            <div className="c-server-bottom-wrap">
                <p className="c-server-back">Back</p>
                <button className="c-server-create-button">Create</button>
            </div>
        </form>
    )
}


export default CreateServerPage