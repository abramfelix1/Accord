import * as userActions from "./user";
// import { GET_USER_SERVERS } from "./user";
import * as serverActions from "./server";
import * as channelActions from "./channels";
import * as messageActions from "./message";
import * as memberActions from "./members";

const RESET_SERVERS = "servers/reset";

const initialState = { isLoading: true };

export const resetServers = () => ({
  type: RESET_SERVERS,
});

const serversReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case userActions.GET_USER_SERVERS:
      action.payload.forEach(
        (server) =>
          (newState[server.id] = {
            ...server,
            channels: {},
            members: {},
          })
      );
      return newState;
    case channelActions.POPULATE_CHANNELS:
      action.payload.Channels.reduce((channels, channel) => {
        if (
          newState[channel.server_id] &&
          !newState[channel.server_id].channels
        ) {
          newState[channel.server_id].channels = {};
        }
        if (newState[channel.server_id]) {
          newState[channel.server_id].channels[channel.id] = {
            ...channel,
            messages: {},
          };
        }
        return channels;
      }, {});
      return newState;
    case memberActions.GET_SERVER_MEMBERS:
      action.payload.reduce((members, member) => {
        if (newState[member.server_id] && !newState[member.server_id].members) {
          newState[member.server_id].members = {};
        }
        if (newState[member.server_id]) {
          newState[member.server_id].members[member.id] = member;
        }
        return members;
      }, {});
      return newState;
    case messageActions.POPULATE_MESSAGES:
      const updatedMessages = {};

      action.payload.forEach((message) => {
        updatedMessages[message.id] = message;
      });

      Object.keys(newState).forEach((server_id) => {
        if (newState[server_id] && newState[server_id].channels) {
          Object.keys(newState[server_id].channels).forEach((channel_id) => {
            if (newState[server_id].channels[channel_id]) {
              newState[server_id].channels[channel_id].messages =
                updatedMessages;
            }
          });
        }
      });
      return newState;
    case RESET_SERVERS:
      return { ...newState, isLoading: true };
    default:
      return state;
  }
};

export default serversReducer;
