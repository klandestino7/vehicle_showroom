export var gOrbitalCamPreviewIsEnabled = false;

export const startPreviewUsingOrbitalCam = async (entity: number) =>
{
    global.exports.vehicle_showroom.startPreviewUsingOrbitalCam(entity)
    gOrbitalCamPreviewIsEnabled = true
}

export const stopPreviewUsingOrbitalCam = () => 
{
    global.exports.vehicle_showroom.stopPreviewUsingOrbitalCam()
    gOrbitalCamPreviewIsEnabled = false
}