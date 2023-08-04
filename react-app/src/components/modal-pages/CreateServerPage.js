import "./model-pages-css/CreateServer.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
// import { BiSolidCamera } from "react-icons/bi";


function CreateServerPage() {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const user = useSelector(state => state.session.user);
    
    useEffect(() => {
        if(user) {
            setServerName(`${user.username}'s server`)
        }
    }, [user])

    const handleSubmit = async () => {
        
    }

    return(
        <form className="create-server-container">
            <div className="c-server-top-wrap">
                <h1 className="c-server-header">Customize your server</h1>
                <p className="c-server-description">
                    Give your new server a personality with a name and
                    an icon. You can always change it later.
                </p>
                {/* comment this back in when AWS in provided and comment out image input */}
                {/* <div className="c-server-image-outer-wrapper">
                    <div className="c-server-image-wrapper">
                        <BiSolidCamera className="c-server-camera"/>
                        <p className="c-server-upload-text">UPLOAD</p>
                        <p className="c-cerver-plus"><span>+</span></p>
                    </div>
                </div> */}
                <label className="c-server-image-label">IMAGE URL
                    <input 
                    className="c-server-image-input" 
                    type="text" value={imageUrl} 
                    onChange={e => setImageUrl(e.target.value)} 
                    />
                </label>
                <label className="c-server-name-label">SERVER NAME *
                    <input 
                    className="c-server-name-input" 
                    type="text" value={serverName} 
                    onChange={e => setServerName(e.target.value)} 
                    maxLength={100}
                    />
                </label>
                <p className="c-server-agreement">By creating a server, you agree to Accord's  
                    <span className="c-server-guidelines"> Community Guidelines</span>
                </p>
            </div>
            <div className="c-server-bottom-wrap">
                <p className="c-server-back">Back</p>
                <button className="c-server-create-button">Create</button>
            </div>
        </form>
    )
}


export default CreateServerPage