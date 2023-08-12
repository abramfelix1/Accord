import React, { useContext, useEffect } from "react";
import { ModalContext } from "../../context/modalContext";
import "./modal.css";
import TestPage from "../modal-pages/TestPage";
import CreateServerPage from "../modal-pages/CreateServerPage";
import ServerSetting from "../../components/modal-pages/ServerSetting";
import ServerProfileSetting from "../modal-pages/ServerProfileSetting";
import CreateChannelPage from "../modal-pages/CreateChannelPage";
import LeaveServerPage from "../modal-pages/LeaveServerPage";
import ChannelSettingPage from "../modal-pages/ChannelSettingPage";
import UserAccountPage from "../modal-pages/UserAccountPage";
import DiscoverServerModal from "../modal-pages/DiscoverServerModal";
import DeleteMessagePage from "../modal-pages/DeleteMessagePage";
import ChangeAvatarPage from "../modal-pages/ChangeAvatarPage";
import DeleteServerConfirmation from "../modal-pages/DeleteServerConfirmation";

export default function Modal(props) {
  const { type, setType } = useContext(ModalContext);

  let content = null;

  const handleContent = () => {
    setType(null);
  };

  // Allows ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) handleContent();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (type) {
    content = (
      <div className="modalWrapper">
        <div className="modalContent">
          <div className="closeButtonWrapper"></div>
          {/* EXAMPLE HOW TO SET UP A MODAL PAGE */}
          {type === "TEST" && <TestPage />}
          {type === "Create Server" && <CreateServerPage />}
          {type === "Server Settings" && <ServerSetting />}
          {type === "Server Profile Settings" && <ServerProfileSetting />}
          {type === "Create Channel" && <CreateChannelPage />}
          {type === "Leave Server" && <LeaveServerPage />}
          {type === "Channel Setting" && <ChannelSettingPage />}
          {type === "User Account" && <UserAccountPage />}
          {type === "Discover Server" && <DiscoverServerModal />}
          {type === "Delete Message" && <DeleteMessagePage />}
          {type === "Change Avatar" && <ChangeAvatarPage setType={setType}/>}
          {type === "Delete Server Confirmation" && <DeleteServerConfirmation setType={setType}/>}
        </div>
        <div className="modalBackdrop" onClick={handleContent} />
      </div>
    );
  }
  return <>{content}</>;
}
