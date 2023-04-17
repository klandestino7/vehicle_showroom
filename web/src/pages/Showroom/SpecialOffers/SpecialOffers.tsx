import s from "./SpecialOffers.module.scss";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import VehicleCard, { VehicleCardProps } from "@/components/VehicleCard/VehicleCard";
import { eVehicleClass, eVehicleClassLabel } from "@/constants/eClasses";
import FilterCategory from "@/components/FilterCategory/FilterCategory";
import { CategoryType, VehicleType, useAppContext } from "@/contexts/AppContext";
import { useEffect, useState } from "react";
import { CategoryCtxProvider, useCategoryCtx } from "@/contexts/CategoryCtx";
import Vehicles from "@/components/VehicleCardContainer/VehicleCardContainer";

type SpecialOffersProps = {

}

const SpecialOffers = () => 
{
    const { categories } = useAppContext();

    return(
        <CategoryCtxProvider>
            <div className={s.specialOffers}>
                <Header
                    title={""}
                    enableNavBar={true}
                />

                <div className={s.categoryFilter}>
                    {
                        categories.map((category : CategoryType) => category.length >=1 && <FilterCategory
                            id = {category.id}
                            label = {category.label}
                        />)
                    }
                </div>

                <div className={s.container}>
                    <div className={s.vehiclesContainer}>
                        <Vehicles
                            showVehicleStatus={true}
                        />
                    </div>
                </div>
            </div>
        </CategoryCtxProvider>
    )
}


export default SpecialOffers;