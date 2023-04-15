export var gOrbitalCamPreviewIsEnabled = false;

export const startPreviewUsingOrbitalCam = async (entity: number) =>
{
    if ( gOrbitalCamPreviewIsEnabled ) { return; }

    global.exports.vehicle_showroom.startPreviewUsingOrbitalCam(entity)
    gOrbitalCamPreviewIsEnabled = true
}

export const stopPreviewUsingOrbitalCam = () => 
{
    if ( gOrbitalCamPreviewIsEnabled ) 
    {
        global.exports.vehicle_showroom.stopPreviewUsingOrbitalCam()
        gOrbitalCamPreviewIsEnabled = false
    }
}