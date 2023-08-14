import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/session";
import "./ForgotPassword.css";
import { forgotPasswordThunk } from "../../../store/session";

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState("");

  if (sessionUser) return <Redirect to={`/app`} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("")
    if (newPassword.length < 8) {
      setErrors("Password must be at least 8 characters long.");
    } else {
      await dispatch(forgotPasswordThunk(email, username, newPassword));
      return history.push("/login");
    }
  };

  return (
    <div className="password-container">
      <div className="password-container-2">
        <div className="password-container-3">
          {/* HEADING AND WELCOME BACK MESSAGE */}
          <div>
            <h1 className="form-password-header">Reset your Password</h1>
            <p className="form-login-message">
              Email and Username must exist for password update
            </p>
          </div>
          <div className="password-container-4">
            <div className="password-container-5">
              <div className="password-container-6">
                {/* FORM SECTION */}
                <form onSubmit={handleSubmit}>
                  <p className="form-input-label">
                    Email<span>*</span>
                  </p>
                  <input
                    type="email"
                    className="form-input-field"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <p className="form-input-label">
                    Username <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="form-input-field"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />{" "}
                  {errors.length ? (
                    <p className="form-input-label-error">
                      New Password -{" "}
                      <span className="form-input-label-error-span">
                        {" "}
                        Password must be at least 8 characters long.
                      </span>
                    </p>
                  ) : (
                    <p className="form-input-label">
                      New Password <span>*</span>
                    </p>
                  )}
                  <input
                    type="password"
                    className="form-input-field"
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />{" "}
                  <Link to="/login" className="forgot-password">
                    Already have an account?
                  </Link>
                  <div className="login-button-container">
                    <button type="submit" className="login-button">
                      Reset Password
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

export default ForgotPassword;
