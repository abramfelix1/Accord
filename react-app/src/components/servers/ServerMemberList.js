import { useDispatch, useSelector } from "react-redux";
import * as memberActions from "../../store/members";
import { useEffect, useState } from "react";
import ServerMemberCard from "./ServerMemberCard";
import { useParams } from "react-router-dom/";
import MemberProfile from "./MemberProfile";
import "./server-css/ServerMemberList.css";

function ServerMemberList({ server }) {
  const dispatch = useDispatch();
  const { serverid, channelid } = useParams();
  // const serverMembers = Object.values(
  //   useSelector((state) => state.current.members)
  // );
  const serverMembers = useSelector((state) => {
    if (state.servers[serverid] && state.servers[serverid].members) {
      return Object.values(state.servers[serverid].members);
    } else {
      return [];
    }
  });
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

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
              >
                <ServerMemberCard
                  member={member}
                  server={server}
                  selectedMember={selectedMember}
                  setShowProfile={setShowProfile}
                  showProfile={showProfile}
                />
                <div>
                  {selectedMember == member.id && showProfile && (
                    <MemberProfile
                      member={member}
                      setShowProfile={setShowProfile}
                      setSelectedMember={setSelectedMember}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ServerMemberList;
