import { useEffect } from "react";
import logo from "../../images/accord-logo.png";
import { FaCrown } from "react-icons/fa6";

function ServerMemberCard({
  member,
  selectedMember,
  setShowProfile,
  showProfile,
  server,
  activeMember,
  setActiveMember,
  onCardClick,
}) {
  // toggles to show the profile

  const toggleProfile = (event) => {
    if (onCardClick) {
      onCardClick(event);
    }
    if (showProfile && selectedMember == member.id) {
      setShowProfile(false);
      return;
    }

    setShowProfile(true);
    setActiveMember(true);
  };

  useEffect(() => {}, [server]);

  return (
    <>
      <div
        className="member-wrapper"
        id={
          selectedMember == member.id && showProfile && activeMember
            ? "active-profile"
            : ""
        }
        onClick={(e) => toggleProfile(e)}
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
          {member.nickname
            ? member.nickname
            : member.display_name || member.username}{" "}
          {server && member && server.owner_id === member.user_id && (
            <span>
              <FaCrown className="members-crown" />
            </span>
          )}
        </p>
      </div>
    </>
  );
}

export default ServerMemberCard;
