var vehicleList : any[] = [];

import { Store } from "./module/store";

import { VehiclesMock } from "data/vehicles";
import { Vehicle, VehicleType } from "./module/vehicle";
import { randomInt } from "./utils";
import { VEHICLE_SPAWN_POSITION_WHEN_BUY } from "data/constants";

const store = new Store(
    1,
    "PDM"
);

store.init(() => {
    const vehiclesFormated : Vehicle[] = store.registerVehiclesFromNode(VehiclesMock);

    store.setVehicles(vehiclesFormated);

    console.log("STORE DATA INITIALIZED");
});

onNet('showroom:server:getVehicleListFromStore', () => {
    const _source = (global as any).source;

    emitNet("showroom:client:getVehicleList", _source, store.getVehicles())
});

onNet("showroom:server:tryBuyVehicle", (vehicleId: number, primaryColor: number, secondaryColor: number) => {
    const personaId = (global as any).source; // put citizen Id from qbcore;

    const vehicle = store.getVehicleFromId(vehicleId);
        
    const result = store.buyVehicle(vehicleId, personaId);

    if ( result )
    {
        const spawnCoords = VEHICLE_SPAWN_POSITION_WHEN_BUY[randomInt(0, 5)];

        const entity = CreateVehicle(GetHashKey(vehicle.model), spawnCoords.x, spawnCoords.y, spawnCoords.z, spawnCoords.h, true, false)

        const tickWait = setTick(() =>{
            if (DoesEntityExist(entity))
            {
                emitNet("showroom:client:successBoughtVehicle", personaId, NetworkGetNetworkIdFromEntity(entity));
                SetVehicleColours(entity, primaryColor, secondaryColor);
                clearTick(tickWait);
            }
        })
        
    }
})

onNet("showroom:server:updateVehicleColors", (vehicleId: number, colors: number[]) => {
    const vehicle = store.getVehicleFromId(vehicleId);

    if ( vehicle )
    {
        vehicle.setAvailableColors(colors);
    }
})

onNet("showroom:server:updateVehicleData", (vehicleId: number, data: VehicleType) => {
    const vehicle = store.getVehicleFromId(vehicleId);

    if ( vehicle )
    {
        vehicle.updateData(data);
    }

    store.resendVehicleToClient(vehicleId);
})