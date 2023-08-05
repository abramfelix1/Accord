import React, { createContext, useEffect, useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [server, setServer] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Server Context:");
    console.log(server);
  }, [server, isLoaded]);

  return (
    <InfoContext.Provider
      value={{
        server,
        setServer,
        isLoaded,
        setIsLoaded,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
