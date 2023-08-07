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
        if (!newState[channel.server_id].channels) {
          newState[channel.server_id].channels = {};
        }
        newState[channel.server_id].channels[channel.id] = {
          ...channel,
          messages: {},
        };
        return channels;
      }, {});
      return newState;
    case memberActions.GET_SERVER_MEMBERS:
      action.payload.reduce((members, member) => {
        if (!newState[member.server_id].members) {
          newState[member.server_id].members = {};
        }
        newState[member.server_id].members[member.id] = member;
        return members;
      }, {});
      return newState;
    case messageActions.POPULATE_MESSAGES:
      action.payload.reduce((messages, message) => {
        newState[message.server_id].channels[message.channel_id].messages[
          message.id
        ] = message;
        console.log(message);
        return messages;
      }, {});
      return newState;
    // case messageActions.ADD_MESSAGE:
    //   const message = action.payload;
    //   newState[message.server_id].channels[message.channel_id].message =
    //     message;
    case RESET_SERVERS:
      return { ...newState, isLoading: true };
    default:
      return state;
  }
};

export default serversReducer;
