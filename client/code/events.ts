import { CONST_VEHICLE_POSITION, CONST_VEHICLE_ROTATION } from "data/constants";
import { gUiApp } from "./client";
import { Vehicle } from "./vehicle";
import { gOrbitalCamPreviewIsEnabled, startPreviewUsingOrbitalCam, stopPreviewUsingOrbitalCam } from "./camera";

var gVehicleNode = [];
var gCategoryNode = [];

export var currentVehicle : Vehicle = null;

onNet("showroom:client:getVehicleList", (categoryNode: any) => {
    gCategoryNode = categoryNode;
    gUiApp.emit("AppShowroom/ReceiveCategoryNode", categoryNode);
});

onNet("showroom:client:getVehicleList", (vehicleNode: any) => {
    gVehicleNode = vehicleNode;
    gUiApp.emit("AppShowroom/ReceiveVehicleNode", vehicleNode);
});

onNet("showroom:client:enableUi", () => {
    SetNuiFocus(true, true);
    gUiApp.openUiAppInterface()
});


(() => {
    gUiApp.on("AppShowroom/SELECT_VEHICLE", (data: any[]) => {
        console.log("SELECT_VEHICLE :: ", data );
        const [ model, color ] = data;
        const position = CONST_VEHICLE_POSITION;
        const rotation = CONST_VEHICLE_ROTATION;

        if (currentVehicle.getEntity())
        {
            currentVehicle.destroy()
            currentVehicle = null;
        }

        currentVehicle = new Vehicle(model, position, rotation);

        if ( !gOrbitalCamPreviewIsEnabled )
        {
            startPreviewUsingOrbitalCam(currentVehicle.getEntity());
        }
    });

    gUiApp.on("AppShowroom/UPDATE_COLOR", (data: any[]) => {
        console.log("UPDATE_COLOR :: ", data );
        const [ color ] = data;

        if (currentVehicle.getEntity())
        {
            currentVehicle.setColor(color);
        }
    });

    gUiApp.on("AppShowroom/CLOSE_INTERFACE", () => {
        console.log("CLOSE_INTERFACE :: " );
        gUiApp.closeUiAppInterface()
        SetNuiFocus(false, false)
        
        stopPreviewUsingOrbitalCam()
    })
});

