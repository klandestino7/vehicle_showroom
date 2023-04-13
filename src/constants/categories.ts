import { eVehicleClass, eVehicleClassLabel } from "./eClasses"

export const categoriesMock = 
[
    { id:eVehicleClass.all, label: eVehicleClassLabel[eVehicleClass.all], vehiclesAmount: 230, },
    { id:eVehicleClass.compacts, label: eVehicleClassLabel[eVehicleClass.compacts], vehiclesAmount: 15, },
    { id:eVehicleClass.sedans, label: eVehicleClassLabel[eVehicleClass.sedans], vehiclesAmount: 20, },
    { id:eVehicleClass.coupes, label: eVehicleClassLabel[eVehicleClass.coupes], vehiclesAmount: 30, },
    { id:eVehicleClass.muscle, label: eVehicleClassLabel[eVehicleClass.muscle], vehiclesAmount: 50, },
    { id:eVehicleClass.sportsClassics, label: eVehicleClassLabel[eVehicleClass.sportsClassics], vehiclesAmount: 10, },
    { id:eVehicleClass.sports, label: eVehicleClassLabel[eVehicleClass.sports], vehiclesAmount: 30, },
    { id:eVehicleClass.super, label: eVehicleClassLabel[eVehicleClass.super], vehiclesAmount: 12, },
    { id:eVehicleClass.motorcycles, label: eVehicleClassLabel[eVehicleClass.motorcycles], vehiclesAmount: 14, },
    { id:eVehicleClass.offroad, label: eVehicleClassLabel[eVehicleClass.offroad], vehiclesAmount: 13, },
    { id:eVehicleClass.vans, label: eVehicleClassLabel[eVehicleClass.vans], vehiclesAmount: 3, },
]