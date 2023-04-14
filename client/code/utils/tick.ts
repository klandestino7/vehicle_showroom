import { ASSERT_TYPE } from "./assert";

export async function setManagedTick(condition: () => boolean, timeoutMilli: number): Promise<void>
{
    let tick: number;

    const timeout = new Promise<void>((res, rej) =>
    {
        setTimeout(() => rej(new Error('timeout')), timeoutMilli);
    });

    const main = new Promise<void>((res, rej) =>
    {
        tick = setTick(() =>
        {
            try
            {
                if (condition())
                {
                    res();
                }
            }
            catch(e)
            {
                rej(e);
            }
        });
    });

    try
    {
        await Promise.race([ main, timeout ]);
    }
    catch(e)
    {
        ASSERT_TYPE(e, Error);

        if (e.message == 'timeout')
            throw new Error('Timeout!');

        throw e;
    }
    finally
    {
        clearTick(tick);
    }
}



export async function setManagedPromiseTick<T>(callback: (resolve?: <T>(value?: T) => void, reject?: <T>(value?: T) => void) => any, timeout?: number): Promise<T>
{
    let timerTick: number;
    let timerTimeout: CitizenTimer;

    try
    {
        return await new Promise((resolve, reject) =>
        {
            timerTick = setTick(() =>
            {
                try
                {
                    callback(resolve as any, reject as any);
                }
                catch(e)
                {
                    reject();
                }
            });
    
            if (timeout)
            {
                timerTimeout = setTimeout(() =>
                {
                    reject(new Error('Managed promise tick deu timeout!'));
                }, timeout);
            }
        });
    }
    catch(e)
    {
        throw e;
    }
    finally
    {
        clearTick(timerTick);
        clearTimeout(timerTimeout);
    }
}
