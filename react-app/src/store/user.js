const UPDATE_USER = 'user/UPDATE_USER'

// -------------------------------- Action Creators --------------------------------
const updateUser = (user) => ({
	type: UPDATE_USER,
	payload: user,
});

// -------------------------------- Thunk Creators --------------------------------
export const updateUserThunk = (user) => async dispatch => {
    const response = await csrfFetch(`/api/users/profile`, {
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


// -------------------------------- Reducer --------------------------------
const initialState = { user: null };
export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_USER:
			return { user: action.payload };
		default:
			return state;
	}
}
