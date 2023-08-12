import React, { createContext, useEffect, useState } from "react";

export const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
  }, [channel]);

  return (
    <ChannelContext.Provider
      value={{
        channel,
        setChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};
