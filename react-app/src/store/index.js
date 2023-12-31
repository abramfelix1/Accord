import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import userReducer from "./user";
import messageReducer from "./message";
import serverReducer from "./server";
import channelsReducer from "./channels";
import memberReducer from "./members";
import serversReducer from "./servers";
import currentReducer from "./current";

const rootReducer = combineReducers({
  session,
  user: userReducer,
  messages: messageReducer,
  allServers: serverReducer,
  servers: serversReducer,
  // channels: channelsReducer,
  members: memberReducer,
  current: currentReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
