import logo from "../../images/accord-logo.png"


function ServerMemberCard({ member }) {



    return (
        <div className="member-wrapper" >
            {member.image_url !== null && member.image_url.length >= 1
            ? 
            <img className="member-image" src={member.image_url} alt="member-image" />
            :
            <div className="member-logo-wrapper">
                <img className="member-logo" src={logo} alt="logo"/>
            </div>}
            <p className="member-name" >{member.display_name ? member.display_name : member.username}</p>
        </div>
    )
}


export default ServerMemberCard