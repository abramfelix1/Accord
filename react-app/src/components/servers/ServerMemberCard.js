import logo from "../../images/accord-logo.png"
import { FaCrown } from "react-icons/fa6";


function ServerMemberCard({ member, selectedMember, setShowProfile, showProfile, server  }) {

    // toggles to show the profile 
    const toggleProfile = () => {
        if (showProfile && selectedMember == member.id) {
            setShowProfile(false)
            return;
        } 
        setShowProfile(true);
    }



    return (
        <div className="member-wrapper" id={selectedMember == member.id && showProfile ? "active-profile" : ""} onClick={toggleProfile}>
            {member.image_url !== null && member.image_url.length >= 1
            ? 
            <img className="member-image" src={member.image_url} alt="member-image" />
            :
            <div className="member-logo-wrapper" >
                <img className="member-logo" src={logo} alt="logo"/>
            </div>}
            <p className="member-name" >{member.display_name ? member.display_name : member.username}</p>
            {server.owner_id === member.user_id && <FaCrown className="members-crown"/>}
        </div>
    )
}


export default ServerMemberCard