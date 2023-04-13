import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";

type SpecialOffersCtxType = {

}   

export const SpecialOffersCtx = createContext({} as SpecialOffersCtxType);

export const useApp = () => useContext<any>(SpecialOffersCtx);

export const SpecialOffersCtxProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <SpecialOffersCtx.Provider value={{  }}>
            {children}
        </SpecialOffersCtx.Provider>
    );
};