import "./modal-css/ChannelSettingPage.css";
import { useParams, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InfoContext } from "../../context/infoContext";
import { ModalContext } from "../../context/modalContext";
import { editChannel, removeChannel } from "../../store/channels";

import { BiSolidTrash } from "react-icons/bi";

function ChannelSettingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { channelCog, server } = useContext(InfoContext);
  const { setType } = useContext(ModalContext);

  const [channelName, setChannelName] = useState(channelCog.name);

  const editChannelHandleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(editChannel(channelCog.id, channelName));
    setType(null);
  };

  const deleteChannelHandler = async (e) => {
    e.preventDefault();
    await dispatch(removeChannel(channelCog.id));
    setType(null);
    return history.push(
      `/servers/${server.id}/channels/${server.firstChannel.id}`
    );
  };


  return (
    <div className="channel-setting-container">
      <div className="channel-edit-nav">
        <div className="channel-edit-nav-content">
          <h2 className="channel-edit-nav-title-section">{channelCog.name}</h2>
          <div className="edit-channel-nav-name">Edit Channel</div>
          <div className="edit-channel-setting-separator"></div>
          {(channelCog.name !== "General") && (
              <div className="delete-channel-div">
                <div
                  className="delete-channel"
                  onClick={(e) => deleteChannelHandler(e)}
                >
                  Delete Channel <BiSolidTrash />
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="inner-channel-setting">
        <h1 className="edit-channel-header">Edit Channel</h1>
        <form
          onSubmit={(e) => editChannelHandleSubmit(e)}
          className="edit-channel-form"
        >
          <div className="edit-channel">
            <label className="edit-channel-name">Channel Name</label>

            <input
              type="text"
              maxLength={100}
              placeholder={channelCog.name}
              value={channelName}
              className="edit-channel-input"
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div className="channel-setting-button-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                className="channel-setting-cancel"
                onClick={(e) => setType(null)}
              >
                Cancel
              </div>
              {channelName && channelName.length ? (
                <button className="save-channel-edit">Save Changes</button>
              ) : (
                <button className="save-channel-edit-disabled" disabled>
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChannelSettingPage;
