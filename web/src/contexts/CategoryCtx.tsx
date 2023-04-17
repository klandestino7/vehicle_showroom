import { eVehicleClass } from "@/constants/eClasses";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";

type CategoryCtxType = {
    currentCategory: eVehicleClass;
    setCategory: (vehicle: eVehicleClass) => void;
}   

export const CategoryCtx = createContext({} as CategoryCtxType);

export const useCategoryCtx = () => useContext<any>(CategoryCtx);

export const CategoryCtxProvider = ({ children }: { children: React.ReactNode }) => {

    const [ currentCategory, setCurrentCategory ] = useState<eVehicleClass>(-1);


    const setCategory = (category: eVehicleClass) =>{
        setCurrentCategory(category)
    }

    return (
        <CategoryCtx.Provider value={{ currentCategory, setCategory }}>
            {children}
        </CategoryCtx.Provider>
    );
};