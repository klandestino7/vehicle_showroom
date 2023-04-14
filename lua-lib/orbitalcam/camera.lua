
gOrbitalCamPreviewIsEnabled = false

function startPreviewUsingOrbitalCam(entity)
    if entity then
        local position = GetEntityCoords(entity), GetEntityHeading(entity)

        SetNuiFocusKeepInput(true)

        SetFocusPosAndVel(position, 0.0, 0.0, 0.0)
        SetOrbitalCamLookAtPosition(position)

        SetOrbitalCamDistanceToLookAtPos(9.0)

        SetOrbitalCamMinDistanceToLookAtPos(5.0)
        SetOrbitalCamMaxDistanceToLookAtPos(25.0)

        EnableControllableOrbitalCam()

        gOrbitalCamPreviewIsEnabled = true

        CreateThread(function()
        
            while gOrbitalCamPreviewIsEnabled do
                Wait(0)
                DisableControlAction(0, 24, true)
            end
        end)
    end
end
exports("startPreviewUsingOrbitalCam", startPreviewUsingOrbitalCam)


function stopPreviewUsingOrbitalCam()

    -- print('stopPreviewUsingOrbitalCam :: ')
    DisableControllableOrbitalCam(true)
    ClearFocus()
    SetNuiFocusKeepInput(false)
    gOrbitalCamPreviewIsEnabled = false
    
    -- print('stopPreviewUsingOrbitalCam :: gOrbitalCamPreviewIsEnabled' , gOrbitalCamPreviewIsEnabled)
end
exports("stopPreviewUsingOrbitalCam", stopPreviewUsingOrbitalCam)