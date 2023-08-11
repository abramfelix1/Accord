import { getUserServersThunk } from "./user";

/*************** TYPES **************************/
export const GET_SERVER_MEMBERS = "server/GET_SERVER_MEMBERS";
export const GET_SINGLE_MEMBER = "server/GET_SINGLE_MEMBER ";
export const UPDATE_MEMBER = "server/UPDATE_MEMBER ";
export const DELETE_MEMBER = "server/DELETE_MEMBER ";
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

export const updateMemberName = (payload) => {
  return {
    type: UPDATE_MEMBER,
    payload,
  };
};

export const leaveServerAction = (payload) => {
  return {
    type: DELETE_MEMBER,
    payload,
  };
};

/*************** THUNK ACTIONS CREATOR **************************/

export const getServerMembersThunk = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/servers/${server_id}/members`);

  if (res.ok) {
    const member = await res.json();
    dispatch(getServerMembersAction(member));
    return member;
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
    const data = res.json();
    dispatch(leaveServerAction({ server_id: server_id }));
    return data;
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
      const member = await res.json();
      dispatch(updateMemberName({ server_id: server_id, member: member }));
      return member;
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

export const joinServerThunk = (server_id) => async (dispatch) => {
  const res = await fetch(`/api/server/${server_id}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      server_id: server_id,
    }),
  });

  if (res.ok) {
    const data = res.json();
    dispatch(getUserServersThunk());
    return data;
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
