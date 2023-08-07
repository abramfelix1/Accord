import { useState, useContext, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./modal-css/UserAccountPage.css";
import { IoCloseOutline } from "react-icons/io5";
import { ModalContext } from "../../context/modalContext";
import logo from "../../images/accord-logo.png";
import {getAllServersThunk} from'../../store/server'

import { updateUserThunk } from "../../store/user";

function UserAccountPage() {
  const dispatch = useDispatch();
  const { setType } = useContext(ModalContext);
  const user = useSelector((state) => state.session.user);

  const [editButton, setEditButton] = useState(true);
  const [displayName, setDisplayName] = useState(
    user.display_name || user.username
  );
  const [imageUrl, setImageUrl] = useState(user.image_url);
  const [errors, setErrors] = useState({});

  const updateUserHandleSubmit = async (e) => {
    // e.preventDefault()
    setErrors({});
    const data = await dispatch(
      updateUserThunk(user.username,displayName, imageUrl)
    );
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="user-main-container">
      <div className="user-inner-container">
        <div className="my-account-header">
          <h1 className="user-my-account">My Account</h1>
          <IoCloseOutline
            style={{
              fontSize: "35px",
              position: "absolute",
              right: "12px",
              top: "10px",
              color: "#F2F3EA",
              cursor: "pointer",
            }}
            onClick={(e) => setType(null)}
          />
        </div>
        <div className="user-account-content-container">
          <div className="user-background-setting"></div>
          <div className="user-edit-settings">
            <img
              src={user.image_url || logo}
              className="user-profile-picture-setting"
            />
            <div className="user-name-edit-profile">
              <div style={{ height: "0px" }}>
                <p className="account-name-setting">{user.username}</p>
                <p
                  className="account-name-setting"
                  style={{
                    color: "darkgray",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  {user.display_name || user.username}
                </p>
              </div>
              {editButton ? (
                <button
                  className="account-edit-button"
                  onClick={(e) => setEditButton(!editButton)}
                >
                  Edit User Profile
                </button>
              ) : (
                <div className="account-save-button-container">
                  <p
                    style={{
                      margin: "0px",
                      marginTop: "8px",
                      color: "#F2F3EA",
                      fontSize: "14px",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      setEditButton(!editButton);
                      setDisplayName(user.display_name || user.username);
                      setImageUrl(user.image_url);
                    }}
                  >
                    Cancel
                  </p>
                  <button
                    form="my-account-form"
                    type="submit"
                    className="account-save-button"
                  >
                    Save User Profile
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="user-profile-form-container">
            <div className="user-profile-form-container-inner">
              <form
                id="my-account-form"
                className="user-profile-form"
                onSubmit={updateUserHandleSubmit}
              >
                {editButton ? (
                  <div>
                    <div className="user-profile-display-form">
                      <label
                        style={{
                          marginBottom: "10px",
                          color: "#B5BAC0",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Display Name
                      </label>
                      <div style={{ fontSize: "16px" }}>
                        {user.display_name || user.username}
                      </div>
                    </div>
                    <div className="user-profile-display-form">
                      <label
                        style={{
                          marginBottom: "10px",
                          color: "#B5BAC0",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Username
                      </label>
                      <div style={{ fontSize: "16px" }}>{user.username}</div>
                    </div>
                    <div className="user-profile-display-form">
                      <label
                        style={{
                          marginBottom: "10px",
                          color: "#B5BAC0",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Profile Image
                      </label>
                      <div
                        style={{ fontSize: "16px" }}
                        className="account-profile-image"
                      >
                        {user.image_url || 'No Image Provided'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="user-profile-form-field">
                      <label
                        style={{
                          marginBottom: "8px",
                          color: "#B5BAC0",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Display Name
                      </label>
                      <input
                        type="text"
                        className="account-user-input-field"
                        value={displayName}
                        placeholder={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>
                    <div className="user-profile-form-field">
                      <label
                        style={{
                          marginBottom: "8px",
                          color: "#B5BAC0",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          marginTop: "8px",
                        }}
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="account-user-input-field"
                        placeholder={user.username}
                        disabled
                      />
                    </div>
                    <div className="user-profile-form-field">
                      <label
                        style={{
                          marginBottom: "8px",
                          color: "#B5BAC0",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          marginTop: "8px",
                        }}
                      >
                        Profile Image
                      </label>
                      <input
                        type="text"
                        className="account-user-input-field"
                        value={imageUrl}
                        placeholder={user.image_url}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccountPage;
