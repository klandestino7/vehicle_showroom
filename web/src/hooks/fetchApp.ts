import { IsEnvBrowser } from "../constants/IsEnvBrowser";

export const fetchApp = async <R,>(uiApp: string, eventName: string, body?: any): Promise<R> =>
{
    console.log(`fetchApp :: sending(${eventName}) to -> `, `https://${ IsEnvBrowser ? 'nui-script' : GetParentResourceName() }/uiapp//${uiApp}/${eventName}`);

    const response = await fetch(`https://${ IsEnvBrowser ? 'nui-script' : GetParentResourceName() }/uiapp//${uiApp}/${eventName}`,
    {
        method: 'POST',
        body: JSON.stringify({
            type: eventName,
            body: body,
        }),
    })
    .then(response => response.json())
    .catch(error => { throw new Error(`fetchApp(fetch) execution failed, uiApp(${uiApp}) eventName(${eventName}): ${error.message}`) });

    return response;
}