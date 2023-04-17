import { categoriesMock } from "@/constants/categories";
import { eVehicleClass } from "@/constants/eClasses";
import { vehiclesMock } from "@/constants/vehicles";
import { useNUIMessage } from "@/utils/useNUIMessage";
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
    categories: CategoryType[];
    vehicles: VehicleType[];
    filteredVehicles: VehicleType[];
    filterWords: string;
    groupPermission: boolean;
    setVehiclesNode: (categories: VehicleType[]) => void;
    setCategoriesNode: (vehicles: CategoryType[]) => void;
    setWords: (words: string) => void;
}   

export const AppContext = createContext({} as AppContextType);

export const useAppContext = () => useContext<any>(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [ categories, setCategories ] = useState<CategoryType[]>(categoriesMock);
    const [ vehicles, setVehicles ] = useState<VehicleType[]>(vehiclesMock);

    const [ groupPermission, setGroupPermission ] = useState<boolean>(false);

    const [ filteredVehicles, setFilteredVehicles ] = useState<VehicleType[]>(vehiclesMock);
    const [ filterWords, setFilterWords ] = useState<string>("");

    const setVehiclesNode = (vehicles: VehicleType[]) => {
        setVehicles(vehicles);
    }

    const setCategoriesNode = (categories: CategoryType[]) => {
        setCategories(categories);
    }

    const setWords = (words: string) => {
        setFilterWords(words);
        setVehicleFilter();
    }

    useNUIMessage<boolean>('AppShowroom/SetGroupPermission', (data) =>
    {
        setGroupPermission(data);
    });

    const setVehicleFilter = () => {

        if (filterWords && filterWords != "" && filterWords != " ")
        {
            const filtered = vehicles.filter(vehicle => 
                {
                    return Object.values(vehicle).some( (value : any) => {
                        let compute = typeof value === "string" ? value.includes(filterWords) : false;
                        if ( compute )
                        {
                            return compute;
                        }
                    })
                }
            );

            setFilteredVehicles(filtered);
            return
        }
        setFilteredVehicles([]);
    }

    return (
        <AppContext.Provider value={{ categories, vehicles, filteredVehicles, filterWords, groupPermission,  setVehiclesNode, setCategoriesNode, setWords }}>
            {children}
        </AppContext.Provider>
    );
};