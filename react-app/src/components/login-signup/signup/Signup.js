import { Link, Redirect } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../store/session";
import { resetServers } from "../../../store/servers";
import { getUserServersThunk } from "../../../store/user";
import "./Signup.css";

function SignupPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayNameMessage, setDisplayNameMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/app" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = await dispatch(signUp(username, displayName, email, password));
    await dispatch(resetServers());
    await dispatch(getUserServersThunk());
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-container-2">
        <div className="signup-container-3">
          {/* HEADING AND WELCOME BACK MESSAGE */}
          <div>
            <h1 className="form-signup-header">Create an Account</h1>
          </div>
          <div className="signup-container-4">
            <div className="signup-container-5">
              <div className="signup-container-6">
                {/* FORM SECTION */}
                <form onSubmit={handleSubmit}>
                  <div>
                    {/* ------- email ------ */}
                    {errors.email ? (
                      <p className="form-input-label-error">
                        Email -{" "}
                        <span className="form-input-label-error-span">
                          {errors.email}
                        </span>
                      </p>
                    ) : (
                      <p className="form-input-label">
                        Email <span>*</span>
                      </p>
                    )}
                    <input
                      type="email"
                      className="form-input-field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onClick={(e) => setDisplayNameMessage(false)}
                      required
                    />
                    {/* ------- display name ------- */}
                    {errors.display_name ? (
                      <p className="form-input-label-error">
                        Display Name{" "}
                        <span className="form-input-label-error-span">
                          {errors.display_name}
                        </span>
                      </p>
                    ) : (
                      <p className="form-input-label">Display Name</p>
                    )}
                    <input
                      type="text"
                      className="form-input-field"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      onClick={(e) => setDisplayNameMessage(!false)}
                    />
                    {displayNameMessage && (
                      <p className="display-name-message">
                        This is how others will see you instead of your
                        username, if provided.
                      </p>
                    )}
                    {/* ------ username ------ */}
                    {errors.username ? (
                      <p className="form-input-label-error">
                        Username -{" "}
                        <span className="form-input-label-error-span">
                          {errors.username}
                        </span>
                      </p>
                    ) : (
                      <p className="form-input-label">
                        Username <span>*</span>
                      </p>
                    )}
                    <input
                      type="text"
                      className="form-input-field"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onClick={(e) => setDisplayNameMessage(false)}
                      required
                    />
                    {/* ------- password -------- */}
                    {errors.password ? (
                      <p className="form-input-label-error">
                        Password -{" "}
                        <span className="form-input-label-error-span">
                          {errors.password}
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
                      onChange={(e) => setPassword(e.target.value)}
                      onClick={(e) => setDisplayNameMessage(false)}
                      required
                    />{" "}
                  </div>

                  <div className="signup-button-container">
                    <button className="signup-button" type="submit">
                      Continue
                    </button>
                  </div>

                  <p className="signup-term">
                    By registering, you agree to Accord's Term of Agreement and
                    Services
                  </p>
                  <Link className="already-have-an-account" to="/login">
                    Already have an account?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
