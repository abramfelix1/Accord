import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { InfoProvider } from "./context/infoContext";
import { ChannelProvider } from "./context/channelContext";
import { ModalProvider } from "./context/modalContext";

import configureStore from "./store";
import * as sessionActions from "./store/session";
import * as serverActions from "./store/server";
import * as userActions from "./store/user";
import * as memberActions from "./store/members";

import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.serverActions = serverActions;
  window.userActions = userActions;
  window.memberActions = memberActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <Provider store={store}>
      <ChannelProvider>
        <InfoProvider>
          <ModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalProvider>
        </InfoProvider>
      </ChannelProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
