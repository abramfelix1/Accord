import React, { createContext, useEffect, useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [server, setServer] = useState(null);
  const [channelCog, setChannelCog] = useState({});
  const [showEditField, setShowEditField] = useState(false);
  const [editMessageId, setEditMessageId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Server Context:");
    console.log(server);
    console.log("Is Loaded:");
    console.log(isLoaded);
  }, [server, isLoaded]);

  return (
    <InfoContext.Provider
      value={{
        server,
        setServer,
        isLoaded,
        setIsLoaded,
        setChannelCog,
        channelCog,
        showEditField,
        setShowEditField,
        editMessageId, 
        setEditMessageId,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
