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
    case serverActions.GET_SERVER2: {
      if (newState[action.payload.id]) {
        return {
          ...newState,
          [action.payload.id]: {
            ...newState[action.payload.id],
            ...action.payload,
          },
        };
      } else {
        return {
          ...newState,
          [action.payload.id]: action.payload,
        };
      }
    }
    case serverActions.DELETE_SERVER: {
      // const { server_id } = action.payload;
      if (newState[action.payload]) {
        delete newState[action.payload];
      }
      return { ...newState };
    }
    case memberActions.JOIN_SERVER: {
      const { server } = action.payload;
      if (newState[server.id]) {
        return {
          ...newState,
          [server.id]: { ...server, channels: { messages: {} }, members: {} },
        };
      } else {
        return {
          ...newState,
          [server.id]: { ...server, channels: { messages: {} }, members: {} },
        };
      }
    }
    case serverActions.UPDATE_SERVER: {
      if (newState[action.payload.id]) {
        return {
          ...newState,
          [action.payload.id]: {
            ...newState[action.payload.id],
            ...action.payload,
          },
        };
      } else {
        return {
          ...newState,
          [action.payload.id]: action.payload,
        };
      }
    }
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
    case channelActions.DELETE_CHANNEL: {
      const { server_id, channel_id } = action.payload;
      if (newState[server_id] && newState[server_id].channels) {
        delete newState[server_id].channels[channel_id];
      }
      return { ...newState };
    }
    case channelActions.UPDATE_CHANNEL: {
      const { server_id, channel_id, channel } = action.payload;
      if (
        newState[server_id] &&
        newState[server_id].channels &&
        newState[server_id].channels[channel_id] &&
        newState[server_id].channels[channel_id].messages
      ) {
        newState[server_id].channels[channel_id] = {
          ...channel,
          messages: newState[server_id].channels[channel_id].messages,
        };
      }
      return { ...newState };
    }
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
    case memberActions.DELETE_MEMBER: {
      const { server_id } = action.payload;
      if (newState[server_id]) {
        delete newState[server_id];
      }
      return { ...newState };
    }
    case memberActions.UPDATE_MEMBER: {
      const { server_id, member } = action.payload;
      if (
        newState[server_id] &&
        newState[server_id].members &&
        newState[server_id].members[member.id]
      ) {
        newState[server_id].members[member.id] = {
          ...member,
        };
      }
      return { ...newState };
    }
    case messageActions.POPULATE_MESSAGES:
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
        return messages;
      }, {});
      return newState;
    case messageActions.DELETE_MESSAGE: {
      const { server_id, channel_id, message_id } = action.payload;
      if (
        newState[server_id] &&
        newState[server_id].channels &&
        newState[server_id].channels[channel_id] &&
        newState[server_id].channels[channel_id].messages &&
        newState[server_id].channels[channel_id].messages[message_id]
      ) {
        delete newState[server_id].channels[channel_id].messages[message_id];
      }
      return { ...newState };
    }
    case messageActions.ADD_MESSAGE: {
      const { server_id, channel_id, message } = action.payload;
      if (
        newState[server_id] &&
        newState[server_id].channels &&
        newState[server_id].channels[channel_id] &&
        newState[server_id].channels[channel_id].messages
      ) {
        newState[server_id].channels[channel_id].messages[message.id] = message;
      }
      return { ...newState };
    }
    case messageActions.UPDATE_MESSAGE: {
      const { server_id, channel_id, message } = action.payload;
      if (
        newState[server_id] &&
        newState[server_id].channels &&
        newState[server_id].channels[channel_id] &&
        newState[server_id].channels[channel_id].messages
      ) {
        newState[server_id].channels[channel_id].messages[message.id] = message;
      }
      return { ...newState };
    }
    case RESET_SERVERS:
      return { ...initialState, isLoading: true };
    default:
      return state;
  }
};

export default serversReducer;
