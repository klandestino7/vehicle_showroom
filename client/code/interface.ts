
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
        return this.registerCallback(`uiapp//${name}`, params)
    }

    registerCallback(type: string, callback: Function)
    {
        RegisterNuiCallbackType(type);

        const handler = (body: any, resultCallback: NUIResultCallback) =>
        {
            callback(body, resultCallback);
        }

        const eventName = `__cfx_nui:${type}`;

        global.on(eventName, handler);

        return {
            eventName: eventName,
            callback: handler,
        };
    }
}

export type NUIResultCallback = (data: { [K: string]: any }) => void;