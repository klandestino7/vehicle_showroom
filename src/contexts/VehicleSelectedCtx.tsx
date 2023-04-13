import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";

type VehicleSelectedCtxType = {
    currentVehicle: any;
    setVehicle: (category: any) => void;
}   

export const VehicleSelectedCtx = createContext({} as VehicleSelectedCtxType);

export const useVehicleSelectedCtx = () => useContext<any>(VehicleSelectedCtx);

export const VehicleSelectedCtxProvider = ({ children }: { children: React.ReactNode }) => {

    const [ currentVehicle, setCurrentVehicle ] = useState<number>(-1);

    const setVehicle = (vehicle: any) =>{
        setCurrentVehicle(vehicle)
    }

    return (
        <VehicleSelectedCtx.Provider value={{ currentVehicle, setVehicle }}>
            {children}
        </VehicleSelectedCtx.Provider>
    );
};