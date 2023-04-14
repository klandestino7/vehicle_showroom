import { CONST_VEHICLE_POSITION, CONST_VEHICLE_ROTATION } from "data/constants";
import { gUiApp } from "./client";
import { Vehicle } from "./vehicle";
import { gOrbitalCamPreviewIsEnabled, startPreviewUsingOrbitalCam, stopPreviewUsingOrbitalCam } from "./camera";
import { uiAppOn } from "./utils";
import { setManagedTick } from "./utils/tick";

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


uiAppOn("AppShowroom/SELECT_VEHICLE", (data: any) => {
    // console.log("SELECT_VEHICLE :: ", data );

    const vehicle = data.body.vehicle;

    gUiApp.emit('AppShowroom/DisableBackground', false);

    const position = CONST_VEHICLE_POSITION;
    const rotation = CONST_VEHICLE_ROTATION;

    destroyEntity()

    currentVehicle = new Vehicle(vehicle.model, position, rotation);

    setManagedTick(() => HasModelLoaded(vehicle.model), 5000);

    if ( !gOrbitalCamPreviewIsEnabled )
    {
        setTimeout(() => {
            startPreviewUsingOrbitalCam(currentVehicle.getEntity());
        }, 300)
    }
});

uiAppOn("AppShowroom/UPDATE_COLOR", (data: any) => {
    console.log("UPDATE_COLOR :: ", data.body.color );
    const color  = data.body.color;

    if (currentVehicle.getEntity())
    {
        currentVehicle.setColor(color);
    }
});

uiAppOn("AppShowroom/CLOSE_INTERFACE", () => {
    console.log("CLOSE_INTERFACE :: " );
    
    gUiApp.closeUiAppInterface()

    destroyEntity()

    SetNuiFocus(false, false)
    
    stopPreviewUsingOrbitalCam()
})


const destroyEntity = () =>
{
    if (currentVehicle && currentVehicle.getEntity())
    {
        currentVehicle.destroy();
        currentVehicle = null;
    }
}