const SET_MESSAGES = "chat/setMessages";
const ADD_MESSAGE = "chat/addMessage";

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const getMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/messages`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setMessages(data));
  }
  return response;
};

export const createMessage = (payload) => async (dispatch) => {
  const { message, user_id, channel_id } = payload;
  const response = await fetch(`/api/channel/${channel_id}/messages`, {
    method: "POST",
    body: JSON.stringify({
      message,
      user_id,
      channel_id,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addMessage(data));
  }
};

const initialState = { messages: [] };

const messageReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_MESSAGES:
      newState["messages"] = action.payload;
      return newState;
    case ADD_MESSAGE:
      newState["messages"] = [...state.messages, action.payload];
      return newState;
    default:
      return state;
  }
};

export default messageReducer;
