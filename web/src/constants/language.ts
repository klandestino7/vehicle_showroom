const LANGUAGE = "en";

const LOCALES : any = {};

LOCALES["en"] = 
{
    ["test_drive"]: "TEST DRIVE",
    ["buy_car"]: "BUY CAR",
    ["main_page"] : "MAIN PAGE",
    ["special_offers"] : "SPECIAL OFFERS",
    ["hot"] : "HOT",
    ["all_categories"] : "ALL CATEGORIES",
    ["cheapest_first"] : "CHEAPEST FIRST",
}

export const lang = (string: string) => 
{
    const localeLib = LOCALES[LANGUAGE];
    if ( ! localeLib )
    {
        return console.log("ERROR: LANGUAGE NOT FOUND!");
    }

    if ( ! localeLib[string] )
    {
        return "ERROR: TRANSLATE NOT FOUND!";
    }

    return localeLib[string];
}