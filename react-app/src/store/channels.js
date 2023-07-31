const POPULATE_CHANNELS = "channel/setChannel";
const ADD_CHANNEL = "channel/addChannel";
const UPDATE_CHANNEL = "channel/editChannel";
const DELETE_CHANNEL = "channel/deleteChannel";
const GET_CHANNEL = "channel/getChannel";

const populateChannels = (payload) => ({
  type: POPULATE_CHANNELS,
  payload,
});

const addChannel = (payload) => ({
  type: ADD_CHANNEL,
  payload,
});

const updateChannel = (payload) => ({
  type: UPDATE_CHANNEL,
  payload,
});

const deleteChannel = (payload) => ({
  type: DELETE_CHANNEL,
  payload,
});

const getOneChannel = (payload) => ({
  type: GET_CHANNEL,
  payload,
});

export const getChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`api/servers/${serverId}/channels`);
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
    dispatch(getChannels(serverId));
    return serverId;
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
      const data = await response.json();
      dispatch(getChannels(serverId));
      return channelId;
    }
  };

export const removeChannel = (serverId, channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(getChannels(serverId));
  }
};

const initialState = {};

const channelsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case POPULATE_CHANNELS:
      return action.payload.Channels.reduce((channels, channel) => {
        channels[channel.id] = channel;
        return channels;
      }, {});
    case GET_CHANNEL:
      return action.payload;
    case ADD_CHANNEL:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_CHANNEL:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_CHANNEL:
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
