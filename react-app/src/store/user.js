const UPDATE_USER = 'user/UPDATE_USER'
const GET_USER_SERVERS = 'user/GET_USER_SERVERS'

// -------------------------------- Action Creators --------------------------------
const updateUser = (user) => ({
	type: UPDATE_USER,
	payload: user,
});

const getUserServers = (server) => ({
  type: GET_USER_SERVERS,
  payload: server,
})

// -------------------------------- Thunk Creators --------------------------------
export const updateUserThunk = (user) => async dispatch => {
    const response = await fetch(`/api/users/profile`, {
      method: "PUT",
      body: JSON.stringify({
        username: user.username,
        display_name: user.display_name,
        image_url: user.image_url
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      dispatch(updateUser(userData));
      return userData;
    }
  }

export const getUserServersThunk = () => async dispatch => {
  const res = await fetch(`/api/users/servers`, {
    method: "GET"
  })

  if (res.ok) {
    const serverData = await res.json()
    dispatch(getUserServers(serverData))
    return serverData
  }
}


// -------------------------------- Reducer --------------------------------

export default function userReducer(state = {}, action) {
  let newState;
	switch (action.type) {
		case UPDATE_USER:
			return { user: action.payload };

    case GET_USER_SERVERS:
      newState = {}
      action.payload.forEach(server => newState[server.id] = server)
      return newState

		default:
			return state;
	}
}
