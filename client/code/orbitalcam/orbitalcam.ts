import { MathRadiansToDegree } from "utils";
import { Vec3, Vector3 } from "utils/vector3";

const CONST_POSITION_SMOOTHING_FACTOR = 5.0;

var gHandle : number;

var gFreeHandle : number = 1;

var gLookAtPosition : number[];

var gDistanceToLookAtPos : number;

var gMinDistanceToLookAtPos : number;
var gMaxDistanceToLookAtPos : number;

var gAngleX : number;
var gAngleY : number;

var gCamId : number;

var gDisablingPromise = new Promise<string>((resolve, reject) => {});

var gIsPromiseFinished = true;

export const GetOrbitalCamLookAtPosition = () =>
{
    return gLookAtPosition;
};
export const SetOrbitalCamLookAtPosition = (position: number[]) => 
{ 
    gLookAtPosition = position; 
};

export const GetOrbitalCamDistanceToLookAtPos = () =>
{ 
    return gDistanceToLookAtPos;
};
export const SetOrbitalCamDistanceToLookAtPos = (distance: number) =>
{ 
    gDistanceToLookAtPos = distance;
};

export const GetOrbitalCamMinDistanceToLookAtPos = () =>
{ 
    return gMinDistanceToLookAtPos;
};
export const SetOrbitalCamMinDistanceToLookAtPos = (minDistance: number) =>
{ 
    gMinDistanceToLookAtPos = minDistance;
};

export const GetOrbitalCamMaxDistanceToLookAtPos = () =>
{ 
    return gMaxDistanceToLookAtPos;
};
export const SetOrbitalCamMaxDistanceToLookAtPos = (maxDistance: number) =>
{ 
    gMaxDistanceToLookAtPos = maxDistance;
};

export const GetOrbitalCamAngleX = () =>
{ 
    return gAngleX;
};

export const SetOrbitalCamAngleX = (angle: number | null, disableInterpolation?: boolean) =>
{ 
    if ( angle )
    {
        angle = angle % 360;

        if ( angle < 0 )
        {
            angle += 360;
        }
    }

    gAngleX = angle;
};

export const AddOrbitalCamAngleX = (addAngle: number, disableInterpolation?: boolean) =>
{ 
    SetOrbitalCamAngleX(GetOrbitalCamAngleX() + addAngle, disableInterpolation);
};

export const GetOrbitalCamAngleY = () =>
{ 
    return gAngleY;
};

export const SetOrbitalCamAngleY = (angle: number | null, disableInterpolation?: boolean) =>
{ 
    if ( angle )
    {
        angle = angle % 360;

        if ( angle < 0 )
        {
            angle += 360;
        }
    }

    gAngleY = angle;
};

export const AddOrbitalCamAngleY = (addAngle: number, disableInterpolation?: boolean) =>
{ 
    SetOrbitalCamAngleY(GetOrbitalCamAngleY() + addAngle, disableInterpolation);
};

export const GetOrbitalCamId = () =>
{ 
    return gCamId;
};

export const IsOrbitalCamCreated = () =>
{ 
    return GetOrbitalCamId() != null;
}

const CreateOrbitCam = (position: number[], lookAtPosition: number[]) =>
{ 
    const camId = CreateCam('DEFAULT_SCRIPTED_CAMERA', true);

    console.log("CreateOrbitCam :: ", camId);

    SetCamCoord(camId, position[0], position[1], position[2])

    PointCamAtCoord(camId, lookAtPosition[0], lookAtPosition[1], lookAtPosition[2])

    SetCamFov(camId, 30.0)
    // SetCamNearDof(camId, 0.5)

    SetCamActiveWithInterp(camId, GetRenderingCam(), 500, 1, 1)

    RenderScriptCams(true, true, 500, false, false)

    gCamId = camId
}

const DestroyOrbitCam = (interpolateToCamId: number) => 
{
    if ( ! IsOrbitalCamCreated() ) 
    {
        return false;
    }

    const camId = GetOrbitalCamId();

    const interpolateToGameplayCam = interpolateToCamId == null;

    if ( interpolateToGameplayCam )
    {
        RenderScriptCams(false, true, 1000, true, true)
    }
    else
    {
        SetCamActiveWithInterp(interpolateToCamId, camId, 1000, 1, 1)
    }

    DestroyCam(camId, false)

    gCamId = null;

    return true;
}

const GetCollisionBetweenPoints = (pointFrom: number[], pointTo: number[], flags: number) => 
{
    const handle : any = Citizen.invokeNative("0x377906D8A31E5586", pointFrom[0], pointFrom[1], pointFrom[2], pointTo[0], pointTo[1], pointTo[2], flags, 0, 7);

    const [ _, hit, hitPos ]  = GetShapeTestResult(handle);

    return [hit == 1, hitPos]
}

const glmExport = global.exports.vehicle_showroom;


// const glm_rad = glmExport.glm_rad;
// const glm_forward = glmExport.glm_forward;
const glm_direction = glmExport.glm_direction;
const glm_lerp = glmExport.glm_lerp

const MainOrbitalCamLoop = () => 
{
    var lookAtPosition : any = GetOrbitalCamLookAtPosition()

    var distanceToLookAtPosition : any = GetOrbitalCamDistanceToLookAtPos()


    var minDistanceLookAtPos = GetOrbitalCamMinDistanceToLookAtPos()
    var maxDistanceLookAtPos = GetOrbitalCamMaxDistanceToLookAtPos()

    var angleX = GetOrbitalCamAngleX()
    var angleY = GetOrbitalCamAngleY()

    distanceToLookAtPosition = Math.max(distanceToLookAtPosition, minDistanceLookAtPos)
    distanceToLookAtPosition = Math.min(distanceToLookAtPosition, maxDistanceLookAtPos)

    const ft = GetFrameTime()

    console.log("MAIN LOOP");

    //[[ Rotação a partir do angulo X e Y ]]
    
    // const rotation = glm_quatEuler(glm_rad(-(angleX)), glm_rad(-(angleY)), 0.0)

    // // console.log("MainOrbitalCamLoop :: rotation", rotation);
    // console.log("glm_quatEuler");

    // //[[ Direção a partir da rotação ]]
    // const direction = rotation * glm_quatEuler()

    const direction = glm_direction(angleX, angleY)

    //[[ Posição da camera, matendo X unidades de distancia do local de foco ]]

    var directionVector = Vector3.create(
        [direction[0],
        direction[1],
        direction[2]]
    )

    var positionMultiply = Vector3.multiply(
        directionVector,
        distanceToLookAtPosition,
    )


    var position = Vector3.subtract(Vector3.create([lookAtPosition[0], lookAtPosition[1], lookAtPosition[2]]), positionMultiply);

    // console.log("MainOrbitalCamLoop :: position", position);

    
    /*
        A gente vai gerar uma nova lookAtPosition caso aconteça uma colisão com um ped ou veículo
        da uma efeito de 'profundidade' para a camera
    */
    (() => {
        const shapetestStart : Vec3 = position;
        const shapetestEnd   = lookAtPosition

        //[[ Ignorar peds, porque a gente geralmente tá usando a orbitcam em ]]
        const [ collides, collisionPos ] : any = GetCollisionBetweenPoints([shapetestStart.x, shapetestStart.y, shapetestStart.z], shapetestEnd, 4294967295 & ~(2 | 4 | 8) /* Peds */)

        if (collides) {
            var positionSub = Vector3.create(
                [collisionPos[0] - direction[0],
                collisionPos[1] - direction[1],
                collisionPos[2] - direction[2]]
            )
        
            position = Vector3.multiply(positionSub, distanceToLookAtPosition);
        }
    });

    /*
        Colisão entre o local de foco(principalmente caso ele mude) e a nova posição da camera
        - é util para que a camera não atravesse paredes que estejam atrás delas
    */
    (() => {
        const shapetestStart = position;
        const shapetestEnd   = lookAtPosition

        //[[ Ignorar peds, porque a gente geralmente tá usando a orbitcam em ]]
        const [ collides, collisionPos ] : any = GetCollisionBetweenPoints([shapetestStart.x, shapetestStart.y, shapetestStart.z], shapetestEnd, 1 | 16)

        if (collides) {
            var positionSub = Vector3.create(
                [collisionPos[0] - direction[0],
                collisionPos[1] - direction[1],
                collisionPos[2] - direction[2]]
            )
        
            position = Vector3.multiply(positionSub, distanceToLookAtPosition);
        }
    });

    if ( IsOrbitalCamCreated() )
    {
        /* Interpolar a partir da posição atual da camera, caso ela exista. */
        position = Vector3.create(glm_lerp(GetCamCoord(GetOrbitalCamId()), position, CONST_POSITION_SMOOTHING_FACTOR * ft));
    } 

    // state updates 

    SetOrbitalCamDistanceToLookAtPos(distanceToLookAtPosition)

    // game updates

    if (! IsOrbitalCamCreated() )
    {
        // [[ Criar a camera caso ela não exista ]]
        CreateOrbitCam([position.x, position.y, position.z], lookAtPosition)
    }

    const camId = GetOrbitalCamId();

    if ( !IsCamInterpolating(camId) ) 
    {   
        SetCamCoord(camId, position.x, position.y, position.z)

        PointCamAtCoord(camId, lookAtPosition.x, lookAtPosition.y, lookAtPosition.z)
    }

    // print('cam rot', GetCamRot(GetOrbitalCamId(), 2))

    // You have to run this function every frame (while you want DOF for your camera) otherwise it wont work
    // SetUseHiDof()
}

const ShouldOrbitalCamLoopRun = (handle: number) => 
{
    return gHandle
}

const CleanUpOrbitalCam = (interpolateToCamId: number) => 
{
    // print( ('OrbitalCam : Cleanup') )

    SetOrbitalCamLookAtPosition(null)

    SetOrbitalCamDistanceToLookAtPos(null)

    SetOrbitalCamMinDistanceToLookAtPos(null)
    SetOrbitalCamMaxDistanceToLookAtPos(null)

    SetOrbitalCamAngleX(null)
    SetOrbitalCamAngleY(null)
    
    DestroyOrbitCam(interpolateToCamId)

    if ( gDisablingPromise ) {
        gDisablingPromise.then(function(){
            gIsPromiseFinished = true;
        })
    }
}

export const EnableOrbitalCam = () => 
{
    var handle = gFreeHandle;

    gFreeHandle += 1;

    // print("gIsPromiseFinished", gIsPromiseFinished)

    if ( ! gIsPromiseFinished)
    {
        return
    }

    gHandle = handle;

    var renderingCamId  = IsGameplayCamRendering() ? null : GetRenderingCam();
    var renderingCamPos = GetFinalRenderedCamCoord();

    var baseLookAtPosition = GetEntityCoords(PlayerPedId(), true) //[[ Onde a camera de gameplay tá olhando ]]

    var baseDistanceToLookAtPos = 5.0 //[[ A distancia da camera de gameplay para o local que ela está olhando ]]

    var baseMinDistanceLookAtPos = 3.0 //[[ A ]]
    var baseMaxDistanceLookAtPos = 7.0 //[[ B ]]

    SetOrbitalCamLookAtPosition(GetOrbitalCamLookAtPosition() || baseLookAtPosition)

    SetOrbitalCamDistanceToLookAtPos(GetOrbitalCamDistanceToLookAtPos() || baseDistanceToLookAtPos)

    SetOrbitalCamMinDistanceToLookAtPos(GetOrbitalCamMinDistanceToLookAtPos() || baseMinDistanceLookAtPos)
    SetOrbitalCamMaxDistanceToLookAtPos(GetOrbitalCamMaxDistanceToLookAtPos() || baseMaxDistanceLookAtPos)

    const lookAtPosition = GetOrbitalCamLookAtPosition()

    const baseAngleX = MathRadiansToDegree(Math.atan(lookAtPosition[0] - renderingCamPos[0] / lookAtPosition[0] - renderingCamPos[1]))
    const baseAngleY = 0.0;

    SetOrbitalCamAngleX(GetOrbitalCamAngleX() || baseAngleX, false)
    SetOrbitalCamAngleY(GetOrbitalCamAngleY() || baseAngleY, false)

    const tick = setTick(() =>{

        if ( ShouldOrbitalCamLoopRun(handle) )
        {
            MainOrbitalCamLoop()
        }
        else 
        {
            CleanUpOrbitalCam(renderingCamId)

            clearTick(tick);
        }
    });
    return handle
}


export const DisableOrbitalCam = (immediately: boolean) =>
{
    gDisablingPromise = new Promise<string>((resolve, reject) => {
        gIsPromiseFinished = false
    });

    gHandle = null;

    if ( immediately )
    {
        CleanUpOrbitalCam(null)
    }

    // print( ('OrbitalCam : Waiting disable promise') )
}