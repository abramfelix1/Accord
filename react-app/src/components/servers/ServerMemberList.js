import { useDispatch, useSelector } from "react-redux";
import * as memberActions from "../../store/members";
import { useEffect, useState } from "react";
import ServerMemberCard from "./ServerMemberCard";
import { useRef } from "react";
import MemberProfile from "./MemberProfile";
import "./server-css/ServerMemberList.css";

function ServerMemberList({ server }) {
  const dispatch = useDispatch();
  const serverMembers = Object.values(useSelector((state) => state.members));
  let isLoading = useSelector((state) => state.channels.isLoading);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

  useEffect(() => {
    setShowProfile(true);
  }, [selectedMember]);

  useEffect(() => {
    if (server) {
      (async () => {
        // currently just setting the server 1 as a starting point until
        // we can figure out what to set the list starting point to
        // when you are not on a server yet.
        await dispatch(memberActions.getServerMembersThunk(server.id || 1));
      })();
    }
  }, [dispatch, server]);

  return (
    <div
      className="member-container"
      style={{ backgroundColor: "#2B2D30", width: "14.938rem", color: "white" }}
    >
      {!isLoading && (
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
