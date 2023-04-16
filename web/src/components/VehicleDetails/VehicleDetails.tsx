import { useVehicleSelectedCtx } from "@/contexts/VehicleSelectedCtx";
import s from "./VehicleDetails.module.scss";
import { useEffect, useState } from "react";
import { VehicleCardProps } from "../VehicleCard/VehicleCard";
import { VehicleColorsMock } from "@/constants/colors";
import VehicleStatus from "../VehicleStatus/VehicleStatus";
import { IsEnvBrowser } from "@/constants/IsEnvBrowser";
import { lang } from "@/constants/language";
import { useAppContext } from "@/contexts/AppContext";
import { fetchApp } from "@/hooks/fetchApp";

import { VehicleType } from "@/contexts/AppContext";


type ButtonsProps =
{
    vehicle : VehicleType | any
}

const ButtonsContainer : React.FC<ButtonsProps> = ({vehicle}) => {
    let USDollar = new Intl.NumberFormat('en-US');
    const { currentVehicle } = useVehicleSelectedCtx();

    
    const getVehiclePrice = () : number => {
        let price = 0;

        if(!vehicle) {
            return price
        }

        if (vehicle?.offerPrice && vehicle?.offerPrice != 0)
        {
            price = vehicle?.offerPrice
        }
        else if (vehicle?.basePrice)
        {
            price = vehicle?.basePrice
        }
        return price
    }

    const handleTestDrive = () => {
        fetchApp("AppShowroom", "TEST_DRIVE", {vehicleId: currentVehicle});
    }

    const handleBuyVehicle = () => {
        fetchApp("AppShowroom", "TRY_BUY_VEHICLE", {vehicleId: currentVehicle});
    }

    return (
        <div className={s.buttonsContainer}>
            <div className={s.testDrive} onClick={() => handleTestDrive()}>
                <span className={s.label}>{lang("test_drive")}</span>
                <span className={s.price}>$159</span>
            </div>

            <div className={s.buyButton} onClick={() => handleBuyVehicle()}> 
                <span className={s.label}>{lang("buy_car")}</span>
                <span className={s.price}>${USDollar.format(getVehiclePrice())}</span>
            </div>
    </div>
    )
}


const ColorPicker = () => {
    const { setVehicleColor } = useVehicleSelectedCtx();

    return (
        <div className={s.colorPicker}>
            <span>Colors</span>
            <div className={s.contentColors}>
                
                {
                    VehicleColorsMock.map(color =>{
                        return (
                            <div 
                                className={s.colorItem}
                                data-tooltip={color.label}
                                style={{background: color.hash}}
                                onClick={() => setVehicleColor(color.index)}
                            >
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const VehicleDetails = () => 
{
    const { currentVehicle } = useVehicleSelectedCtx();
    const [ vehicleNode, setVehicleNode ] = useState<VehicleCardProps>();
    
    const { vehicles } = useAppContext();

    const [ vehiclePopup, setVehiclePopup ] = useState(currentVehicle != -1);

    useEffect(() => {
        setVehicleNode(vehicles[currentVehicle - 1]);
        setVehiclePopup(currentVehicle != -1)
    }, [currentVehicle])

    const openVehiclePopup = (event: any) => {

        if ( event.detail == 2) 
        {
            if (! vehiclePopup )
            {
                setVehiclePopup(true)
            }
        }
    }

    return (
        <div 
            className={s.vehicleDetails}
            style={{
                background: IsEnvBrowser ? `url(./vehicles/${vehicleNode?.image}.png)` : "",
                opacity:  currentVehicle != -1 ? 1 : 0
            }}
        >
            <div 
                className={s.middle}
                onClick={openVehiclePopup}
            >
                {
                    vehicleNode
                    ?
                        <div className={`${ vehiclePopup ? s.vehicleDetailsCard : s.none}`}>  
                            <h1 className={s.vehicleName}>
                                {vehicleNode.label}
                            </h1>
                            <VehicleStatus
                                maxSpeed={vehicleNode.maxSpeed ?? 0}
                                acceleration={vehicleNode.acceleration ?? 0}
                                braking={vehicleNode.braking ?? 0}
                                handling={vehicleNode.handling ?? 0}
                            />
                            <div className={s.closePopup} onClick={() => setVehiclePopup(false)}>X</div>

                        </div>
                    :
                    ""
                }

            </div>

            <div className={s.right}>
                <ColorPicker />

                <ButtonsContainer 
                    vehicle = {vehicleNode}
                />
            </div>
        </div>
    )
}

export default VehicleDetails