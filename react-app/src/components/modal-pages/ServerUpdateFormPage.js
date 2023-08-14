import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import {
  updateServerThunk,
  getAllServersThunk,
  uploadServerImageThunk,
  removeServerImageThunk,
  uploadServerBannerThunk,
  removeServerBannerThunk,
} from "../../store/server";
import { getUserServersThunk } from "../../store/user";
import { IoCloseOutline } from "react-icons/io5";
import "./modal-css/ServerUpdateFormPage.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ServerUpdateFormPage({ user, setType }) {
  const dispatch = useDispatch();
  const { serverid, channelid } = useParams();
  const server = useSelector((state) => state.servers[serverid]);

  const [serverName, setServerName] = useState(server.name);
  const [serverImage, setServerImage] = useState(null);
  const [serverBanner, setServerBanner] = useState(null);

  const initials = (serverName) => {
    if (!serverName) return;
    let res = "";
    serverName.trim();
    const serverNameArr = serverName.split(" ");

    for (let i = 0; i < serverNameArr.length; i++) {
      let word = serverNameArr[i];
      if (word && typeof word === "string") {
        res += word[0].toUpperCase();
      }
    }

    if (res.length >= 3) {
      return res.slice(0, 3);
    }

    return res;
  };

  const updateServerHandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateServerThunk(server.id, serverName));
    const formData = new FormData();

    if (serverImage) {
      formData.append("image_url", serverImage);
      await dispatch(uploadServerImageThunk(server.id, formData));
    }

    if (serverBanner) {
      formData.append("banner_image", serverBanner);
      await dispatch(uploadServerBannerThunk(server.id, formData));
    }

    await dispatch(getUserServersThunk());

    setType(null);
  };

  const removeServerImageHandleSubmit = async (e) => {
    await dispatch(removeServerImageThunk(serverid));
  };

  const removeServerBannerHandleSubmit = async (e) => {
    await dispatch(removeServerBannerThunk(serverid));
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

        {/* FORM */}
        <div className="server-setting-form-main">
          <div style={{ width: "100%", display: "flex" }}>
            <div>
              <div className="server-setting-image-container">
                {server.image_url ? (
                  <img
                    className="server-setting-image"
                    src={server.image_url}
                  />
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
                      Change Icon
                    </div>
                  </div>
                )}
                {server.owner_id === user.id && !server.image_url && (
                  <button className="upload-avatar-button" disabled >
                    Upload Avatar
                  </button>
                )}

                {server.image_url && user.id === server.owner_id && (
                  <button
                    className="remove-server-image"
                    onClick={removeServerImageHandleSubmit}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* SERVER BANNER */}
            <div className="server-banner-update">
              {server.owner_id === user.id && (
                <div className="server-banner-icon-wrapper">
                  <BiImageAdd className="server-image-icon" />
                </div>
              )}
              {server.owner_id === user.id && (
                <div className="change-banner-server">
                  <input
                    type="file"
                    className="change-banner-input"
                    onChange={(e) => setServerBanner(e.target.files[0])}
                    accept="image/*"
                    name="server-image"
                  />
                  <div
                    style={{
                      textAlign: "center",
                      width: "300px",
                      fontSize: "16px",
                    }}
                  >
                    Change Banner
                  </div>
                </div>
              )}
              {server.banner_image ? (
                <div>
                  <img
                    src={server.banner_image}
                    className="server-banner-image-update"
                  />
                  {server.banner_image && user.id === server.owner_id && (
                    <button
                      className="remove-server-banner"
                      onClick={removeServerBannerHandleSubmit}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <div className="server-banner-default">
                  {server.banner_image && user.id === server.owner_id && (
                    <button className="upload-server-banner">
                      Upload Banner
                    </button>
                  )}
                  <button className="upload-banner-button" disabled>
                    Upload Banner
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FORM */}
          {user.id === server.owner_id ? (
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
                width: "95%",
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
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
                width: "95%",
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
        {(server.name !== serverName || serverImage || serverBanner) && (
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
