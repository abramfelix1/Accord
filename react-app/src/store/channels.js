export const POPULATE_CHANNELS = "channel/setChannel";
export const ADD_CHANNEL = "channel/addChannel";
export const UPDATE_CHANNEL = "channel/editChannel";
export const DELETE_CHANNEL = "channel/deleteChannel";
export const GET_CHANNEL = "channel/getChannel";
export const RESET_CHANNELS = "channel/resetChannel";

export const resetChannels = () => ({
  type: RESET_CHANNELS,
});

export const populateChannels = (payload) => ({
  type: POPULATE_CHANNELS,
  payload,
});

export const addChannel = (payload) => ({
  type: ADD_CHANNEL,
  payload,
});

export const updateChannel = (payload) => ({
  type: UPDATE_CHANNEL,
  payload,
});

export const deleteChannel = (payload) => ({
  type: DELETE_CHANNEL,
  payload,
});

export const getOneChannel = (payload) => ({
  type: GET_CHANNEL,
  payload,
});

export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`);
  if (response.ok) {
    const data = await response.json();
    dispatch(populateChannels(data));
  }
  return response;
};

export const getChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getOneChannel(data));
    return data;
  }
};

export const createChannel = (serverId, channel_name) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel_name,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getChannels(data.server_id));
    return data;
  }
};

export const editChannel =
  (serverId, channelId, channel_name) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channel_name }),
    });
    if (response.ok) {
      const channel = await response.json();
      dispatch(
        updateChannel({ server_id: serverId, channel_id: channelId, channel })
      );
      return channel;
    }
  };

export const removeChannel = (serverId, channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = response.json();
    dispatch(deleteChannel({ server_id: serverId, channel_id: channelId }));
    return data;
  }
};

const initialState = { channels: {}, isLoading: true };

const channelsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case POPULATE_CHANNELS:
      const channels = action.payload.Channels.reduce((channels, channel) => {
        channels[channel.id] = channel;
        return channels;
      }, {});
      return { channels: { ...channels }, isLoading: false };
    // case GET_CHANNEL:
    //   return action.payload;
    case ADD_CHANNEL:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_CHANNEL:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_CHANNEL:
      delete newState[action.payload];
      return newState;
    case RESET_CHANNELS:
      return initialState;
    default:
      return state;
  }
};

export default channelsReducer;
