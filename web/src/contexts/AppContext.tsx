import { categoriesMock } from "@/constants/categories";
import { eVehicleClass } from "@/constants/eClasses";
import { vehiclesMock } from "@/constants/vehicles";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";

export type CategoryType = 
{
    id: number;
    label: string;
    length: number;
}

export type VehicleType =
{
    id: number;
    label: string;
    model: string;
    brand: string;
    category: eVehicleClass;
    image: string;

    minPrice: number;
    maxPrice: number;
    basePrice: number;
    offerPrice?: number;

    stock: number;
    availableColors: number[];

    enabled: boolean;
}

type AppContextType = {
    categories: any;
    vehicles: any;
    setVehiclesNode: (categories: any) => void;
    setCategoriesNode: (vehicles: any) => void;
}   

export const AppContext = createContext({} as AppContextType);

export const useAppContext = () => useContext<any>(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [ categories, setCategories ] = useState<CategoryType[]>(categoriesMock);
    const [ vehicles, setVehicles ] = useState<VehicleType[]>(vehiclesMock);

    const setVehiclesNode = (vehicles: any) =>{
        setVehicles(vehicles)
    }

    const setCategoriesNode = (categories: any) =>{
        setCategories(categories)
    }

    return (
        <AppContext.Provider value={{ categories, vehicles, setVehiclesNode, setCategoriesNode }}>
            {children}
        </AppContext.Provider>
    );
};