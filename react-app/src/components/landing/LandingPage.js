import LandingNavBar from "./LandingNav"
import LandingBody from "./LandingBody"
import LandingFooter from "./LandingFooter"

function LandingPage() {

    const toTopHandler = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div id="landing-container">
            <LandingNavBar />
            <LandingBody />
            <LandingFooter />
            {/* <button className="return-up" onClick={toTopHandler}>
                🔝
            </button> */}
        </div>
    )
}

export default LandingPage
