import { NavLink } from "react-router-dom";
import LandingFooter from "./landing/LandingFooter";
import "../components/landing/landing-css/LandingNav.css";
import "./errorPage.css";
import logo from "../images/accord-logo.png";

function ErrorPage() {
  return (
    <div className="error-page-container">
        <div style={{borderBottom: '1px solid rgb(126, 126, 126)'}}>
      <div className="nav-inner-container">
        <div className="error-page-logo-wrapper">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
            <h2>Accord</h2>
          </NavLink>
        </div>
        <div className="nav-login-wrapper">
          <a className="error-login-button" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
      <div className="error-content-wrapper">
        <div className="error-content">
          <h1 className="error-title">WRONG TURN?</h1>
          <p className="error-message">
            You look lost, stranger. You know what helps when you’re lost? A piping hot
            bowl of noodles. Take a seat, we’re frantically at work here cooking
            up something good. Oh, you need something to read? These might help
            you:
          </p>
          <div className="error-links-wrapper">
            <NavLink to="/" className="error-links">Home Page</NavLink>
            <NavLink to="/login" className="error-links">Login Page</NavLink>
            <NavLink to="/signup" className="error-links">Sign Up Page</NavLink>
          </div>
        </div>
        <div className="error-image">
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default ErrorPage;
