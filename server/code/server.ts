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

    store.setVehicles(vehiclesFormated)
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

        const entity = CreateVehicle(GetHashKey(vehicle.model), spawnCoords.x, spawnCoords.y, spawnCoords.z, spawnCoords.h, true, false);
        const netId = NetworkGetNetworkIdFromEntity(entity)

        SetVehicleColours(entity, primaryColor, secondaryColor);

        emitNet("showroom:client:successBoughtVehicle", personaId, netId);
    }
})