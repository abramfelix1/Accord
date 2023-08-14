import { useDispatch, useSelector } from "react-redux";
import {
  addMemberAction,
  leaveServerAction,
  updateMemberName,
} from "../../store/members";
import { useEffect, useState } from "react";
import ServerMemberCard from "./ServerMemberCard";
import { useParams } from "react-router-dom/";
import MemberProfile from "./MemberProfile";
import MemberContainer from "./MemberContainer";
import "./server-css/ServerMemberList.css";
import { handleMemberUpdates } from "../utils/Socket";

function ServerMemberList({ server }) {
  const dispatch = useDispatch();
  const { serverid, channelid } = useParams();
  const serverMembers = useSelector((state) => {
    if (state.servers[serverid] && state.servers[serverid].members) {
      return Object.values(state.servers[serverid].members);
    } else {
      return [];
    }
  });
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [activeMember, setActiveMember] = useState(false);
  const [cardPosition, setCardPosition] = useState(null);

  const handleCardClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCardPosition(rect.top);
  };

  useEffect(() => {
    const callbacks = {
      CREATE: (data) => dispatch(addMemberAction(data)),
      DELETE: (data) => dispatch(leaveServerAction(data)),
      EDIT: (data) => dispatch(updateMemberName(data)),
    };
    handleMemberUpdates(callbacks);
  }, [dispatch, serverid]);

  useEffect(() => {
    setShowProfile(true);
  }, [selectedMember]);

  // anytime a channel id is changed or a server id is changed. it will
  // close the profile when rendering
  useEffect(() => {
    setShowProfile(false);
  }, [serverid, channelid]);

  return (
    <div
      className="member-container"
      style={{ backgroundColor: "#2B2D30", width: "14.938rem", color: "white" }}
    >
      {serverid && (
        <>
          <p className="member-total">
            MEMBERS - {serverMembers ? serverMembers.length : 0}
          </p>
          <div>
            {serverMembers.map((member) => (
              <div
                key={member.id}
                onClick={(e) => setSelectedMember(member.id)}
                className="sever-member-parent-container"
              >
                <ServerMemberCard
                  member={member}
                  server={server}
                  selectedMember={selectedMember}
                  setSelectedMember={setSelectedMember}
                  setShowProfile={setShowProfile}
                  showProfile={showProfile}
                  activeMember={activeMember}
                  setActiveMember={setActiveMember}
                  onCardClick={handleCardClick}
                />
                <MemberContainer cardPosition={cardPosition}>
                  <div>
                    {selectedMember == member.id &&
                      showProfile &&
                      activeMember && (
                        <MemberProfile
                          member={member}
                          setShowProfile={setShowProfile}
                          setSelectedMember={setSelectedMember}
                          setActiveMember={setActiveMember}
                        />
                      )}
                  </div>
                </MemberContainer>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ServerMemberList;
