import logo from "../../images/accord-logo.png";
import { NavLink } from "react-router-dom";
import "./landing-css/LandingNav.css";

function LandingNavBar() {
  return (
    <div className="nav-outer-container">
      <div className="nav-inner-container">
        <div className="logo-wrapper">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
            <h2>Accord</h2>
          </NavLink>
        </div>
        <nav className="nav-box">
          {/* just placed holders. we can do what ever we want here or delete */}
          <p href="/">Download</p>
          <p href="/">Nitro</p>
          <p href="/">Discover</p>
          <p href="/">Safety</p>
          <p href="/">Support</p>
          <p href="/">Blog</p>
          <p href="/">Careers</p>
          {/* ends here for random links that goes to home with a tag */}
        </nav>
        <div className="nav-login-wrapper">
          <a className="login-button" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingNavBar;
