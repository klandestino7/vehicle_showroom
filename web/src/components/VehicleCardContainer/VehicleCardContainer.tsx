import { VehicleType, useAppContext } from "@/contexts/AppContext";
import { useCategoryCtx } from "@/contexts/CategoryCtx";
import { useEffect, useState } from "react";
import VehicleCard, { VehicleCardProps } from "../VehicleCard/VehicleCard";
import { eVehicleClass } from "@/constants/eClasses";


type VehicleProps = 
{
    showVehicleStatus ?: boolean
}

const Vehicles : React.FC<VehicleProps> = ({showVehicleStatus = false}) => {

    const { vehicles, filterWords, filteredVehicles } = useAppContext();
    const { currentCategory } = useCategoryCtx();

    const [ cachedVehicles, setCachedVehicles ] = useState<VehicleCardProps[]>(vehicles);

    const generateVehicleArray = () => {
        const array: VehicleCardProps[] = [];

        const vehicleArr = filterWords != "" ? filteredVehicles : vehicles;

        if (currentCategory == eVehicleClass.all) {
            setCachedVehicles(vehicleArr);
            return vehicleArr;
        }

        vehicleArr.map((vehicle : VehicleType) => {
            if (vehicle.category == currentCategory) { 
                array.push(vehicle);
            }
        })

        setCachedVehicles(array);
    }

    useEffect(() => {
        generateVehicleArray();
    }, [filterWords, currentCategory] )

    return (
        <>
            {
                cachedVehicles.map((vehicle : VehicleType) => 
                {
                    return <VehicleCard 
                        {...vehicle}
                        showVehicleStatus={showVehicleStatus}
                    />
                })
            }
        </>
    )
}

export default Vehicles;