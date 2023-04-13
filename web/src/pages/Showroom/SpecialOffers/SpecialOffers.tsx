import s from "./SpecialOffers.module.scss";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import VehicleCard, { VehicleCardProps } from "@/components/VehicleCard/VehicleCard";
import { eVehicleClass, eVehicleClassLabel } from "@/constants/eClasses";
import FilterCategory from "@/components/FilterCategory/FilterCategory";
import { categoriesMock } from "@/constants/categories";
import { vehiclesMock } from "@/constants/vehicles";

type SpecialOffersProps = {

}

const SpecialOffers = () => 
{
    return(
        <div className={s.specialOffers}>
            <Header 
                title={""}
                enableNavBar={true}
            />

            <div className={s.categoryFilter}>
                {
                    categoriesMock.map(category => <FilterCategory
                        id = {category.id}
                        label = {category.label}
                    />)
                }
            </div>

            <div className={s.container}>
                <div className={s.vehiclesContainer}>
                    {
                        vehiclesMock.map(vehicle => 
                        {
                            return vehicle.priceOffer && <VehicleCard 
                                {...vehicle}
                                showVehicleStatus={true}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default SpecialOffers;