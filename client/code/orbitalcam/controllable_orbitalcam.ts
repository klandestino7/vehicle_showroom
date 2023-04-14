import { 
    AddOrbitalCamAngleX,
    AddOrbitalCamAngleY,
    DisableOrbitalCam,
    EnableOrbitalCam, 
    GetOrbitalCamDistanceToLookAtPos,
    SetOrbitalCamDistanceToLookAtPos
} from "./orbitalcam";

const CONST_DRAG_SPEED = 10.0;
const CONST_ZOOM_SPEED = 2.0;

var gHandle : any;

const  MainControllableOrbitalCamLoop = () =>
{
    EnableControlAction(0, 24, true)
    EnableControlAction(0, 1, true)
    EnableControlAction(0, 2, true)
    EnableControlAction(0, 241, true)
    EnableControlAction(0, 242, true)

    if (IsDisabledControlPressed(0, 24))
    {
        const normals : number[] = [
            GetDisabledControlNormal(0, 1),
            GetDisabledControlNormal(0, 2)
        ];

        AddOrbitalCamAngleX(CONST_DRAG_SPEED * normals[0])
        AddOrbitalCamAngleY(CONST_DRAG_SPEED * normals[1])
    }
        

    if (IsDisabledControlPressed(0, 241) || IsDisabledControlPressed(0, 242))
    {
        const normals : number[] = [
            -GetDisabledControlNormal(0, 241),
            GetDisabledControlNormal(0, 242)
        ];

        var distanceToLookAtPos = GetOrbitalCamDistanceToLookAtPos()

        distanceToLookAtPos += CONST_ZOOM_SPEED * normals[0];
        distanceToLookAtPos += CONST_ZOOM_SPEED * normals[1];
        
        SetOrbitalCamDistanceToLookAtPos(distanceToLookAtPos)
    }
}

const ShouldControllableOrbitalCamLoopRun = (handle: number) => 
{
    return gHandle == handle
}

export const EnableControllableOrbitalCam = () => 
{
    const handle = EnableOrbitalCam()

    console.log("EnableControllableOrbitalCam :: ", handle, gHandle);
    
    gHandle = handle

    const tick = setTick(() => {

        if (ShouldControllableOrbitalCamLoopRun(handle))
        {
            MainControllableOrbitalCamLoop()
        }
        else
        {
            clearTick(tick);
        }
    });
}


export const DisableControllableOrbitalCam = (immediately: boolean) => 
{
    gHandle = null;

    DisableOrbitalCam(immediately)
}