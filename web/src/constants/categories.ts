import { CategoryType } from "@/contexts/AppContext"
import { eVehicleClass, eVehicleClassLabel } from "./eClasses"

export const categoriesMock : CategoryType[] = 
[
    { id:eVehicleClass.all, label: eVehicleClassLabel[eVehicleClass.all], length: 230, },
    { id:eVehicleClass.compacts, label: eVehicleClassLabel[eVehicleClass.compacts], length: 15, },
    { id:eVehicleClass.sedans, label: eVehicleClassLabel[eVehicleClass.sedans], length: 20, },
    { id:eVehicleClass.coupes, label: eVehicleClassLabel[eVehicleClass.coupes], length: 30, },
    { id:eVehicleClass.muscle, label: eVehicleClassLabel[eVehicleClass.muscle], length: 50, },
    { id:eVehicleClass.sportsClassics, label: eVehicleClassLabel[eVehicleClass.sportsClassics], length: 10, },
    { id:eVehicleClass.sports, label: eVehicleClassLabel[eVehicleClass.sports], length: 30, },
    { id:eVehicleClass.super, label: eVehicleClassLabel[eVehicleClass.super], length: 12, },
    { id:eVehicleClass.motorcycles, label: eVehicleClassLabel[eVehicleClass.motorcycles], length: 14, },
    { id:eVehicleClass.offroad, label: eVehicleClassLabel[eVehicleClass.offroad], length: 13, },
    { id:eVehicleClass.vans, label: eVehicleClassLabel[eVehicleClass.vans], length: 3, },
]