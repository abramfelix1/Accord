export const UPDATE_USER = "user/UPDATE_USER";
export const GET_USER_SERVERS = "user/GET_USER_SERVERS";
export const GET_ALL_USERS = "user/GET_ALL_USERS";
export const GET_USER = "user/GET_USER";

// -------------------------------- Action Creators --------------------------------
const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  payload: users,
});

const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

const getUserServers = (server) => ({
  type: GET_USER_SERVERS,
  payload: server,
});

// -------------------------------- Thunk Creators --------------------------------

export const getAllUsersThunk = () => async (dispatch) => {
  const res = await fetch(`/api/users/`, {
    method: "GET",
  });

  if (res.ok) {
    const users = await res.json();
    dispatch(getAllUsers(users));
    return users;
  }
};

export const getUserThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "GET",
  });

  if (res.ok) {
    const user = await res.json();
    dispatch(getUser(user));
    return user;
  }
};

export const updateUserThunk = (user) => async (dispatch) => {
  const response = await fetch(`/api/users/profile`, {
    method: "PUT",
    body: JSON.stringify({
      username: user.username,
      display_name: user.display_name,
      image_url: user.image_url,
    }),
  });

  if (response.ok) {
    const userData = await response.json();
    dispatch(updateUser(userData));
    return userData;
  }
};

export const getUserServersThunk = () => async (dispatch) => {
  const res = await fetch(`/api/users/servers`, {
    method: "GET",
  });

  if (res.ok) {
    const serverData = await res.json();
    dispatch(getUserServers(serverData));
    return serverData;
  }
};

// -------------------------------- Reducer --------------------------------

export default function userReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_USERS:
      newState = {};
      action.payload.users.forEach((user) => (newState[user.id] = user));
      return newState;

    case GET_USER:
      console.log(action);
      return { user: action.payload };

    case UPDATE_USER:
      return { user: action.payload };

    case GET_USER_SERVERS:
      newState = {};
      action.payload.forEach((server) => (newState[server.id] = server));
      return newState;

    default:
      return state;
  }
}
