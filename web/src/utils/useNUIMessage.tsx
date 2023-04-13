import {MutableRefObject, useEffect, useRef} from "react";

interface NuiMessageData<T = unknown> {
    type: string;
    data: T;
}

type NuiHandlerSignature<T> = (data: T) => void;

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/

export const useNUIMessage = <T, >(type: string, handler: (data: T) => void) =>
{
    const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(() => { });

    // Make sure we handle for a reactive handler
    useEffect(() =>
    {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() =>
    {

        const eventListener = (event: MessageEvent<NuiMessageData<T>>) =>
        {
            const { type: eventAction, data } = event.data;

            if (savedHandler.current)
            {
                if (eventAction === type)
                {
                    savedHandler.current(data);
                }
            }
        };

        window.addEventListener("message", eventListener);

        // Remove Event Listener on component cleanup
        return () => window.removeEventListener("message", eventListener);
    }, [ type ]);
};