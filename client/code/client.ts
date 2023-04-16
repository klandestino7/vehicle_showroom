import { UiApp } from "./interface";

import "./interface";

export const gUiApp = new UiApp();

import "./events";
import "./camera";
import "./commands";

import { stopPreviewUsingOrbitalCam } from "./camera";
import { currentVehicle, destroyEntity } from "./events";

function onResourceStop(resource: string) {
    if (resource !== GetCurrentResourceName()) {
        return;
    }

    SetNuiFocus(false, false);
    SetNuiFocusKeepInput(false);
    
    stopPreviewUsingOrbitalCam();

    destroyEntity();
}

on('onResourceStop', onResourceStop);

setTimeout(() => emitNet("showroom:server:getVehicleListFromStore"), 1000);