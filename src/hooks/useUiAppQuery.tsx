import { QueryKey, useQuery, UseQueryOptions } from "react-query";

import { createContext, useContext, useMemo } from "react";

import { IsEnvBrowser } from "../constants/IsEnvBrowser";


type UiAppContextState =
{
    name: string;

    uri: `uiapp/${UiAppContextState['name']}`;

    hasFocus?: boolean;

    exitable?: boolean;
}

const UiAppContext = createContext<UiAppContextState>({ name: '', uri: 'uiapp/' });

export function useUiAppQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey>
    (queryKey: TQueryKey, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'> | undefined)
{
    const [ key, ...params ] = typeof queryKey === 'string' ? [ queryKey ] : queryKey;

    const { uri } = useContext(UiAppContext);

    // console.log('useUiAppQuery :: ', uri, key, ...params);

    return useQuery<TData>([`${uri}/${key}`, ...params], async ({ queryKey }) =>
        {
            const [ _, ...queryParams ] = queryKey;

            // console.log('useUiAppQuery :: sent :: ', queryKey);

            console.log(`https://${ IsEnvBrowser ? 'nui-script' : GetParentResourceName() }/${queryKey}`);
            const response = await fetch(`https://${ IsEnvBrowser ? 'nui-script' : GetParentResourceName() }/${queryKey}`, { 
                method: 'POST',

                headers:
                {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                
                body: JSON.stringify({
                    type: key,

                    body: queryParams[0],
                }),
            });

            const data = await response.json();

            return data;
        }, options as any);
}