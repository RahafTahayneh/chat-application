import React, { useContext } from 'react';

export const auiContext = React.createContext({
    window: undefined,
    container: undefined,
});

export const AuiProvider = auiContext.Provider;
export const useAui = () => useContext(auiContext);
