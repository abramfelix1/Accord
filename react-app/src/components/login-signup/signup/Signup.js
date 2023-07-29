import { Link, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../../store/session";
import "./Signup.css";

function SignupPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])

  if (sessionUser) return <Redirect to="/app" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password));
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
                <form autoComplete="o" onSubmit={handleSubmit}>
                  <div>
                    <p className="form-input-label">Email</p>
                    <input
                      type="text"
                      className="form-input-field"
                      autoComplete="o"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="form-input-label">Username</p>
                    <input
                      type="text"
                      className="form-input-field"
                      autoComplete="o"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="form-input-label">Password</p>
                    <input
                      type="password"
                      className="form-input-field"
                      autoComplete="o"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />{" "}
                  </div>

                  <div className="signup-button-container">
                    <button className="signup-button" type="submit">Continue</button>
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
