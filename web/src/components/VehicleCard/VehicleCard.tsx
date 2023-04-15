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

    price: number;
    priceOffer?: number;

    class: eVehicleClass;

    image: string;

    maxSpeed: number;
    acceleration: number;
    braking: number;
    handling: number;

    showVehicleStatus?: boolean;
}

const VehicleCard : React.FC<VehicleCardProps> = ({
    id, 
    label, 
    model, 
    brand, 
    price, 
    priceOffer,
    image, 
    maxSpeed, 
    acceleration, 
    braking, 
    handling,
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

                <div className={`${s.price} ${ priceOffer ? s.offerPrice : s.normalPrice }`}>
                    {
                        priceOffer 
                        ?
                            <>
                                <span className={s.oldPrice}> ${USDollar.format(price)} </span>
                                <span> ${USDollar.format(priceOffer)} </span>
                            </>
                        :
                            <span>${USDollar.format(price)} </span>
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