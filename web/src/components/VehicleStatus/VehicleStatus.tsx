import s from "./VehicleStatus.module.scss";


type StatusBadge = 
{
    label: string;
    icon: string;
    value: number;
}

const StatusBadge : React.FC<StatusBadge> = ({label, icon, value}) =>
{
    return (
        <div className={`${s.rowCenter} ${s.item}`}>
            <div className={s.badge}
            >
                <img src={`./icons/${icon}.svg`} alt={label}></img>
            </div>
        
            <div className={s.right}>
                <div className={s.number}>
                    {value.toFixed(1)}
                </div>

                <div className={s.label}>
                    {label}
                </div>
            </div>
        </div>
    )
}


type VehicleStatusProps = {
    maxSpeed: number;
    acceleration: number;
    braking: number;
    handling: number;
}

const VehicleStatus : React.FC<VehicleStatusProps> = ({maxSpeed, acceleration, braking, handling}) => 
{
    return (
        <div className={`${s.vehicleStatus}`}>
            <StatusBadge 
                label = {"km/h"}
                icon = {"speed"}
                value = {maxSpeed}
            />

            <StatusBadge 
                label = {"Acceleration"}
                icon = {"acceleration"}
                value = {acceleration}
            />

            <StatusBadge 
                label = {"Braking"}
                icon = {"braking"}
                value = {braking}
            />

            <StatusBadge 
                label = {"Control"}
                icon = {"control"}
                value = {handling}
            />
        </div>
    )
}

export default VehicleStatus;