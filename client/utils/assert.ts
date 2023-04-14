export function ASSERT_TYPE<
    T extends new (...args: any) => any,
    I = T extends new (...args: any) => infer X ? X : never
>
(instance: unknown, type: T, ...args: any[]): asserts instance is I
{
    if (!(instance instanceof type))
        throw new Error(`Variavel(${instance}) não é do tipo ${type?.name}`); // throw new ApplicationException(...args);
}

export function ASSERT_OR_ERROR(condition: any, error: Error): asserts condition
{
    if (!condition) throw error;
}

export function ASSERT(condition: any, errMessage?: string): asserts condition
{
    if (!condition) throw new Error(errMessage);
}