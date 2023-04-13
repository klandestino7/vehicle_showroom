import { eVehicleClass } from "@/constants/eClasses";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";

type MainPageCtxType = {
    currentVehicle: any;
    currentCategory: eVehicleClass;
    setVehicle: (category: any) => void;
    setCategory: (vehicle: eVehicleClass) => void;
}   

export const MainPageCtx = createContext({} as MainPageCtxType);

export const useMainPageCtx = () => useContext<any>(MainPageCtx);

export const MainPageCtxProvider = ({ children }: { children: React.ReactNode }) => {

    const [ currentCategory, setCurrentCategory ] = useState<eVehicleClass>(-1);
    const [ currentVehicle, setCurrentVehicle ] = useState<any>("");

    const setVehicle = (vehicle: any) =>{
        setCurrentVehicle(vehicle)
    }

    const setCategory = (category: eVehicleClass) =>{
        setCurrentCategory(category)
    }

    return (
        <MainPageCtx.Provider value={{ currentVehicle, currentCategory, setCategory, setVehicle }}>
            {children}
        </MainPageCtx.Provider>
    );
};