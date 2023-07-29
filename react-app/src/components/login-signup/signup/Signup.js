import { Link } from "react-router-dom";
import "./Signup.css";

function SignupPage() {
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
                <form autoComplete="o">
                  <div>
                    <p className="form-input-label">Email</p>
                    <input type="text" className="form-input-field" autoComplete="o"/>
                    <p className="form-input-label">Username</p>
                    <input type="text" className="form-input-field" autoComplete="o"/>
                    <p className="form-input-label">Password</p>
                    <input type="password" className="form-input-field" autoComplete="o"/>{" "}
                    <p className="form-input-label">Confirm Password</p>
                    <input type="password" className="form-input-field" autoComplete="o"/>{" "}
                  </div>

                  <div className="signup-button-container">
                    <button className="signup-button">Continue</button>
                  </div>

                  <p className="signup-term">By registering, you agree to Accord's Term of Agreement and Services</p>
                  <Link className="already-have-an-account" to='/login'>
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
