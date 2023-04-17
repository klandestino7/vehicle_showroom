import { eVehicleClass } from "data/eClasses";
import { Vehicle, VehicleType } from "./vehicle";

export class Store {

    constructor(
        public readonly id : number,
        public name : string,

        public vehicles : Vehicle[] = [],
    )
    {
        this.id = id;
        this.name = name;
    }

    init( handle: () => any )
    {
        handle();
    }

    getVehicles()
    {
        return this.vehicles;
    }

    getVehiclesByClass(category: eVehicleClass)
    {
        const arr : Vehicle[] = [];

        this.vehicles.map( vehicle =>{
            if (vehicle.category == category )
            {
                arr.push(vehicle);
            }
        })

        return arr;
    }

    getVehicleFromId(index: number): Vehicle
    {
        return this.vehicles.find((vehicle) =>{
            return vehicle.id == index
        });
    }

    registerVehiclesFromNode(vehicles: VehicleType[])
    {
        return vehicles.map((vehicle : VehicleType) => {
            return new Vehicle(
                vehicle.id,
                vehicle.label,
                vehicle.model,
                vehicle.brand,
                vehicle.category,
                vehicle.image,
                vehicle.minPrice,
                vehicle.maxPrice,
                vehicle.basePrice,
                vehicle.offerPrice,
                vehicle.stock,
                vehicle.availableColors,
                vehicle.enabled
            )
        })
    }

    setVehicles(vehicles: Vehicle[])
    {
        this.vehicles = vehicles
    }

    buyVehicle(vehicleId: number, personaId: number)
    {
        const vehicle = this.getVehicleFromId(vehicleId);

        if ( vehicle.stock < 1)
        {
            this.log("ERROR", "stock is not enough");
            return false
        }

        vehicle.setStock(vehicle.stock - 1);
        
        this.log("SUCCESS", `vehicle ${vehicle.label} bought by persona :: ${personaId}`);
        return true
    }

    log(type: string, message: string)
    {
        console.log(`[${this.name}] ${type} :: ${message}`);
    }

    resendVehicleToClient(vehicleId: number)
    {
        const vehicle = this.getVehicleFromId(vehicleId);
        emitNet("showroom:client:sendVehicleNode", -1, vehicle);
    }
}