import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../../store/session";
import "./Login.css";

function LoginPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors({});

    return dispatch(sessionActions.login({ email, password }))
  };

  return (
    <div className="login-container">
      <div className="login-container-2">
        <div className="login-container-3">
          {/* HEADING AND WELCOME BACK MESSAGE */}
          <div>
            <h1 className="form-login-header">Welcome back!</h1>
            <p className="form-login-message">
              We're so excited to see you again!
            </p>
          </div>
          <div className="login-container-4">
            <div className="login-container-5">
              <div className="login-container-6">
                {/* FORM SECTION */}
                <form onSubmit={handleSubmit}>
                  <p className="form-input-label">
                    Email or Username <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="form-input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="form-input-label">
                    Password <span>*</span>
                  </p>
                  <input type="password" className="form-input-field" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>{" "}
                  <Link className="forgot-password">Forgot your password?</Link>
                  <div className="login-button-container">
                    <button type='submit' className="login-button">Log in</button>
                  </div>
                  <p className="register-container">
                    Need an account?
                    <span>
                      <Link to="/signup" className="register-link">
                        Register
                      </Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
