import { CONST_VEHICLE_POSITION, CONST_VEHICLE_ROTATION } from "data/constants";
import { gUiApp } from "./client";
import { Vehicle } from "./vehicle";
import { gOrbitalCamPreviewIsEnabled, startPreviewUsingOrbitalCam, stopPreviewUsingOrbitalCam } from "./camera";
import { uiAppOn } from "./utils";
import { setManagedTick } from "./utils/tick";
import { VehicleType } from "types/vehicle";
import { eVehicleClass, eVehicleClassLabel } from "types/category";

var gVehicleNode : any = [];
var gCategoryNode : Category[];

export var currentVehicle : Vehicle = null;

onNet("showroom:client:getVehicleList", (vehicleNode: any) => {
    gVehicleNode = vehicleNode;

    gUiApp.emit("AppShowroom/ReceiveVehicleNode", vehicleNode);

    gVehicleNode.map(( vehicle: VehicleType )=> {

        gCategoryNode.find(category => {
            if(category.id == vehicle.category)
            {
                category.addLength(1);
            } 
            else
            {
                gCategoryNode.push(
                    new Category(
                        vehicle.category,
                        eVehicleClassLabel[vehicle.category],
                        1,
                    )
                )
            }
        });

    });
});

onNet("showroom:client:enableUi", () => {
    SetNuiFocus(true, true);
    gUiApp.openUiAppInterface();

    gUiApp.emit("AppShowroom/UpdateVehicleNode", gVehicleNode);
    gUiApp.emit("AppShowroom/UpdateCategoryNode", gCategoryNode);
});

onNet("showroom:client:successBoughtVehicle", (netId: number) =>{

})

uiAppOn("AppShowroom/SELECT_VEHICLE", (data: any) => {
    const vehicle = data.body.vehicle;

    gUiApp.emit('AppShowroom/DisableBackground', false);

    const position = CONST_VEHICLE_POSITION;
    const rotation = CONST_VEHICLE_ROTATION;

    destroyEntity();

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
});

uiAppOn("AppShowroom/TRY_BUY_VEHICLE", (data: any) => {
    const vehicleId = data.body.vehicleId;

    emitNet("showroom:server:tryBuyVehicle", vehicleId, currentVehicle.primaryColor, currentVehicle.secondaryColor)
})

export const destroyEntity = () =>
{
    if (currentVehicle && currentVehicle.getEntity())
    {
        currentVehicle.destroy();
        currentVehicle = null;
    }
}
