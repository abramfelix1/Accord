/*************** TYPES **************************/
const GET_SERVER_MEMBERS = "server/GET_SERVER_MEMBERS"



/*************** ACTIONS CREATOR **************************/

export const getServerMembersAction = (members) => {
    return {
        type: GET_SERVER_MEMBERS,
        payload: members
    };
};


/*************** THUNK ACTIONS CREATOR **************************/

export const getServerMembersThunk = (server_id) => async (dispatch) => {
    const res = await fetch(`/api/servers/${server_id}/members`);

    if (res.ok) {
        const members = await res.json();
        dispatch(getServerMembersAction(members));
        return members;
    }
}


/******/




// REDUCER

export default function memberReducer(state = {}, action) {
    let newState;

	switch (action.type) {
		case GET_SERVER_MEMBERS:
            newState = {};
            const serverMembers = action.payload;
            serverMembers.forEach((member) => {
                newState[member.id] = member
            })
			return newState;
		default:
			return state;
	}
}



