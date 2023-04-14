
export const uiAppCallback = (name: string, params : any) => {
    return RegisterNuiCallback(`uiapp//${name}`,params)
}

export const uiAppEmit = (name: string, params : any) => {
    return SendNUIMessage(
        {
            type: name,
            data: params
        }
    )
}

export const MathRadiansToDegree  = ( radians : number) => 
{
    var pi = Math.PI;
    return radians * (180/pi);
}