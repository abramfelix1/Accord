export const UPDATE_USER = "user/UPDATE_USER";
export const GET_USER_SERVERS = "user/GET_USER_SERVERS";
export const GET_ALL_USERS = "user/GET_ALL_USERS";
export const GET_USER = "user/GET_USER";
export const UPDATE_IMAGE = "user/UPDATE_IMAGE";

// -------------------------------- Action Creators --------------------------------
const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  payload: users,
});

const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const getUserServers = (server) => ({
  type: GET_USER_SERVERS,
  payload: server,
});

export const updateUserImage = (payload) => ({
  type: UPDATE_IMAGE,
  payload,
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

export const updateUserThunk =
  (username, display_name, image_url) => async (dispatch) => {
    const response = await fetch(`/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        display_name: display_name,
        image_url: image_url,
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      dispatch(updateUser(userData));
      dispatch(getAllUsersThunk());
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

export const uploadProfileImageThunk = (image) => async (dispatch) => {
  const res = await fetch(`/api/users/image`, {
    method: "PUT",
    body: image,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateUserImage(data));
    return data;
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
      return { user: action.payload };

    case GET_USER_SERVERS:
      newState = {};
      action.payload.forEach((server) => (newState[server.id] = server));
      return newState;

    default:
      return state;
  }
}
