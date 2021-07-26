import React, { useContext } from 'react';

export type GamixContext = {
    window?: Window,
    container?: HTMLElement
}

export const gamixContext = React.createContext<GamixContext>({
    window: undefined,
    container: undefined,
});

export const GamixProvider = gamixContext.Provider;
export const useGamix = (): GamixContext => useContext(gamixContext);
