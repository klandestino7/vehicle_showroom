import { eVehicleClass } from "@/constants/eClasses";
import s from "./VehicleCard.module.scss";
import VehicleStatus from "@/components/VehicleStatus/VehicleStatus";
import { useVehicleSelectedCtx } from "@/contexts/VehicleSelectedCtx";
import { useNavigate } from "react-router-dom";

export type VehicleCardProps = {
    id: number;
    label: string;
    model: string;
    brand: string;

    category: eVehicleClass;
    image: string;

    minPrice: number;
    maxPrice: number;
    basePrice: number;
    offerPrice?: number;

    maxSpeed?: number;
    acceleration?: number;
    braking?: number;
    handling?: number;

    stock: number;
    availableColors: number[];

    enabled: boolean;

    showVehicleStatus?: boolean;
}

const VehicleCard : React.FC<VehicleCardProps> = ({
    id, 
    label, 
    model, 
    brand, 
    basePrice, 
    offerPrice,
    image, 
    maxSpeed = 0, 
    acceleration = 0, 
    braking = 0, 
    handling = 0,
    showVehicleStatus = false
}) => 
{
    let USDollar = new Intl.NumberFormat('en-US');

    const { setVehicle, currentVehicle } = useVehicleSelectedCtx()
    const navigate = useNavigate();

    const handleClick = (event: any, index: number) =>{

        setVehicle(index);

        if ( event.detail == 2)
        {
            navigate("/");
        }
    }

    return(
        <div className={`${s.vehicleCard} ${currentVehicle == id ? s.selected : ""}`} onClick={(event) => handleClick(event, id)}>
            <div className={s.vehicleImage}
                style={{background: `url(./vehicles/${image}.png)`}}
            ></div>

            <div className={s.header}>
                <div className={s.id}>
                    {id}
                </div>

                <div className={`${s.price} ${ offerPrice ? s.offerPrice : s.normalPrice }`}>
                    {
                        offerPrice 
                        ?
                            <>
                                <span className={s.oldPrice}> ${USDollar.format(basePrice)} </span>
                                <span> ${USDollar.format(offerPrice)} </span>
                            </>
                        :
                            <span>${USDollar.format(basePrice)} </span>
                    }
                </div>
            </div>
            

            <div 
                className={s.imageSpacing}
            >
                {/* <img src={`./vehicles/${image}.png`} alt={label} /> */}
            </div>

            <div className={s.footer}>
                <div className={s.label}>
                    {label}
                </div>
            </div>

            {
                showVehicleStatus &&
                <div className={s.status}>
                    <VehicleStatus
                        maxSpeed={maxSpeed}
                        acceleration={acceleration}
                        braking={braking}
                        handling={handling}
                    />
                </div>
            }

        </div>
    )
}

export default VehicleCard;