import FilterCategory from "@/components/FilterCategory/FilterCategory";
import s from "./Showroom.module.scss";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import { categoriesMock } from "@/constants/categories";
import { vehiclesMock } from "@/constants/vehicles";
import { Input, InputCheckbox } from "@/components/Input/Input";

type ShowroomManagementProps = {

}

const VehiclesContainer = () => {

    return (

        <div className={s.vehicles}>
            <div className={s.header}>
                <h3>AVAILABLE CARS</h3>
                <div className={s.categoryFilter}>
                    {
                        categoriesMock.map(category => <FilterCategory
                            id = {category.id}
                            label = {category.label}
                        />)
                    }
                </div>
            </div>

            <div className={s.vehiclesContainer}>
                {
                    vehiclesMock.map(vehicle => 
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