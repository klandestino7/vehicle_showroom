
export const uiAppOn = (name: string, params : any) => {
    return RegisterNuiCallback(`uiapp//${name}`,params)
}

export const MathRadiansToDegree  = ( radians : number) => 
{
    var pi = Math.PI;
    return radians * (180/pi);
}