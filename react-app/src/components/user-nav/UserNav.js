import "./UserNav.css";
import { login } from "../../store/session";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  BiSolidMicrophone,
  BiSolidMicrophoneOff,
  BiSolidCog,
} from "react-icons/bi";
import { MdHeadset, MdHeadsetOff } from "react-icons/md";
import logo from '../../images/accord-logo.png'

function UserNav() {
  const sessionUser = useSelector((state) => state.session.user);

  const [micToggle, setMicToggle] = useState(false);
  const [headsetToggle, setHeadsetToggle] = useState(false);

  const [micOn, setMicOn] = useState(false);
  const [headsetOn, setHeadsetOn] = useState(false);

  if (!sessionUser) return <Redirect to="login" />;

  // If a micrphone is on, and you click Headset to turn off, both turns off
  // ^ also clicking on microphone after will turn both on if both were previous turned off.
  // If a microphone is off, and the headset is on, only toggle the headset on and off.

  const handleMicToggleOn = () => {
    // if both are not on
    if (!micOn && !headsetOn) {
      // console.log(micOn, headsetOn)
      setMicToggle(false);
      setHeadsetToggle(false);
      setMicOn(false);
      setHeadsetOn(false);
    } else if (micOn && headsetOn) {
      // if both are on
      setMicToggle(false);
      setHeadsetToggle(false);
      setMicOn(false);
      setHeadsetOn(false);
    } else {
      setMicToggle(false);
      setMicOn(false);
    }
  };

  const handleMicToggleOff = () => {
    // if both are not on
    if (!micOn) {
      setMicToggle(true);
      setMicOn(true);
    }
  };

  // Turn on Headset
  const handleHeadsetToggleOn = () => {
    // if mic is on and headset is off
    if (!micOn && headsetOn) {
      setHeadsetToggle(false);
      setMicToggle(false);
      setHeadsetOn(false);
      setMicOn(false);
    } else {
      setHeadsetToggle(false)
      setHeadsetOn(false)
    }
  };

  // Turn off headset
  const handleHeadsetToggleOff = () => {
    // false and true
    // if mic is on, only toggle headset
    if (micOn && !headsetOn) {
      setHeadsetToggle(true);
      setHeadsetOn(true);
      // if both are on, turn both off
    } else if (!micOn && !headsetOn) {
      setHeadsetToggle(true);
      setMicToggle(true);
      setHeadsetOn(true);
    } else {
      setHeadsetToggle(true);
      setHeadsetOn(true);
      setMicOn(true);
      setHeadsetOn(true);
    }
  };

  return (
    <div className="usermenu-container">
      <div className="usermenu">
        <div className="usermen-left-section">
          <img className="usermenu-pfp" src={sessionUser.image_url || logo}/>
          <div>
            <div className="usermenu-username">{sessionUser.username}</div>
            <div className='usermenu-display-name' style={{ color: "#ADADAD", fontSize: "12px" }}>
              {sessionUser.display_name
                ? sessionUser.display_name
                : sessionUser.username}
            </div>
          </div>
        </div>
        <div className="usermenu-icons-container">
          {micToggle ? (
            <BiSolidMicrophoneOff
              className="mic-off-icon"
              onClick={(e) => {
                handleMicToggleOn();
              }}
            />
          ) : (
            <BiSolidMicrophone
              className="usermenu-icons"
              onClick={(e) => {
                handleMicToggleOff();
              }}
            />
          )}
          {headsetToggle ? (
            <MdHeadsetOff
              className="mic-off-icon"
              onClick={(e) => {
                handleHeadsetToggleOn();
              }}
            />
          ) : (
            <MdHeadset
              className="usermenu-icons"
              onClick={(e) => {
                handleHeadsetToggleOff();
              }}
            />
          )}
          <BiSolidCog
            className="usermenu-icons cog"
            style={{ marginRight: "6px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserNav;
