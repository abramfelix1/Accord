//state for getting current channel and server
//to replace the use of context so navigating via url will load
import * as serverActions from "./server";
import * as channelActions from "./channels";

const initialState = { server: {}, channel: {} };

export const currentReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case serverActions.GET_SERVER:
      newState.server[action.payload.id] = action.payload;
      return newState;
    case channelActions.GET_CHANNEL:
      newState.channel[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default currentReducer;
