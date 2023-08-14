import logo from "../../images/accord-logo.png";
import "./landing-css/LandingFooter.css";
import { NavLink } from "react-router-dom";
import jon from "../../images/jon.png";
import abram from "../../images/abram.jpg";
import randy from "../../images/randy.png";
import { BsLinkedin, BsGithub } from 'react-icons/bs'

function LandingFooter() {
  return (
    <div className="footer-container">
      <div className="inner-footer" style={{ width: "100%", paddingTop: '20px' }}>
        <h2 className="meet-developers">Meet the Developers</h2>
        <div className="top-box">
          <div className="developer-wrapper">
            <p>Abram Felix</p>
            <img src={abram} alt="abram" className="developer-image" />
            <div className="developer-links">
              <a href="https://github.com/abramfelix1" target="_blank" className="github"><BsGithub /> GitHub</a>
              <a href="https://www.linkedin.com/in/abram-felix-98937b162" target="_blank" className="linkedin"><BsLinkedin /> LinkedIn</a>
            </div>
          </div>
          <div className="developer-wrapper">
            <p>Jonathan Ang</p>
            <img src={jon} alt="jon" className="developer-image" />
            <div className="developer-links">
              <a href="https://github.com/jang55" target="_blank" className="github"><BsGithub /> GitHub</a>
              <a href="https://www.linkedin.com/in/jonathan-ang-b1508b286/" target="_blank" className="linkedin"><BsLinkedin />LinkedIn</a>
            </div>
          </div>
          <div className="developer-wrapper">
            <p>Randy Hac</p>
            <img src={randy} alt="randy" className="developer-image" />
            <div className="developer-links">
              <a href="https://github.com/randydhack" target="_blank" className="github"><BsGithub /> GitHub</a>
              <a href="https://www.linkedin.com/in/randy-hac-4577a71b0/" target="_blank" className="linkedin"><BsLinkedin />LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-box">
        <div className="logo-wrapper-footer">
          <a href="#top">
            <img src={logo} alt="Logo" />
            <h2>Accord</h2>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingFooter;
