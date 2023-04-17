import { fetchApp } from "@/hooks/fetchApp";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { VehicleType, useAppContext } from "./AppContext";

type VehicleSelectedCtxType = {
    currentVehicle: number;
    currentVehicleData: VehicleData;
    setVehicle: (vehicleId: number) => void;
    setVehicleColor: (color: number) => void;
    registerNewData: (key: string, value: number | string) => void;
    requestSaveNewData: () => void;
}   


export const VehicleSelectedCtx = createContext({} as VehicleSelectedCtxType);

export const useVehicleSelectedCtx = () => useContext<any>(VehicleSelectedCtx);

interface VehicleData {
    [key: string]: string | number;
}

export const VehicleSelectedCtxProvider = ({ children }: { children: React.ReactNode }) => {

    const { vehicles } = useAppContext();

    const [ currentVehicle, setCurrentVehicle ] = useState<number>(-1);

    const [ currentVehicleData , setCurrentVehicleData ] = useState<VehicleData>({});

    const [ color, setColor ] = useState<number>(1);

    const setVehicle = (vehicleId: number) =>{
        const vehicleData = vehicles.find((vehicle: VehicleType) => vehicle.id == vehicleId);

        setCurrentVehicle(vehicleId)

        setCurrentVehicleData(vehicleData);
        fetchApp('AppShowroom', 'SELECT_VEHICLE', {vehicle: vehicleData});
    }

    const setVehicleColor = (color: number) =>
    {
        setColor(color)
        fetchApp('AppShowroom', 'UPDATE_COLOR', {color});
    }

    const registerNewData = (key: string, value: number | string) =>
    {
        setCurrentVehicleData(vehicle => {
            vehicle[key] = value;
            return vehicle
        });
    }

    const requestSaveNewData = () =>
    {
        fetchApp("AppShowroom", "UPDATE_VEHICLE_DATA", {currentVehicle, currentVehicleData});
    }

    return (
        <VehicleSelectedCtx.Provider value={{ currentVehicle, currentVehicleData, setVehicle, setVehicleColor, registerNewData, requestSaveNewData }}>
            {children}
        </VehicleSelectedCtx.Provider>
    );
};