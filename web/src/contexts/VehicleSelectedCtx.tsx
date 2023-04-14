import { fetchApp } from "@/hooks/fetchApp";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";

type VehicleSelectedCtxType = {
    currentVehicle: any;
    setVehicle: (category: any) => void;
    setVehicleColor: (color: number) => void;
}   

export const VehicleSelectedCtx = createContext({} as VehicleSelectedCtxType);

export const useVehicleSelectedCtx = () => useContext<any>(VehicleSelectedCtx);

export const VehicleSelectedCtxProvider = ({ children }: { children: React.ReactNode }) => {

    const [ currentVehicle, setCurrentVehicle ] = useState<number>(-1);

    const [ color, setColor ] = useState<number>(1);

    const setVehicle = (vehicle: any) =>{
        setCurrentVehicle(vehicle)
        fetchApp('AppShowroom', 'SELECT_VEHICLE', {});
    }

    const setVehicleColor = (color: number) =>
    {
        setColor(color)
        fetchApp('AppShowroom', 'UPDATE_COLOR', {color});
    }

    return (
        <VehicleSelectedCtx.Provider value={{ currentVehicle, setVehicle, setVehicleColor }}>
            {children}
        </VehicleSelectedCtx.Provider>
    );
};