import { UiApp } from "./interface";

import "./interface";

export const gUiApp = new UiApp();

import "./events";
import "./camera";
import "./commands";

export const QBCore = global.exports["_core"].GetCoreObject();

import { stopPreviewUsingOrbitalCam } from "./camera";
import { currentVehicle, destroyEntity } from "./events";
import { CONST_JOB_NAME } from "data/constants";

export var hasJobPermission : boolean = false;

onNet("QBCore:Client:OnPlayerLoaded", () => {
    const PlayerData = QBCore.Functions.GetPlayerData();
    checkJobPermission(PlayerData.job.name);
});

onNet("QBCore:Client:OnJobUpdate", (Job: any) => {
    checkJobPermission(Job.name);
})

function checkJobPermission( job : string) 
{
    hasJobPermission = job == CONST_JOB_NAME ? true : false;
}

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