import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(null);

  // Example:
  //   Create toggle function for onClicks to change modal type to show
  //   const toggleLogin = () => {
  //     setType("login");
  //   };

  const createServerModal = () => {
    setType("Create Server");
  };

  const serverSettingModal = () => {
    setType("Server Settings");
  };

  const serverProfileSettingModal = () => {
    setType("Server Profile Settings");
  };

  const createChannelModal = () => {
    setType("Create Channel");
  };

  const leaveServerModal = () => {
    setType("Leave Server");
  };

  const channelSettingModal = () => {
    setType("Channel Setting");
  };

  const userAccountModal = () => {
    setType("User Account");
  };

  const discoverServerModal = () => {
    setType("Discover Server");
  };

  const deleteMessageModal = () => {
    setType("Delete Message");
  };

  const changeAvatarModal = () => {
    setType("Change Avatar")
  }

  const deleteServerConfirmationModal = () => {
    setType('Delete Server Confirmation')
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        type,
        setType,
        createServerModal,
        serverSettingModal,
        serverProfileSettingModal,
        createChannelModal,
        leaveServerModal,
        channelSettingModal,
        userAccountModal,
        discoverServerModal,
        deleteMessageModal,
        changeAvatarModal,
        deleteServerConfirmationModal
        // toggleLogin,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
