import s from "./SpecialOffers.module.scss";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import VehicleCard, { VehicleCardProps } from "@/components/VehicleCard/VehicleCard";
import { eVehicleClass, eVehicleClassLabel } from "@/constants/eClasses";
import FilterCategory from "@/components/FilterCategory/FilterCategory";
import { CategoryType, VehicleType, useAppContext } from "@/contexts/AppContext";

type SpecialOffersProps = {

}

const SpecialOffers = () => 
{
    const { categories, vehicles } = useAppContext();

    return(
        <div className={s.specialOffers}>
            <Header 
                title={""}
                enableNavBar={true}
            />

            <div className={s.categoryFilter}>
                {
                    categories.map((category : CategoryType) => <FilterCategory
                        id = {category.id}
                        label = {category.label}
                    />)
                }
            </div>

            <div className={s.container}>
                <div className={s.vehiclesContainer}>
                    {
                        vehicles.map((vehicle : VehicleType) => 
                        {
                            return vehicle.offerPrice && <VehicleCard 
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