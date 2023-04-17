export var gOrbitalCamPreviewIsEnabled = false;

export const startPreviewUsingOrbitalCam = async (entity: number) =>
{
    if ( gOrbitalCamPreviewIsEnabled ) { return; }

    gOrbitalCamPreviewIsEnabled = true
    global.exports[GetCurrentResourceName()].startPreviewUsingOrbitalCam(entity)
}

export const stopPreviewUsingOrbitalCam = () => 
{
    if ( gOrbitalCamPreviewIsEnabled ) 
    {
        gOrbitalCamPreviewIsEnabled = false;
        global.exports[GetCurrentResourceName()].stopPreviewUsingOrbitalCam()
    }
}