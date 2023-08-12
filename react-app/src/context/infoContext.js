import React, { createContext, useEffect, useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [server, setServer] = useState(null);
  const [channelCog, setChannelCog] = useState({});
  const [showEditField, setShowEditField] = useState(false);
  const [editMessageId, setEditMessageId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState(null);
  const [serversFetched, setServersFetched] = useState(false);

  useEffect(() => {
    // console.log("Server Context:");
    // console.log(server);
    // console.log("Is Loaded:");
    // console.log(isLoaded);
    // console.log("Message Context:");
    // console.log(message);
  }, [server, isLoaded, message]);

  return (
    <InfoContext.Provider
      value={{
        server,
        setServer,
        isLoaded,
        setIsLoaded,
        setChannelCog,
        channelCog,
        message,
        setMessage,
        showEditField,
        setShowEditField,
        editMessageId,
        setEditMessageId,
        serversFetched,
        setServersFetched,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
