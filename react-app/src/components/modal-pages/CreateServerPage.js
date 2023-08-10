import "./modal-css/CreateServer.css"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { BiSolidCamera } from "react-icons/bi";
import * as serverActions from "../../store/server";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext"
import { useHistory } from "react-router-dom"

function CreateServerPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { setType } = useContext(ModalContext)
    const [serverName, setServerName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const user = useSelector(state => state.session.user);
    
    useEffect(() => {
        if(user) {
            setServerName(`${user.username}'s server`)
        }
    }, [user])

    const createServerHandleSubmit = async (e) => {
        e.preventDefault()

        const newServer = await dispatch(serverActions.createServerThunk(user.id, serverName))

        if (imageUrl && newServer) {
            const formData = new FormData();
            formData.append("image_url", imageUrl);
            await dispatch(serverActions.uploadServerImageThunk(newServer.id, formData));

            setType(null);
            return history.push(`/servers/${newServer.id}/channels/${newServer.firstChannel.id}`)
        }

        if (newServer) {
            // console.log(newServer)
            setType(null);
            return history.push(`/servers/${newServer.id}/channels/${newServer.firstChannel.id}`)
        }
    }

    const closeModal = () => {
        setType(null)
    }


    return(
        <form className="create-server-container" encType="multipart/form-data" onSubmit={createServerHandleSubmit}>
            <div className="c-server-top-wrap">
                <h1 className="c-server-header">Customize your server</h1>
                <p className="c-server-description">
                    Give your new server a personality with a name and
                    an icon. You can always change it later.
                </p>
                {/* comment this back in when AWS in provided and comment out image input */}
                <div className="c-server-image-outer-wrapper">
                    <div className="c-server-image-wrapper">
                        <BiSolidCamera className="c-server-camera"/>
                        <p className="c-server-upload-text">UPLOAD</p>
                        <p className="c-cerver-plus"><span>+</span></p>
                    </div>
                    <input 
                    className="c-server-image-input" 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageUrl(e.target.files[0])}
                    name="serverimage"
                    />
                </div>
                {/* <label className="c-server-image-label">IMAGE URL
                    <input 
                    className="c-server-image-input" 
                    type="text" value={imageUrl} 
                    onChange={e => setImageUrl(e.target.value)} 
                    />
                </label> */}
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
                <p className="c-server-back" onClick={closeModal}>Back</p>
                <button id={serverName.length < 1 ? "c-server-button-disabled" : ""} disabled={serverName.length < 1} className="c-server-create-button" type="submit">Create</button>
            </div>
        </form>
    )
}


export default CreateServerPage

//     return(
//         <div className="create-server-container" onSubmit={createServerHandleSubmit}>
//             <form>
//             <div className="c-server-image-outer-wrapper">
//                     <div className="c-server-image-wrapper">
//                         <BiSolidCamera className="c-server-camera"/>
//                         <p className="c-server-upload-text">UPLOAD</p>
//                         <p className="c-cerver-plus"><span>+</span></p>
//                     </div>
//                     <input 
//                     className="c-server-image-input" 
//                     type="text"  
//                     accept="image/*"
//                     onChange={(e) => setImageUrl(e.target.files[0])}
//                     name="server image"
//                     />
//                 </div>
//             </form>
//             <form onSubmit={createServerHandleSubmit}>
//                 <div className="c-server-top-wrap">
//                     <h1 className="c-server-header">Customize your server</h1>
//                     <p className="c-server-description">
//                         Give your new server a personality with a name and
//                         an icon. You can always change it later.
//                     </p>
//                     {/* comment this back in when AWS in provided and comment out image input */}
//                     {/* <label className="c-server-image-label">IMAGE URL
//                         <input 
//                         className="c-server-image-input" 
//                         type="text" value={imageUrl} 
//                         onChange={e => setImageUrl(e.target.value)} 
//                         />
//                     </label> */}
//                     <label className="c-server-name-label">SERVER NAME *
//                         <input 
//                         className="c-server-name-input" 
//                         type="text" value={serverName} 
//                         onChange={e => setServerName(e.target.value)} 
//                         maxLength={100}
//                         />
//                     </label>
//                     <p className="c-server-agreement">By creating a server, you agree to Accord's  
//                         <span className="c-server-guidelines"> Community Guidelines</span>
//                     </p>
//                 </div>
//                 <div className="c-server-bottom-wrap">
//                     <p className="c-server-back" onClick={closeModal}>Back</p>
//                     <button id={serverName.length < 1 ? "c-server-button-disabled" : ""} disabled={serverName.length < 1} className="c-server-create-button" type="submit">Create</button>
//                 </div>
//             </form>
//         </div>

//     )
// }
    
    
//     export default CreateServerPage


