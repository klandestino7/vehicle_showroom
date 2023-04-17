import { CONST_TESTDRIVE_TIMEOUT_IN_SECS, CONST_TEST_DRIVE_POSITION, CONST_VEHICLE_POSITION, CONST_VEHICLE_ROTATION } from "data/constants";
import { QBCore, gUiApp, hasJobPermission } from "./client";
import { Vehicle } from "./vehicle";
import { gOrbitalCamPreviewIsEnabled, startPreviewUsingOrbitalCam, stopPreviewUsingOrbitalCam } from "./camera";
import { doTabletAnimation, uiAppOn } from "./utils";
import { setManagedTick } from "./utils/tick";
import { VehicleType } from "types/vehicle";
import { eVehicleClass, eVehicleClassLabel } from "types/category";
import { Category } from "./category";
import { Vector3 } from "./utils/vector3";

var gVehicleNode : VehicleType[] = [];
var gCategoryNode : Category[] = [];

export var currentVehicle : Vehicle = null;

onNet("showroom:client:getVehicleList", (vehiclesNode: any) => {
    gVehicleNode = vehiclesNode;

    formatCategoryNodeToInterface()
});

onNet("showroom:client:sendVehicleNode", (vehicleNode: any) => {
    gVehicleNode.map((vehicle, index) => {
        if( vehicle.id == vehicleNode.id )
        {
            gVehicleNode[index] = vehicleNode;
        }
    })
});

const formatCategoryNodeToInterface = () =>
{
    gCategoryNode.push( new Category(
        eVehicleClass.all,
        eVehicleClassLabel[-1],
        gVehicleNode.length,
    ) );

    gVehicleNode.map(( vehicle: VehicleType ) => {
        var haveCategory = false;

        gCategoryNode.find(category => {
            if(category.id == vehicle.category)
            {
                category.addLength(1);
                haveCategory = true
            }
        });

        if (! haveCategory )
        {
            gCategoryNode.push( new Category(
                vehicle.category,
                eVehicleClassLabel[vehicle.category],
                1,
            ) );
        }
    });

    gCategoryNode.sort((a, b) => a.id - b.id);
}

onNet("showroom:client:enableUi", () => {
    SetNuiFocus(true, true);
    gUiApp.openUiAppInterface();

    gUiApp.emit("AppShowroom/UpdateVehicleNode", gVehicleNode);
    gUiApp.emit("AppShowroom/UpdateCategoryNode", gCategoryNode);

    gUiApp.emit("AppShowroom/SetGroupPermission", hasJobPermission);

    doTabletAnimation();
});

onNet("showroom:client:successBoughtVehicle", (netId: number) =>{
    const entity = NetworkGetEntityFromNetworkId(netId);
    
    console.log("vehicle", entity);
    const plate = GetVehicleNumberPlateText(entity);

    destroyInterfaceAndData();

    QBCore.Functions.Notify(`YOUR CAR IS OUTSIDE, PLATEE ${plate}`);
});

uiAppOn("AppShowroom/SELECT_VEHICLE", async (data: any) => {
    const vehicle = data.body.vehicle;

    gUiApp.emit('AppShowroom/DisableBackground', false);

    const position = CONST_VEHICLE_POSITION;
    const rotation = CONST_VEHICLE_ROTATION;

    destroyEntity();

    // setManagedTick(() => HasModelLoaded(vehicle.model), 5000);

    currentVehicle = new Vehicle(vehicle.model, position, rotation);

    await setManagedTick( () => !DoesEntityExist(currentVehicle.getEntity()), 2000);

    const vehEntity = currentVehicle.getEntity();

    if ( !gOrbitalCamPreviewIsEnabled )
    {
        setTimeout(() => {
            startPreviewUsingOrbitalCam(vehEntity);
        }, 300)
    }

    const score = global.exports[GetCurrentResourceName()].getVehiclePerformance(vehEntity);

    gUiApp.emit("AppShowroom/SendVehiclePerformance", score);
});

uiAppOn("AppShowroom/UPDATE_COLOR", (data: any) => {
    const color  = data.body.color;

    if (currentVehicle.getEntity())
    {
        currentVehicle.setColor(color);
    }
});

uiAppOn("AppShowroom/CLOSE_INTERFACE", () => {
    destroyInterfaceAndData();
});

uiAppOn("AppShowroom/TRY_BUY_VEHICLE", (data: any) => {
    const vehicleId = data.body.vehicleId;

    emitNet("showroom:server:tryBuyVehicle", vehicleId, currentVehicle.primaryColor, currentVehicle.secondaryColor)
});

uiAppOn("AppShowroom/TEST_DRIVE_REQUEST", (data: any) => {

    DoScreenFadeOut(500)

    gUiApp.closeUiAppInterface()

    SetNuiFocus(false, false)
    
    stopPreviewUsingOrbitalCam();

    const vehicle = currentVehicle.getEntity();
    const playerPed = PlayerPedId();

    const oldPlayerPosition = GetEntityCoords(playerPed, false);

    SetPedIntoVehicle(playerPed, vehicle, -1);

    currentVehicle.setFreeze(false);

    RequestCollisionAtCoord(CONST_TEST_DRIVE_POSITION.x, CONST_TEST_DRIVE_POSITION.y, CONST_TEST_DRIVE_POSITION.z);

    currentVehicle.setPosition(CONST_TEST_DRIVE_POSITION);

    DoScreenFadeIn(500);

    setTimeout(() => {
        DoScreenFadeOut(500);

        currentVehicle.setPosition(CONST_VEHICLE_POSITION);
        currentVehicle.setRotation(CONST_VEHICLE_ROTATION);

        RequestCollisionAtCoord(oldPlayerPosition[0], oldPlayerPosition[1], oldPlayerPosition[2]);
        SetEntityCoords(playerPed, oldPlayerPosition[0], oldPlayerPosition[1], oldPlayerPosition[2], false, false, false, false);

        DoScreenFadeIn(500);

        SetNuiFocus(true, true)
        gUiApp.openUiAppInterface();

    }, CONST_TESTDRIVE_TIMEOUT_IN_SECS * 1000);
});

uiAppOn("AppShowroom/UPDATE_AVAILABLE_COLOR", (data: any) => {
    const vehicleId = data.body.currentVehicle;
    const colors = data.body.colors;

    emitNet("showroom:server:updateVehicleColors", vehicleId, colors)
})

uiAppOn("AppShowroom/UPDATE_VEHICLE_DATA", (data: any) => {
    const vehicleId = data.body.currentVehicle;
    const vehicleData = data.body.currentVehicleData;

    emitNet("showroom:server:updateVehicleData", vehicleId, vehicleData)
})

export const destroyEntity = () =>
{
    if (currentVehicle && currentVehicle.getEntity())
    {
        currentVehicle.destroy();
        currentVehicle = null;
    }
}

const destroyInterfaceAndData = () =>{
    console.log("CLOSE_INTERFACE :: " );
    
    gUiApp.closeUiAppInterface()

    destroyEntity()

    SetNuiFocus(false, false)
    
    stopPreviewUsingOrbitalCam()
}