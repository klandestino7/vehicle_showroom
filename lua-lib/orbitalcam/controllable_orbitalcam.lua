local CONST_DRAG_SPEED = 10.0
local CONST_ZOOM_SPEED = 2.0

local gHandle = nil

local function MainControllableOrbitalCamLoop()
    -- DisableAllControlActions(0)

    EnableControlAction(0, 24, true)
    EnableControlAction(0, 1, true)
    EnableControlAction(0, 2, true)
    EnableControlAction(0, 241, true)
    EnableControlAction(0, 242, true)

    if IsDisabledControlPressed(0, 24) then
        local normals = vector2(
            GetDisabledControlNormal(0, 1),
            GetDisabledControlNormal(0, 2)
        )

        AddOrbitalCamAngleX(CONST_DRAG_SPEED * normals.x)
        AddOrbitalCamAngleY(CONST_DRAG_SPEED * normals.y)
    end

    if IsDisabledControlPressed(0, 241) or IsDisabledControlPressed(0, 242) then
        local normals = vector2(
            -GetDisabledControlNormal(0, 241),
            GetDisabledControlNormal(0, 242)
        )

        local distanceToLookAtPos = GetOrbitalCamDistanceToLookAtPos()

        distanceToLookAtPos += CONST_ZOOM_SPEED * normals.x
        distanceToLookAtPos += CONST_ZOOM_SPEED * normals.y
        
        SetOrbitalCamDistanceToLookAtPos(distanceToLookAtPos)
    end
end

local function ShouldControllableOrbitalCamLoopRun(handle)
    return gHandle == handle
end

function EnableControllableOrbitalCam()
    local handle = EnableOrbitalCam()
    
    gHandle = handle

    -- local helperPromptId = PromptBuilder:new()
    --                 :setControl(`INPUT_ATTACK`)
    --                 :setText('Mover Camera')
    --                 :setMode('Standard')
    --                 :build()

    -- print( ('ControllableOrbitalCam(%d) : Enable'):format(gHandle))

    CreateThread(function()
        while ShouldControllableOrbitalCamLoopRun(handle) do
            MainControllableOrbitalCamLoop()

            Wait(0)
        end

        -- PromptDelete(helperPromptId)

        -- helperPromptId = nil

        -- print( ('ControllableOrbitalCam(%d) : MainLoop stopped'):format(gHandle))
    end)
end

function DisableControllableOrbitalCam(immediately)
    -- print( ('ControllableOrbitalCam(%d) : Disable'):format(gHandle))

    gHandle = nil

    DisableOrbitalCam(immediately)
end