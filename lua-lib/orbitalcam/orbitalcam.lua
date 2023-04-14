local CONST_POSITION_SMOOTHING_FACTOR = 5.0

local gHandle = nil

local gFreeHandle = 1

local gLookAtPosition = nil

local gDistanceToLookAtPos = nil

local gMinDistanceToLookAtPos = nil
local gMaxDistanceToLookAtPos = nil

local gAngleX = nil
local gAngleY = nil

local gCamId = nil

local gDisablingPromise = nil

function GetOrbitalCamLookAtPosition()
    return gLookAtPosition
end

function SetOrbitalCamLookAtPosition(position)
    gLookAtPosition = position
end

function GetOrbitalCamDistanceToLookAtPos()
    return gDistanceToLookAtPos
end

function SetOrbitalCamDistanceToLookAtPos(distance)
    gDistanceToLookAtPos = distance
end

function GetOrbitalCamMinDistanceToLookAtPos()
    return gMinDistanceToLookAtPos
end

function SetOrbitalCamMinDistanceToLookAtPos(minDistance)
    gMinDistanceToLookAtPos = minDistance
end

function GetOrbitalCamMaxDistanceToLookAtPos()
    return gMaxDistanceToLookAtPos
end

function SetOrbitalCamMaxDistanceToLookAtPos(maxDistance)
    gMaxDistanceToLookAtPos = maxDistance
end

function GetOrbitalCamAngleX()
    return gAngleX
end

function SetOrbitalCamAngleX(angle, disableInterpolation)
    if angle then
        angle = angle % 360

        if angle < 0 then
            angle += 360
        end
    end

    gAngleX = angle
end

function AddOrbitalCamAngleX(addAngle, disableInterpolation)
    SetOrbitalCamAngleX(GetOrbitalCamAngleX() + addAngle, disableInterpolation)
end

function GetOrbitalCamAngleY()
    return gAngleY
end

function SetOrbitalCamAngleY(angle, disableInterpolation)
    if angle then
        angle = angle % 360

        if angle < 0 then
            angle += 360
        end
    end

    gAngleY = angle
end

function AddOrbitalCamAngleY(addAngle, disableInterpolation)
    SetOrbitalCamAngleY(GetOrbitalCamAngleY() + addAngle, disableInterpolation)
end

function GetOrbitalCamId()
    return gCamId
end

function IsOrbitalCamCreated()
    return GetOrbitalCamId() ~= nil
end

local function CreateOrbitCam(position, lookAtPosition)
    local camId = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)

    SetCamCoord(camId, position.x, position.y, position.z)

    PointCamAtCoord(camId, lookAtPosition.x, lookAtPosition.y, lookAtPosition.z)

    SetCamFov(camId, 30.0)
    -- SetCamNearDof(camId, 0.5)

    SetCamActiveWithInterp(camId, GetRenderingCam(), 500, true, true)

    RenderScriptCams(true, true, 500, false, false)

    gCamId = camId
end

local function DestroyOrbitCam(interpolateToCamId)
    if not IsOrbitalCamCreated() then
        return false
    end

    local camId = GetOrbitalCamId()

    local interpolateToGameplayCam = interpolateToCamId == nil

    if interpolateToGameplayCam then
        RenderScriptCams(false, true, 1000, true, true)
    else
        SetCamActiveWithInterp(interpolateToCamId, camId, 1000, true, true)
    end

    DestroyCam(camId, false)

    gCamId = nil

    return true
end

local function GetCollisionBetweenPoints(pointFrom, pointTo, flags)
    -- StartExpensiveSynchronousShapeTestLosProbe
    local handle = Citizen.InvokeNative(0x377906D8A31E5586, pointFrom.x, pointFrom.y, pointFrom.z, pointTo.x, pointTo.y, pointTo.z, flags, 0, 7)

    local _, hit, hitPos = GetShapeTestResult(handle)

    return hit == 1, hitPos
end

require('glm')

local function MainOrbitalCamLoop()
    local lookAtPosition = GetOrbitalCamLookAtPosition()

    local distanceToLookAtPosition = GetOrbitalCamDistanceToLookAtPos()

    local minDistanceLookAtPos = GetOrbitalCamMinDistanceToLookAtPos()
    local maxDistanceLookAtPos = GetOrbitalCamMaxDistanceToLookAtPos()

    local angleX = GetOrbitalCamAngleX()
    local angleY = GetOrbitalCamAngleY()

    distanceToLookAtPosition = math.max(distanceToLookAtPosition, minDistanceLookAtPos)
    distanceToLookAtPosition = math.min(distanceToLookAtPosition, maxDistanceLookAtPos)

    --[[ logic ]]

    local ft = GetFrameTime()

    --[[ Rotação a partir do angulo X e Y ]]
    local rotation = glm.quatEulerAngleZXY(glm.rad(-(angleX)), glm.rad(-(angleY)), 0.0)

    --[[ Direção a partir da rotação ]]
    local direction = rotation * glm.forward()

    --[[ Posição da camera, matendo X unidades de distancia do local de foco ]]
    local position = lookAtPosition - direction * distanceToLookAtPosition

    --[[
        A gente vai gerar uma nova lookAtPosition caso aconteça uma colisão com um ped ou veículo
        da uma efeito de 'profundidade' para a camera
    --]]
    do
        local shapetestStart = position
        local shapetestEnd   = lookAtPosition

        --[[ Ignorar peds, porque a gente geralmente tá usando a orbitcam em ]]
        local collides, collisionPos = GetCollisionBetweenPoints(shapetestStart, shapetestEnd, 4294967295 & ~(2 | 4 | 8) --[[ Peds ]])

        if collides then
            position = collisionPos - direction * distanceToLookAtPosition
        end
    end

    --[[
        Colisão entre o local de foco(principalmente caso ele mude) e a nova posição da camera
        - é util para que a camera não atravesse paredes que estejam atrás delas
    --]]
    do
        local shapetestStart = lookAtPosition
        local shapetestEnd   =position

        local collides, collisionPos = GetCollisionBetweenPoints(shapetestStart, shapetestEnd, 1 | 16)

        if collides then
            position = collisionPos
        end
    end

    --[[ A ultima coordenada real sempre tem que vir por ultimo, para a gente poder interpolar ]]
    if IsOrbitalCamCreated() then
        --[[ Interpolar a partir da posição atual da camera, caso ela exista. ]]
        position = glm.lerp(GetCamCoord(GetOrbitalCamId()), position, CONST_POSITION_SMOOTHING_FACTOR * ft)
    end

    --[[ state updates ]]

    SetOrbitalCamDistanceToLookAtPos(distanceToLookAtPosition)

    --[[ game updates ]]

    if not IsOrbitalCamCreated() then
        --[[ Criar a camera caso ela não exista ]]
        CreateOrbitCam(position, lookAtPosition)
    end

    local camId = GetOrbitalCamId()

    --[[ Não mudar a posição e rotação da camera enquanto ela estiver interpolando ]]
    if not IsCamInterpolating(camId) then
        SetCamCoord(camId, position.x, position.y, position.z)

        PointCamAtCoord(camId, lookAtPosition.x, lookAtPosition.y, lookAtPosition.z)
    end

    -- print('cam rot', GetCamRot(GetOrbitalCamId(), 2))

    -- You have to run this function every frame (while you want DOF for your camera) otherwise it wont work
    -- SetUseHiDof()
end

local function ShouldOrbitalCamLoopRun(handle)
    return gHandle
end

local function CleanUpOrbitalCam(interpolateToCamId)
    -- print( ('OrbitalCam : Cleanup') )

    SetOrbitalCamLookAtPosition(nil)

    SetOrbitalCamDistanceToLookAtPos(nil)

    SetOrbitalCamMinDistanceToLookAtPos(nil)
    SetOrbitalCamMaxDistanceToLookAtPos(nil)

    SetOrbitalCamAngleX(nil)
    SetOrbitalCamAngleY(nil)
    
    DestroyOrbitCam(interpolateToCamId)

    if gDisablingPromise then
        -- print( ('OrbitalCam : Cleanup resolving') )

        gDisablingPromise:resolve()
    end
end

function EnableOrbitalCam()
    local handle = gFreeHandle

    gFreeHandle += 1

    --[[ Caso já esteja desabilitando uma camera, vamos aguardar! ]]
    if gDisablingPromise then

        -- print( ('OrbitalCam : Enable waiting on disable') )

        Citizen.Await(gDisablingPromise)
    end

    gHandle = handle

    local renderingCamId  = IsGameplayCamRendering() and nil or GetRenderingCam()
    local renderingCamPos = GetFinalRenderedCamCoord()

    local baseLookAtPosition = GetEntityCoords(PlayerPedId()) --[[ Onde a camera de gameplay tá olhando ]]

    local baseDistanceToLookAtPos = 5.0 --[[ A distancia da camera de gameplay para o local que ela está olhando ]]

    local baseMinDistanceLookAtPos = 3.0 --[[ A ]]
    local baseMaxDistanceLookAtPos = 7.0 --[[ B ]]

    SetOrbitalCamLookAtPosition(GetOrbitalCamLookAtPosition() or baseLookAtPosition)

    SetOrbitalCamDistanceToLookAtPos(GetOrbitalCamDistanceToLookAtPos() or baseDistanceToLookAtPos)

    SetOrbitalCamMinDistanceToLookAtPos(GetOrbitalCamMinDistanceToLookAtPos() or baseMinDistanceLookAtPos)
    SetOrbitalCamMaxDistanceToLookAtPos(GetOrbitalCamMaxDistanceToLookAtPos() or baseMaxDistanceLookAtPos)

    local lookAtPosition = GetOrbitalCamLookAtPosition()

    local baseAngleX = math.deg(
        math.atan(lookAtPosition.x - renderingCamPos.x, lookAtPosition.y - renderingCamPos.y)
    )
    local baseAngleY = 0.0

    SetOrbitalCamAngleX(GetOrbitalCamAngleX() or baseAngleX, false)
    SetOrbitalCamAngleY(GetOrbitalCamAngleY() or baseAngleY, false)
    
    -- print( ('OrbitalCam : Enable') )

    CreateThread(function()

        while ShouldOrbitalCamLoopRun(handle) do
            MainOrbitalCamLoop()

            Wait(0)
        end

        -- print( ('OrbitalCam : MainLoop stopped') )

        CleanUpOrbitalCam(renderingCamId)
    end)

    return handle
end

function DisableOrbitalCam(immediately)
    -- print( ('OrbitalCam( : Disable') )

    local p = promise.new()

    gDisablingPromise = p

    gHandle = nil

    if immediately then
        CleanUpOrbitalCam(nil)
    end

    -- print( ('OrbitalCam : Waiting disable promise') )

    Citizen.Await(p)

    -- print( ('OrbitalCam : Disable promise resolved') )
end


