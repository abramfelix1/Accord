import { NavLink} from "react-router-dom"
import ServerCard from "./ServerCard"
import logo from "../../images/accord-logo.png"
import { useEffect, useState } from "react"
// import { ModalContext } from "../../context/modalContext"
// import { useContext } from "react"
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/user";


function ServerList() {
    const dispatch = useDispatch()
    const [toolTip, setToolTip] = useState(false);
    // const {createServerModal, isModalOpen} = useContext(ModalContext);

    // selecting the users state to get users servers
    const userServers = Object.values(useSelector((state) => state.user));

    // calls the dispatch function to set the state up for users servers
    useEffect(() => {
        (async () => {
            await dispatch(userActions.getUserServersThunk());
        })();
    }, [dispatch]);


    const handleActiveButton = event => {
        event.preventDefault()
        // gets the tag with the current button that is pressed to see the server
        const current = document.getElementById("active-server")
        // gets the current tag id to nothing
        if (current) {
            current.id = ""
        }
        // sets the new targeted server to show that it is on that server
        event.target.id = "active-server"
    }


    return (
        <div className="server-list-container">
            <div style={{color: 'white', marginTop: "4px", fontSize: "13px"}}>Accord</div>
            <div className="server-top-layer">
                {/* not sure what to url for direct messages list is yet */}
                <NavLink to="/app">
                    <div id="active-server" className="servers" onClick={e => handleActiveButton(e)}>
                        <img id="server-logo" src={logo} alt="logo" onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}/>
                    </div>
                </NavLink>
                {/* <div className="servers" onClick={e => handleActiveButton(e)}>Private Call</div> */}
            </div>
            <div className="border-between-layer"></div>
            <ul className="server-bottom-layer">
                {userServers.map(server => (
                    <li key={server.id}>
                {/* need to set proper link to where to navigate too */}
                        <NavLink to={`/app`}>
                            <ServerCard server={server} handleActiveButton={handleActiveButton} toolTip={toolTip} setToolTip={setToolTip}/>
                        </NavLink>
                    </li>
                ))}
                {/* will add this div back in when a model is used to create a new server */}
                {/* <li id={isModalOpen ? "active-plus" : ""} className={`plus`} onClick={e => { 
                    createServerModal()
                    }}>
                    +
                </li> */}
            </ul>
        </div>
    )
}

export default ServerList
