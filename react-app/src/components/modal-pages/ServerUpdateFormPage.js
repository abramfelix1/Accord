import { useDispatch } from "react-redux";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import {
  updateServerThunk,
  getAllServersThunk,
  uploadServerImageThunk,
} from "../../store/server";
import { IoCloseOutline } from "react-icons/io5";

import "./modal-css/ServerUpdateFormPage.css";

function ServerUpdateFormPage({ server, user, setType }) {
  const dispatch = useDispatch();
  const [serverName, setServerName] = useState(server.name);
  const [serverImage, setServerImage] = useState("");

  const initials = (serverName) => {
    let res = "";
    const serverNameArr = serverName.split(" ");

    for (let i = 0; i < serverNameArr.length; i++) {
      let word = serverNameArr[i];
      res += word[0].toUpperCase();
    }
    return res;
  };

  const updateServerHandleSubmit = async (e) => {
    dispatch(updateServerThunk(server.id, serverName));
    if (serverImage) {
      const formData = new FormData();
      formData.append("image_url", serverImage);
      dispatch(uploadServerImageThunk(server.id, formData));
    }
  };

  return (
    <>
      <form
        onSubmit={updateServerHandleSubmit}
        className="server-setting-form"
        encType="multipart/form-data"
      >
        <h3 className="server-setting-header">
          Server Overview{" "}
          <IoCloseOutline
            className="exit-server-profile"
            onClick={(e) => setType(null)}
          />
        </h3>
        <div className="server-setting-form-main">
          <div className="server-setting-image-container">
            {server.image_url ? (
              <img className="server-setting-image" src={server.image_url} />
            ) : (
              <div className="server-setting-image-initials">
                {initials(server.name)}
              </div>
            )}
            {server.owner_id === user.id && (
              <div className="server-image-icon-wrapper">
                <BiImageAdd className="server-image-icon" />
              </div>
            )}
            {server.owner_id === user.id && (
              <div className="change-avatar-server">
                <input
                  type="file"
                  className="change-avatar-input"
                  onChange={(e) => setServerImage(e.target.files[0])}
                  accept="image/*"
                  name="server-image"
                />
                <div
                  style={{
                    textAlign: "center",
                    width: "50px",
                    fontSize: "16px",
                  }}
                >
                  Change Avatar
                </div>
              </div>
            )}

            {server.image_url && user.id === server.owner_id && (
              <button className="remove-server-image">Remove</button>
            )}
          </div>
          {user.id === server.owner_id ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <label
                style={{
                  color: "#99aab5",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                Server Name
              </label>
              <input
                type="text"
                className="server-setting-input-field"
                style={{ marginBottom: "10px" }}
                placeholder={server.name}
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              ></input>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <label
                style={{
                  color: "#99aab5",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                Server Name
              </label>
              <input
                type="text"
                className="server-setting-input-field"
                style={{ marginBottom: "10px" }}
                placeholder={server.name}
                maxLength={100}
                disabled
              ></input>
            </div>
          )}
        </div>
        {(server.name !== serverName || serverImage) && (
          <div className="server-setting-save-delete-button">
            <button type="submit" className="server-save-button">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default ServerUpdateFormPage;
