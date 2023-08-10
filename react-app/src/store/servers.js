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
      console.log("SERVERS REDUCER!!!!!!!!!!!!!!!!!!");
      console.log(action.payload);
      action.payload.reduce((messages, message) => {
        if (
          newState[message.server_id] &&
          newState[message.server_id].channels[message.channel_id] &&
          !newState[message.server_id].channels[message.channel_id].messages
        ) {
          newState[message.server_id].channels[message.channel_id].messages =
            {};
        }
        if (
          newState[message.server_id] &&
          newState[message.server_id].channels[message.channel_id]
        ) {
          newState[message.server_id].channels[message.channel_id].messages[
            message.id
          ] = message;
        }
        console.log("MESSAGE IN LOOP:", message);
        return messages;
      }, {});
      console.log("UPDATED STATE", newState["1"]["channels"]["2"]["messages"]);
      return newState;
    case RESET_SERVERS:
      return { ...newState, isLoading: true };
    default:
      return state;
  }
};

export default serversReducer;
