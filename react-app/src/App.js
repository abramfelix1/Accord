import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authenticate } from "./store/session";
import Main from "./components/Main";
import LoginPage from "./components/login-signup/login/Login";
import SignupPage from "./components/login-signup/signup/Signup";
import LandingPage from "./components/landing/LandingPage";

import ServerSetting from "./components/modal-pages/ServerSetting";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />

          <Route path="/app" component={Main} />
          <Route
            path="/servers/:serverid/channels/:channelid"
            component={Main}
          />
        </Switch>
      )}
    </>
  );
}

export default App;
