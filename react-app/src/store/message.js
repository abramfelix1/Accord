const POPULATE_MESSAGES = "chat/setMessages";
const ADD_MESSAGE = "chat/addMessage";
const UPDATE_MESSAGE = "chat/updateMessage";

const populateMessages = (payload) => ({
  type: POPULATE_MESSAGES,
  payload,
});

const addMessage = (payload) => ({
  type: ADD_MESSAGE,
  payload,
});

const updateMessage = (payload) => ({
  type: UPDATE_MESSAGE,
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

export const createMessage = (channel_id, message) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel_id}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getMessages(channel_id));
  }
};

export const editMessage =
  (channel_id, message_id, message) => async (dispatch) => {
    const response = await fetch(`/api/messages/${message_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(updateMessage(data));
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
    case UPDATE_MESSAGE:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default messageReducer;
