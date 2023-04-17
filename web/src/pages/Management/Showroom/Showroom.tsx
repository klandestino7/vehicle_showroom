import FilterCategory from "@/components/FilterCategory/FilterCategory";
import s from "./Showroom.module.scss";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import VehicleCard, { VehicleCardProps } from "@/components/VehicleCard/VehicleCard";
import { Input, InputCheckbox } from "@/components/Input/Input";
import { CategoryType, VehicleType, useAppContext } from "@/contexts/AppContext";
import { CategoryCtxProvider, useCategoryCtx } from "@/contexts/CategoryCtx";
import { useEffect, useState } from "react";
import { eVehicleClass } from "@/constants/eClasses";
import Vehicles from "@/components/VehicleCardContainer/VehicleCardContainer";
import { useVehicleSelectedCtx } from "@/contexts/VehicleSelectedCtx";
import { lang } from "@/constants/language";
import { VehicleColorsMock } from "@/constants/colors";
import { fetchApp } from "@/hooks/fetchApp";
import { Navigate } from "react-router-dom";
import { IsEnvBrowser } from "@/constants/IsEnvBrowser";

type ShowroomManagementProps = {

}

const VehiclesContainer = () => {
    const { categories } = useAppContext();

    return (

        <div className={s.vehicles}>
            <div className={s.header}>
                <h3>{lang("available_cars")}</h3>
                <div className={s.categoryFilter}>
                    {
                        categories.map((category : CategoryType) => category.length >= 1 && <FilterCategory
                            id = {category.id}
                            label = {category.label}
                        />)
                    }
                </div>
            </div>

            <div className={s.vehiclesContainer}>
                <Vehicles />
            </div>
        </div>
        
    )
}

const Button = () => {
    const { requestSaveNewData } = useVehicleSelectedCtx();

    return (
        <div className={s.button} onClick={() => requestSaveNewData()}>
            {lang("save")}
        </div>
    )
}


const Colors = () => {
    const { registerNewData, currentVehicleData } = useVehicleSelectedCtx();

    const [ colors, setColors ] = useState<number[]>([]);

    useEffect(() =>{
        if (currentVehicleData)
        {
            setColors(currentVehicleData.availableColors);
        }
    }, [currentVehicleData])

    const removeColor = (color: number) => 
    {
        // console.log("removeColor :: ", color, JSON.stringify(colors));
        const arr : number[] = colors;

        arr.map((c, index) => {
            if ( c == color ) 
            {
                arr.slice(index);
            }
        });

        setColors(arr);

        registerNewData("availableColors", arr);
        fetchApp("AppShowroom", "UPDATE_AVAILABLE_COLOR", colors)
    }

    const addColor = (color: number) => 
    {
        // console.log("addColor :: ", color, JSON.stringify(colors));
        
        const arr : number[] = colors;
        arr.push(color);

        setColors(arr);
        registerNewData("availableColors", arr);

        fetchApp("AppShowroom", "UPDATE_AVAILABLE_COLOR", colors);
    }

    const handleChange = (event: React.SyntheticEvent<EventTarget>, colorId: number) => {
        const status = (event.target as HTMLInputElement).checked;

        if ( !status )
        {
            removeColor(colorId);
        }
        else
        {
            addColor(colorId);
        }
    }

    return currentVehicleData ? (
        <div className={s.colorPicker}>
            <div className={s.contentColors}>
                {
                    VehicleColorsMock.map(color => {

                        const isChecked : any = colors?.find((colorId) => {
                            return colorId == color.index
                        })

                        return (
                            <Color
                                label={color.label}
                                hash={color.hash}
                                handle={(e) => handleChange(e, color.index)}
                                isChecked={isChecked}
                            />
                        )
                    })
                }
            </div>
        </div>
    ) : <></>
}

type ColorProps = {
    label: string;
    hash: string;
    isChecked: boolean;
    handle: (e: any) => void;
}

const Color : React.FC<ColorProps> = ({
    label,
    isChecked,
    hash,
    handle,
}) => {

    const [ checked, setChecked ] = useState(isChecked);

    const handleChange = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        setChecked(isChecked);
    })

    return (
        <input
            className={s.colorItem}
            data-tooltip={label}
            style={{background: hash}}
            onChange={(e) => handle(e)}
            onClick={handleChange}
            defaultChecked={checked}
            type="checkbox"
        />
    )
}


const SidebarManager = () => {
    const { currentVehicleData, registerNewData } = useVehicleSelectedCtx();

    const [ vehicle, setVehicle ] = useState<VehicleType>();

    const handleOnChange = (key: string, event: React.SyntheticEvent<EventTarget>) =>
    {
        const value = (event.target as HTMLInputElement).value;
        registerNewData(key, value);
    }

    useEffect(() =>{
        setVehicle(currentVehicleData);
        // console.log("currentVehicleData", currentVehicleData);
    }, [currentVehicleData])

    return vehicle ? (
        <div className={s.sidebarManager}>
            <Input
                id={"label"}
                label={"Name car"}
                type={"text"}
                prefix={""}
                placeholder={currentVehicleData.label}
                handleChange={(event: any) => handleOnChange("label", event)}
            />

            <Input
                id={"model"}
                label={"MODEL"}
                type={"text"}
                prefix={"#"}
                placeholder={currentVehicleData.model}
                handleChange={(event: any) => handleOnChange("model", event)}
            />

            <div className={s.box}>
                <InputCheckbox
                    id={"testdrive"}
                    label={"Testdrive"}
                    state={false}
                    handleChange={(event: any) => handleOnChange("testDrive", event)}
                />

                <InputCheckbox
                    id={"specialoffer"}
                    label={"Special Offer"}
                    state={currentVehicleData.offerPrice ? true : false}
                    handleChange={(event: any) => handleOnChange("offerPriceBoolean", event)}
                />
            </div>

            <Input
                id={"offerPrice"}
                label={"SPECIAL OFFER PRICE"}
                type={"number"}
                prefix={"$"}
                placeholder={"8 000"}
                minValue={currentVehicleData.minPrice}
                maxValue={currentVehicleData.maxPrice}
                handleChange={(event: any) => handleOnChange("offerPrice", event)}
            />

            <Colors />

            <Button />
        </div>
    ) : <></>
}

const ShowroomManagement = () => 
{
    const { groupPermission } = useAppContext();

    return ( groupPermission || IsEnvBrowser ) ? (
        <CategoryCtxProvider>
            <div className={s.showroomManagement}>
                <Header 
                    title={"MANAGEMENT"}
                    enableNavBar={false}
                />

                <div className={s.container}>
                    <VehiclesContainer />
                        
                    <SidebarManager />
                </div>
            </div>
        </CategoryCtxProvider>
    ) : 
    (
        <Navigate 
            to={"/"}
            replace={true}
        />
    )
}

export default ShowroomManagement;