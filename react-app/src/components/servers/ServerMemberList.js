import { useDispatch, useSelector } from "react-redux";
import * as memberActions from "../../store/members"
import { useEffect, useState } from "react";
import ServerMemberCard from "./ServerMemberCard";
import "./server-css/ServerMemberList.css"

function ServerMemberList({ server }) {
    const dispatch = useDispatch()
    const serverMembers = Object.values(useSelector((state) => state.members));

    useEffect(() => {
        (async () => {
            // currently just setting the server 1 as a starting point until
            // we can figure out what to set the list starting point to
            // when you are not on a server yet.
            await dispatch(memberActions.getServerMembersThunk(server.id || 1));
        })();
    }, [dispatch, server]);


    return (
        <div className="member-container" style={{backgroundColor: '#2B2D30', width: '14.938rem', color: 'white'}}>
            <p className="member-total" >MEMBERS - {serverMembers ? serverMembers.length : 0}</p>
            <ul>
                {serverMembers.map((member) => (
                    <li key={member.id} >
                        <ServerMemberCard member={member}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ServerMemberList;
