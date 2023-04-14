var vehicleList : any[] = [];

import "./service/vehicle";

import { vehiclesMock } from "data/vehicles";

onNet('showroom:server:getVehicleListFromStoreIndex', (storeIndex: number) => {
    const _source = (global as any).source;

    emitNet("showroom:client:getVehicleList", _source, vehiclesMock)
});