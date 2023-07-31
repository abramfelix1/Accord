import React, { createContext, useState } from "react";

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
    const [channel, setChannel] = useState({})

    return (
    <ChannelContext.Provider
        value={{
        channel,
        setChannel
        }}
    >
        {children}
    </ChannelContext.Provider>
    );
};
