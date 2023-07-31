import { useDispatch, useSelector } from "react-redux";
import * as memberActions from "../../store/members"
import { useEffect, useState } from "react";

function ServerMemberList({ server }) {
    const dispatch = useDispatch()
    const serverMembers = Object.values(useSelector((state) => state.members));
    
    useEffect(() => {
        (async () => {
            // currently just setting the server 1 as a starting point 
            // we can figure out what to set the list starting point to
            // when you are not on a server yet.
            await dispatch(memberActions.getServerMembersThunk(server.id || 1));
        })();
    }, [dispatch]);

    return (
        <div style={{backgroundColor: '#2B2D30', width: '14.938rem', color: 'white'}}>
            MemberList
            <ul>
                {serverMembers.map((member) => {
                    <li key={member.id}>
                        <p>{member.display_name}</p>
                    </li>
                })}
                hello
            </ul>
        </div>
    )
}

export default ServerMemberList;
