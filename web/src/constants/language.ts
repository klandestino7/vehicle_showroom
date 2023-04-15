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
}

export const lang = (string: string) => 
{
    const localeLib = LOCALES[LANGUAGE]
    if ( ! localeLib )
    {
        return console.log("LANGUAGE NOT FOUND!");
    }

    if ( ! localeLib[string] )
    {
        return "ERROR: TRANSLATE NOT FOUND!";
    }

    return localeLib[string];
}