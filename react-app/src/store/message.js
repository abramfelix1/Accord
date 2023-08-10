export const POPULATE_MESSAGES = "chat/setMessages";
export const ADD_MESSAGE = "chat/addMessage";
export const UPDATE_MESSAGE = "chat/updateMessage";
export const DELETE_MESSAGE = "channel/deleteMessage";
export const RESET_MESSAGES = "channel/resetChannel";

export const resetMessages = () => ({
  type: RESET_MESSAGES,
});

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

const deleteMessage = (payload) => ({
  type: DELETE_MESSAGE,
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
    body: JSON.stringify({ message }),
  });
  if (response.ok) {
    const data = await response.json();
    // dispatch(addMessage(data.channel_id));
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
      // dispatch(updateMessage(data));
      // dispatch(getMessages(data.channel_id));
      return data;
    }
  };

export const removeMessage =
  (server_id, channel_id, message_id) => async (dispatch) => {
    const response = await fetch(`/api/messages/${message_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("IDs:", server_id, channel_id, message_id);
      dispatch(deleteMessage({ server_id, channel_id, message_id }));
    }
  };

const initialState = { messages: {}, isLoading: true };

const messageReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    // case POPULATE_MESSAGES:
    //   const messages = action.payload.reduce((messages, message) => {
    //     messages[message.id] = message;
    //     return messages;
    //   }, {});
    //   return { messages: { ...messages }, isLoading: false };
    case ADD_MESSAGE:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_MESSAGE:
      newState[action.payload.id] = action.payload;
      return newState;
    // case DELETE_MESSAGE:
    //   console.log("DELETE PAYLOAD:", action.payload);
    //   delete newState[action.payload["message_id"]];
    //   return newState;
    case RESET_MESSAGES:
      return initialState;
    default:
      return state;
  }
};

export default messageReducer;
