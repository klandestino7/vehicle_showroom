
export class UiApp 
{
    gShowroomInterfaceStatus: boolean;

    constructor()
    {
        this.gShowroomInterfaceStatus = false;
    }

    setInterfaceStatus( status: boolean ) 
    {
        this.gShowroomInterfaceStatus = status;
    }

    openUiAppInterface()
    {
        this.setInterfaceStatus(true)
        this.emit('AppShowroom/DisplayNUI', true)
    }

    closeUiAppInterface()
    {
        this.setInterfaceStatus(false)
        this.emit('AppShowroom/DisplayNUI', false)
    }

    emit(name: string, params : any) {
        return SendNUIMessage(
            {
                type: name,
                data: params
            }
        )
    }

    on(name: string, params: any)
    {
        return RegisterNuiCallback(`uiapp//${name}`,params)
    }
}
