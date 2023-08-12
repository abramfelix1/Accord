import { useEffect } from "react";
import logo from "../../images/accord-logo.png"
import "./server-css/ServerMemberList.css"


function MemberProfile({ member, setShowProfile }) {

    // switches the the background color of each profile to something different
    const generateColor = () => {
        // gets a random number
        const randomNum = Math.floor(Math.random() * 16777215)
            // converts it into a hexadecimal
            .toString(16)
            // pads with "0" until length of 6
            .padStart(6, '0');
        return `#${randomNum}`;
    };


    useEffect(() => {
        document.addEventListener('mouseup',function(event){
            const profile = document.getElementById('member-profile-container');
            if(event.target != profile && event.target.parentNode != profile){
                if (profile && profile.style) {
                    profile.style.display = 'none';
                }
            }
        }); 
    }, [])

    return(
        <div className="member-profile-container" id="member-profile-container">
            <div className="profile-top-wrap" style={{backgroundColor:generateColor()}}>

            {/* <div className="profile-exit" onClick={e => setShowProfile(false)} >X</div> */}
            </div>
            <div className="profile-logo-outer-wrapper">
                {member.image_url !== null && member.image_url.length >= 1
                    ?
                    <img className="profile-image" src={member.image_url} alt="profile-image" />
                    :
                    <div className="profile-logo-inner-wrapper">
                        <img className="profile-logo" src={logo} alt="logo"/>
                    </div>
                }
            </div>
            <div className="profile-bottom-wrap">
                <div className="profile-info-wrap" >
                    <div className="profile-name" >
                        <p id="profile-username">{member.username}</p>
                        <p id="profile-display-name">{member.display_name ? member.display_name : member.username}</p>
                    </div>
                    <div className="profile-date">
                        <p id="member-since">SERVER MEMBER SINCE</p>
                        <p id="server-start-date">{member.created_at.slice(8, 12) + member.created_at.slice(5, 7) + member.created_at.slice(11, 16)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MemberProfile;
