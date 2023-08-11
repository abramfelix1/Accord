import logo from "../../images/accord-logo.png"
import study_image from "../../images/discord-image-2.png"
import "./landing-css/LandingBody.css"


function LandingBody() {
    return (
        <div className="landing-main-body-container">
            <div className="landing-body-wrapper-1">
                <div className="wrap-1-body">
                    <h1 id="w1-p1">IMAGINE A PLACE...</h1>
                    <p id="w1-p2">
                    ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
                    </p>
                    {/* <div className="w1-buttons-wrapper">
                        <button className="w1-buttons">
                            Download for windows
                        </button>
                        <button className="w1-buttons">
                            Open discord in your browser
                        </button>
                    </div> */}
                </div>
            </div>
            <div className="landing-body-wrapper-2">
                <div className="wrap-2-body">
                    <div id="w2-img-wrapper">
                        <img src={study_image} alt="Logo"/>
                    </div>
                    <div id="w2-body">
                        <h2>Chat with other members from different servers</h2>
                        <p>
                            Accord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day.
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="landing-body-wrapper-3">
                <div className="wrap-3-body">
                    <div id="w3-img-wrapper">
                        <img src={logo} alt="Logo"/>
                    </div>
                    <div id="w3-body">
                        <h2>Where hanging out is easy</h2>
                        <p>
                        Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.
                        </p>
                    </div>
                </div>
            </div> */}
            {/* <div className="landing-body-wrapper-4">
                <div className="wrap-4-body">
                    <div id="w4-img-wrapper">
                        <img src={logo} alt="Logo"/>
                    </div>
                    <div id="w4-body">
                        <h2>From few to a fandom</h2>
                        <p>
                            Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
                        </p>
                    </div>
                </div>
            </div> */}
            {/* <div className="landing-body-wrapper-5">
                <div className="wrap-5-body">
                    <div id="w5-body">
                        <h2>RELIABLE TECH FOR STAYING CLOSE</h2>
                        <p>
                            Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
                        </p>
                    </div>
                    <div id="w5-img-wrapper">
                        <img src={logo} alt="Logo"/>
                    </div>
                </div>
            </div> */}
            {/* <div className="landing-body-wrapper-6">
                <div className="wrap-6-body">
                    <h2>Ready to start your journey?</h2>
                    <button className="w6-button">Some Random Button</button>
                </div>
            </div> */}
        </div>
    )
}

export default LandingBody