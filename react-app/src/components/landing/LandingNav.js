import logo from "../../images/accord-logo.png";
import { NavLink } from "react-router-dom";
import "./landing-css/LandingNav.css";
import { useSelector} from "react-redux";

function LandingNavBar() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="nav-outer-container">
      <div className="nav-inner-container">
        <div className="logo-wrapper">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
            <h2>Accord</h2>
          </NavLink>
        </div>
        {/* <nav className="nav-box">
          <p href="/">Download</p>
          <p href="/">Nitro</p>
          <p href="/">Discover</p>
          <p href="/">Safety</p>
          <p href="/">Support</p>
          <p href="/">Blog</p>
          <p href="/">Careers</p>
        </nav> */}
        <div className="nav-login-wrapper">
          <a className="landing-login-button" href="/login">
            {user ? "Open Accord" : "Log in"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingNavBar;
