import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect, useContext } from "react";
import { uploadProfileImageThunk } from "../../store/user";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";
import { ModalContext } from "../../context/modalContext";

function ChangeAvatarPage({ setType }) {
  const dispatch = useDispatch();
  const { userAccountModal } = useContext(ModalContext);
  const userSession = useSelector((state) => state.session.user);
  const [imageUrl, setImageUrl] = useState();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (userSession) {
      setUser(userSession);
    } else {
      return <Redirect to="login" />;
    }
  });

  const changeAvatarHandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image_url", imageUrl);
    console.log(formData);
    await dispatch(uploadProfileImageThunk(formData));
  };

  const exitChangeAvatar = () => {
    setType(null);
    userAccountModal();
  };

  return (
    <div className="change-avatar-container">
      <form
        onSubmit={changeAvatarHandleSubmit}
        encType="multipart/form-data"
        className="change-avatar-form"
        id="change-avatar-form"
      >
        <div className="select-image-header">
          <h1 style={{ fontSize: "20px", color: "#F2F3F5" }}>
            Select an Image
          </h1>
          <IoCloseOutline
            className="close-icon-image-selector"
            onClick={(e) => exitChangeAvatar()}
          />
        </div>
        <div className="select-avatar-wrapper">
          <div className="upload-image-circle">
            {imageUrl ? (
              <FaThumbsUp className="thumb-icon" />
            ) : (
              <BiSolidImageAdd className="image-icon" />
            )}
          </div>
          <div
            style={{
              color: "#B5BAC0",
              fontSize: "14px",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            Upload Image
          </div>
          <input
            type="file"
            className="change-avatar-photo-form"
            accept="image/*"
            onChange={(e) => setImageUrl(e.target.files[0])}
            name="pfp"
          />
        </div>
      </form>
      <div className="avatar-cancel-apply">
        <div
          style={{ marginLeft: "40px", color: "#f2f3f5", cursor: "pointer" }}
          onClick={(e) => exitChangeAvatar()}
        >
          Cancel
        </div>
        <button
          type="submit"
          className="apply-avatar"
          form="change-avatar-form"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default ChangeAvatarPage;
