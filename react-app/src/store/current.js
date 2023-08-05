//state for getting current channel and server
//to replace the use of context so navigating via url will load
import * as serverActions from "./server";
import * as channelActions from "./channels";

const RESET_CURRENT = "current/reset";

export const resetCurrent = () => ({
  type: RESET_CURRENT,
});

const initialState = { server: {}, channel: {}, isLoading: true };

export const currentReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case serverActions.GET_SERVER:
      newState.server = action.payload;
      return newState;
    case channelActions.GET_CHANNEL:
      newState.channel = action.payload;
      return { ...newState, isLoading: false };
    case RESET_CURRENT:
      return initialState;
    default:
      return state;
  }
};

export default currentReducer;
