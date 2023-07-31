import logo from "../../images/accord-logo.png"
import "./landing-css/LandingFooter.css"

function LandingFooter() {
    return (
        <div className="footer-container">
            <div>

                <div className="top-box">
                    <div className="footer-logo-wrapper">
                        <a href="#top">
                            <img src={logo} alt="Logo"/>
                        </a>
                    </div>
                    <div className="fl-1 fl">
                        <h5>Product</h5>
                        <p>Download</p>
                        <p>Nitro</p>
                        <p>Status</p>
                    </div>
                    <div className="fl-2 fl">
                        <h5>Company</h5>
                        <p>About</p>
                        <p>Jobs</p>
                        <p>Brand</p>
                        <p>Newsroom</p>

                    </div>
                    <div className="fl-3 fl">
                        <h5>Resources</h5>
                        <p>College</p>
                        <p>Support</p>
                        <p>Safety</p>
                        <p>Blog</p>
                        <p>Feedback</p>
                        <p>Build</p>
                        <p>Streamkit</p>
                        <p>Creator</p>
                        <p>Community</p>
                        <p>Official 3rd Party Merch</p>
                    </div>
                    <div className="fl-4 fl">
                        <h5>Policies</h5>
                        <p>Privacy</p>
                        <p>CookieSettings</p>
                        <p>Guidelines</p>
                        <p>Acknowledgements</p>
                        <p>License</p>
                        <p>Moderation</p>
                        <p>Company Information</p>
                    </div>
                </div>
                <div className="bottom-box">
                    <div className="logo-wrapper">
                        <a href="#top">
                            <img src={logo} alt="Logo"/>
                            <h2>Accord</h2>
                        </a>
                    </div>
                    <div className="footer-button-wrapper">
                        <button className="footer-button">
                            Another Random Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingFooter
