import { startPreviewUsingOrbitalCam, stopPreviewUsingOrbitalCam } from "./camera";
import { gUiApp } from "./client";

RegisterCommand("opentest", () =>{
    console.log("RUN COMMAND");
    emit("showroom:client:enableUi");
}, false);

RegisterCommand("startcam", () =>{
    const player = PlayerPedId();

    startPreviewUsingOrbitalCam(player);

    setTimeout(() => {
        stopPreviewUsingOrbitalCam()
    }, 15000);

}, false);