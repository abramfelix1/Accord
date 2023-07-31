const POPULATE_MESSAGES = "chat/setMessages";
const ADD_MESSAGE = "chat/addMessage";

const populateMessages = (messages) => ({
  type: POPULATE_MESSAGES,
  payload: messages,
});

const addMessage = (payload) => ({
  type: ADD_MESSAGE,
  payload,
});

export const getMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/messages`);
  if (response.ok) {
    const data = await response.json();
    dispatch(populateMessages(data));
  }
  return response;
};

export const createMessage = (payload) => async (dispatch) => {
  const { channel_id } = payload;
  const response = await fetch(`/api/channels/${channel_id}/messages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getMessages(channel_id));
  }
};

const initialState = {};

const messageReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case POPULATE_MESSAGES:
      return action.payload.reduce((messages, message) => {
        messages[message.id] = message;
        return messages;
      }, {});
    case ADD_MESSAGE:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default messageReducer;
