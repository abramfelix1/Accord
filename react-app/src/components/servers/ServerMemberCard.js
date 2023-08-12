import { useEffect } from "react";
import logo from "../../images/accord-logo.png";
import { FaCrown } from "react-icons/fa6";

function ServerMemberCard({
  member,
  selectedMember,
  setShowProfile,
  showProfile,
  server,
}) {
  // toggles to show the profile

  const toggleProfile = () => {
    if (showProfile && selectedMember == member.id) {
      setShowProfile(false);
      console.log(false, "111111111111111111111111111111111111111111111111111111")
      return;
    }
    setShowProfile(true);
    console.log(true, "111111111111111111111111111111111111111111111111111111")
  };

  useEffect(() => {}, [server]);

  return (
    <>
      <div
        className="member-wrapper"
        id={selectedMember == member.id && showProfile ? "active-profile" : ""}
        onClick={toggleProfile}
      >
        {member.image_url !== null && member.image_url.length >= 1 ? (
          <img
            className="member-image"
            src={member.image_url}
            alt="member-images"
          />
        ) : (
          <div className="member-logo-wrapper">
            <img className="member-logo" src={logo} alt="logo" />
          </div>
        )}
        <p className="member-name">
          {member.nickname ? member.nickname : (member.display_name || member.username)} {server && member && server.owner_id === member.user_id && (
          <span><FaCrown className="members-crown" /></span>
        )}
        </p>
      </div>
    </>
  );
}

export default ServerMemberCard;
