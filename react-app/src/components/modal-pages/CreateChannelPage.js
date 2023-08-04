import "./modal-css/CreateChannelPage.css";
import { FaHashtag } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { BiRadioCircleMarked, BiRadioCircle } from "react-icons/bi";
import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ModalContext } from "../../context/modalContext";
import { InfoContext } from "../../context/infoContext";
import { createChannel } from "../../store/channels";

function CreateChannelPage() {
  const dispatch = useDispatch();
  const { setType } = useContext(ModalContext);
  const { server } = useContext(InfoContext);
  //   const user = useSelector(state => state.session.user)
  const [channelName, setChannelName] = useState("");

  const createChannelHandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createChannel(server.id, channelName));
    console.log("ASDFSDAFSDAFASDFSDAFSDAFSD");
    return setType(null);
  };

  return (
    <div className="create-channel-container">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div style={{}}>
          <form
            className="inner-create-channel"
            onSubmit={createChannelHandleSubmit}
          >
            <div className="create-channel-heading">
              {/* header */}
              <div>
                <h1
                  style={{ margin: "0px", fontSize: "20px", color: "#F2F3F5" }}
                >
                  Create Channel
                </h1>

                <div
                  style={{ margin: "0px", fontSize: "12px", color: "#B5BAC1" }}
                >
                  in Text Channels
                </div>
              </div>
              <IoCloseOutline
                className="exit-create-channel-icon"
                onClick={(e) => setType(null)}
              />
            </div>

            {/* selection  */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "left",
                padding: "16px",
              }}
            >
              <h2 className="create-channel-section-title">CHANNEL TYPE</h2>
              <div className="create-text-voice-channel-container create-text-channel-container">
                <div className="create-text-channel">
                  <FaHashtag className="create-channel-hash" />
                  <div>
                    <p className="channel-radio-header">Text</p>
                    <p className="channel-radio-details">
                      Send message, images, GIFs, opinions, and puns
                    </p>
                  </div>
                </div>
                <BiRadioCircleMarked className="radio-circle-channel" />
              </div>
              <div className="create-text-voice-channel-container create-voice-channel-container">
                <div className="create-text-channel">
                  <FaHashtag className="create-channel-hash" />
                  <div>
                    <p className="channel-radio-header">Voice - Unavailable</p>
                    <p className="channel-radio-details">
                      Hang out together with voice, video, and screen share
                    </p>
                  </div>
                </div>
                <BiRadioCircle className="radio-circle-channel" />
              </div>

              {/* input */}
              <div style={{ marginBottom: "5px" }}>
                <h2 className="create-channel-section-title">CHANNEL NAME</h2>
                <div className="create-channel-input-container">
                  <FaHashtag className="create-channel-hash-input" />
                  <input
                    type="text"
                    placeholder="new-channel"
                    className="new-channel-input"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    maxLength={100}
                  />
                </div>
              </div>
            </div>

            {/* submit */}
            <div className="create-channel-cancel-submit">
              <p
                className="create-channel-cancel"
                onClick={(e) => setType(null)}
              >
                Cancel
              </p>
              {channelName.length ? (
                <button type="submit" className="create-channel-submit-active">
                  Create Channel
                </button>
              ) : (
                <button
                  className="create-channel-submit-inactive"
                  disabled={!channelName.length}
                >
                  Create Channel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateChannelPage;
