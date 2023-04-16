import FilterCategory from "@/components/FilterCategory/FilterCategory";
import s from "./Showroom.module.scss";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import { Input, InputCheckbox } from "@/components/Input/Input";
import { CategoryType, VehicleType, useAppContext } from "@/contexts/AppContext";

type ShowroomManagementProps = {

}

const VehiclesContainer = () => {

    const { categories, vehicles } = useAppContext();

    return (

        <div className={s.vehicles}>
            <div className={s.header}>
                <h3>AVAILABLE CARS</h3>
                <div className={s.categoryFilter}>
                    {
                        categories.map((category : CategoryType) => <FilterCategory
                            id = {category.id}
                            label = {category.label}
                        />)
                    }
                </div>
            </div>

            <div className={s.vehiclesContainer}>
                {
                    vehicles.map((vehicle : VehicleType) => 
                    {
                        return <VehicleCard 
                            {...vehicle}
                        />
                    })
                }
            </div>
        </div>
        
    )
}


const SidebarManager = () => {

    return (
        <div className={s.sidebarManager}>
            <Input
                id={"name"}
                label={"Name car"}
                type={"text"}
                prefix={""}
                placeholder={"LADA 2106"}
            />

            <Input
                id={"model"}
                label={"MODEL"}
                type={"text"}
                prefix={"#"}
                placeholder={"3333"}
            />

            <div className={s.box}>
                <InputCheckbox
                    id={"testdrive"}
                    label={"Testdrive"}
                    state={false}
                />

                <InputCheckbox
                    id={"specialoffer"}
                    label={"Special Offer"}
                    state={true}
                />
            </div>

            <Input
                id={"model"}
                label={"SPECIAL OFFER PRICE"}
                type={"text"}
                prefix={"$"}
                placeholder={"8 000"}
            />
            
        </div>
    )
}

const ShowroomManagement = () => 
{
    return(
        <div className={s.showroomManagement}>
            <Header 
                title={"MANAGEMENT"}
                enableNavBar={false}
            />

            <div className={s.container}>
                <VehiclesContainer />
                    
                <SidebarManager />
            </div>
        </div>
    )
}


export default ShowroomManagement;