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
                <h3>AVAILABLE CARS</h3>
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
    const { setVehicleColor } = useVehicleSelectedCtx();

    const { vehicles } = useAppContext();
    const { currentVehicle } = useVehicleSelectedCtx();

    const [ colors, setColors ] = useState<number[]>([]);

    useEffect(() =>{
        if (vehicles[currentVehicle])
            setColors(vehicles[currentVehicle].availableColors);
    }, [currentVehicle])

    const removeColor = (color: number) => 
    {
        const arr : number[] = colors;

        arr.map((c, index) => {
            if ( c == color ) 
            {
                arr.slice(index);
            }
        });

        setColors(arr);

        fetchApp("AppShowroom", "UPDATE_AVAILABLE_COLOR", {currentVehicle, colors})
    }

    const addColor = (color: number) => 
    {
        const arr : number[] = colors;
        arr.push(color);

        setColors(arr);

        fetchApp("AppShowroom", "UPDATE_AVAILABLE_COLOR", {currentVehicle, colors});
    }

    const handleChange = (event: React.SyntheticEvent<EventTarget>, colorId: number) => {
        const status = (event.target as HTMLInputElement).checked;

        if ( status )
        {
            removeColor(colorId);
        }
        else
        {
            addColor(colorId);
        }
    }

    return (
        <div className={s.colorPicker}>
            <div className={s.contentColors}>
                
                {
                    VehicleColorsMock.map(color =>{
                        return (

                                <input
                                    className={s.colorItem}
                                    data-tooltip={color.label}
                                    style={{background: color.hash}}
                                    onChange={(event) => handleChange(event, color.index)}
                                    type="checkbox"
                                />
                        )
                    })
                }
            </div>
        </div>
    )
}


const SidebarManager = () => {
    const { vehicles } = useAppContext();
    const { currentVehicle, registerNewData } = useVehicleSelectedCtx();

    const [ vehicle, setVehicle ] = useState<VehicleType>();

    const handleOnChange = (key: string, value: number | string) =>
    {
        registerNewData(key, value);
    }

    useEffect(() =>{
        setVehicle(vehicles[currentVehicle]);
    }, [currentVehicle])

    return (
        <div className={s.sidebarManager}>
            <Input
                id={"name"}
                label={"Name car"}
                type={"text"}
                prefix={""}
                placeholder={vehicle?.label ?? "no name"}
                handleChange={(event: any) => handleOnChange("name", event)}
            />

            <Input
                id={"model"}
                label={"MODEL"}
                type={"text"}
                prefix={"#"}
                placeholder={vehicle?.model ?? "no model"}
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
                    state={vehicle?.offerPrice ? true : false}
                    handleChange={(event: any) => handleOnChange("offerPriceBoolean", event)}
                />
            </div>

            <Input
                id={"offerPrice"}
                label={"SPECIAL OFFER PRICE"}
                type={"number"}
                prefix={"$"}
                placeholder={"8 000"}
                minValue={vehicle?.minPrice}
                maxValue={vehicle?.maxPrice}
                handleChange={(event: any) => handleOnChange("offerPrice", event)}
            />

            <Colors />

            <Button />
        </div>
    )
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