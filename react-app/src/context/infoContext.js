import React, { createContext, useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
    const [server, setServer] = useState({})

    return (
    <InfoContext.Provider
        value={{
        server,
        setServer
        }}
    >
        {children}
    </InfoContext.Provider>
    );
};
