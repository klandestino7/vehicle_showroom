import { setManagedPromiseTick } from "./tick";

// asyncRequestModel
export async function requestModel(model: number | string)
{
    if (!IsModelValid(model))
    {
        return
    }

    if (!IsModelInCdimage(model))
    {
        return
    }

    RequestModel(model);

    const releaseModel = () =>
    {
        SetModelAsNoLongerNeeded(model);
    }

    try
    {
        await setManagedPromiseTick(resolve =>
        {
            RequestModel(model);

            if (HasModelLoaded(model))
                resolve();
        });
    }
    catch(e)
    {
        releaseModel();

        return
    }
    
    return { releaseModel };
}
