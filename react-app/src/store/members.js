import { getUserServersThunk } from "./user";

/*************** TYPES **************************/
export const GET_SERVER_MEMBERS = "server/GET_SERVER_MEMBERS";
export const GET_SINGLE_MEMBER = "server/GET_SINGLE_MEMBER ";
/*************** ACTIONS CREATOR **************************/

export const getServerMembersAction = (members) => {
  return {
    type: GET_SERVER_MEMBERS,
    payload: members,
  };
};

export const getSingleMemberAction = (member) => {
  return {
    type: GET_SINGLE_MEMBER,
    payload: member,
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
};

export const leaveServerThunk = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/members/server/${server_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if the response is good. recall the get all servers thunk
  // to get the redux updated with all the servers again to
  // prevent loading issues
  if (res.ok) {
    dispatch(getUserServersThunk(server_id));
  }
};

export const updateServerNicknameThunk =
  (server_id, nickname) => async (dispatch) => {
    const res = await fetch(`/api/members/server/${server_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname,
      }),
    });

    if (res.ok) {
      dispatch(getUserServersThunk(server_id));
    }
  };

export const getSingleMemberThunk = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/members/server/${server_id}`);

  if (res.ok) {
    const member = await res.json();
    dispatch(getSingleMemberAction(member));
    return member;
  }
};

/******/

// REDUCER

export default function memberReducer(state = {}, action) {
  let newState;

  switch (action.type) {
    case GET_SERVER_MEMBERS:
      newState = {};
      const serverMembers = action.payload;
      serverMembers.forEach((member) => {
        newState[member.id] = member;
      });
      return newState;
    case GET_SINGLE_MEMBER:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState[action.payload.id];
    default:
      return state;
  }
}
