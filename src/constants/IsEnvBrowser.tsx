export let IsEnvBrowser = true;

try
{
    if (GetParentResourceName)
    {
        IsEnvBrowser = false;
    }
}
catch(e)
{
    
}