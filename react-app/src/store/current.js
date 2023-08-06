//state for getting current channel and server
//to replace the use of context so navigating via url will load
import * as serverActions from "./server";
import * as channelActions from "./channels";
import * as messageActions from "./message";
import * as memberActions from "./members";

const RESET_CURRENT = "current/reset";

export const resetCurrent = () => ({
  type: RESET_CURRENT,
});

const initialState = {
  server: {},
  channel: {},
  messages: {},
  members: {},
  isLoading: true,
};

export const currentReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case serverActions.GET_SERVER:
      newState.server = action.payload;
      return { ...newState, isLoading: false };
    case channelActions.GET_CHANNEL:
      newState.channel = action.payload;
      return { ...newState, isLoading: false };
    case messageActions.POPULATE_MESSAGES:
      const messages = action.payload.reduce((messages, message) => {
        messages[message.id] = message;
        return messages;
      }, {});
      return { ...newState, messages: { ...messages } };
    case memberActions.GET_SERVER_MEMBERS:
      const members = action.payload.reduce((members, member) => {
        members[member.id] = member;
        return members;
      }, {});
      return { ...newState, members: { ...members } };
    case RESET_CURRENT:
      return { ...newState, isLoading: true };
    default:
      return state;
  }
};

export default currentReducer;
