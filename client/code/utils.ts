import { gUiApp } from "./client";
import { setManagedTick } from "./utils/tick";
import { Vector3 } from "./utils/vector3";

export const uiAppOn = (name: string, params: any) => {
    return RegisterNuiCallback(`uiapp//${name}`, params)
}

export const MathRadiansToDegree = (radians: number) => {
    var pi = Math.PI;
    return radians * (180 / pi);
}


export const doTabletAnimation = async () => {

    const tabletDict = "amb@code_human_in_bus_passenger_idles@female@tablet@base"
    const tabletAnim = "base"
    const tabletProp : string = 'prop_cs_tablet'
    const tabletBone = 60309;
    const tabletOffset = Vector3.create( [0.03, 0.002, -0.0 ] );
    const tabletRot = Vector3.create([ 10.0, 160.0, 0.0 ]);

    // Animation
    RequestAnimDict(tabletDict)

    await setManagedTick( () => !!HasAnimDictLoaded(tabletDict), 5000);

    RequestModel(tabletProp)

    await setManagedTick( () => !!HasModelLoaded(tabletProp), 5000);

    const plyPed = PlayerPedId()

    const tabletObj = CreateObject(tabletProp, 0.0, 0.0, 0.0, true, true, false)

    const tabletBoneIndex = GetPedBoneIndex(plyPed, tabletBone)

    AttachEntityToEntity(tabletObj, plyPed, tabletBoneIndex, tabletOffset.x, tabletOffset.y, tabletOffset.z, tabletRot.x, tabletRot.y, tabletRot.z, true, false, false, false, 2, true)
    SetModelAsNoLongerNeeded(tabletProp)

    const tick = setTick(() =>{ 

        if (! gUiApp.gShowroomInterfaceStatus ) 
        {
            ClearPedSecondaryTask(plyPed)
            Wait(250)
            DetachEntity(tabletObj, true, false)
            DeleteEntity(tabletObj)

            clearTick(tick);
            return
        }

        if (! IsEntityPlayingAnim(plyPed, tabletDict, tabletAnim, 3) )
        {
            TaskPlayAnim(plyPed, tabletDict, tabletAnim, 3.0, 3.0, -1, 49, 0, false, false, false)
        }
    })
}