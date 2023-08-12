import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/session";
import "./Login.css";

function LoginPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to={`/app`} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const data = await dispatch(login(credentials, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("Demo", "password"));
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
                  {errors.length ? (
                    <p className="form-input-label-error">
                      Email or Username{" "}
                      <span className="form-input-label-error-span">
                        - Login or Password is invalid.
                      </span>
                    </p>
                  ) : (
                    <p className="form-input-label">
                      Email or Username <span>*</span>
                    </p>
                  )}
                  <input
                    type="text"
                    className="form-input-field"
                    value={credentials}
                    required
                    onChange={(e) => {
                      setCredentials(e.target.value);
                    }}
                  />
                  {errors.length ? (
                    <p className="form-input-label-error">
                      Password -{" "}
                      <span className="form-input-label-error-span">
                        {" "}
                        Login or Password is invalid.
                      </span>
                    </p>
                  ) : (
                    <p className="form-input-label">
                      Password <span>*</span>
                    </p>
                  )}
                  <input
                    type="password"
                    className="form-input-field"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />{" "}
                  <Link to="/" className="forgot-password">
                    Forgot your password?
                  </Link>
                  <div className="login-button-container">
                    <button type="submit" className="login-button">
                      Log in
                    </button>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="register-container">
                      Need an account?
                      <span>
                        <Link to="/signup" className="register-link">
                          Register
                        </Link>
                      </span>
                    </p>
                    <p className="register-container">
                      Login as
                      <span
                        className="demo-user-link"
                        onClick={(e) => demoLogin(e)}
                      >
                        Demo User
                      </span>
                    </p>
                  </div>
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
